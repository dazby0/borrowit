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
