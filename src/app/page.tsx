import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/wordpress";

const SERVICES = [
  {
    title: "Training Need Analysis",
    description:
      "Identify performance gaps, learning objectives, audience needs, and recommend the right learning approach.",
    icon: (
      <svg
        className="w-6 h-6 text-(--color-brand-cream)"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <circle cx="11" cy="11" r="6" className="animate-pulse" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 16l4 4" />
      </svg>
    ),
  },
  {
    title: "E-Learning Development",
    description:
      "Design interactive e-learning courses, microlearning, assessments, and scenario-based modules.",
    icon: (
      <svg
        className="w-6 h-6 text-(--color-brand-cream)"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <rect x="3" y="4" width="18" height="12" rx="2" />
        <path
          strokeLinecap="round"
          className="animate-bounce"
          d="M12 8v4l3 3"
        />
      </svg>
    ),
  },
  {
    title: "ILT Content Development",
    description:
      "Develop instructor-led training content, facilitator guides, learner workbooks, activities, and assessments.",
    icon: (
      <svg
        className="w-6 h-6 text-(--color-brand-cream)"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 14h8M8 10h6M4 6h16v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z"
        />
        <circle cx="17" cy="6" r="1" className="animate-ping" />
      </svg>
    ),
  },
  {
    title: "Explainer Video Development",
    description:
      "Create concepts, storyboards, scripts, and learning-focused explainer videos.",
    icon: (
      <svg
        className="w-6 h-6 text-(--color-brand-cream) animate-spin [animation-duration:10s]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    title: "Animated Scenario Development",
    description:
      "Design branching scenarios, role-play simulations, and animated learning stories for engagement and practice.",
    icon: (
      <svg
        className="w-6 h-6 text-(--color-brand-cream)"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          className="origin-center hover:rotate-45 transition-transform"
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121 12h-4.5"
        />
      </svg>
    ),
  },
];

export default async function Home() {
  const allPosts = await getAllPosts();

  // Isolate entries specifically designated for the visual portfolio grid
  const portfolioItems = allPosts.filter((post) =>
    post.categories.includes("portfolio"),
  );

  const carouselItems = [...SERVICES, ...SERVICES];

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-(--color-brand-cream)">
      {/* Hero Section */}
      <section className="relative px-6 py-20 md:py-32 max-w-5xl mx-auto text-center">
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-(--color-brand-plum) mb-6 leading-tight">
          Crafting Tailored Digital <br className="hidden sm:inline" />
          Learning Experiences
        </h1>
        <p className="text-lg sm:text-xl text-(--color-body-text) max-w-2xl mx-auto mb-10">
          Transforming standard complex workflows into clean, interactive
          solutions built for scale and premium engagement.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/blog"
            className="px-6 py-3 rounded-lg bg-(--color-brand-plum) text-(--color-brand-cream) font-medium hover:bg-opacity-90 transition-all shadow-sm"
          >
            Explore the Blog
          </Link>
          <Link
            href="#portfolio"
            className="px-6 py-3 rounded-lg border-2 border-(--color-brand-mustard) bg-transparent font-semibold text-(--color-brand-plum) hover:bg-(--color-brand-mustard) hover:text-(--color-brand-cream) transition-all"
          >
            Portfolio Sneak-Peek
          </Link>
        </div>
      </section>

      {/* Services Infinite Carousel Section */}
      <section className="bg-(--color-brand-cream) border-y border-(--color-border) py-20 w-full overflow-hidden transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-6 mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-(--color-brand-plum) text-center">
            Services I Offer
          </h2>
        </div>

        {/* Structural Layout Container for Global Grid Margin Alignment */}
        <div className="relative max-w-7xl mx-auto px-6 md:px-12">
          {/* Visual Masking Fade Elements */}
          <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-(--color-brand-cream) to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-(--color-brand-cream) to-transparent z-10 pointer-events-none" />

          {/* Independent Marquee Scrolling Sub-viewport */}
          <div className="relative w-full overflow-hidden">
            <div className="animate-marquee flex gap-6 m-0 p-0">
              {carouselItems.map((service, index) => (
                <div
                  key={index}
                  className="w-72.5 sm:w-85 shrink-0 p-6 rounded-xl bg-(--color-card-bg) border border-(--color-border) flex flex-col justify-between transition-colors duration-300"
                >
                  <div>
                    <div className="h-10 w-10 rounded-lg bg-(--color-brand-plum) flex items-center justify-center mb-4 shadow-sm transition-colors duration-300">
                      {service.icon}
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-(--color-brand-plum) tracking-tight transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-(--color-body-text) text-sm leading-relaxed transition-colors duration-300">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Selected Portfolio Grid Section */}
      <section
        id="portfolio"
        className="max-w-6xl mx-auto px-6 py-20 w-full scroll-mt-16"
      >
        <header className="mb-12 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-(--color-brand-plum) mb-4 transition-colors">
            Portfolio
          </h2>
          <p className="text-(--color-body-text) text-base opacity-80 transition-colors">
            A visual overview of responsive modules, branching interactions, and
            learning media built for scale.
          </p>
        </header>

        {portfolioItems.length === 0 ? (
          <p className="text-center text-sm font-medium text-(--color-body-text) opacity-60 py-12">
            {
              'No portfolio pieces published yet. Assign the "portfolio" category to items in WordPress to populate this grid.'
            }
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioItems.map((project) => (
              <Link
                key={project.slug}
                href={`/blog/${project.slug}`}
                className="group flex flex-col justify-between h-full rounded-2xl border border-(--color-border) bg-(--color-card-bg) overflow-hidden hover:border-(--color-brand-mustard) hover:shadow-md transition-all duration-300"
              >
                {/* Visual Splash Container */}
                <div className="relative w-full aspect-video bg-(--color-brand-plum)/5 border-b border-(--color-border) overflow-hidden flex items-center justify-center transition-colors">
                  {project.featuredImage ? (
                    <Image
                      src={project.featuredImage}
                      alt={project.title || "Portfolio showcase thumbnail"}
                      fill
                      sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 opacity-40">
                      <svg
                        className="w-8 h-8 text-(--color-brand-plum)"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375 0 11-.75 0 .375 0 01.75 0z"
                        />
                      </svg>
                      <span className="text-xs font-semibold tracking-wider uppercase text-(--color-brand-plum)">
                        View Case Study
                      </span>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-(--color-brand-plum) opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                </div>

                {/* Meta Description Panel */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-(--color-brand-plum) tracking-tight mb-2 group-hover:text-(--color-brand-mustard) transition-colors line-clamp-2">
                      {project.title}
                    </h3>
                    <div
                      className="text-(--color-body-text) opacity-80 text-sm leading-relaxed line-clamp-2"
                      dangerouslySetInnerHTML={{ __html: project.excerpt }}
                    />
                  </div>

                  <div className="mt-4 pt-4 border-t border-(--color-border)/40 text-xs font-semibold text-(--color-brand-mustard) tracking-wider uppercase inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Explore Project →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
