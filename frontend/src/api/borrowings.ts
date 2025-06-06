import type { BorrowRequest } from "../types/borrowings";

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
