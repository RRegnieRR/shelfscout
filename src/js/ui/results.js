function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
}

function createCover(book) {
  const cover = createElement("div", "book-cover");

  if (book.coverUrl) {
    const image = document.createElement("img");
    image.src = book.coverUrl;
    image.alt = `Cover of ${book.title}`;
    image.loading = "lazy";
    image.width = 180;
    image.height = 270;
    cover.append(image);
  } else {
    cover.classList.add("book-cover--missing");
    cover.append(createElement("span", "", book.title.slice(0, 1).toUpperCase()));
    cover.setAttribute("aria-label", `No cover available for ${book.title}`);
  }

  return cover;
}

const READING_LABELS = {
  "want-to-read": "Want to read",
  reading: "Reading",
  finished: "Finished",
};

function createBookCard(book, entry = {}) {
  const card = createElement("article", "book-card");
  card.append(createCover(book));

  const body = createElement("div", "book-card__body");
  const source = createElement("p", "source-badge", book.source);
  const title = createElement("h3", "", book.title);
  const authors = createElement(
    "p",
    "book-authors",
    book.authors.length ? book.authors.join(", ") : "Author unavailable",
  );
  const metadata = createElement(
    "p",
    "book-meta",
    book.publishedYear ? `First published ${book.publishedYear}` : "Publication year unavailable",
  );

  body.append(source, title, authors, metadata);

  if (book.description) {
    body.append(createElement("p", "book-description", book.description));
  }

  if (entry.favorite || READING_LABELS[entry.status]) {
    const labels = [entry.favorite ? "Favorite" : "", READING_LABELS[entry.status] || ""].filter(Boolean);
    body.append(createElement("p", "library-status", labels.join(" · ")));
  }

  const actions = createElement("div", "book-actions");
  const details = createElement("button", "book-action", "Details");
  details.type = "button";
  details.dataset.action = "details";
  details.dataset.bookId = book.id;

  const favorite = createElement("button", "book-action", entry.favorite ? "★ Favorite" : "☆ Favorite");
  favorite.type = "button";
  favorite.dataset.action = "favorite";
  favorite.dataset.bookId = book.id;
  favorite.setAttribute("aria-pressed", String(Boolean(entry.favorite)));

  const reading = createElement(
    "button",
    "book-action",
    entry.status && entry.status !== "none" ? READING_LABELS[entry.status] : "+ Reading list",
  );
  reading.type = "button";
  reading.dataset.action = "reading-list";
  reading.dataset.bookId = book.id;
  reading.setAttribute("aria-pressed", String(Boolean(entry.status && entry.status !== "none")));
  actions.append(details, favorite, reading);
  body.append(actions);

  const sourceLink = createElement("a", "book-link", "View source");
  sourceLink.href = book.sourceUrl;
  sourceLink.target = "_blank";
  sourceLink.rel = "noreferrer";
  sourceLink.setAttribute("aria-label", `View ${book.title} on ${book.source}`);
  body.append(sourceLink);
  card.append(body);

  return card;
}

export function renderBooks(container, books, library = new Map()) {
  const fragment = document.createDocumentFragment();
  books.forEach((book) => fragment.append(createBookCard(book, library.get(book.id))));
  container.replaceChildren(fragment);
}

export function renderStatus(statusElement, message, type = "info") {
  statusElement.className = `status status--${type}`;
  statusElement.replaceChildren(createElement("p", "", message));
  statusElement.hidden = false;
}
