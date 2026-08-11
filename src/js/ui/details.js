function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
}

export function renderBookDetails(container, book, entry = {}) {
  const layout = createElement("div", "book-detail");
  const close = createElement("button", "dialog-close", "Close");
  close.type = "button";
  close.dataset.action = "close-details";

  const cover = createElement("div", "book-detail__cover");
  if (book.coverUrl) {
    const image = document.createElement("img");
    image.src = book.coverUrl;
    image.alt = `Cover of ${book.title}`;
    cover.append(image);
  } else {
    cover.append(createElement("span", "", book.title.slice(0, 1).toUpperCase()));
  }

  const content = createElement("div", "book-detail__content");
  content.append(createElement("p", "source-badge", book.source));
  const title = createElement("h2", "", book.title);
  title.id = "dialog-title";
  content.append(
    title,
    createElement(
      "p",
      "book-authors",
      book.authors.length ? book.authors.join(", ") : "Author unavailable",
    ),
    createElement(
      "p",
      "book-meta",
      book.publishedYear ? `First published ${book.publishedYear}` : "Publication year unavailable",
    ),
  );

  if (book.isbn) content.append(createElement("p", "book-meta", `ISBN ${book.isbn}`));
  content.append(
    createElement("p", "book-detail__description", book.description || "No description is available."),
  );

  const actions = createElement("div", "detail-actions");
  if (entry.status) {
    const statusLabel = createElement("label", "reading-control", "My shelf status");
    const select = document.createElement("select");
    select.dataset.action = "reading-status";
    select.dataset.bookId = book.id;
    [
      ["want-to-read", "Want to read"],
      ["reading", "Reading"],
      ["finished", "Finished"],
    ].forEach(([value, label]) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = label;
      select.append(option);
    });
    select.value = entry.status;
    statusLabel.append(select);

    const remove = createElement("button", "secondary-button remove-button", "Remove from shelf");
    remove.type = "button";
    remove.dataset.action = "remove-from-shelf";
    remove.dataset.bookId = book.id;
    actions.append(statusLabel, remove);
  } else {
    const save = createElement("button", "secondary-button save-button", "Save to My Shelf");
    save.type = "button";
    save.dataset.action = "save-to-shelf";
    save.dataset.bookId = book.id;
    actions.append(save);
  }

  const source = createElement("a", "book-link", `View on ${book.source}`);
  source.href = book.sourceUrl;
  source.target = "_blank";
  source.rel = "noreferrer";

  actions.append(source);
  content.append(actions);
  layout.append(close, cover, content);
  container.replaceChildren(layout);
}
