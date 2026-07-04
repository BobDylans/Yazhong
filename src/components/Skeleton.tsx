// Lightweight skeleton placeholders for loading states.
// Uses the brand's muted token + a subtle gold pulse to feel on-brand
// rather than a generic gray spinner.

export function ProductCardSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      {/* Image area */}
      <div className="aspect-[4/3] bg-muted relative overflow-hidden">
        <div className="absolute inset-0 skeleton-shimmer" />
      </div>
      {/* Text lines */}
      <div className="p-4 space-y-2.5">
        <div className="h-3 w-1/3 bg-muted rounded skeleton-shimmer" />
        <div className="h-4 w-3/4 bg-muted rounded skeleton-shimmer" />
        <div className="h-3 w-full bg-muted rounded skeleton-shimmer" />
        <div className="h-3 w-2/3 bg-muted rounded skeleton-shimmer" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
