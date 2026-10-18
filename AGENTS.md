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
- Store verified historical image metadata separately from educational text and render it through one shared EventImage component, enabled explicitly by both home and history timelines, to keep their event dialogs and source credits consistent.
- Implement the ambient site background only through the existing body gradients and theme tokens, with a reduced-motion override, so no content layers or interactions change.
- Render historical dialogs in a body portal with dynamic viewport sizing, safe-area spacing and reversible page scroll locking, so mobile browser toolbars and ancestor styles cannot clip them.
