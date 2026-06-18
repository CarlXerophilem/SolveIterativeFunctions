---
name: preview
description: Serve this static site locally over HTTP and open it in a browser. Use when the user wants to preview, view, or test the site (it must be served over http://, not opened via file://, for Giscus comments and CDN assets to behave).
---

# Preview the site

This is a build-less static site. Serve the project root over HTTP and open it.

1. Start a static server from the project root (pick the first available):
   - `python -m http.server 8000`
   - or `python3 -m http.server 8000`
   - or `npx serve -l 8000`

   Run it in the background so the session isn't blocked.

2. Open the entry page: http://localhost:8000/index.html
   (Solver: http://localhost:8000/solver.html · Composita: http://localhost:8000/composita.html)

3. Tell the user the URL. Note that `file://` will not work correctly — Giscus comments and some CDN-loaded assets require `http://`.

To preview a specific page, append its filename to the localhost URL.
