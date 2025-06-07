export interface BorrowRequest {
  bookId: number;
  returnDueDate: string;
}

export interface UserBorrowing {
  id: number;
  bookId: number;
  bookTitle: string;
  borrowedAt: string;
  returnDueDate: string;
  returnedAt: string | null;
}

export interface BorrowingFilters {
  status?: "active" | "returned";
  sortBy?: "BorrowedAt" | "ReturnedAt";
  sortOrder?: "asc" | "desc";
  borrowedFrom?: string;
  borrowedTo?: string;
  returnedFrom?: string;
  returnedTo?: string;
}

export interface CountResponse {
  count: number;
}

export interface Statistics {
  activeBorrowings: number;
  activeUsers: number;
  mostBorrowedBooks: { title: string; count: number }[];
}
