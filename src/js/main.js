import { searchGoogleBooks } from "./api/googleBooks.js";
import { searchOpenLibrary } from "./api/openLibrary.js";
import { deduplicateBooks } from "./models/book.js";
import { renderBooks, renderStatus } from "./ui/results.js";

const form = document.querySelector("#search-form");
const input = document.querySelector("#search-query");
const results = document.querySelector("#results");
const status = document.querySelector("#status");
const resultsTitle = document.querySelector("#results-title");
const resultCount = document.querySelector("#result-count");
const quickSearches = document.querySelector(".quick-searches");

let activeRequest;

async function searchBooks(query) {
  activeRequest?.abort();
  activeRequest = new AbortController();
  results.replaceChildren();
  resultCount.textContent = "";
  resultsTitle.textContent = `Searching for “${query}”`;
  renderStatus(status, "Checking Open Library and Google Books…", "loading");

  const searches = await Promise.allSettled([
    searchOpenLibrary(query, activeRequest.signal),
    searchGoogleBooks(query, activeRequest.signal),
  ]);

  if (activeRequest.signal.aborted) return;

  const successfulSearches = searches.filter((search) => search.status === "fulfilled");
  const books = deduplicateBooks(successfulSearches.flatMap((search) => search.value)).slice(0, 20);

  resultsTitle.textContent = `Results for “${query}”`;

  if (successfulSearches.length === 0) {
    renderStatus(status, "Neither book service could be reached. Check your connection and try again.", "error");
    return;
  }

  if (books.length === 0) {
    renderStatus(status, "No matching books were found. Try a broader title, author, or subject.", "empty");
    return;
  }

  status.hidden = true;
  resultCount.textContent = `${books.length} ${books.length === 1 ? "book" : "books"}`;
  renderBooks(results, books);

  if (successfulSearches.length === 1) {
    const notice = document.createElement("p");
    notice.className = "partial-notice";
    notice.textContent = "Showing available results while one book service is temporarily unavailable.";
    results.before(notice);
  }
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
  searchBooks(query);
});

input.addEventListener("input", () => input.setCustomValidity(""));

quickSearches.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-query]");
  if (!button) return;
  input.value = button.dataset.query;
  form.requestSubmit();
});

document.querySelector("#current-year").textContent = new Date().getFullYear();
