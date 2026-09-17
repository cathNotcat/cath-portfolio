# Database and Content Model

This document separates the **CURRENT** JavaScript content model from the **PLANNED** relational database model. No database, Supabase project, tables, or migration has been created.

## Current Content Sources

The repository contains six data modules under `src/data/`. No `skills.js`, `projects.js`, profile module, certifications module, or API data source was found. Projects are currently nested in `works.js`; technologies are arrays inside experience and project records.

### `src/data/hero.js`

**Export:** `heroData` (object)

**Purpose:** Hero/about identity and introductory text.

| Field           | Type   | Required in current object | Description                                                            |
| --------------- | ------ | -------------------------: | ---------------------------------------------------------------------- |
| `greetings`     | string |                        Yes | Introductory text, currently `Hello, I'm`.                             |
| `name`          | object |                        Yes | Name object.                                                           |
| `name.first`    | string |                        Yes | First name.                                                            |
| `name.last`     | string |                        Yes | Last name.                                                             |
| `title`         | string |                        Yes | Professional title/tagline.                                            |
| `downloadCVBtn` | string |                        Yes | Button label stored in data, but not currently rendered by `Hero.jsx`. |

`Hero.jsx` consumes `greetings`, `name.first`, `name.last`, and `title`. It does not consume `downloadCVBtn`.

### `src/data/navbar.js`

**Export:** `navbarData` (object)

**Purpose:** In-page navigation menu configuration.

| Field           | Type             | Required in current object | Description                                    |
| --------------- | ---------------- | -------------------------: | ---------------------------------------------- |
| `menus`         | array of objects |                        Yes | Navigation entries in display order.           |
| `menus[].id`    | string           |                        Yes | Target section ID, such as `about` or `works`. |
| `menus[].label` | string           |                        Yes | Visible navigation label.                      |

`Navbar.jsx` uses `menus` to render buttons and uses each `id` with `document.getElementById`. This is application navigation configuration, though the labels are user-facing.

### `src/data/education.js`

**Export:** `educationData` (object)

**Purpose:** Education section heading, subtitle, and records.

| Field                   | Type             | Required in current object | Description                         |
| ----------------------- | ---------------- | -------------------------: | ----------------------------------- |
| `heading`               | string           |                        Yes | Education section heading.          |
| `subtitle`              | string           |                        Yes | Education section subtitle.         |
| `educations`            | array of objects |                        Yes | Education records in display order. |
| `educations[].educator` | string           |                        Yes | Institution name.                   |
| `educations[].degree`   | string           |                        Yes | Degree or education level.          |
| `educations[].duration` | string           |                        Yes | Displayed date/range.               |

`Education.jsx` renders each record in `educationData.educations` and combines `educator` and `duration` into one line.

### `src/data/experience.js`

**Export:** `experienceData` (object)

**Purpose:** Experience section heading, subtitle, and expandable experience records.

| Field                             | Type             | Required in current object | Description                           |
| --------------------------------- | ---------------- | -------------------------: | ------------------------------------- |
| `heading`                         | string           |                        Yes | Experience section heading.           |
| `subtitle`                        | string           |                        Yes | Experience section subtitle.          |
| `experiences`                     | array of objects |                        Yes | Experience records in display order.  |
| `experiences[].role`              | string           |                        Yes | Role/job title.                       |
| `experiences[].period`            | string           |                        Yes | Displayed employment period.          |
| `experiences[].company`           | string           |                        Yes | Company name.                         |
| `experiences[].description`       | object           |                        Yes | Short and long descriptions.          |
| `experiences[].description.short` | string           |                        Yes | Collapsed/summary description.        |
| `experiences[].description.long`  | array of strings |                        Yes | Expanded bullet descriptions.         |
| `experiences[].tech`              | array of strings |                        Yes | Technologies/tools displayed as tags. |

`Experience.jsx` uses local state to expand one record at a time. It renders all of the fields above, including each long-description string and technology string.

### `src/data/works.js`

**Export:** `worksData` (object)

**Purpose:** Works/projects section heading, subtitle, and project cards.

