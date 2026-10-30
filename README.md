# NNN Challenge

A small, privacy-conscious, responsive web application for adults (18+) taking part in a
self-reported No Nut November challenge.

The product scope is intentionally limited to registration, private profiles, public aliases, a
self-reported streak timer, an alias-only leaderboard, streak reset, and completion certificates.
See [`ROADMAP.md`](./ROADMAP.md) for the full product rules, architecture, and milestones.

> **Status:** Milestone 1 (static UI foundation) complete. Milestone 2 adds the hosted database
> schema, Row Level Security, public views, and typed Supabase clients. Authentication, live streaks,
> and certificate issuance are not implemented yet. All participant data shown in the UI is sample
> data and is labelled as such.

## Stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- Tailwind CSS v4
- shadcn/ui + Lucide icons
- Supabase (Auth, PostgreSQL, Row Level Security)
- Vercel for hosting

## Challenge timezone

The canonical challenge timezone is **Asia/Dhaka (UTC+6)**. All timestamps are stored in UTC and
converted to Asia/Dhaka for displayed dates, challenge start/end times, leaderboard dates, and
certificates. The visitor's browser timezone is never used for challenge times.

See `src/lib/challenge/config.ts` and `src/lib/dates/challenge-date.ts`.

## Prerequisites

- Node.js **22 or newer** (see `.nvmrc`)
- [pnpm](https://pnpm.io) 11+
- A Supabase account/project for the database and authentication milestones

## Getting started

```bash
pnpm install
```

Copy the environment template and fill in your own values:

```powershell
Copy-Item .env.example .env.local
```

Then start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable                               | Exposure | Purpose                                          |
| -------------------------------------- | -------- | ------------------------------------------------ |
| `NEXT_PUBLIC_SUPABASE_URL`             | Browser  | Supabase project URL                             |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Browser  | Supabase publishable key (protected by RLS)      |
| `SUPABASE_SERVICE_ROLE_KEY`            | Server   | Privileged operations; never expose to browser   |
| `NEXT_PUBLIC_SITE_URL`                 | Browser  | Canonical site URL for auth redirects and links  |
| `SUPABASE_DB_URL`                      | CLI only | Hosted Postgres connection string for migrations |

Notes:

- Real values belong only in `.env.local` (ignored by Git) or your hosting provider's dashboard.
- Never prefix `SUPABASE_SERVICE_ROLE_KEY` with `NEXT_PUBLIC_`.
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` is the canonical name. The app also accepts the legacy
  `NEXT_PUBLIC_SUPABASE_ANON_KEY` alias.
- `.env.example` contains placeholders only.

## Scripts

| Command               | Description                                    |
| --------------------- | ---------------------------------------------- |
| `pnpm dev`            | Start the development server                   |
| `pnpm build`          | Create a production build                      |
| `pnpm start`          | Run the production build                       |
| `pnpm lint`           | Run ESLint                                     |
| `pnpm typecheck`      | Run the TypeScript compiler                    |
| `pnpm format`         | Format the repository with Prettier            |
| `pnpm format:check`   | Check formatting without writing               |
| `pnpm supabase:push`  | Apply migrations and regenerate database types |
| `pnpm supabase:types` | Regenerate database types only                 |
| `pnpm test:rls`       | Run the hosted RLS integration checks          |

## Supabase setup

The hosted project is used by the app. If you are setting up a new project:

1. Sign in at [supabase.com/dashboard](https://supabase.com/dashboard).
2. Create a new project: choose an organization, name, database password, and region. Save the
   database password somewhere safe; it is not needed by this app, but you will need it for
   database administration.
3. Wait for the project to finish provisioning.
4. Open **Project Settings** (gear icon) → **API** (older dashboards) or **API Keys**.
5. Copy the **Project URL** and paste it into `NEXT_PUBLIC_SUPABASE_URL` in `.env.local`.
6. Copy the **publishable** key (`sb_publishable_...`) and paste it into
   `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`. If your project only shows an **anon/public** key, use
   `NEXT_PUBLIC_SUPABASE_ANON_KEY`; the app supports it as a legacy alias.
7. Reveal and copy the **service_role** key (or **secret** key, `sb_secret_...`) and paste it into
   `SUPABASE_SERVICE_ROLE_KEY`. This key bypasses Row Level Security: keep it server-side only and
   never prefix it with `NEXT_PUBLIC_`.
8. Set `NEXT_PUBLIC_SITE_URL=http://localhost:3000` for local development.
9. Open **Authentication** → **URL Configuration** and set the Site URL to
   `http://localhost:3000`. Add `http://localhost:3000/auth/callback` (and later your production
   domain equivalents) to the redirect URLs.
10. Restart `pnpm dev` after changing `.env.local`.

Real values belong only in `.env.local` or your hosting provider's environment settings, never in
`.env.example` or Git. `src/proxy.ts` refreshes Supabase auth cookies on requests; route protection
is added with the authentication milestone.

## Database migrations

The service-role key cannot execute DDL. To apply migrations to the hosted project:

1. Open **Supabase Dashboard → Connect** and copy the Postgres connection string.
2. Add it to `.env.local` as `SUPABASE_DB_URL=...`. This is a CLI-only secret: never expose it to
   the browser, never prefix it with `NEXT_PUBLIC_`, and never commit it.
3. Run `pnpm supabase:push` to apply the migrations in `supabase/migrations` and regenerate
   `src/types/database.ts`.
4. Run `pnpm test:rls` to verify the policies with temporary test users, profiles, participations,
   and certificates. The script cleans up after itself.
5. See [`docs/DATABASE.md`](./docs/DATABASE.md) for the schema, RLS matrix, and public view columns.

The required NNN 2026 challenge is inserted by a seed migration, so it is created by
`pnpm supabase:push`. Do not add `SUPABASE_DB_URL` to Vercel; it is only needed for migrations.

## Deployment

The app is intended for Vercel. Connect the Git repository, add the environment variables from the
table above in the Vercel project settings, and deploy. Production Supabase redirect URLs must
include the deployed domain.

## Project structure

```text
src/
├── app/              # App Router pages, layouts, and global styles
├── components/       # Layout, shared, timer, leaderboard, certificate, shadcn/ui
├── proxy.ts          # Supabase session refresh (Next.js 16 Proxy)
└── lib/
    ├── challenge/    # Challenge configuration and canonical timezone
    ├── dates/        # Asia/Dhaka display formatting
    ├── leaderboard/  # Display formatting helpers
    ├── mock/         # Isolated sample data used by the preview
    ├── supabase/     # Browser, server, and admin Supabase clients
    └── utils.ts
src/types/            # Generated database types
public/               # Static assets
supabase/
├── migrations/       # Schema, RLS, public views, and challenge seed
└── seed.sql          # Local-only fixtures hook
scripts/              # Migration/type sync helper
tests/integration/    # Hosted RLS checks
```

## Privacy and security reminders

- Public pages and APIs must never return real names, emails, or private profile fields.
- Challenge timestamps, streaks, ranks, and certificate eligibility must be derived server-side.
- Use Supabase Row Level Security on every exposed table.
- Never commit secrets or disable RLS to make a feature work.
