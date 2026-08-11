const LIBRARY_KEY = "shelfscout-library";
const RECENT_SEARCHES_KEY = "shelfscout-recent-searches";
const VALID_STATUSES = new Set(["want-to-read", "reading", "finished"]);

function readArray(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function writeArray(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function normalizeEntry(entry) {
  if (!entry?.book?.id) return null;

  const status = VALID_STATUSES.has(entry.status)
    ? entry.status
    : entry.favorite
      ? "want-to-read"
      : null;

  if (!status) return null;

  const now = new Date().toISOString();
  return {
    book: entry.book,
    status,
    dateAdded: entry.dateAdded || entry.updatedAt || now,
    updatedAt: entry.updatedAt || now,
  };
}

export function getLibrary() {
  const stored = readArray(LIBRARY_KEY);
  const library = stored.map(normalizeEntry).filter(Boolean);

  if (JSON.stringify(stored) !== JSON.stringify(library)) {
    writeArray(LIBRARY_KEY, library);
  }

  return library;
}

function saveEntry(book, status) {
  const library = getLibrary();
  const index = library.findIndex((entry) => entry.book.id === book.id);
  const now = new Date().toISOString();
  const current = index >= 0 ? library[index] : null;
  const updated = {
    book,
    status,
    dateAdded: current?.dateAdded || now,
    updatedAt: now,
  };

  if (index >= 0) {
    library[index] = updated;
  } else {
    library.push(updated);
  }

  writeArray(LIBRARY_KEY, library);
  return updated;
}

export function saveToShelf(book) {
  const current = getLibrary().find((entry) => entry.book.id === book.id);
  return current || saveEntry(book, "want-to-read");
}

export function setReadingStatus(book, status) {
  if (!VALID_STATUSES.has(status)) return null;
  return saveEntry(book, status);
}

export function removeFromShelf(bookId) {
  const library = getLibrary();
  const updated = library.filter((entry) => entry.book.id !== bookId);
  writeArray(LIBRARY_KEY, updated);
  return updated.length !== library.length;
}

export function getRecentSearches() {
  return readArray(RECENT_SEARCHES_KEY).filter((query) => typeof query === "string");
}

export function addRecentSearch(query) {
  const normalized = query.trim();
  const searches = getRecentSearches().filter(
    (item) => item.toLowerCase() !== normalized.toLowerCase(),
  );
  searches.unshift(normalized);
  writeArray(RECENT_SEARCHES_KEY, searches.slice(0, 6));
  return searches.slice(0, 6);
}
