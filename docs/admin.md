# Planned Admin Dashboard

This document defines the requirements for a future private admin dashboard. It is **PLANNED** documentation only. No `/admin` route, authentication, database, Supabase integration, or CRUD implementation exists in the current repository.

## Purpose

The future `/admin` area should provide a private interface for managing portfolio content without editing JavaScript source files. It should write approved content to the future database and allow the public portfolio to read published content.

The current public application is one React/Vite page composed of `Hero`, `Education`, `Experience`, `Works`, and `Contact` sections. The dashboard should manage the content those sections currently consume, while leaving layout, styling, icon mappings, section IDs, and interaction behavior in application code unless a later requirement justifies changing that boundary.

## Planned Routes

The following routes are proposed and are not currently implemented:

```text
/admin                         Dashboard overview
/admin/login                   Administrator sign-in
/admin/experiences             Experience list
/admin/experiences/new         Create experience
/admin/experiences/:id/edit    Edit experience
/admin/education               Education list
/admin/education/new           Create education record
/admin/education/:id/edit      Edit education record
/admin/projects                Project list
/admin/projects/new            Create project
/admin/projects/:id/edit       Edit project
/admin/social-links            Social/contact link list
/admin/social-links/new        Create social link
/admin/social-links/:id/edit   Edit social link
/admin/content                 Hero, headings, subtitles, labels
```

A project-specific route for skills is not proposed yet because the current repository has no standalone skills data source. Experience and project `tech` arrays should be editable within their parent records unless a future shared technology catalog is needed.

## Dashboard Sections

### Overview

A future dashboard home could show counts and quick links for experiences, education records, projects, social links, and editable site content. It should not expose database credentials or privileged service keys.

### Experiences

Manage the current `experienceData.experiences` records:

- Role
- Company
- Period
- Short description
- Expanded bullet descriptions
- Technology/tool tags
- Display order
- Future publication state, if drafts are introduced

### Education

Manage the current `educationData.educations` records:

- Institution (`educator`)
- Degree or education level
- Duration
- Display order

### Projects

Manage the current `worksData.projects` records:

- Title
- Description
- Project image reference
- Technology tags
- Live URL
- Optional GitHub URL
- Display order
- Future publication state, if needed

The current UI has no featured-project behavior, so a featured control should not be required unless the public design gains that concept.

### Social Links

Manage the current `contactData.socials` records:

- Label
- Visible value
- Link target
- Icon key
- Display order
- Visibility/publication state

The icon key should be selected from a controlled set that the frontend knows how to render. Admin users should not be able to submit arbitrary React component names or CSS classes.

### Site Content

Manage semantic content values identified in the current application:

- Hero greeting
- First and last name
- Hero professional title
- Education heading and subtitle
- Experience heading and subtitle
- Works heading and subtitle
- Contact heading and subtitle
- Navigation labels, if label editing is desired
- Mobile menu label, if it is intentionally made configurable
- CV button label only after the currently unused field is given a real link/file behavior

The admin should display friendly labels and contextual help while storing stable semantic keys such as `experience_heading` and `works_subtitle`, not positional names such as `heading_1`.

## Authentication and Authorization

The future `/admin` route must be protected by authentication. The public portfolio should be able to read the content intended for public display, while only an authenticated and authorized administrator should be able to create, update, delete, reorder, or publish records.

Supabase Authentication is one candidate implementation, but it is not currently present and is not mandated by this document. Authentication alone is insufficient: database authorization and frontend route guards must both be designed. The database must reject unauthorized writes even if a request bypasses the UI.

A small personal portfolio likely needs one administrator role initially. Role modeling should remain minimal until there is a confirmed multi-user requirement.

## CRUD Requirements

