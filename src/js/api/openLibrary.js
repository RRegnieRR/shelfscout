import { normalizeOpenLibraryBook } from "../models/book.js";

const OPEN_LIBRARY_URL = "https://openlibrary.org/search.json";

export async function searchOpenLibrary(query, signal) {
  const parameters = new URLSearchParams({
    q: query,
    limit: "12",
    fields: "key,title,author_name,first_publish_year,cover_i,isbn,subject",
  });
  const response = await fetch(`${OPEN_LIBRARY_URL}?${parameters}`, { signal });

  if (!response.ok) {
    throw new Error(`Open Library returned ${response.status}.`);
  }

  const data = await response.json();
  return (data.docs || []).map(normalizeOpenLibraryBook);
}
