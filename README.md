# NNN Challenge

A small, privacy-conscious, responsive web application for adults (18+) taking part in a
self-reported No Nut November challenge.

The product scope is intentionally limited to registration, private profiles, public aliases, a
self-reported streak timer, an alias-only leaderboard, streak reset, and completion certificates.
See [`ROADMAP.md`](./ROADMAP.md) for the full product rules, architecture, and milestones.

> **Status:** Milestone 1 (static UI foundation) complete. Authentication, database, live streaks,
> and certificate issuance are not implemented yet. All participant data shown in the UI is sample
> data and is labelled as such.

## Stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- Tailwind CSS v4
- shadcn/ui + Lucide icons
- Supabase (Auth, PostgreSQL, Row Level Security) — wired up in Milestone 2
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

| Variable                        | Exposure | Purpose                                         |
| ------------------------------- | -------- | ----------------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | Browser  | Supabase project URL                            |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Browser  | Supabase public/anon key (protected by RLS)     |
| `SUPABASE_SERVICE_ROLE_KEY`     | Server   | Privileged operations; never expose to browser  |
| `NEXT_PUBLIC_SITE_URL`          | Browser  | Canonical site URL for auth redirects and links |

Notes:

- Real values belong only in `.env.local` (ignored by Git) or your hosting provider's dashboard.
- Never prefix `SUPABASE_SERVICE_ROLE_KEY` with `NEXT_PUBLIC_`.
- If your installed Supabase SDK uses publishable keys, use the key names supported by that SDK.
- `.env.example` contains placeholders only.

## Scripts

| Command             | Description                         |
| ------------------- | ----------------------------------- |
| `pnpm dev`          | Start the development server        |
| `pnpm build`        | Create a production build           |
| `pnpm start`        | Run the production build            |
| `pnpm lint`         | Run ESLint                          |
| `pnpm typecheck`    | Run the TypeScript compiler         |
| `pnpm format`       | Format the repository with Prettier |
| `pnpm format:check` | Check formatting without writing    |

## Supabase setup

Milestone 0 does not connect to Supabase yet, but the project expects a Supabase project for
Milestone 2. To prepare one:

1. Sign in at [supabase.com/dashboard](https://supabase.com/dashboard).
2. Create a new project: choose an organization, name, database password, and region. Save the
   database password somewhere safe; it is not needed by this app, but you will need it for
   database administration.
3. Wait for the project to finish provisioning.
4. Open **Project Settings** (gear icon) → **API** (older dashboards) or **API Keys**.
5. Copy the **Project URL** and paste it into `NEXT_PUBLIC_SUPABASE_URL` in `.env.local`.
6. Copy the **anon/public** key and paste it into `NEXT_PUBLIC_SUPABASE_ANON_KEY`. If your project
   shows a **publishable** key (`sb_publishable_...`) instead, use that value.
7. Reveal and copy the **service_role** key (or **secret** key, `sb_secret_...`) and paste it into
   `SUPABASE_SERVICE_ROLE_KEY`. This key bypasses Row Level Security: keep it server-side only and
   never prefix it with `NEXT_PUBLIC_`.
8. Set `NEXT_PUBLIC_SITE_URL=http://localhost:3000` for local development.
9. Open **Authentication** → **URL Configuration** and set the Site URL to
   `http://localhost:3000`. Add `http://localhost:3000/auth/callback` (and later your production
   domain equivalents) to the redirect URLs.
10. Restart `pnpm dev` after changing `.env.local`.

The exact key names will be confirmed when the Supabase SDK is installed in Milestone 2. Real
values belong only in `.env.local` or your hosting provider's environment settings, never in
`.env.example` or Git.

Database migrations, RLS policies, and seed data will live in `supabase/migrations` and
`supabase/seed.sql` when Milestone 2 begins.

## Deployment

The app is intended for Vercel. Connect the Git repository, add the environment variables from the
table above in the Vercel project settings, and deploy. Production Supabase redirect URLs must
include the deployed domain.

## Project structure

```text
src/
├── app/              # App Router pages, layouts, and global styles
├── components/       # Layout, shared, timer, leaderboard, certificate, shadcn/ui
└── lib/
    ├── challenge/    # Challenge configuration and canonical timezone
    ├── dates/        # Asia/Dhaka display formatting
    ├── leaderboard/  # Display formatting helpers
    ├── mock/         # Isolated sample data used by the preview
    └── utils.ts
public/               # Static assets
supabase/             # Migrations and seed data (Milestone 2)
```

## Privacy and security reminders

- Public pages and APIs must never return real names, emails, or private profile fields.
- Challenge timestamps, streaks, ranks, and certificate eligibility must be derived server-side.
- Use Supabase Row Level Security on every exposed table.
- Never commit secrets or disable RLS to make a feature work.
