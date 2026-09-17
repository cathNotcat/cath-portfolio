# Architecture

This document describes the repository as it exists today. Sections labeled **PLANNED** describe a possible future CMS architecture and are not implemented.

## Project Overview

### CURRENT

This repository contains a single-page personal portfolio website. It presents a hero/about section, education, work experience, projects, and contact/social links.

- **UI framework:** React 19, rendered with `react-dom`.
- **Build tool and development server:** Vite 8.
- **Language:** JavaScript with JSX and ES modules. No TypeScript files were found.
- **Styling:** Tailwind CSS 3 through PostCSS, plus `src/App.css`.
- **UI/interaction libraries:** `framer-motion` is installed but no current component import was found; `react-icons` is used for icons.
- **Application entrypoint:** `src/main.jsx`.
- **Root component:** `src/App.jsx`.
- **Rendering model:** React mounts into the `#root` element in `index.html`; `App` renders one vertically scrolling page made of sections.
- **Routing:** No router dependency or route declarations were found. Navigation uses section IDs and `scrollIntoView`.
- **Backend/API:** No API or backend code was found.
- **External services:** No database, authentication provider, storage provider, or API client was found in the source or dependencies.

The HTML document title is `Catherine Rosalind`, and the favicon references `/images/my-logo-3.png`.

## Current Directory Structure

```text
cath-portfolio/
├── index.html                  # HTML shell and Vite module entry
├── package.json                # Scripts and dependencies
├── package-lock.json           # npm dependency lockfile
├── vite.config.js              # Vite React plugin configuration
├── eslint.config.js            # ESLint flat configuration
├── tailwind.config.js          # Tailwind content scanning configuration
├── postcss.config.js           # Tailwind and Autoprefixer plugins
├── README.md                   # Project description and live-demo URL
├── installation.md             # Setup notes
├── public/
│   ├── images/                 # Public logo and project image assets
│   ├── icons.svg
│   └── favicon.svg
└── src/
    ├── main.jsx                # React root creation and StrictMode
    ├── App.jsx                 # Top-level section composition
    ├── App.css                 # Additional CSS
    ├── index.css               # Tailwind directives
    ├── assets/                 # Local Vite/portfolio assets
    ├── components/             # Reusable page sections
    │   ├── Background.jsx
    │   ├── Contact.jsx
    │   ├── Education.jsx
    │   ├── Experience.jsx
    │   ├── Hero.jsx
    │   ├── Navbar.jsx
    │   └── Works.jsx
    └── data/                   # Static portfolio content modules
        ├── contact.js
        ├── education.js
        ├── experience.js
        ├── hero.js
        ├── navbar.js
        └── works.js
```

No `pages/`, `routes/`, `api/`, `server/`, or utility/data-access layer was found.

## Current Architecture

The current architecture is a component-based, static-data React application:

```text
JavaScript data modules and some JSX literals
                    ↓
        Section components import data
                    ↓
             App.jsx composes sections
                    ↓
       main.jsx mounts App into #root
                    ↓
                Browser UI
```

`App.jsx` renders `Background`, `Navbar`, `Hero`, `Education`, `Experience`, `Works`, and `Contact` in that order. Each section is a component rather than a route.

### Content storage and access

Most portfolio content is stored in named exports under `src/data/`. Components import those exports directly. There are no props from `App` to the sections for portfolio content and no shared context/store.

- `Hero` imports `heroData`.
- `Navbar` imports `navbarData`.
- `Education` imports `educationData`.
- `Experience` imports `experienceData`.
- `Works` imports `worksData`.
- `Contact` imports `contactData`.

The hero social URLs and its email link are partly hardcoded in `Hero.jsx`, rather than being read from `contactData`. The hero data includes `downloadCVBtn`, but `Hero.jsx` does not render that field or a CV link. These are current implementation details, not recommendations.

### State and behavior

There is no application-wide state management. Local React state is used where interaction needs it:

- `Navbar` tracks the mobile menu, active menu ID, and sliding indicator position; it also uses refs and an effect.
- `Experience` tracks which experience item is expanded.
- `Background` tracks `window.scrollY` to move background effects.

There are no current API calls, data fetching hooks, persistence calls, or browser storage calls.

### Rendering and navigation

