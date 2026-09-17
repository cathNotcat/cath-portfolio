# Supabase Data Import Guide

This guide explains how to move portfolio values from `src/data/*.js` into an existing Supabase database.

It covers importing the values only. It does not connect the React application to Supabase or create an admin dashboard.

## Before You Start

You need:

- A Supabase project.
- The required tables and columns already created.
- Access to the Supabase SQL Editor.
- The seed file at `supabase/seed_portfolio_data.sql`.

The seed file expects these tables:

- `site_content`
- `education`
- `experiences`
- `projects`
- `social_links`

If your table or column names are different, update the column names in the seed file before running it. Do not change the values unless your content needs to be different.

## Data Mapping

### Site Content

Values from `hero.js`, `navbar.js`, `education.js`, `experience.js`, `works.js`, and `contact.js` are stored as semantic key/value records in `site_content`.

Examples:

| JavaScript value          | Database key          |
| ------------------------- | --------------------- |
| `heroData.greetings`      | `hero_greeting`       |
| `heroData.name.first`     | `hero_first_name`     |
| `heroData.name.last`      | `hero_last_name`      |
| `heroData.title`          | `hero_title`          |
| `educationData.heading`   | `education_heading`   |
| `experienceData.subtitle` | `experience_subtitle` |
| `worksData.heading`       | `works_heading`       |
| `contactData.subtitle`    | `contact_subtitle`    |

Navigation section IDs such as `about`, `education`, and `works` remain frontend configuration because they control scrolling behavior. Only the navigation labels are stored as content values.

### Education

Each object in `educationData.educations` becomes one row in `education`:

- `educator` -> `institution`
- `degree` -> `degree`
- `duration` -> `duration`
- Array position -> `sort_order`

The current seed file uses `institution` because that is the column name in the existing database.

### Experience

Each object in `experienceData.experiences` becomes one row in `experiences`:

- `role` -> `role`
- `company` -> `company`
- `period` -> `period`
- `description.short` -> `short_description`
- `description.long` -> `long_description`
- `tech` -> `tech`
- Array position -> `sort_order`

The `long_description` and `tech` values are PostgreSQL `text[]` arrays.

### Projects

Each object in `worksData.projects` becomes one row in `projects`:

- `title` -> `title`
- `description` -> `description`
- `image` -> `image_url`
- `tech` -> `tech`
- `liveUrl` -> `live_url`
- `githubUrl` -> `github_url`
- Array position -> `sort_order`

A JavaScript `null` GitHub URL is inserted as SQL `NULL`.

### Social Links

Each object in `contactData.socials` becomes one row in `social_links`:

- `label` -> `label`
- `value` -> `value`
- `href` -> `href`
- `icon` -> `icon_key`
- Array position -> `sort_order`

The local JavaScript IDs are not inserted because the database generates its own IDs.

## Import the Values

1. Open the Supabase dashboard for the correct project.
2. Select **SQL Editor**.
3. Create a new query.
4. Copy the contents of `supabase/seed_portfolio_data.sql` into the query editor.
5. Confirm that the table and column names match your database.
6. Run the query.

The seed is wrapped in a transaction. If an insert fails, the transaction should roll back instead of leaving a partially imported set of values.

## Verify the Import

Run these queries in the Supabase SQL Editor:

```sql
SELECT key, value
FROM site_content
ORDER BY key;
```

```sql
SELECT institution, degree, duration, sort_order
FROM education
ORDER BY sort_order;
```

```sql
SELECT role, company, period, sort_order
FROM experiences
ORDER BY sort_order;
```

```sql
SELECT title, live_url, github_url, sort_order
FROM projects
ORDER BY sort_order;
```

```sql
SELECT label, value, href, icon_key, sort_order
FROM social_links
ORDER BY sort_order;
```

Expected row counts for the current JavaScript data are:

- `site_content`: 19 rows
- `education`: 2 rows
- `experiences`: 3 rows
- `projects`: 3 rows
- `social_links`: 4 rows

## Re-running the Seed

The current seed uses plain `INSERT` statements. Running it more than once creates duplicate rows unless your tables prevent duplicates or you clear the existing imported rows first.

For a fresh re-import, use your database backup and deletion policy before removing records. For production data, prefer an upsert strategy with unique keys rather than repeatedly running the seed unchanged.

## Connecting the App Later

Importing data does not make the React app read from Supabase. The current components still import from `src/data/` directly.

A later Supabase integration would need to:

1. Add Supabase URL and publishable key environment variables.
2. Create a Supabase client using `@supabase/supabase-js`.
3. Add a data-access layer for the tables.
4. Replace the direct data-module imports with database reads.
5. Add loading and error states.
6. Configure Row Level Security for public reads and protected writes.

Never expose a Supabase service-role key or database password in browser code.
