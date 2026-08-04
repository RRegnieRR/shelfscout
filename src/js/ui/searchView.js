export function filterAndSortBooks(books, { source = "all", sort = "relevance" } = {}) {
  const filtered = source === "all" ? [...books] : books.filter((book) => book.source === source);

  if (sort === "title") {
    return filtered.sort((a, b) => a.title.localeCompare(b.title));
  }

  if (sort === "newest" || sort === "oldest") {
    const direction = sort === "newest" ? -1 : 1;
    return filtered.sort(
      (a, b) => direction * ((a.publishedYear || 0) - (b.publishedYear || 0)),
    );
  }

  return filtered;
}

export function paginateBooks(books, page = 1, pageSize = 6) {
  const pageCount = Math.max(1, Math.ceil(books.length / pageSize));
  const safePage = Math.min(Math.max(page, 1), pageCount);
  const start = (safePage - 1) * pageSize;

  return {
    books: books.slice(start, start + pageSize),
    page: safePage,
    pageCount,
  };
}