`main.jsx` calls `createRoot(document.getElementById('root'))` and renders `<App />` inside `StrictMode`. The navbar buttons find section elements by IDs (`about`, `education`, `experience`, `works`, and `contact`) and call `scrollIntoView({ behavior: 'smooth' })`. This is one page with anchor-like in-page navigation, not a multi-route application.

## Current Data Flow

```text
src/data/hero.js       → Hero.jsx       → App.jsx → browser
src/data/navbar.js     → Navbar.jsx     → App.jsx → browser
src/data/education.js  → Education.jsx  → App.jsx → browser
src/data/experience.js → Experience.jsx → App.jsx → browser
src/data/works.js      → Works.jsx      → App.jsx → browser
src/data/contact.js    → Contact.jsx    → App.jsx → browser
```

`Background.jsx` has no data-module dependency. It derives its visual position from browser scroll state. Some display strings are defined directly in JSX, including the mobile `Menu` label, social URLs in `Hero.jsx`, and several UI hints.

## Current Deployment

- **Development command:** `npm run dev` (Vite).
- **Build command:** `npm run build` (Vite production build).
- **Preview command:** `npm run preview` (Vite preview server).
- **Lint command:** `npm run lint` (ESLint).
- **Deployment platform:** Needs confirmation. `README.md` contains a live-demo URL on `cath-portfolio-woad.vercel.app`, which suggests a Vercel deployment, but no Vercel configuration file or deployment workflow exists in this repository.
- **Environment variables:** None are documented or referenced by the current application. Needs confirmation whether the hosting project has any external variables.
- **Vercel configuration:** No `vercel.json` was found.

## Current Architectural Strengths

- Portfolio content is substantially separated from UI code in `src/data/`, so common text and collections can be edited without changing rendering structure.
- Each major section has a focused component and a corresponding data module.
- Collection rendering uses `.map()`, making repeated education, experience, project, navigation, and social entries data-driven.
- Component-local interaction state keeps the current behaviors near the components that own them.
- `App.jsx` acts as a simple composition root and does not contain the content records themselves.
- Public assets are kept in `public/images/` and referenced by stable public paths.

## Current Architectural Limitations

- Portfolio content is stored in JavaScript source files, so editing it requires source-code access.
- Content changes require a code change and normally a new build/deployment to become public.
- There is no admin interface, authentication system, database, or content API in the current repository.
- There is no central content model for all user-facing text. Some content is in data modules while other text and social links are inline in components.
- The hero’s social links are not consistently sourced from `contactData`, and the stored `downloadCVBtn` field is currently unused.
- There is no current image-upload workflow; project images are public static files.

# Planned Future Architecture

Everything in this section is **PLANNED** and must not be read as current functionality.

```text
                         Vercel hosting
                    ┌─────────────────────┐
                    │ Public portfolio   │
                    │ Future /admin UI   │
                    └──────────┬──────────┘
                               │
             ┌─────────────────┴─────────────────┐
             │                                   │
      Public content reads                 Authenticated admin writes
             │                                   │
             └─────────────────┬─────────────────┘
                               ▼
                    Supabase platform (planned)
                    ├── Authentication (planned)
                    ├── PostgreSQL (planned)
                    └── Storage (planned if needed)
```

- **Frontend:** The existing React/Vite frontend could be extended to request published portfolio content instead of importing only local data modules.
- **Public portfolio:** Would read publicly permitted content and render the same portfolio sections. A loading/error/fallback strategy would need to be designed before migration.
- **`/admin`:** A future private UI could provide forms and list views for experiences, education, projects, social links, and configurable text.
- **Authentication:** Supabase Authentication is a candidate for protecting administrative routes. It is not present today.
- **Supabase:** A candidate hosted backend platform that could provide the database, authentication, and possibly object storage. It is not currently installed or configured.
- **PostgreSQL:** A candidate relational database for persistent portfolio content. No database or tables currently exist.
- **Storage:** Supabase Storage could hold uploaded profile/project images if the future admin workflow needs uploads. Current images remain static files.
- **Vercel:** The README contains a Vercel-hosted URL, but the repository does not prove how that deployment is configured. Future environment variables would need to be configured in the hosting project without exposing privileged credentials.

The future architecture should preserve the current separation between rendering components and content, while replacing direct local imports with a small, explicit data-access boundary.
