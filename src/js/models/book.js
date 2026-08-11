const FALLBACK_COVER = "";

function cleanText(value, fallback = "Unknown") {
  if (typeof value !== "string") return fallback;
  const cleanValue = value.trim();
  return cleanValue || fallback;
}

function cleanList(value) {
  if (typeof value === "string") return value.trim() ? [value.trim()] : [];
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

export function normalizeInternetArchiveBook(document) {
  const identifier = cleanText(document.identifier, crypto.randomUUID());
  const descriptions = cleanList(document.description);
  const isbn = cleanList(document.isbn)[0] || "";

  return {
    id: `ia-${identifier}`,
    source: "Internet Archive",
    sourceUrl: `https://archive.org/details/${encodeURIComponent(identifier)}`,
    title: cleanText(document.title, "Untitled book"),
    authors: cleanList(document.creator),
    publishedYear: Number.parseInt(document.date, 10) || null,
    coverUrl: `https://archive.org/services/img/${encodeURIComponent(identifier)}`,
    description: (descriptions[0] || cleanList(document.subject).slice(0, 4).join(" · ")).slice(0, 700),
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
