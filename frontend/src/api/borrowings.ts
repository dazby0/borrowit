import type {
  BorrowingFilters,
  BorrowRequest,
  CountResponse,
  UserBorrowing,
} from "../types/borrowings";
import type { BorrowingFiltersValues } from "../components/Borrowings/hooks/useBorrowingFiltersForm";

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

export const getUserBorrowings = async (
  filters?: BorrowingFilters
): Promise<UserBorrowing[]> => {
  const params = new URLSearchParams();

  if (filters?.status) params.append("status", filters.status);
  if (filters?.sortBy) params.append("sortBy", filters.sortBy);
  if (filters?.sortOrder) params.append("sortOrder", filters.sortOrder);
  if (filters?.borrowedFrom)
    params.append("borrowedFrom", filters.borrowedFrom);
  if (filters?.borrowedTo) params.append("borrowedTo", filters.borrowedTo);
  if (filters?.returnedFrom)
    params.append("returnedFrom", filters.returnedFrom);
  if (filters?.returnedTo) params.append("returnedTo", filters.returnedTo);

  const res = await fetch(`${API_URL}/me?${params.toString()}`, {
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

export const getActiveBorrowingsCount = async (): Promise<number> => {
  const res = await fetch(`${API_URL}/me/active/count`, {
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to fetch active borrowings count");

  const data: CountResponse = await res.json();
  return data.count;
};

export const getAllBorrowings = async (
  filters: BorrowingFiltersValues
): Promise<UserBorrowing[]> => {
  const query = new URLSearchParams();

  if (filters.status) query.append("status", filters.status);
  if (filters.sortBy) query.append("sortBy", filters.sortBy);
  if (filters.sortOrder) query.append("sortOrder", filters.sortOrder);
  if ((filters as any).username)
    query.append("username", (filters as any).username);

  const res = await fetch(`${API_URL}?${query.toString()}`, {
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to fetch borrowings");

  return res.json();
};
