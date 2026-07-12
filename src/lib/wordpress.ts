// Look for the env variable first; if missing, use your live URL directly
const API_URL =
  process.env.WORDPRESS_API_URL ||
  "https://silver-hawk-519471.hostingersite.com/graphql";

export async function fetchAPI(
  query: string,
  { variables }: { variables?: Record<string, unknown> } = {},
) {
  if (!API_URL) {
    throw new Error("WORDPRESS_API_URL environment variable is missing!");
  }

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
    next: { revalidate: 60 },
  });

  const json = await res.json();

  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API from WordPress");
  }

  return json.data;
}

export interface WordPressPost {
  title: string;
  slug: string;
  excerpt: string;
  content: string; // Ensured strict non-optional string type
  date: string;
  featuredImage?: string;
  categories: string[];
}

// Interfaces to fully structure incoming GraphQL responses without using "any"
interface GraphQLCategoryNode {
  slug: string;
}

interface GraphQLPostNode {
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  date: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
    };
  };
  categories?: {
    nodes: GraphQLCategoryNode[];
  };
}

export async function getAllPosts(): Promise<WordPressPost[]> {
  const data = await fetchAPI(`
    query GetAllPosts {
      posts(first: 100) {
        nodes {
          title
          slug
          excerpt
          date
          featuredImage {
            node {
              sourceUrl
            }
          }
          categories {
            nodes {
              slug
            }
          }
        }
      }
    }
  `);

  const rawNodes: GraphQLPostNode[] = data?.posts?.nodes || [];

  return rawNodes.map((post) => ({
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content || "",
    date: post.date,
    featuredImage: post.featuredImage?.node?.sourceUrl || undefined,
    categories: post.categories?.nodes?.map((cat) => cat.slug) || [],
  }));
}

export async function getPostBySlug(
  slug: string,
): Promise<WordPressPost | null> {
  const data = await fetchAPI(
    `
    query GetPostBySlug($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        title
        content
        date
        featuredImage {
          node {
            sourceUrl
          }
        }
        categories {
          nodes {
            slug
          }
        }
      }
    }
  `,
    {
      variables: {
        id: slug,
        idType: "SLUG",
      },
    },
  );

  const post: GraphQLPostNode | null = data?.post || null;
  if (!post) return null;

  return {
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt || "",
    content: post.content || "",
    date: post.date,
    featuredImage: post.featuredImage?.node?.sourceUrl || undefined,
    categories: post.categories?.nodes?.map((cat) => cat.slug) || [],
  };
}
