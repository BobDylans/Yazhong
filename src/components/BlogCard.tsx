import { cn } from "@/lib/utils";
import Link from "next/link";
import type { BlogPost } from "@/types";
import { getImageUrl } from "@/lib/images";

interface BlogCardProps {
  post: BlogPost;
  className?: string;
  index?: number;
}

export function BlogCard({ post, className, index = 0 }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group block",
        "opacity-0 translate-y-8 blur-[2px] animate-[fade-up_0.7s_cubic-bezier(0.32,0.72,0,1)_forwards]",
        className,
      )}
      style={{ animationDelay: `${200 + index * 120}ms` }}
    >
      {/* Outer shell */}
      <div className="rounded-2xl bg-[#f3f4f6] p-1.5 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:bg-[#e5e7eb]">
        {/* Inner card */}
        <div className="overflow-hidden rounded-[calc(1rem-0.375rem)] bg-white shadow-premium transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:shadow-premium-hover">
          {/* Image */}
          <div className="relative aspect-[16/10] overflow-hidden bg-[#f9fafb]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={getImageUrl(post.image)}
              alt={post.title}
              className="h-full w-full object-cover transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.06]"
              loading="lazy"
            />
            <span className="absolute top-3 left-3 rounded-full bg-white/90 backdrop-blur-sm px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#3178c6]">
              {post.category}
            </span>
          </div>

          {/* Content */}
          <div className="flex flex-col gap-1.5 p-4">
            <time className="text-[11px] text-[#8c9196] font-medium">{post.date}</time>
            <h3 className="font-sans text-sm font-semibold text-[#1a1f24] line-clamp-2 leading-snug group-hover:text-[#3178c6] transition-colors duration-300">
              {post.title}
            </h3>
            <p className="text-xs text-[#8c9196] line-clamp-2 leading-relaxed">
              {post.excerpt}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

interface BlogGridProps {
  posts: BlogPost[];
  className?: string;
}

export function BlogGrid({ posts, className }: BlogGridProps) {
  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", className)}>
      {posts.map((post, i) => (
        <BlogCard key={post.slug} post={post} index={i} />
      ))}
    </div>
  );
}
