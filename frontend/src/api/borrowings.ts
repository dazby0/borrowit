import type { BorrowRequest, UserBorrowing } from "../types/borrowings";

const API_URL = "http://localhost:5127/api/borrowings";

export const borrowBook = async (payload: BorrowRequest): Promise<void> => {
  const res = await fetch(`${API_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Failed to borrow book");
};

export const getUserBorrowings = async (): Promise<UserBorrowing[]> => {
  const res = await fetch(`${API_URL}/me`, {
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to fetch user borrowings");

  return res.json();
};

export const returnBook = async (borrowingId: number): Promise<void> => {
  const res = await fetch(`${API_URL}/${borrowingId}/return`, {
    method: "PATCH",
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to return book");
};
