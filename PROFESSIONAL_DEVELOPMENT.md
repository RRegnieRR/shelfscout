# Professional Development

## Week 5

I learned how to coordinate multiple asynchronous API requests while keeping the interface usable when one service fails. I developed a normalized data model that converts two different API response structures into a consistent book object. I applied JavaScript modules, `fetch`, `Promise.allSettled()`, array transformation, deduplication, safe DOM construction, semantic HTML, responsive CSS, accessible status messages, and reduced-motion preferences. I also strengthened my development workflow by checking the project with ESLint, HTML validation, and a production Vite build.

## Week 6

I learned that error handling must include requests that never finish, not only HTTP error responses. I created a reusable Fetch wrapper that combines a request timeout with the application's existing cancellation behavior. This prevents the interface from remaining in a loading state indefinitely, still allows a new search to cancel the previous one, and lets `Promise.allSettled()` show partial results when only one book service responds.

I also learned how to coordinate persistent application state across several views. I used `localStorage` to preserve saved books, reading statuses, and recent searches; built an accessible native dialog for book details; and used state-driven rendering so result cards, dialog controls, and My Shelf stay synchronized. I separated filtering, sorting, and pagination into pure functions that are easier to verify. Finally, I tested keyboard-accessible controls, persistence after reload, and mobile layout behavior at a 390-pixel viewport. This work strengthened my skills with ES modules, event delegation, accessible interaction design, resilient storage parsing, responsive CSS, and layered functional testing.
