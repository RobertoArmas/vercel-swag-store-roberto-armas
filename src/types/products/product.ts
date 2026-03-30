export type SearchResult = {
  success: boolean;
  data: Product[];
  meta: {
    pagination: Pagination;
  };
};

export type Product = {
  id: string;
  name: string;
  description: string;
  slug: string;
  price: number;
  currency: string;
  category: string;
  images: string[];
};

export type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};
