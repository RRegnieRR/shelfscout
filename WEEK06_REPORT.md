# W06 Final Project: Report on Tasks

## Task completed: Added timeouts for book-service requests

Created a reusable Fetch timeout helper and connected it to both the Open Library and Google Books API modules. If either service stops responding, ShelfScout now leaves the loading state after 10 seconds and shows available results or a clear error message. Starting a new search still cancels the previous request.

- Source: https://github.com/RRegnieRR/shelfscout/blob/main/src/js/api/fetchWithTimeout.js
- Related source: https://github.com/RRegnieRR/shelfscout/tree/main/src/js/api
- Live site: https://rregnierr.github.io/shelfscout/

## Task completed: Built the book details view

Added an accessible details dialog for every result and saved book. The view displays the cover, title, author, publication year, ISBN, description, data source, and My Shelf controls.

- Source: https://github.com/RRegnieRR/shelfscout/blob/main/src/js/ui/details.js
- Live site: https://rregnierr.github.io/shelfscout/

## Task completed: Added My Shelf and reading statuses

Added a clear Save to My Shelf action and reading statuses (Want to read, Reading, and Finished). Saved books can be updated or explicitly removed, and the shelf remains available after reloading the page.

- Source: https://github.com/RRegnieRR/shelfscout/blob/main/src/js/storage/library.js
- Related source: https://github.com/RRegnieRR/shelfscout/blob/main/src/js/ui/results.js
- Live site: https://rregnierr.github.io/shelfscout/#my-shelf

## Task completed: Added recent searches

Stored the six most recent unique searches in `localStorage` and rendered them as reusable search buttons below the suggested searches.

- Source: https://github.com/RRegnieRR/shelfscout/blob/main/src/js/storage/library.js
- Related source: https://github.com/RRegnieRR/shelfscout/blob/main/src/js/main.js
- Live site: https://rregnierr.github.io/shelfscout/

## Task completed: Added filters, sorting, and pagination

Added source filtering, title/year sorting, six results per page, page status, and accessible Previous/Next controls.

- Source: https://github.com/RRegnieRR/shelfscout/blob/main/src/js/ui/searchView.js
- Related source: https://github.com/RRegnieRR/shelfscout/blob/main/src/js/main.js
- Live site: https://rregnierr.github.io/shelfscout/

## Task completed: Tested mobile and desktop layouts

Verified responsive layouts, result controls, the details dialog, My Shelf statuses, recent-search persistence, pagination, and the My Shelf view. The 390-pixel mobile test had no horizontal overflow.

- Source: https://github.com/RRegnieRR/shelfscout/blob/main/src/css/styles.css
- Live site: https://rregnierr.github.io/shelfscout/

## Verification completed

- ESLint passes with no errors.
- The Vite production build succeeds.
- A simulated slow request stops after the configured timeout.
- A simulated user cancellation remains distinguishable from a timeout.
- Details, My Shelf statuses, recent searches, filters, sorting, and pagination pass interaction checks.
- Saved books, reading status, and recent searches persist after a page reload.
- The mobile layout fits a 390-pixel viewport without horizontal overflow.
- The deployed page loads successfully.

## Professional Development Document

Updated `PROFESSIONAL_DEVELOPMENT.md` with a Week 6 entry about request timeouts, cancellation, reusable ES modules, `localStorage`, accessible dialogs, state-driven rendering, filtering, sorting, pagination, and responsive verification.

- Document: https://github.com/RRegnieRR/shelfscout/blob/main/PROFESSIONAL_DEVELOPMENT.md

## Project tracking

- Trello board: https://trello.com/b/tsifjVO6/wdd-330-book-finder-final-project
- Progress: All Week 6 development and layout-testing cards are marked complete.
