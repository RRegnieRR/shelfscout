import { normalizeGoogleBook } from "../models/book.js";
import { fetchWithTimeout } from "./fetchWithTimeout.js";

const GOOGLE_BOOKS_URL = "https://www.googleapis.com/books/v1/volumes";

export async function searchGoogleBooks(query, signal) {
  const apiKey = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;
  if (!apiKey) throw new Error("Google Books API key is not configured.");

  const parameters = new URLSearchParams({
    q: query,
    maxResults: "12",
    printType: "books",
  });
  parameters.set("key", apiKey);

  const response = await fetchWithTimeout(`${GOOGLE_BOOKS_URL}?${parameters}`, { signal });

  if (!response.ok) {
    throw new Error(`Google Books returned ${response.status}.`);
  }

  const data = await response.json();
  return (data.items || []).map(normalizeGoogleBook);
}
