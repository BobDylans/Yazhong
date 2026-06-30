import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { blogPosts } from "@/data/blog-posts";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getImageUrl } from "@/lib/images";
import { ArrowLeft } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Blog Post" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt || post.title,
      type: "article",
      url: `https://rimhappywoods.top/blog/${slug}`,
      images: post.image ? [{ url: post.image, width: 1200, height: 630, alt: post.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || post.title,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Simple markdown to HTML conversion
  const renderContent = (content: string) => {
    return content
      .split("\n")
      .map((line) => {
        if (line.startsWith("**") && line.endsWith("**")) {
          return `<h3 class="text-lg font-semibold text-foreground mt-6 mb-3">${line.replace(/\*\*/g, "")}</h3>`;
        }
        if (line.startsWith("- ")) {
          return `<li class="text-muted-foreground text-sm leading-relaxed ml-4 list-disc">${line.slice(2)}</li>`;
        }
        if (line.match(/^\*\*\d\.\s/)) {
          return `<h4 class="font-semibold text-foreground mt-4 mb-1">${line.replace(/\*\*/g, "")}</h4>`;
        }
        if (line.trim() === "") return "";
        if (line.startsWith("  ")) {
          return `<p class="text-muted-foreground text-sm leading-relaxed ml-4">${line.trim()}</p>`;
        }
        return `<p class="text-muted-foreground text-sm leading-relaxed mb-2">${line}</p>`;
      })
      .join("\n");
  };

  return (
    <>
      <Header />
      <main className="pt-[106px] min-h-screen">
        {/* Back link */}
        <section className="max-w-[800px] mx-auto px-4 pt-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-accent transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        </section>

        {/* Article */}
        <article className="max-w-[800px] mx-auto px-4 py-8 pb-16">
          {/* Header image */}
          <div className="relative aspect-[16/9] overflow-hidden bg-secondary mb-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={getImageUrl(post.image)}
              alt={post.title}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Meta */}
          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
            <span className="bg-accent text-white px-2 py-0.5 uppercase tracking-wide">
              {post.category}
            </span>
            <span>{post.date}</span>
            <span>By {post.author}</span>
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
            {post.title}
          </h1>

          {/* Content */}
          <div
            className="prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: renderContent(post.content) }}
          />

          {/* Tags */}
          <div className="mt-10 pt-6 border-t border-border">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-secondary text-muted-foreground text-xs px-3 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10 bg-secondary p-6 text-center">
            <p className="text-sm text-muted-foreground mb-3">
              Have questions about this topic? We&apos;re here to help.
            </p>
            <a
              href="https://wa.me/15138009985"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-2.5 text-sm font-medium hover:bg-[#22c35e] transition-colors"
            >
              Ask on WhatsApp
            </a>
          </div>
        </article>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
