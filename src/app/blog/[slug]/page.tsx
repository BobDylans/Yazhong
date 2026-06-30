import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { blogPosts } from "@/data/blog-posts";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getImageUrl } from "@/lib/images";
import { ArrowLeft, Calendar, User, Tag, Share2, MessageCircle } from "lucide-react";
import type { Metadata } from "next";
import { WHATSAPP_NUMBER } from "@/lib/config";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
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
      images: post.image ? [{ url: post.image, width: 1200, height: 630 }] : undefined,
    },
  };
}

function renderContent(content: string): string {
  const lines = content.split("\n").filter(Boolean);
  let html = "";
  let inList = false;

  for (const line of lines) {
    if (line.startsWith("**") && line.endsWith("**")) {
      html += `<h2 class="text-lg md:text-xl font-bold text-foreground mt-8 mb-4">${line.replace(/\*\*/g, "")}</h2>`;
    } else if (line.startsWith("- ")) {
      if (!inList) { html += '<ul class="list-disc pl-5 space-y-2 my-3">'; inList = true; }
      html += `<li class="text-sm text-muted-foreground leading-relaxed">${line.slice(2)}</li>`;
    } else if (line.match(/^\d+\.\s/)) {
      html += `<li class="text-sm text-muted-foreground leading-relaxed mb-1">${line}</li>`;
    } else {
      if (inList) { html += "</ul>"; inList = false; }
      html += `<p class="text-sm text-muted-foreground leading-relaxed mb-3">${line}</p>`;
    }
  }
  if (inList) html += "</ul>";
  return html;
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const relatedPosts = blogPosts.filter((p) => p.category === post.category && p.slug !== slug).slice(0, 3);
  const shareText = encodeURIComponent(`${post.title} — read more on Yazhong Blog`);
  const whatsappShare = `https://wa.me/?text=${shareText}%20https://rimhappywoods.top/blog/${slug}`;

  return (
    <>
      <Header />
      <main className="pt-[106px] min-h-screen">
        {/* Hero image */}
        <div className="relative h-[40vh] md:h-[50vh] overflow-hidden bg-muted">
          <img src={getImageUrl(post.image)} alt={post.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        </div>

        {/* Article */}
        <article className="max-w-3xl mx-auto px-4 -mt-20 relative z-10">
          {/* Back link + Share */}
          <div className="flex items-center justify-between mb-6">
            <Link href="/blog"
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-accent transition-colors bg-card px-3 py-2 rounded-full border border-border">
              <ArrowLeft className="h-3.5 w-3.5" />
              All Articles
            </Link>
            <a href={whatsappShare} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-[#25D366] transition-colors bg-card px-3 py-2 rounded-full border border-border">
              <Share2 className="h-3.5 w-3.5" />
              Share
            </a>
          </div>

          {/* Content card */}
          <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-ambient">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-4">
              <span className="bg-accent text-white px-2 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-sm">
                {post.category}
              </span>
              <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" /> {post.date}</span>
              <span className="inline-flex items-center gap-1"><User className="h-3 w-3" /> {post.author}</span>
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Body */}
            <div
              className="prose-custom"
              dangerouslySetInnerHTML={{ __html: renderContent(post.content) }}
            />

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex items-center gap-2 mt-8 pt-6 border-t border-border">
                <Tag className="h-3.5 w-3.5 text-muted-foreground" />
                {post.tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-1 text-[10px] font-medium bg-secondary text-muted-foreground rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* CTA */}
            <div className="mt-8 p-5 bg-secondary rounded-lg flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-1">
                <div className="text-sm font-semibold text-foreground">Need a custom fit for your car?</div>
                <div className="text-xs text-muted-foreground mt-1">Chat with us on WhatsApp for personalized recommendations.</div>
              </div>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white px-5 py-2.5 text-sm font-medium rounded-full hover:bg-[#22c35e] transition-colors whitespace-nowrap">
                <MessageCircle className="h-4 w-4" />
                Ask on WhatsApp
              </a>
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section className="mt-12 mb-16">
              <h2 className="text-lg font-bold text-foreground mb-6">Related Articles</h2>
              <div className="grid gap-4 sm:grid-cols-3">
                {relatedPosts.map((rp) => (
                  <Link key={rp.slug} href={`/blog/${rp.slug}`}
                    className="group">
                    <div className="aspect-[16/9] rounded-lg overflow-hidden bg-muted mb-3">
                      <img src={getImageUrl(rp.image)} alt={rp.title}
                        className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105" />
                    </div>
                    <div className="text-xs text-muted-foreground mb-1">{rp.date}</div>
                    <div className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors line-clamp-2">
                      {rp.title}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