| Field                    | Type             | Required in current object | Description                                              |
| ------------------------ | ---------------- | -------------------------: | -------------------------------------------------------- |
| `heading`                | string           |                        Yes | Works section heading.                                   |
| `subtitle`               | string           |                        Yes | Works section subtitle.                                  |
| `projects`               | array of objects |                        Yes | Project records in array order.                          |
| `projects[].id`          | number           |                        Yes | Current local project identifier.                        |
| `projects[].title`       | string           |                        Yes | Project title.                                           |
| `projects[].description` | string           |                        Yes | Project description.                                     |
| `projects[].image`       | string           |                        Yes | Public image path, currently `/images/project1.png` etc. |
| `projects[].tech`        | array of strings |                        Yes | Technology tags.                                         |
| `projects[].liveUrl`     | string           |                        Yes | Live/demo URL.                                           |
| `projects[].githubUrl`   | string or `null` |                        Yes | Repository URL when available.                           |

`Works.jsx` maps `projects`, renders the image and links, and only renders the GitHub link when `githubUrl` is truthy. There is no current featured flag or explicit sort field.

### `src/data/contact.js`

**Export:** `contactData` (object)

**Purpose:** Contact section heading, subtitle, email, and social links.

| Field             | Type             | Required in current object | Description                                                                       |
| ----------------- | ---------------- | -------------------------: | --------------------------------------------------------------------------------- |
| `heading`         | string           |                        Yes | Contact section heading.                                                          |
| `subtitle`        | string           |                        Yes | Contact section subtitle.                                                         |
| `email`           | string           |                        Yes | Contact email field. `Contact.jsx` does not directly render this top-level field. |
| `socials`         | array of objects |                        Yes | Contact cards in display order.                                                   |
| `socials[].id`    | number           |                        Yes | Current local social identifier.                                                  |
| `socials[].label` | string           |                        Yes | Visible social/service label.                                                     |
| `socials[].value` | string           |                        Yes | Visible account/email value.                                                      |
| `socials[].href`  | string           |                        Yes | Link target.                                                                      |
| `socials[].icon`  | string           |                        Yes | Icon key used by `Contact.jsx` (`email`, `linkedin`, `github`, `instagram`).      |

`Contact.jsx` uses `socials`; `icon` selects entries from local `iconMap` and `hoverMap` objects. `Hero.jsx` duplicates social links in JSX and has a different hardcoded email link (`mailto:your@email.com`), so the two current presentation paths are not fully consistent.

## User-Facing Configurable Content

The following content is currently visible to users and is a reasonable candidate for future admin editing. Semantic names are preferred over positional keys.

| Proposed semantic key or content area | Current source           | Current value/content                                              |
| ------------------------------------- | ------------------------ | ------------------------------------------------------------------ | ----------------- | ------------------- |
| `hero_greeting`                       | `src/data/hero.js`       | `Hello, I'm`                                                       |
| `hero_first_name`                     | `src/data/hero.js`       | `Catherine`                                                        |
| `hero_last_name`                      | `src/data/hero.js`       | `Rosalind`                                                         |
| `hero_title`                          | `src/data/hero.js`       | `Software Engineer                                                 | Quality Assurance | Frontend Developer` |
| `hero_cv_button_label`                | `src/data/hero.js`       | `Download CV` is stored but currently unused                       |
| `education_heading`                   | `src/data/education.js`  | `Education`                                                        |
| `education_subtitle`                  | `src/data/education.js`  | `My academic background that shaped my foundation.`                |
| `experience_heading`                  | `src/data/experience.js` | `Experience`                                                       |
| `experience_subtitle`                 | `src/data/experience.js` | `Hands-on experience on companies.`                                |
| `works_heading`                       | `src/data/works.js`      | `Works`                                                            |
| `works_subtitle`                      | `src/data/works.js`      | `A selection of projects I've built, from web apps to games.`      |
| `contact_heading`                     | `src/data/contact.js`    | `Contact`                                                          |
| `contact_subtitle`                    | `src/data/contact.js`    | Contact invitation text                                            |
| `navigation labels`                   | `src/data/navbar.js`     | About, Education, Experience, Works, Contact                       |
| `contact/social labels and values`    | `src/data/contact.js`    | Email, LinkedIn, GitHub, Instagram and their visible values        |
| `mobile_menu_label`                   | `Navbar.jsx`             | `Menu`                                                             |
| `hero social links`                   | `Hero.jsx`               | Instagram, LinkedIn, hardcoded email, GitHub URLs                  |
| `project content`                     | `src/data/works.js`      | Titles, descriptions, images, technologies, live URLs, GitHub URLs |
| `experience content`                  | `src/data/experience.js` | Role, period, company, descriptions, technologies                  |
| `education content`                   | `src/data/education.js`  | Institution, degree, duration                                      |

