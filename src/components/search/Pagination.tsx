import { Pagination as PaginationType } from "@/types/products/product";
import {
  Pagination as PaginationRoot,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type PaginationProps = {
  pagination: PaginationType;
  searchParams: Promise<{ q?: string; category?: string; page?: number }>;
};

function getPageNumbers(
  current: number,
  total: number
): (number | "ellipsis")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | "ellipsis")[] = [1];

  if (current > 3) {
    pages.push("ellipsis");
  }

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (current < total - 2) {
    pages.push("ellipsis");
  }

  pages.push(total);

  return pages;
}

export default async function Pagination({
  pagination,
  searchParams,
}: PaginationProps) {
  const { page, totalPages, hasNextPage, hasPreviousPage } = pagination;
  const { q, category } = await searchParams;

  const buildSearchParams = (page: number) => {
    const params = new URLSearchParams();
    params.set("page", page.toString());
    if (q) params.set("q", q);
    if (category) params.set("category", category);
    return `?${params.toString()}`;
  };

  if (totalPages <= 1) return null;

  const pages = getPageNumbers(page, totalPages);

  return (
    <PaginationRoot>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={hasPreviousPage ? buildSearchParams(page - 1) : undefined}
            aria-disabled={!hasPreviousPage}
            className={!hasPreviousPage ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

        {pages.map((p, i) =>
          p === "ellipsis" ? (
            <PaginationItem key={`ellipsis-${i}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={p}>
              <PaginationLink href={buildSearchParams(p)} isActive={p === page}>
                {p}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        <PaginationItem>
          <PaginationNext
            href={hasNextPage ? buildSearchParams(page + 1) : undefined}
            aria-disabled={!hasNextPage}
            className={!hasNextPage ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationRoot>
  );
}
