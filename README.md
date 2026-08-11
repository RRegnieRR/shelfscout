# ShelfScout

ShelfScout searches Open Library and Internet Archive at the same time and presents normalized book information in one responsive interface.

Live site: [https://rregnierr.github.io/shelfscout/](https://rregnierr.github.io/shelfscout/)

## Week 5 progress

- Created an independent Vite project with ESLint and Prettier configuration.
- Built a semantic, accessible page shell and search form.
- Established reusable colors, typography, spacing, and responsive layouts.
- Added API clients for Open Library and Internet Archive.
- Defined one normalized book model and ISBN/title-based deduplication.
- Added safe DOM rendering for book cards and loading, empty, partial-failure, and full-error states.

## Week 6 progress

- Added a reusable 10-second request timeout for both book services.
- Preserved cancellation when a new search replaces an older request.
- Added accessible book details for results and saved books.
- Added a persistent My Shelf workflow with Want to read, Reading, and Finished statuses.
- Added six reusable recent searches stored in the browser.
- Added source filtering, title/year sorting, and six-result pagination.
- Verified interactive behavior and responsive mobile/desktop layouts.
- Added a Professional Development Document and Week 6 task report.

## Run locally

```bash
npm install
npm run dev
```

## Quality checks

```bash
npm run lint
npm run build
```

## Data sources

- [Open Library Search API](https://openlibrary.org/dev/docs/api/search)
- [Internet Archive Advanced Search API](https://archive.org/advancedsearch.php)

No API key is required for either public search endpoint.
