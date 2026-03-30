import { Skeleton } from "@/components/ui/skeleton";

export default function SearchResultsSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="flex gap-4 sm:gap-6 rounded-xl border border-gray-200 dark:border-gray-800 p-3 sm:p-4"
        >
          <Skeleton className="h-28 w-28 sm:h-36 sm:w-36 flex-shrink-0 rounded-lg" />
          <div className="flex flex-1 flex-col justify-between py-0.5">
            <div className="space-y-2">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
            <Skeleton className="h-5 w-20 mt-2" />
          </div>
        </div>
      ))}
    </div>
  );
}
