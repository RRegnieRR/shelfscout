import { normalizeGoogleBook } from "../models/book.js";

const GOOGLE_BOOKS_URL = "https://www.googleapis.com/books/v1/volumes";

export async function searchGoogleBooks(query, signal) {
  const parameters = new URLSearchParams({ q: query, maxResults: "12", printType: "books" });
  const response = await fetch(`${GOOGLE_BOOKS_URL}?${parameters}`, { signal });

  if (!response.ok) {
    throw new Error(`Google Books returned ${response.status}.`);
  }

  const data = await response.json();
  return (data.items || []).map(normalizeGoogleBook);
}
