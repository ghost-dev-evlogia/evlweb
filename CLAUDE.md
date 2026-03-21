@AGENTS.md

# Evlogia Website

**Company:** Evlogia — Applied AI Research
**Domain:** https://evlogia.ai
**What we do:** Work with customers on R&D problems, build proprietary AI products, pursue patents and research publications.

## Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Font:** Geist Sans / Geist Mono (via `next/font/google`)
- **Package manager:** npm

## Project structure

```
src/
  app/
    layout.tsx     # Root layout with metadata + fonts
    page.tsx       # Home page
    globals.css    # Global styles + Tailwind import
  components/      # Shared UI components
```

## Key conventions

- Use the App Router (`src/app/`) — no Pages Router
- All new pages go in `src/app/<route>/page.tsx`
- Shared UI components go in `src/components/`
- Keep metadata accurate per page using Next.js `export const metadata`
- Tailwind utility classes preferred over custom CSS

## Dev commands

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Production build
npm run lint     # ESLint
```
