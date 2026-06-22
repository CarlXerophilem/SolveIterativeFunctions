# Page template spec — for shelf.html / history.html / equations.html / connections.html

> Every new page MUST be a complete standalone HTML file that drops into the existing static site.
> Match `theory.html` exactly. KaTeX (NOT MathJax). Reuse `css/main.css` classes. English content.
> Do NOT add runtime JS dependencies (Chart.js only if you actually draw a chart; it is already CDN-loadable).

## 1. The nav chain (use these exact prev/next for each new page)

Reading order of the whole site:
`index → shelf → history → theory → equations → connections → solver → composita → bibliography → blog → (index)`

| Page | fixed-bar PREV (id=prev-link) | center hover-prev | center title-main | center hover-next | fixed-bar NEXT (id=next-link) |
|---|---|---|---|---|---|
| shelf.html | index.html (Home) | Home | The Shelf | History | history.html |
| history.html | shelf.html (The Shelf) | The Shelf | History | Theory | theory.html |
| equations.html | theory.html (Theory) | Theory | Atlas of Equations | Connections | connections.html |
| connections.html | equations.html (Atlas) | Atlas | Connections | Solver | solver.html |

## 2. Exact skeleton (copy verbatim; fill the marked slots)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{PAGE TITLE}} — Iterative Functional Equations</title>

    <meta name="DC.Title" content="{{PAGE TITLE}} — Iterative Functional Equations">
    <meta name="DC.Creator" content="CarlXerophilem">
    <meta name="DC.Date" content="2026-06-22">
    <meta name="DC.Type" content="Interactive Resource">
    <meta name="DC.Format" content="HTML">
    <meta name="DC.Language" content="en-US">
    <meta name="DC.Rights" content="https://creativecommons.org/licenses/by-sa/4.0/">
    <meta property="og:title" content="{{PAGE TITLE}} — Iterative Functional Equations">
    <meta property="og:description" content="{{ONE-LINE DESCRIPTION}}">
    <meta property="og:url" content="https://carlxerophilem.github.io/SolveIterativeFunctions/{{FILE}}">
    <meta property="og:site_name" content="Solve Iterative Functions">

    <link rel="icon" type="image/x-icon" href="ff.ico">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css">
    <link rel="stylesheet" href="css/main.css">

    <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js"></script>
    <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js"></script>
    <script defer src="js/katex-init.js"></script>

    <!-- OPTIONAL: a small scoped <style> for page-specific components (timeline, field-map).
         Use ONLY these theme CSS variables so light/dark mode keep working:
         --bg-color --text-color --box-bg --border-color --link-color --theorem-bg --theorem-border
         --practice-bg --practice-border --toc-bg --footer-text --card-bg --card-shadow --code-bg
         Keep it short; prefer existing classes below. -->
