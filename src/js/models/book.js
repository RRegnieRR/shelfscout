const FALLBACK_COVER = "";

function cleanText(value, fallback = "Unknown") {
  if (typeof value !== "string") return fallback;
  const cleanValue = value.trim();
  return cleanValue || fallback;
}

function cleanList(value) {
  if (!Array.isArray(value)) return [];
  return value.filter((item) => typeof item === "string" && item.trim()).map((item) => item.trim());
}

export function normalizeOpenLibraryBook(document) {
  const isbn = document.isbn?.[0] || "";

  return {
    id: `ol-${document.key || isbn || crypto.randomUUID()}`,
    source: "Open Library",
    sourceUrl: document.key ? `https://openlibrary.org${document.key}` : "https://openlibrary.org",
    title: cleanText(document.title, "Untitled book"),
    authors: cleanList(document.author_name),
    publishedYear: document.first_publish_year || null,
    coverUrl: document.cover_i
      ? `https://covers.openlibrary.org/b/id/${document.cover_i}-M.jpg`
      : FALLBACK_COVER,
    description: cleanList(document.subject).slice(0, 4).join(" · "),
    isbn,
  };
}

export function normalizeGoogleBook(item) {
  const details = item.volumeInfo || {};
  const identifiers = Array.isArray(details.industryIdentifiers) ? details.industryIdentifiers : [];
  const isbn = identifiers.find((identifier) => identifier.type?.includes("ISBN"))?.identifier || "";

  return {
    id: `gb-${item.id || isbn || crypto.randomUUID()}`,
    source: "Google Books",
    sourceUrl: details.infoLink || "https://books.google.com",
    title: cleanText(details.title, "Untitled book"),
    authors: cleanList(details.authors),
    publishedYear: Number.parseInt(details.publishedDate, 10) || null,
    coverUrl: details.imageLinks?.thumbnail?.replace("http://", "https://") || FALLBACK_COVER,
    description: cleanText(details.description, "").slice(0, 700),
    isbn,
  };
}

export function deduplicateBooks(books) {
  const seen = new Set();

  return books.filter((book) => {
    const key = book.isbn
      ? `isbn:${book.isbn}`
      : `title:${book.title.toLowerCase()}|author:${book.authors[0]?.toLowerCase() || ""}`;

    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
