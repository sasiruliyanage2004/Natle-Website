# NATLE Technologies — Dark Enterprise AI Theme

## 1. Install dependencies

```bash
npm install framer-motion lucide-react clsx tailwind-merge
```

`tailwind.config.ts` and `app/globals.css` assume Tailwind is already set up
(Next.js 15's default `create-next-app --tailwind` scaffold). If you're
retrofitting an older project, confirm `tailwind.config.ts` `content` globs
actually match your `app/` and `components/` folders.

## 2. Files in this drop

```
tailwind.config.ts        - brand tokens (base/accent colors, fonts, glow shadows)
app/globals.css           - dark-only base styles + .text-gradient-brand / .card-glass / .btn-primary / .btn-ghost utilities
app/layout.tsx            - wires Space Grotesk + Inter, mounts Navbar/Footer/AuroraBackdrop
components/AuroraBackdrop.tsx
components/Navbar.tsx
components/Footer.tsx
components/Reveal.tsx     - shared scroll-reveal wrapper (framer-motion)
components/IndustryTabs.tsx
lib/utils.ts               - cn() helper
app/about/page.tsx
app/services/page.tsx
app/solutions/page.tsx
```

## 3. Replace the old theme correctly

Don't hand-edit hex codes page by page — that's how the mismatch happened in
the first place. Instead:

1. Drop in `tailwind.config.ts` and `globals.css` as-is.
2. Grep the repo for the legacy palette and anything importing the old brand:
   ```bash
   grep -rniE "#059669|#10E599|emerald|mtt-site" app components
   ```
3. Every match should resolve to one of:
   - `text-gradient-brand` (headings)
   - `card-glass` (panels/cards)
   - `btn-primary` / `btn-ghost` (buttons)
   - `text-accent-lime` / `text-accent-cyan` / `bg-accent-lime` / `bg-accent-cyan` (one-off accents)
   - `text-ink` / `text-ink-muted` (body text)

   If you find a raw hex value that isn't one of the three brand colors,
   it's almost certainly a leftover from the emerald theme — replace it.
4. Any page still importing a component that isn't `Navbar`/`Footer` from
   this drop (an old `Header.tsx`, `SiteFooter.tsx`, etc.) should be deleted
   once its content is folded into the new components, so you don't end up
   maintaining two navbars.

## 4. Extending to other pages (`/contact`, etc.)

Reuse the same shape used in `/about`, `/services`, `/solutions`:

- Wrap each section in `<Reveal>` for the scroll-in animation.
- Use `<h1 className="text-gradient-brand">` / `<h2 className="text-gradient-brand">` for major headings only — not every heading, or the gradient stops meaning "this matters."
- Use `card-glass` for any panel, form, or grouped content.
- Primary action → `btn-primary`. Secondary/tertiary action → `btn-ghost`.

## 5. What's deliberately different per page (and why)

- `/about` uses an asymmetric hero (headline + stat panel) and a bento-style
  values grid with uneven card spans, plus a real chronological milestone
  list — so it doesn't read as the same 3-card template as `/services`.
- `/services` uses alternating icon/text rows for the three core services,
  with a smaller uniform grid underneath for supporting capabilities.
- `/solutions` uses an interactive tabbed panel (client component,
  `IndustryTabs.tsx`) instead of another static grid, since industry
  solutions are naturally a "pick one to see detail" interaction.

All three still share the same background, card, button, and type system —
they just don't force identical layouts on different kinds of content.
