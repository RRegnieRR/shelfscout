const LIBRARY_KEY = "shelfscout-library";
const RECENT_SEARCHES_KEY = "shelfscout-recent-searches";
const VALID_STATUSES = new Set(["none", "want-to-read", "reading", "finished"]);

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

export function getLibrary() {
  return readArray(LIBRARY_KEY).filter((entry) => entry?.book?.id);
}

function saveEntry(book, changes) {
  const library = getLibrary();
  const index = library.findIndex((entry) => entry.book.id === book.id);
  const current = index >= 0 ? library[index] : { book, favorite: false, status: "none" };
  const updated = { ...current, ...changes, book };

  if (!updated.favorite && updated.status === "none") {
    if (index >= 0) library.splice(index, 1);
  } else if (index >= 0) {
    library[index] = updated;
  } else {
    library.push(updated);
  }

  writeArray(LIBRARY_KEY, library);
  return updated;
}

export function toggleFavorite(book) {
  const current = getLibrary().find((entry) => entry.book.id === book.id);
  return saveEntry(book, { favorite: !current?.favorite });
}

export function setReadingStatus(book, status) {
  const safeStatus = VALID_STATUSES.has(status) ? status : "none";
  return saveEntry(book, { status: safeStatus });
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