The actual section anchor IDs (`about`, `education`, `experience`, `works`, `contact`) are also used by application behavior. If navigation labels become editable, the IDs should remain stable identifiers rather than user-editable display text.

## What Should and Should Not Be in the Database

### A. Dynamic content: good candidates for future `/admin` management

- Hero profile text: greeting, name, and professional title.
- Education records and display order.
- Experience records, descriptions, technology tags, and display order.
- Project records, descriptions, technology tags, links, image reference, and display order.
- Contact/social links, labels, visible values, icon keys, and display order.
- Section headings and subtitles.
- Navigation labels, if changing them through the admin UI is a real requirement.
- A CV URL/file reference only after the currently unused `downloadCVBtn` field and the intended CV asset behavior are confirmed.

### B. Static application configuration: reasonable to keep in source

- Section anchor IDs and component composition order.
- Tailwind classes, layout, responsive behavior, icon component mappings, and animation/interaction behavior.
- The mapping from social/icon keys to React icon components and hover classes.
- Build tooling, ESLint configuration, Vite configuration, and PostCSS configuration.
- Decorative background behavior and scroll-driven visual effects.

The boundary should be driven by whether the value is portfolio content likely to change independently of code, not by whether it happens to be a JavaScript object today. The database should not store CSS classes or React component definitions merely because they occur near content.

# Planned Database Model

The following is a **PLANNED** PostgreSQL schema proposal for a small personal portfolio. It is deliberately simple and maps closely to the current records. Exact names and constraints need confirmation before implementation.

## `site_content`

Stores editable, semantic text values and avoids positional keys.

| Column         | PostgreSQL type                           | Nullable | Key/default     | Notes                                                                                        |
| -------------- | ----------------------------------------- | -------: | --------------- | -------------------------------------------------------------------------------------------- |
| `id`           | `bigint generated by default as identity` |       No | Primary key     | Supabase can alternatively use UUIDs.                                                        |
| `key`          | `text`                                    |       No | Unique          | Examples: `hero_greeting`, `works_heading`, `contact_subtitle`.                              |
| `value`        | `text`                                    |       No |                 | Appropriate for current headings, subtitles, labels, and names.                              |
| `content_type` | `text`                                    |       No | Default `text`  | Constrained to `text` initially; useful if URLs or future structured values need validation. |
| `updated_at`   | `timestamptz`                             |       No | Default `now()` | Audit metadata.                                                                              |

A single key/value table is appropriate for a small portfolio because current configurable values are short text. Use semantic keys scoped by area and meaning, not `heading_1` or `heading_2`. This table should contain editable presentation/content strings, not layout rules or arbitrary code. If a future value becomes structured, it should get a proper table or an explicitly justified JSON/typed representation rather than silently overloading `value`.

## `experiences`

| Column              | PostgreSQL type                           | Nullable | Key/default     | Notes                                                                              |
| ------------------- | ----------------------------------------- | -------: | --------------- | ---------------------------------------------------------------------------------- |
| `id`                | `bigint generated by default as identity` |       No | Primary key     | Replaces array position as identity.                                               |
| `role`              | `text`                                    |       No |                 | Current `role`.                                                                    |
| `company`           | `text`                                    |       No |                 | Current `company`.                                                                 |
| `period`            | `text`                                    |       No |                 | Preserve current display format initially; date columns can be considered later.   |
| `short_description` | `text`                                    |       No |                 | Current `description.short`.                                                       |
| `long_description`  | `text[]`                                  |       No | Default `'{}'`  | Maps current bullet array.                                                         |
| `tech`              | `text[]`                                  |       No | Default `'{}'`  | Maps current technology array without introducing an unnecessary technology table. |
| `sort_order`        | `integer`                                 |       No | Default `0`     | Explicit display ordering.                                                         |
| `created_at`        | `timestamptz`                             |       No | Default `now()` | Administrative metadata.                                                           |
| `updated_at`        | `timestamptz`                             |       No | Default `now()` | Administrative metadata.                                                           |

Recommended constraints include `sort_order >= 0`, nonempty text checks where appropriate, and a deterministic ordering such as `sort_order, id`.

## `education`

