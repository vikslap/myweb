import { getAllPosts, WordPressPost } from "@/lib/wordpress";
import Link from "next/link";

export default async function BlogIndex() {
  const allPosts: WordPressPost[] = await getAllPosts();

  // Exclude anything belonging to the portfolio track to keep insights clean
  const blogPosts = allPosts.filter(
    (post) => !post.categories.includes("portfolio"),
  );

  return (
    <main className="max-w-4xl mx-auto px-6 py-12 sm:py-20 flex-1 w-full">
      <header className="mb-12 max-w-2xl">
        <h1 className="text-4xl font-extrabold tracking-tight text-(--color-brand-plum) mb-4">
          Latest Posts
        </h1>
        <p className="text-(--color-body-text) text-lg">
          Documenting new trends, industry shifts, and my personal notes on
          learning design, code, and graphic animation
        </p>
      </header>

      {blogPosts.length === 0 ? (
        <p className="text-(--color-body-text) font-medium">
          No posts published yet.
        </p>
      ) : (
        <div className="grid gap-10">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="group relative p-6 sm:p-8 border border-(--color-border) rounded-xl hover:border-(--color-brand-mustard) transition-all bg-(--color-card-bg) hover:shadow-sm"
            >
              <h2 className="text-2xl font-bold text-(--color-brand-plum) mb-3 tracking-tight group-hover:text-(--color-brand-mustard) transition-colors">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <div
                className="text-(--color-body-text) text-sm leading-relaxed mb-4 line-clamp-3 transition-colors"
                dangerouslySetInnerHTML={{ __html: post.excerpt }}
              />
              <div className="text-xs font-semibold text-slate-400 tracking-wider uppercase">
                {new Date(post.date).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
