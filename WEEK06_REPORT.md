# W06 Final Project: Report on Tasks

## Task completed: Added timeouts for book-service requests

Created a reusable Fetch timeout helper and connected it to both the Open Library and Google Books API modules. If either service stops responding, ShelfScout now leaves the loading state after 10 seconds and shows available results or a clear error message. Starting a new search still cancels the previous request.

- Source: https://github.com/RRegnieRR/shelfscout/blob/main/src/js/api/fetchWithTimeout.js
- Related source: https://github.com/RRegnieRR/shelfscout/tree/main/src/js/api
- Live site: https://rregnierr.github.io/shelfscout/

## Verification completed

- ESLint passes with no errors.
- The Vite production build succeeds.
- A simulated slow request stops after the configured timeout.
- A simulated user cancellation remains distinguishable from a timeout.
- The deployed page loads successfully.

## Professional Development Document

Updated `PROFESSIONAL_DEVELOPMENT.md` with a Week 6 entry about request timeouts, cancellation, reusable ES modules, graceful partial failure, and verification.

- Document: https://github.com/RRegnieRR/shelfscout/blob/main/PROFESSIONAL_DEVELOPMENT.md

## Project tracking

- Trello board: https://trello.com/b/tsifjVO6/wdd-330-book-finder-final-project
- Required board update: Add and mark complete a Week 6 card named `Add timeouts for book-service requests`.
