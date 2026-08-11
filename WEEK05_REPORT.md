# W05 Final Project: Report on Tasks

## Completed work — 9 of 9 Week 5 tasks (100%)

### Task 1: Created the project folders and Vite setup

Created the standalone ShelfScout project structure and configured Vite for local development and production builds.

- Source: `package.json`, `vite.config.js`, and `src/`
- GitHub: https://github.com/RRegnieRR/shelfscout/blob/main/package.json
- Live site: https://rregnierr.github.io/shelfscout/

### Task 2: Configured ESLint and project scripts

Added lint, format, development, preview, and production build commands along with ESLint and Prettier configuration.

- Source: `package.json`, `.eslintrc.json`, and `.prettierrc.json`
- GitHub: https://github.com/RRegnieRR/shelfscout/blob/main/package.json
- Live site: https://rregnierr.github.io/shelfscout/

### Task 3: Built the semantic page layout and navigation

Created an accessible header, navigation, search form, results region, about section, and footer using semantic HTML.

- Source: `index.html`
- GitHub: https://github.com/RRegnieRR/shelfscout/blob/main/index.html
- Live site: https://rregnierr.github.io/shelfscout/

### Task 4: Created the responsive search form

Implemented the search controls and responsive visual system with visible focus indicators, mobile layouts, subtle card animation, and reduced-motion support.

- Source: `src/css/styles.css`
- GitHub: https://github.com/RRegnieRR/shelfscout/blob/main/src/css/styles.css
- Live site: https://rregnierr.github.io/shelfscout/

### Task 5: Connected the Google Books API

Added an independent Google Books request module and mapped its responses for use by the application.

- Source: `src/js/api/googleBooks.js`
- GitHub: https://github.com/RRegnieRR/shelfscout/blob/main/src/js/api/googleBooks.js
- Live site: https://rregnierr.github.io/shelfscout/

### Task 6: Connected the Open Library API

Added an independent Open Library Search request module. The application uses `Promise.allSettled()` so one service can still provide results when the other is unavailable.

- Source: `src/js/api/openLibrary.js`
- GitHub: https://github.com/RRegnieRR/shelfscout/blob/main/src/js/api/openLibrary.js
- Live site: https://rregnierr.github.io/shelfscout/

### Task 7: Normalized data from both APIs

Converted both API response formats into one consistent book object and added duplicate detection using ISBN or normalized title and author data.

- Source: `src/js/models/book.js`
- GitHub: https://github.com/RRegnieRR/shelfscout/blob/main/src/js/models/book.js
- Live site: https://rregnierr.github.io/shelfscout/

### Task 8: Rendered search result cards

Built safe DOM-based result cards with cover fallbacks, source attribution, and lazy-loaded images.

- Source: `src/js/ui/results.js`
- GitHub: https://github.com/RRegnieRR/shelfscout/blob/main/src/js/ui/results.js
- Live site: https://rregnierr.github.io/shelfscout/

### Task 9: Created loading, empty, and error states

Added loading, empty-results, partial-service, and full-error feedback so users always understand the current search status.

- Source: `src/js/main.js` and `src/js/ui/results.js`
- GitHub: https://github.com/RRegnieRR/shelfscout/tree/main/src/js
- Live site: https://rregnierr.github.io/shelfscout/

## Professional development update

This week I learned how to coordinate multiple asynchronous API requests while keeping the interface usable when one service fails. I developed a normalized data model that converts two different API response structures into a consistent book object. I applied JavaScript modules, `fetch`, `Promise.allSettled()`, array transformation, deduplication, safe DOM construction, semantic HTML, responsive CSS, accessible status messages, and reduced-motion preferences. I also strengthened my development workflow by checking the project with ESLint, HTML validation, and a production Vite build.

## Verification completed

- ESLint passes with no errors.
- HTML validation passes with no errors.
- Vite production build succeeds.
- Lighthouse scores 100 for accessibility, best practices, and SEO in the local mobile audit.
- Open Library returned live search results during testing.
- The partial-service state behaved correctly when one source was temporarily unavailable.
- The application has no horizontal overflow in the tested desktop viewport and includes a mobile breakpoint at 680px.

## Project tracking

- Trello board: https://trello.com/b/tsifjVO6/wdd-330-book-finder-final-project
- Progress: All 9 Week 5 cards are marked complete (100%).
