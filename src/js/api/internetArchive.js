import { normalizeInternetArchiveBook } from "../models/book.js";
import { fetchWithTimeout } from "./fetchWithTimeout.js";

const INTERNET_ARCHIVE_URL = "https://archive.org/advancedsearch.php";
const RESULT_FIELDS = ["identifier", "title", "creator", "date", "description", "subject", "isbn"];

function quoteSearch(query) {
  return query.replaceAll("\\", "\\\\").replaceAll('"', '\\"');
}

export async function searchInternetArchive(query, signal) {
  const parameters = new URLSearchParams({
    q: `("${quoteSearch(query)}") AND mediatype:texts`,
    rows: "12",
    page: "1",
    output: "json",
  });
  RESULT_FIELDS.forEach((field) => parameters.append("fl[]", field));

  const response = await fetchWithTimeout(`${INTERNET_ARCHIVE_URL}?${parameters}`, { signal });

  if (!response.ok) {
    throw new Error(`Internet Archive returned ${response.status}.`);
  }

  const data = await response.json();
  return (data.response?.docs || []).map(normalizeInternetArchiveBook);
}
