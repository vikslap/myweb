import { getPostBySlug, getAllPosts } from "@/lib/wordpress";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;

  // Fetch the current article content and the global list concurrently
  const [post, allPosts] = await Promise.all([
    getPostBySlug(slug),
    getAllPosts(),
  ]);

  if (!post) {
    notFound();
  }

  // Check if this post is classified under the portfolio track
  const isPortfolioItem = post.categories.includes("portfolio");

  // Gather 3 other portfolio splash cards for the recommendation deck, blocking duplicates
  const moreWork = allPosts
    .filter((p) => p.categories.includes("portfolio") && p.slug !== slug)
    .slice(0, 3);

  return (
    <main className="w-full flex-1 bg-(--color-brand-cream) transition-colors duration-300">
      {/* Main Core Content Body */}
      <div className="max-w-3xl mx-auto px-6 py-12 sm:py-20">
        <div className="mb-8">
          <Link
            href={isPortfolioItem ? "/#portfolio" : "/blog"}
            className="text-sm font-semibold text-(--color-brand-mustard) hover:text-(--color-brand-mustard-hover) transition-colors inline-flex items-center gap-1"
          >
            {isPortfolioItem ? "← Back to portfolio" : "← Back to insights"}
          </Link>
        </div>

        <article>
          <header className="mb-10 border-b border-(--color-border) pb-8 transition-colors">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-(--color-brand-plum) mb-4 leading-tight transition-colors">
              {post.title}
            </h1>
            <div className="text-sm font-medium text-(--color-body-text) opacity-60 transition-colors">
              {new Date(post.date).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </div>
          </header>

          <div
            className="prose-wp transition-colors"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>

      {/* Contextual Navigation Deck Footer for Case Studies */}
      {isPortfolioItem && moreWork.length > 0 && (
        <section className="w-full border-t border-(--color-border) bg-(--color-card-bg)/30 py-16 transition-colors mt-12">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-2xl font-bold tracking-tight text-(--color-brand-plum) mb-8 text-center sm:text-left transition-colors">
              More Selected Work
            </h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {moreWork.map((project) => (
                <Link
                  key={project.slug}
                  href={`/blog/${project.slug}`}
                  className="group flex flex-col justify-between h-full rounded-xl border border-(--color-border) bg-(--color-card-bg) overflow-hidden hover:border-(--color-brand-mustard) hover:shadow-sm transition-all"
                >
                  <div className="relative w-full aspect-video bg-(--color-brand-plum)/10 border-b border-(--color-border) overflow-hidden flex items-center justify-center">
                    {project.featuredImage ? (
                      <Image
                        src={project.featuredImage}
                        alt={project.title}
                        fill
                        sizes="(max-w-768px) 100vw, 30vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        priority={false}
                      />
                    ) : (
                      /* Minimal thematic placeholder if no splash image is uploaded on WordPress */
                      <span className="text-xs font-semibold text-(--color-brand-plum)/40 tracking-wider uppercase">
                        View Project
                      </span>
                    )}
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <h3 className="font-bold text-sm text-(--color-brand-plum) line-clamp-2 tracking-tight group-hover:text-(--color-brand-mustard) transition-colors">
                      {project.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
