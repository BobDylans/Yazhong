"use client";

import { cn } from "@/lib/utils";
import { Calendar, User, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { BlogPost } from "@/types";
import { getImageUrl } from "@/lib/images";

interface BlogCardProps {
  post: BlogPost;
  className?: string;
}

export function BlogCard({ post, className }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group block overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:shadow-ambient-hover hover:border-gold/30",
        className,
      )}
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <img
          src={getImageUrl(post.image)}
          alt={post.title}
          className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-accent text-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-sm">
            {post.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 md:p-5">
        <div className="flex items-center gap-3 text-[11px] text-muted-foreground mb-2.5">
          <span className="inline-flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {post.date}
          </span>
          <span className="inline-flex items-center gap-1">
            <User className="h-3 w-3" />
            {post.author}
          </span>
        </div>
        <h3 className="text-sm font-bold text-foreground leading-snug mb-2 group-hover:text-accent transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-3">
          {post.excerpt}
        </p>
        <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-accent group-hover:gap-2 transition-all">
          Read More <ArrowRight className="h-3 w-3" />
        </div>
      </div>
    </Link>
  );
}

interface BlogGridProps {
  posts: BlogPost[];
  className?: string;
  heading?: string;
  subheading?: string;
}

export function BlogGrid({
  posts,
  className,
  heading,
  subheading,
}: BlogGridProps) {
  return (
    <section className={cn("w-full", className)}>
      {heading && (
        <div className="text-center mb-10">
          <span className="eyebrow mb-3">{heading}</span>
          {subheading && (
            <p className="mt-3 text-sm text-muted-foreground max-w-lg mx-auto">
              {subheading}
            </p>
          )}
        </div>
      )}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
