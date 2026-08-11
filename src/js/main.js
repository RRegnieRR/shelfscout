import { searchGoogleBooks } from "./api/googleBooks.js";
import { searchOpenLibrary } from "./api/openLibrary.js";
import { deduplicateBooks } from "./models/book.js";
import {
  addRecentSearch,
  getLibrary,
  getRecentSearches,
  removeFromShelf,
  saveToShelf,
  setReadingStatus,
} from "./storage/library.js";
import { renderBookDetails } from "./ui/details.js";
import { renderBooks, renderStatus } from "./ui/results.js";
import { filterAndSortBooks, paginateBooks } from "./ui/searchView.js";

const PAGE_SIZE = 6;
const form = document.querySelector("#search-form");
const input = document.querySelector("#search-query");
const results = document.querySelector("#results");
const status = document.querySelector("#status");
const resultsTitle = document.querySelector("#results-title");
const resultCount = document.querySelector("#result-count");
const resultTools = document.querySelector("#result-tools");
const sourceFilter = document.querySelector("#source-filter");
const sortResults = document.querySelector("#sort-results");
const pagination = document.querySelector("#pagination");
const previousPage = document.querySelector("#previous-page");
const nextPage = document.querySelector("#next-page");
const pageStatus = document.querySelector("#page-status");
const quickSearches = document.querySelector(".quick-searches");
const recentSearches = document.querySelector("#recent-searches");
const recentSearchList = document.querySelector("#recent-search-list");
const shelfResults = document.querySelector("#shelf-results");
const shelfEmpty = document.querySelector("#shelf-empty");
const shelfCount = document.querySelector("#shelf-count");
const dialog = document.querySelector("#book-dialog");
const dialogContent = document.querySelector("#book-dialog-content");

let activeRequest;
let currentBooks = [];
let currentPage = 1;
let currentDetailBook;

function libraryMap() {
  return new Map(getLibrary().map((entry) => [entry.book.id, entry]));
}

function findBook(bookId) {
  return currentBooks.find((book) => book.id === bookId) || getLibrary().find((entry) => entry.book.id === bookId)?.book;
}

function renderRecentSearches() {
  const searches = getRecentSearches();
  recentSearchList.replaceChildren();
  searches.forEach((query) => {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.query = query;
    button.textContent = query;
    recentSearchList.append(button);
  });
  recentSearches.hidden = searches.length === 0;
}

function renderShelf() {
  const library = getLibrary();
  const books = library.map((entry) => entry.book);
  shelfEmpty.hidden = books.length > 0;
  shelfCount.textContent = books.length ? `${books.length} saved` : "";
  renderBooks(shelfResults, books, libraryMap());
}

function renderCurrentResults() {
  if (!currentBooks.length) return;
  const filtered = filterAndSortBooks(currentBooks, {
    source: sourceFilter.value,
    sort: sortResults.value,
  });
  const pageData = paginateBooks(filtered, currentPage, PAGE_SIZE);
  currentPage = pageData.page;
  resultCount.textContent = `${filtered.length} ${filtered.length === 1 ? "book" : "books"}`;

  if (!filtered.length) {
    results.replaceChildren();
    renderStatus(status, "No results match the selected source. Try another filter.", "empty");
    pagination.hidden = true;
    return;
  }

  status.hidden = true;
  renderBooks(results, pageData.books, libraryMap());
  pagination.hidden = pageData.pageCount <= 1;
  pageStatus.textContent = `Page ${pageData.page} of ${pageData.pageCount}`;
  previousPage.disabled = pageData.page === 1;
  nextPage.disabled = pageData.page === pageData.pageCount;
}

function refreshSavedState() {
  renderCurrentResults();
  renderShelf();
  if (dialog.open && currentDetailBook) {
    renderBookDetails(dialogContent, currentDetailBook, libraryMap().get(currentDetailBook.id));
  }
}

function openDetails(book) {
  currentDetailBook = book;
  renderBookDetails(dialogContent, book, libraryMap().get(book.id));
  dialog.showModal();
}

function handleBookAction(event) {
  const actionElement = event.target.closest("[data-action]");
  if (!actionElement) return;

  if (actionElement.dataset.action === "close-details") {
    dialog.close();
    return;
  }

  const book = findBook(actionElement.dataset.bookId);
  if (!book) return;

  if (actionElement.dataset.action === "details") openDetails(book);
  if (actionElement.dataset.action === "save-to-shelf") {
    saveToShelf(book);
    refreshSavedState();
  }
  if (actionElement.dataset.action === "remove-from-shelf") {
    removeFromShelf(book.id);
    refreshSavedState();
  }
}

async function searchBooks(query) {
  activeRequest?.abort();
  activeRequest = new AbortController();
  results.replaceChildren();
  resultTools.hidden = true;
  pagination.hidden = true;
  resultCount.textContent = "";
  resultsTitle.textContent = `Searching for “${query}”`;
  renderStatus(status, "Checking Open Library and Google Books…", "loading");

  const searches = await Promise.allSettled([
    searchOpenLibrary(query, activeRequest.signal),
    searchGoogleBooks(query, activeRequest.signal),
  ]);

  if (activeRequest.signal.aborted) return;
  const successfulSearches = searches.filter((search) => search.status === "fulfilled");
  currentBooks = deduplicateBooks(successfulSearches.flatMap((search) => search.value)).slice(0, 24);
  currentPage = 1;
  resultsTitle.textContent = `Results for “${query}”`;

  if (successfulSearches.length === 0) {
    renderStatus(status, "Neither book service could be reached. Check your connection and try again.", "error");
    return;
  }

  if (!currentBooks.length) {
    renderStatus(status, "No matching books were found. Try a broader title, author, or subject.", "empty");
    return;
  }

  resultTools.hidden = false;
  renderCurrentResults();
  if (successfulSearches.length === 1) {
    const notice = document.createElement("p");
    notice.className = "partial-notice";
    notice.textContent = "Showing available results while one book service is temporarily unavailable.";
    results.before(notice);
  }
}

function runSearch(query) {
  input.value = query;
  addRecentSearch(query);
  renderRecentSearches();
  searchBooks(query);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  document.querySelector(".partial-notice")?.remove();
  const query = input.value.trim();
  if (query.length < 2) {
    input.setCustomValidity("Enter at least two characters.");
    input.reportValidity();
    return;
  }
  input.setCustomValidity("");
  runSearch(query);
});

input.addEventListener("input", () => input.setCustomValidity(""));
[quickSearches, recentSearchList].forEach((container) => {
  container.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-query]");
    if (button) runSearch(button.dataset.query);
  });
});

[sourceFilter, sortResults].forEach((control) => {
  control.addEventListener("change", () => {
    currentPage = 1;
    renderCurrentResults();
  });
});
previousPage.addEventListener("click", () => {
  currentPage -= 1;
  renderCurrentResults();
  resultsTitle.scrollIntoView({ behavior: "smooth" });
});
nextPage.addEventListener("click", () => {
  currentPage += 1;
  renderCurrentResults();
  resultsTitle.scrollIntoView({ behavior: "smooth" });
});

[results, shelfResults, dialog].forEach((container) => container.addEventListener("click", handleBookAction));
dialog.addEventListener("change", (event) => {
  if (event.target.dataset.action !== "reading-status") return;
  const book = findBook(event.target.dataset.bookId);
  if (book) {
    setReadingStatus(book, event.target.value);
    refreshSavedState();
  }
});
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

renderRecentSearches();
renderShelf();
document.querySelector("#current-year").textContent = new Date().getFullYear();