| Content type |                Create | Read | Update |                 Delete | Reorder |        Publish/visibility |
| ------------ | --------------------: | ---: | -----: | ---------------------: | ------: | ------------------------: |
| Experiences  |                   Yes |  Yes |    Yes |                    Yes |     Yes |           Future/optional |
| Education    |                   Yes |  Yes |    Yes |                    Yes |     Yes |           Future/optional |
| Projects     |                   Yes |  Yes |    Yes |                    Yes |     Yes | Recommended future option |
| Social links |                   Yes |  Yes |    Yes |                    Yes |     Yes |               Recommended |
| Site content | Create keys as needed |  Yes |    Yes | Usually no hard delete |     N/A |                       N/A |

For site content, update is the normal operation. Deleting a key should be restricted or replaced by restoring a known default because missing headings/subtitles can affect the public UI.

## Content Editing Rules

The editor forms should preserve the current content shape where practical:

- Experience descriptions need one summary string and an ordered list of longer bullet strings.
- Experience and project technologies need repeatable tag inputs.
- Project GitHub links are optional because the current data has `null` for two projects.
- Project images need an image URL/path initially, with uploads added only when storage is implemented.
- Social link icon keys need validation against the frontend’s supported icon map.
- Display order should be explicit and deterministic rather than relying on database insertion order.
- URLs should be validated and should preserve the current `mailto:` behavior for email links.
- Public content should be distinguishable from drafts if a publication workflow is introduced.

Before implementation, resolve the current inconsistency where `Hero.jsx` hardcodes social links and an incorrect placeholder email while `Contact.jsx` reads `contactData`. The future dashboard should have one authoritative social/contact content source.

## Image Management

The current project records reference static images in `public/images/` using paths such as `/images/project1.png`. There is no upload service in the current application.

If editing images through `/admin` becomes necessary, a future implementation could use Supabase Storage or another object-storage service. The planned workflow would need to cover upload, replacement, deletion, public/private bucket policy, URL persistence in `projects.image_url`, file type and size validation, and alt text. Storage should not be added until the image requirements are confirmed.

## Security Requirements

These requirements apply only to the planned system:

- Require authentication before rendering administrative data or forms.
- Enforce authorization at the database/API layer, not only with client-side route guards.
- Use Row Level Security (RLS) if Supabase/PostgreSQL is chosen. Public read policies should expose only intended published records; insert/update/delete policies should be restricted to the administrator.
- Never expose PostgreSQL passwords, Supabase service-role keys, or equivalent privileged credentials in browser bundles.
- Use public client configuration only for operations permitted by RLS.
- Keep local credentials in `.env.local` or another ignored environment file. Confirm `.gitignore` before adding secrets.
- Configure production values in Vercel environment variables rather than committing them.
- Validate and sanitize text, URLs, ordering values, and uploaded files.
- Decide whether deletes should be hard deletes, soft deletes, or an archive workflow before implementing CRUD.
- Add backups and audit metadata before relying on the dashboard for the only copy of portfolio content.

## Planned Public/Admin Data Flow

```text
Public portfolio
    ↓ public read of intended published content
Future data-access layer
    ↓
PostgreSQL through planned backend platform

Admin login
    ↓ authenticated session
Protected /admin UI
    ↓ authorized writes
PostgreSQL through planned backend platform
```

The public and admin clients should share content contracts and validation rules where possible, but they should not share privileged credentials.

# Recommended Implementation Order

1. Confirm the current content inventory and decide which text is truly admin-editable.
2. Resolve the duplicate hero/contact social links and the unused CV field.
3. Finalize database tables, semantic site-content keys, ordering, and publication rules.
4. Create the future backend project and tables.
5. Configure and test RLS policies for public reads and admin-only writes.
6. Add local and Vercel environment variables without committing secrets.
7. Migrate the current JavaScript content and compare public output with the current site.
8. Connect the public portfolio through a small data-access layer.
9. Add authentication and protected `/admin` routing.
10. Build experiences, education, and projects CRUD.
11. Build social links and site-content editing.
12. Add image storage only if static image paths no longer meet the editing requirement.
13. Deploy and test authentication, authorization, public reads, admin writes, and failure states.
