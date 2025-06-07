export interface GetBooksParams {
  title?: string;
  author?: string;
  isAvailable?: boolean;
  sortBy?: string;
  sortDir?: "asc" | "desc";
  page?: number;
  pageSize?: number;
}

export interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
  description: string | null;
  isAvailable: boolean;
  returnDueDate: string | null;
}

export interface PagedResult<T> {
  items: T[];
  totalCount: number;
}

export interface BookFiltersValues {
  title?: string;
  author?: string;
  isAvailable?: string;
  sortBy?: string;
  sortDir?: "asc" | "desc";
}

export interface BookBorrowing {
  username: string;
  borrowedAt: string;
  returnDueDate: string;
  returnedAt: string | null;
}