</head>
<body data-type="book" id="top">

    <!-- Loader -->
    <div class="myLoader" id="loader">
        <div class="dots"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div>
        <div class="loadingMessage">Loading...</div>
    </div>
    <script>
        window.addEventListener('load', function(){ document.getElementById('loader').style.display = 'none'; });
    </script>

    <!-- Fixed Navigation Bar -->
    <div class="fixed-bar">
        <div class="link-container">
            <a href="{{PREV_FILE}}" id="prev-link" title="{{PREV_TITLE}}"><span class="arrow"><i class="fa-solid fa-arrow-left"></i></span></a>
            <span class="dark-mode-button" id="dark-mode-toggle" title="Toggle dark mode"><i class="fa-regular fa-sun"></i></span>
        </div>
        <div class="center-link-group">
            <a href="{{FILE}}" id="center-link">
                <span class="hover-prev">{{HOVER_PREV}}</span>
                <span class="title-main">{{TITLE_MAIN}}</span>
                <span class="hover-next">{{HOVER_NEXT}}</span>
            </a>
        </div>
        <a href="{{NEXT_FILE}}" id="next-link" title="{{NEXT_TITLE}}"><span class="arrow"><i class="fa-solid fa-arrow-right"></i></span></a>
    </div>

    <!-- Main Container -->
    <div class="container">
        <section data-type="chapter" id="{{SECTION_ID}}">

            <div class="toc-chapter" id="toc-chapter">
                <p><i class="fa-solid fa-list"></i> Contents</p>
                <ul>
                    <li><a href="#section1">1. ...</a></li>
                    <!-- one <li> per top-level section; use \( \) for any math in headings -->
                </ul>
            </div>

            <main>
                <article>
                    <h1>{{H1}}</h1>
                    <p style="color:var(--footer-text); margin-top:-0.5rem;">{{subtitle}}</p>
                    <hr>

                    <div id="section1">
                        <h2>1. ...</h2>
                        <!-- content -->
                    </div>
                    <hr>
                    <!-- more sections ... -->
                </article>
            </main>

            <div class="nextPage">
                <a href="{{NEXT_FILE}}">Next: {{NEXT_LABEL}} <i class="fa-solid fa-angles-right"></i></a>
            </div>
        </section>
    </div>

    <!-- Footer -->
    <footer>
        <hr>
        <div class="footer-links">
            <a href="#top"><i class="fa-solid fa-house"></i> Top</a>
            <a href="https://github.com/CarlXerophilem/SolveIterativeFunctions">Source</a>
            <a href="bibliography.html">Bibliography</a>
        </div>
        <a rel="license" href="https://creativecommons.org/licenses/by-sa/4.0/">
            <i class="fa-brands fa-creative-commons"></i>
            <i class="fa-brands fa-creative-commons-by"></i>
            <i class="fa-brands fa-creative-commons-sa"></i> CC BY-SA 4.0
        </a>
        <br>
        &copy; 2024&ndash;2026 <a href="https://github.com/CarlXerophilem">CarlXerophilem</a> &amp; contributors
    </footer>

    <!-- Dark mode toggle (REQUIRED, verbatim) -->
    <script>
        (function() {
            const toggle = document.getElementById('dark-mode-toggle');
            const icon = toggle.querySelector('i');
            const html = document.documentElement;
            const saved = localStorage.getItem('darkMode');
            if (saved === 'true') { html.classList.add('dark'); icon.className = 'fa-regular fa-moon'; }
            toggle.addEventListener('click', function() {
                const isDark = html.classList.toggle('dark');
                localStorage.setItem('darkMode', isDark);
                icon.className = isDark ? 'fa-regular fa-moon' : 'fa-regular fa-sun';
            });
        })();
    </script>
</body>
</html>
```

## 3. KaTeX rules
- Inline math: `\( ... \)`  ·  Display math: `\[ ... \]`  (also `$$ ... $$` works). Do NOT use `\(`-less `$...$`.
- Escape literal `<`, `>`, `&` in prose as `&lt; &gt; &amp;` (KaTeX inside `\(\)` is fine).
- Reuse formatting helpers' conventions; keep equations short and correct.

## 4. Class vocabulary (reuse — do NOT reinvent)
- Callouts: `.definition`, `.theorem`, `.keypoint`, `.practice`, `.notice-box`, `.method-callout`.
- Tables: wrap wide tables in `<div class="table-wrap">`; use `.class-table` for classification tables.
- Reference / catalog lists: `<ul class="ref-list"><li>...<span class="ref-tag">TAG</span></li></ul>`.
- Cards / grids: `.card-grid` + `.card` (+ `.card-badge`); `.diagram-grid` + `.mini-diagram` (holds inline `<svg>`).
- Pills/badges: `.pill` + one of `.pill-ok .pill-warn .pill-err .pill-info`.
- Collapsibles: `<details><summary><strong>...</strong></summary><div class="details-content">...</div></details>`.
- Utilities: `.text-center .text-sm .mt-1/2/3 .mb-1/2/3`.
- Internal links: relative `href="theory.html#section3"` etc. ALWAYS link generously between pages.

## 5. Tone
Encyclopedic but readable, like `theory.html`: motivate, state precisely, cross-link. Every nontrivial
historical/mathematical claim should be traceable to the research brief; if a claim is uncertain, soften it
("often attributed to", "commonly dated to") rather than assert a possibly-wrong fact.
