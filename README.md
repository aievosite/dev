# Ai Evolution Site

Implement exactly the screenshot and nothing else

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://ai-evolution-site.lovable.app

## GitHub Pages

The independent Pages build leaves Lovable's `vite.config.ts` unchanged.
The current Pages address is **https://aievosite.github.io/dev/**.
Use `GH_PAGES_BASE=/dev/ bun run build:gh-pages` locally. In Actions the base
comes from the current repository name and applies to every build/check step.
The workflow tests paths and checks all five generated pages and their local
CSS, JavaScript, images and fonts before uploading `dist/client`.
In GitHub, select **Settings → Pages → Source → GitHub Actions**. A push to
`main` or a manual **Deploy to GitHub Pages** run rebuilds and replaces the site;
renaming an account/repository alone does not rewrite already published HTML.

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/dec35dd5-fe40-4430-a64d-5d4d0f7e0b87).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
