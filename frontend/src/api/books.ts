import type { Book, GetBooksParams, PagedResult } from "../types/book";

const API_URL = "http://localhost:5127/api/books";

export const getBooks = async (
  params: GetBooksParams
): Promise<PagedResult<Book>> => {
  const query = new URLSearchParams();

  if (params.title) query.append("Title", params.title);
  if (params.author) query.append("Author", params.author);
  if (params.isAvailable !== undefined)
    query.append("IsAvailable", String(params.isAvailable));
  if (params.sortBy) query.append("SortBy", params.sortBy);
  if (params.sortDir) query.append("SortDir", params.sortDir);
  if (params.page) query.append("Page", params.page.toString());
  if (params.pageSize) query.append("PageSize", params.pageSize.toString());

  const res = await fetch(`${API_URL}?${query.toString()}`, {
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to fetch books");
  return res.json();
};

export const getBookById = async (id: number): Promise<Book> => {
  const res = await fetch(`${API_URL}/${id}`, {
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to fetch book details");
  return res.json();
};
