# Debugging Journal

## Bug 1: Crash — `.map()`/`.filter()` on null state

- **Symptom:** Blank white page on load. Console showed `Uncaught TypeError: Cannot read properties of null (reading 'filter')` at `App.tsx:18`.
- **Tool Used:** Chrome DevTools Breakpoint (**Sources Tab**).
- **What It Showed:** Paused execution at the `products.filter(...)` line and inspected the Scope panel — confirmed `products` was `null` at that exact point, and that `visibleProducts` inherited `null` before ever reaching `.filter()`. Also showed that `saleCount` and `publicProducts` were never computed at all, since the crash happened before those lines ran.
- **Fix:** Reverted `products` state to its real initial array instead of `null`, restoring `Product[]` as the actual type (removing the temporary `| null` union).

---

## Bug 2: Silent Wrong Value (Prop Name Typo)

- **Symptom:** The stock filter UI did not reflect or display the expected checked state.
- **Tool Used:** **React DevTools** (Components Inspector).
- **What It Showed:** React DevTools showed that `StockFilter` received a prop named `checkd` instead of the expected `checked` prop defined in its interface.
- **Fix:** Corrected the prop pass on `<StockFilter checked={inStockOnly} onChange={setInStockOnly} />`.

---

## Bug 3: Network Failure (Mistyped API Endpoint)

- **Symptom:** The application loads with an empty product list and no UI crash, but no items ever load onto the screen despite the backend server being active.
- **Tool Used:** Browser **Network Tab** (filtered by `Fetch/XHR`).
- **What It Showed:** The Network tab recorded an outgoing HTTP `GET` request to `https://fakestoreapi.com/produts` that failed with a `404 Not Found` status code. Inspecting the request URL immediately highlighted the spelling typo (`/produts` instead of `/products`).
- **Fix:** Corrected the endpoint URL string inside the `useEffect` fetch call from `/produts` back to `/products`.


```

---

### One-Sentence Deliverable Summary

> **Sources Breakpoint** caught the `.map()` crash by freezing execution right before state evaluated to `null`; **React DevTools** caught the silent wrong value by exposing the mutated prop name on the child component; and the **Network Tab** caught the failed fetch by revealing the `404 Not Found` HTTP status on the misspelled API route—none of which the console alone could isolate because console logs only output what you explicitly print, whereas specialized DevTools inspect live execution state, component props, and HTTP network traffic directly.