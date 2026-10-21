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

- Keep the original hero image for dark mode; apply its background-only light variant through the light-theme CSS selector so geometry and dark-mode rendering remain unchanged.
- Store verified historical image metadata separately from educational text and render it through one shared EventImage component, explicitly enabled by the history timeline, to keep event dialogs and source credits consistent.
- Keep era-card image assets and verified provenance in a separate era-image map keyed by era period; render them only in the shared Eras section so event-dialog imagery and educational content remain independent.
- Implement the ambient site background only through the existing body gradients, the fixed mobile `body::before` layer and theme tokens, with a reduced-motion override, so no content layers or interactions change.
- Render historical dialogs in a body portal with dynamic viewport sizing, safe-area spacing and reversible page scroll locking, so mobile browser toolbars and ancestor styles cannot clip them.
- Keep each major content section in one shared component rendered only on its own page (ToolsCatalog on /tools, AiToday on /ai-today), reached through the header menu or an in-page button, never inline on the home page, so no section exists twice.
- Keep the home route hero-only, hide its footer in the shared shell, use JourneyNext for sequential page links, and render Conclusion only after AiToday so the educational journey has one ending without duplicate content.
