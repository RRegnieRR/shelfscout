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

function createBookCard(book) {
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

  const sourceLink = createElement("a", "book-link", "View source");
  sourceLink.href = book.sourceUrl;
  sourceLink.target = "_blank";
  sourceLink.rel = "noreferrer";
  sourceLink.setAttribute("aria-label", `View ${book.title} on ${book.source}`);
  body.append(sourceLink);
  card.append(body);

  return card;
}

export function renderBooks(container, books) {
  const fragment = document.createDocumentFragment();
  books.forEach((book) => fragment.append(createBookCard(book)));
  container.replaceChildren(fragment);
}

export function renderStatus(statusElement, message, type = "info") {
  statusElement.className = `status status--${type}`;
  statusElement.replaceChildren();

  const icon = createElement("div", "status-icon", type === "loading" ? "···" : type === "error" ? "!" : "⌕");
  icon.setAttribute("aria-hidden", "true");
  statusElement.append(icon, createElement("p", "", message));
  statusElement.hidden = false;
}