| Column       | PostgreSQL type                           | Nullable | Key/default     | Notes                                      |
| ------------ | ----------------------------------------- | -------: | --------------- | ------------------------------------------ |
| `id`         | `bigint generated by default as identity` |       No | Primary key     | Replaces current array index.              |
| `educator`   | `text`                                    |       No |                 | Current institution field.                 |
| `degree`     | `text`                                    |       No |                 | Current degree/level field.                |
| `duration`   | `text`                                    |       No |                 | Preserve current display string initially. |
| `sort_order` | `integer`                                 |       No | Default `0`     | Display order.                             |
| `created_at` | `timestamptz`                             |       No | Default `now()` | Administrative metadata.                   |
| `updated_at` | `timestamptz`                             |       No | Default `now()` | Administrative metadata.                   |

## `projects`

| Column         | PostgreSQL type                           | Nullable | Key/default     | Notes                                                                                     |
| -------------- | ----------------------------------------- | -------: | --------------- | ----------------------------------------------------------------------------------------- |
| `id`           | `bigint generated by default as identity` |       No | Primary key     | Current numeric IDs can be retained only as migration references.                         |
| `title`        | `text`                                    |       No |                 | Current title.                                                                            |
| `description`  | `text`                                    |       No |                 | Current description.                                                                      |
| `image_url`    | `text`                                    |      Yes |                 | Public path now; future storage URL if uploads are introduced.                            |
| `tech`         | `text[]`                                  |       No | Default `'{}'`  | Current technology tags.                                                                  |
| `live_url`     | `text`                                    |       No |                 | Current live URL.                                                                         |
| `github_url`   | `text`                                    |      Yes |                 | Current nullable GitHub URL.                                                              |
| `sort_order`   | `integer`                                 |       No | Default `0`     | Explicit display order.                                                                   |
| `is_published` | `boolean`                                 |       No | Default `true`  | Useful for admin drafts/unpublishing; not present in current data and needs confirmation. |
| `created_at`   | `timestamptz`                             |       No | Default `now()` | Administrative metadata.                                                                  |
| `updated_at`   | `timestamptz`                             |       No | Default `now()` | Administrative metadata.                                                                  |

A separate featured flag is not required by the current UI because no featured behavior exists. Add `is_featured` only if a future design needs a featured-project concept.

## `social_links`

| Column         | PostgreSQL type                           | Nullable | Key/default     | Notes                                                                                   |
| -------------- | ----------------------------------------- | -------: | --------------- | --------------------------------------------------------------------------------------- |
| `id`           | `bigint generated by default as identity` |       No | Primary key     | Replaces current numeric local ID.                                                      |
| `label`        | `text`                                    |       No |                 | Visible label.                                                                          |
| `value`        | `text`                                    |       No |                 | Visible email/account value.                                                            |
| `href`         | `text`                                    |       No |                 | Link target.                                                                            |
| `icon_key`     | `text`                                    |       No |                 | Values such as `email`, `linkedin`, `github`, `instagram`; frontend maps keys to icons. |
| `sort_order`   | `integer`                                 |       No | Default `0`     | Display order.                                                                          |
| `is_published` | `boolean`                                 |       No | Default `true`  | Allows hiding a link without deleting it.                                               |
| `created_at`   | `timestamptz`                             |       No | Default `now()` | Administrative metadata.                                                                |
| `updated_at`   | `timestamptz`                             |       No | Default `now()` | Administrative metadata.                                                                |

An optional `profile` table is not proposed yet because the current repository has only one hero identity and no broader profile object. Hero name/title can remain in `site_content` until requirements justify a typed profile record.

## Relationships

The current portfolio does not require many relationships:

```text
site_content       standalone semantic site settings/text
experiences        standalone ordered records
education          standalone ordered records
projects           standalone ordered records
social_links       standalone ordered contact records
```

The project and experience technology arrays should initially remain `text[]` to avoid unnecessary normalization for a small portfolio. A separate `technologies` table and join tables become useful only if technologies need their own metadata, filtering, or reuse across many managed entities. Project images can remain a URL/path column until the product needs multiple images, captions, alt text, or image ordering; then a `project_images` table would be justified.

## Migration Mapping

### Hero

```text
src/data/hero.js
heroData.greetings       → site_content.key = hero_greeting, value
heroData.name.first      → site_content.key = hero_first_name, value
heroData.name.last       → site_content.key = hero_last_name, value
heroData.title           → site_content.key = hero_title, value
heroData.downloadCVBtn   → site_content.key = hero_cv_button_label, value
```

The CV label has no current rendered behavior, so a future CV URL/file record needs confirmation before migration.

### Navigation

```text
src/data/navbar.js
navbarData.menus[].id       → stable frontend section identifier; likely remains application configuration
navbarData.menus[].label    → site_content or a future navigation-content record
navbarData.menus[] order    → navigation display order if labels are admin-managed
```

