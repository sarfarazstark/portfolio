# Project Overview: DevHub Portfolio

This project is a high-fidelity, pixel-perfect portfolio application built with React 19 and TypeScript, leveraging Vite for the build process and Tailwind CSS v4 for styling. It is fully data-driven, with content managed via `src/data/portfolio.json`.

## Key Technologies

- **Vite & React 19:** Core framework and ultra-fast build tool.
- **Tailwind CSS v4:** modern CSS-first utility styling.
- **Framer Motion:** Powering complex animations, including scroll reveals, staggered lists, and interactive dock micro-interactions.
- **Zustand:** Lightweight state management for project filters and theme persistence.
- **Lucide React & Developer Icons:** High-quality iconography for navigation and technical skills.

## Design System

- **Background Pattern:** A sophisticated square grid pattern (`20px x 20px`) with a top-fade linear gradient mask.
- **Iconography Style:** All primary icons (Avatar, Experience, Education) follow a "Dillon" aesthetic: `ring-4 ring-muted`, `shadow-lg`, and a semi-transparent `zinc-400/40` 1px border.
- **Typography:** Refined visual hierarchy with `text-xl` section headings and `text-sm` item descriptions.
- **Theme Support:** Native light and dark mode support using a neutral Zinc-based palette.
- **Navigation:** A floating, animated Dock with smooth-scroll integration and scroll-padding for perfect alignment.

## Project Structure

- `src/components/`: Modular component architecture.
    - `sections/`: Individual portfolio sections (Hero, About, Experience, Projects, etc.).
    - `dock/`: Interactive navigation dock component.
- `src/data/portfolio.json`: The single source of truth for all content.
- `src/hooks/`: Custom hooks for theme management and project filtering.

## Building and Running

- **Development:** `npm run dev`
- **Production Build:** `npm run build`
- **Linting:** `npm run lint`

## Development Conventions

- **Impact-First Copy:** Focus on problem-solving and quantifiable achievements in all descriptions.
- **Dynamic Tag Integrity:** Project tags are derived strictly from data; stale filters are automatically cleaned up via `useProjectFilter`.
- **Performance:** Use `loading="lazy"` for all images and keep bundle size optimal by selective icon imports.
- **Accessibility:** Maintain full ARIA support for navigation and interactive filters.

---

_Note: Gravity is currently optional._
