import { Skeleton } from "@/components/ui/skeleton";

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      {/* Image */}
      <Skeleton className="aspect-[4/5] w-full rounded-none" />
      {/* Info */}
      <div className="flex flex-col gap-4">
        {/* Brand */}
        <Skeleton className="h-3 w-16" />
        {/* Name */}
        <div className="flex flex-col gap-2">
          <Skeleton className="h-7 w-3/4" />
          {/* Price */}
          <Skeleton className="h-4 w-24" />
          {/* Description */}
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        {/* CTA */}
        <Skeleton className="h-4 w-40" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 9 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-[79px] sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