The current `id` values control scrolling and should not be freely edited without coordinated frontend behavior.

### Education

```text
src/data/education.js
educationData.educations[].educator  → education.educator
educationData.educations[].degree    → education.degree
educationData.educations[].duration  → education.duration
array position                       → education.sort_order
educationData.heading                → site_content: education_heading
educationData.subtitle               → site_content: education_subtitle
```

### Experience

```text
src/data/experience.js
experienceData.experiences[].role                  → experiences.role
experienceData.experiences[].company               → experiences.company
experienceData.experiences[].period                → experiences.period
experienceData.experiences[].description.short     → experiences.short_description
experienceData.experiences[].description.long      → experiences.long_description
experienceData.experiences[].tech                   → experiences.tech
array position                                      → experiences.sort_order
experienceData.heading                             → site_content: experience_heading
experienceData.subtitle                            → site_content: experience_subtitle
```

### Projects

```text
src/data/works.js
worksData.projects[].id          → migration reference only; projects.id generated by database
worksData.projects[].title       → projects.title
worksData.projects[].description → projects.description
worksData.projects[].image       → projects.image_url
worksData.projects[].tech        → projects.tech
worksData.projects[].liveUrl     → projects.live_url
worksData.projects[].githubUrl   → projects.github_url
array position                   → projects.sort_order
worksData.heading                → site_content: works_heading
worksData.subtitle               → site_content: works_subtitle
```

### Contact

```text
src/data/contact.js
contactData.email             → either site_content: contact_email or the matching email social_links record
contactData.socials[].id      → migration reference only; social_links.id generated by database
contactData.socials[].label   → social_links.label
contactData.socials[].value   → social_links.value
contactData.socials[].href    → social_links.href
contactData.socials[].icon    → social_links.icon_key
array position                → social_links.sort_order
contactData.heading           → site_content: contact_heading
contactData.subtitle          → site_content: contact_subtitle
```

The duplicate hero social links should be reconciled before migration so the public site has one source of truth.

## Future Admin Requirements

The future `/admin` should manage:

- **Experiences:** create, read, update, delete, edit ordering, and edit descriptions/technology tags.
- **Education:** create, read, update, delete, and edit ordering.
- **Projects:** create, read, update, delete, edit ordering, links, descriptions, technology tags, publication state, and image reference. Featured state is not currently required.
- **Social links:** create, read, update, delete, edit ordering, and visibility.
- **Site content:** edit semantic headings, subtitles, hero identity text, navigation labels if desired, and other approved text values.
- **Images:** later upload/replace project or profile images if static public assets are no longer sufficient. This requires future storage design; it is not implemented now.

# Security Requirements for the Planned Architecture

These are future implementation requirements, not current capabilities:

- Protect `/admin` with authentication.
- Enforce authorization so only the administrator can insert, update, delete, reorder, or publish content.
- If Supabase/PostgreSQL is used, configure Row Level Security (RLS) policies deliberately: public users should read only intended published content, while writes should require the appropriate authenticated admin identity.
- Keep public client credentials limited to the intended public operations. Never put a database password or Supabase service-role key in browser code.
- Store local secrets in `.env.local` or an ignored `.env` file as appropriate. Confirm `.gitignore` covers secret environment files before adding them.
- Configure production variables through Vercel’s environment-variable settings, not by committing them.
- Validate URLs, text lengths, ordering values, and image references in admin forms and database constraints.
- Consider audit metadata and backups before allowing destructive deletes.

# Recommended Implementation Order

1. Confirm the content inventory and resolve the duplicate hero/contact social-link behavior.
2. Confirm whether the CV label represents a real future file/link requirement.
3. Review and finalize the relational schema and semantic `site_content` keys.
4. Create the future Supabase project and PostgreSQL tables.
5. Configure RLS and test public-read/admin-write policies.
6. Add environment variables using local ignored files and Vercel settings.
7. Migrate the existing JavaScript records and verify the imported values.
8. Add a data-access layer and connect the public portfolio to published database content.
9. Verify the public portfolio preserves the current sections and behavior.
10. Add authentication and protected `/admin` route handling.
11. Implement admin CRUD for experiences, education, and projects.
12. Implement social-link and semantic site-content editing.
13. Add image storage/upload only if the content workflow requires it.
14. Deploy, configure production variables, and test both public and admin permissions.
