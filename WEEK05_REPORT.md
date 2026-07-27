# W05 Final Project: Report on Tasks

## Completed work — 6 of 10 Week 5 tasks (60%)

### Task 1: Created the ShelfScout project foundation

Configured a standalone Vite project with ESLint, Prettier, production build scripts, and project documentation.

- Source: `package.json`, `vite.config.js`, `.eslintrc.json`, and `README.md`
- GitHub: https://github.com/RRegnieRR/shelfscout/blob/main/package.json
- Live site: https://rregnierr.github.io/shelfscout/

### Task 2: Built the semantic application shell

Created an accessible header, navigation, search form, results region, about section, and footer using semantic HTML.

- Source: `index.html`
- GitHub: https://github.com/RRegnieRR/shelfscout/blob/main/index.html
- Live site: https://rregnierr.github.io/shelfscout/

### Task 3: Created the responsive visual system

Implemented the approved ShelfScout colors and typography, responsive layouts, visible focus indicators, mobile controls, subtle card animation, and reduced-motion support.

- Source: `src/css/styles.css`
- GitHub: https://github.com/RRegnieRR/shelfscout/blob/main/src/css/styles.css
- Live site: https://rregnierr.github.io/shelfscout/

### Task 4: Integrated two external book APIs

Added independent request modules for the Open Library Search API and Google Books API. The application uses `Promise.allSettled()` so one service can still provide results when the other is unavailable.

- Source: `src/js/api/openLibrary.js` and `src/js/api/googleBooks.js`
- GitHub: https://github.com/RRegnieRR/shelfscout/tree/main/src/js/api
- Live site: https://rregnierr.github.io/shelfscout/

### Task 5: Created a normalized Book model

Converted both API response formats into one consistent book object and added duplicate detection using ISBN or normalized title and author data.

- Source: `src/js/models/book.js`
- GitHub: https://github.com/RRegnieRR/shelfscout/blob/main/src/js/models/book.js
- Live site: https://rregnierr.github.io/shelfscout/

### Task 6: Implemented search results and feedback states

Built safe DOM-based result cards with cover fallbacks, source attribution, lazy-loaded images, and loading, empty, partial-service, and full-error feedback states.

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
- The partial-service state behaved correctly when Google Books was blocked by the local browser's privacy filter.
- The application has no horizontal overflow in the tested desktop viewport and includes a mobile breakpoint at 680px.

## Project tracking

- Trello board: https://trello.com/b/tsifjVO6/wdd-330-book-finder-final-project
- Progress: 6 Week 5 cards are marked complete (60% milestone).
