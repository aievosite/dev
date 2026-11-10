<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep previous hero image assets and network available for restoration; GlassCube renders a reference-edited transparent crystal image with CSS-only slow vertical floating and no WebGL or rotation; reduced motion shows it stationary and its theme-token closest-side glow is transparent at every boundary; preserve text motion independently.
- Store verified historical image metadata separately from educational text and render it through one shared EventImage component, explicitly enabled by the history timeline, to keep event dialogs and source credits consistent.
- Keep era-card image assets and verified provenance in a separate era-image map keyed by era period; render them only in the shared Eras section so event-dialog imagery and educational content remain independent.
- Implement the ambient site background only through the existing body gradients, the fixed mobile `body::before` layer and theme tokens, with a reduced-motion override, so no content layers or interactions change.
- Render historical dialogs in a body portal with dynamic viewport sizing, safe-area spacing and reversible page scroll locking, so mobile browser toolbars and ancestor styles cannot clip them.
- Keep each major content section in one shared component rendered only on its own page (ToolsCatalog on /tools, AiToday on /ai-today), reached through the header menu or an in-page button, never inline on the home page, so no section exists twice.
- Keep the home route hero-only and its footer hidden; use JourneyNext for history → AiToday, render Conclusion only after AiToday, and keep timeline and eras together on /history so the main journey has one ending without duplicate content.
- Use JourneyBack for return links; the optional /tools button in the Future card navigates in the same tab and the catalog links back to /ai-today#ai-future, so the practical detour returns the reader to the same place without joining the main sequence.
- Render full-viewport content-page photographs through SectionBanner outside pageWrap, with CDN pointers and provenance separate from educational text, so the three page banners share framing without changing historical dialog or era imagery.
- GitHub Pages uses a separate static build (vite.config.gh-pages.ts + scripts/gh-pages-assets.mjs + .github/workflows/gh-pages.yml); keep vite.config.ts for Lovable publishing, and add every new public route to its pages list so it gets prerendered.
- Derive the Pages base and public-page list from scripts/gh-pages-config.mjs in both build and verification; keep GH_PAGES_BASE at workflow job scope and reject missing or wrongly prefixed output resources before deployment, so repository renames cannot silently publish unstyled HTML.
- Download Pages image pointers from this version's preview origin, overridable with ASSET_SOURCE, because the old published origin lacks newly uploaded images.
- Scope progressive content animations to ContentMotion on non-home routes; observe each element once with visible-by-default markup, passive frame-batched timeline progress and reduced-motion overrides, so the approved hero and no-JavaScript readability stay independent.
- Keep event dialogs mounted and scroll-locked through their short exit, with a timed fallback and immediate reduced-motion closing, so focus and page position restore only after the dialog disappears.
- Use instant router scroll restoration and inter-page hash positioning while retaining smooth in-page anchors; exclude data-motion-static subtrees from reveals, so navigation cannot sweep through and prematurely consume content entrances.
- Animate non-home page arrival with a short opacity-only fade on ContentMotion and disable it for reduced motion; never transform the page wrapper, so fixed navigation retains its viewport position and static headings do not move.
