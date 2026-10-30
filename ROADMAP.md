# NNN Challenge Website --- Full Project Roadmap

**Project type:** Responsive web application\
**Working title:** NNN Challenge\
**Purpose:** A simple, privacy-conscious website for adults
participating in a self-reported No Nut November (NNN) challenge.\
**Development approach:** Build with OpenCode in small, verifiable
milestones.

------------------------------------------------------------------------

## 1. Product vision

Build a focused website where users can:

1.  Create an account.
2.  Set a private real name and a public alias.
3.  Join the NNN challenge.
4.  Track their self-reported abstinence streak with a live timer.
5.  View a public leaderboard that displays aliases, never real names or
    email addresses.
6.  Reset their streak if they report a relapse.
7.  Earn and download a completion certificate if they meet the
    published challenge rules.

The product should be deliberately small. Do **not** build a social
network, chat, friends system, groups, journals, paid subscriptions, or
complex gamification in the first release.

### Product principles

-   **Privacy first:** participation and sexual-behaviour-related
    information are sensitive. Collect as little as possible.
-   **Self-reported:** the site cannot verify a participant's private
    behaviour. Make that clear in the rules and certificate.
-   **No shame:** resetting a streak is a normal part of the product. Do
    not insult, shame, or publicly expose users who reset.
-   **Transparent rankings:** publish the leaderboard rules and
    tie-breaker.
-   **Responsive:** usable on phones, tablets, laptops, and desktops.
-   **Accessible:** keyboard-friendly, readable contrast, clear labels,
    and reduced-motion support.
-   **Secure by default:** public endpoints must never return private
    profile fields.

------------------------------------------------------------------------

## 2. Scope

### 2.1 MVP --- must ship

-   Landing page
-   Challenge information and rules page
-   Sign up, sign in, sign out
-   Private user profile
-   Public alias with uniqueness validation
-   Join challenge flow
-   Personal streak timer
-   Reset streak action with confirmation
-   Public leaderboard
-   Personal dashboard
-   Completion eligibility calculation
-   Certificate page and PDF download
-   Basic admin controls for challenge configuration and moderation
-   Responsive layouts
-   Privacy policy, terms, and challenge disclaimer
-   Basic analytics that do not collect unnecessary sensitive
    information

### 2.2 Explicitly out of scope for version 1

-   Chat, comments, posts, or community feed
-   Friends, teams, and private competitions
-   Direct messages
-   Push notifications
-   Mobile applications
-   Paid memberships
-   Advertising integration
-   Referral system
-   AI coaching
-   Public display of real names
-   Public display of failure/reset history
-   Uploading intimate photos or sensitive personal details

Do not add these unless the owner explicitly approves a later version.

------------------------------------------------------------------------

## 3. Product rules --- decide these before coding

Put all challenge rules in one documented place and implement them
consistently in the UI, database, and server logic.

### 3.1 Age and participation

-   Make the service adults-only (18+).
-   Display the age requirement before account creation or challenge
    entry.
-   Do not collect date of birth unless there is a genuine legal or
    operational need. A required 18+ confirmation is the minimal initial
    approach.
-   Do not market the site as medical advice or claim that abstinence
    has proven health benefits.

### 3.2 Challenge dates

The challenge must be configurable in the database or admin settings. Do
not hardcode dates throughout the codebase.

Suggested initial configuration:

-   Challenge: No Nut November 2026
-   Start: 2026-11-01 00:00 in the challenge's configured timezone
-   End: 2026-12-01 00:00 in the same timezone (exclusive end)
-   Challenge duration: 30 calendar days

Choose and document one canonical challenge timezone. Display the
timezone clearly on the rules page and admin screen. Store timestamps in
UTC; convert for display.

### 3.3 Joining and late registration

Recommended policy:

-   A user can register at any time while registration is open.
-   A user who joins after the official start can still track a personal
    streak and appear in a clearly labelled **Late Joiners** section.
-   A late joiner must not be shown as having completed days before
    joining.
-   A late joiner is not eligible for the full-month NNN certificate for
    that year unless the owner explicitly changes the rules before
    launch.
-   Users who joined before the official start can be eligible for the
    full challenge if their attempt remains unbroken through the
    official end.
-   Show eligibility requirements before the user confirms joining.

If the site launches after November 1, do not silently pretend that new
users started on November 1.

### 3.4 What starts the timer?

For an eligible participant who joins before the challenge begins, the
official challenge timer begins at the challenge start timestamp, not at
account creation.

For a late joiner, the personal timer begins at the time they confirm
joining.

The timer is derived from a stored server timestamp. Never increment and
store a counter every second.

### 3.5 Reset rules

-   The user may select **Reset my streak**.
-   Show a confirmation dialog explaining that the current attempt will
    end and cannot be restored by the user.
-   On confirmation, record the reset timestamp and mark the attempt as
    failed/reset.
-   Start a new personal attempt at the reset timestamp only if the
    product rules allow restarting.
-   A reset means the user is no longer eligible for the full-month
    certificate for that challenge.
-   Never let a user edit their start time or erase a reset from the
    audit history through the normal UI.
-   Do not publicly display reset history or label a user as a failure.

For a simple MVP, it is acceptable to allow only one active attempt per
user per challenge.

### 3.6 Leaderboard rules

Recommended MVP leaderboard:

-   Show active participants only.
-   Public columns: rank, alias, current streak duration, and optionally
    country if the user opts in.
-   Never show real name, email, date of birth, private check-ins, or
    reset history.
-   Sort by current streak duration descending.
-   Tie-break by earliest valid attempt start timestamp.
-   Exclude banned, suspended, hidden, or opted-out accounts.
-   Clearly label late joiners separately so their shorter participation
    period is not confused with a full-month attempt.
-   Do not imply the rankings are independently verified.

### 3.7 Certificate rules

A certificate is available only after the challenge end time and only
when server-side eligibility rules pass.

Certificate should include:

-   Certificate holder name chosen by the user (default may be their
    real name, but require explicit confirmation before printing it)
-   Public alias (optional)
-   Challenge name and year
-   Completion date
-   Unique certificate ID
-   Verification URL or QR code
-   A short statement that completion is self-reported

Do not put email, internal database IDs, or other private information on
the certificate.

The public verification page should reveal only the certificate holder
name as printed on the certificate, challenge, issue date, certificate
ID, and valid/revoked status. Give users a choice to use their real
name, alias, or another display name on the certificate.

------------------------------------------------------------------------

## 4. User journeys

### 4.1 Visitor

1.  Opens the homepage.
2.  Sees the challenge name, countdown/status, short explanation, and
    rules link.
3.  Can view the public leaderboard without signing in.
4.  Selects **Join the challenge**.
5.  Is asked to register or sign in.

### 4.2 New user

1.  Registers with email and password (or an optional supported OAuth
    provider).
2.  Confirms they are 18 or older.
3.  Verifies their email if email confirmation is enabled.
4.  Creates a profile:
    -   Private real name (optional unless required for certificate)
    -   Unique public alias (required)
    -   Optional avatar (can be omitted in MVP)
    -   Optional country (opt-in)
5.  Reads the challenge rules.
6.  Confirms they understand the self-reported nature of the challenge.
7.  Joins the challenge.
8.  Sees their dashboard and timer.

### 4.3 Returning user

1.  Signs in.
2.  Opens dashboard.
3.  Sees current timer, challenge status, progress, eligibility, and
    rank.
4.  Can reset their attempt after confirmation.
5.  Can edit permitted profile fields and privacy settings.

### 4.4 Challenge completion

1.  Challenge reaches its configured end timestamp.
2.  Server-side eligibility is evaluated.
3.  Eligible users see **Certificate available**.
4.  User chooses certificate display name.
5.  User previews and downloads PDF.
6.  Certificate verification page is available via QR code or URL.

------------------------------------------------------------------------

## 5. Recommended technology stack

Use a single modern web application and a managed backend to keep the
project manageable.

### Frontend

-   **Next.js (App Router)**
-   **TypeScript**
-   **Tailwind CSS**
-   **shadcn/ui** for accessible components
-   **Lucide React** for icons
-   **React Hook Form + Zod** for forms and validation
-   **date-fns** for date formatting (keep server timestamps
    authoritative)

### Backend and data

-   **Supabase**
    -   Supabase Auth
    -   PostgreSQL database
    -   Row Level Security (RLS)
    -   Optional Supabase Storage only if avatars are added
-   Use Next.js server actions or route handlers for privileged
    operations.
-   Use database constraints and transactions for critical state
    changes.

### Hosting and services

-   **Vercel** for Next.js hosting
-   **Supabase** for database and authentication
-   Optional **Resend** for transactional email if custom email delivery
    is needed
-   Optional **Cloudflare** for DNS and additional edge protection

### Avoid initially

-   Separate Express/NestJS backend
-   Redis
-   Microservices
-   Kubernetes
-   Complex state-management libraries
-   Real-time sockets for a timer that can be calculated in the browser

The leaderboard can refresh on page load or with a modest polling
interval. The timer itself runs client-side from a server-provided
timestamp.

------------------------------------------------------------------------

## 6. Architecture overview

``` text
Browser (mobile / tablet / desktop)
              |
              v
        Next.js application
        |       |        |
        |       |        +--> Public pages
        |       +-----------> Authenticated dashboard
        +-------------------> Server actions / route handlers
                              |
                              v
                         Supabase
                         |       |
                         |       +--> PostgreSQL + RLS
                         +-----------> Authentication

Certificate request
       |
       v
Server-side eligibility check
       |
       v
PDF generation + certificate record
       |
       v
Private download / public verification page
```

### Key architecture rules

-   The browser must never receive the Supabase service-role key.
-   Use the publishable/anon key in the browser with RLS enabled.
-   Keep privileged database operations server-side.
-   Do not trust client-submitted timestamps, streak duration, rank, or
    certificate eligibility.
-   Derive streak duration and eligibility from database timestamps and
    server time.
-   Validate all user input on the server, even if it is also validated
    in the browser.
-   Use database transactions or RPC functions for joining and resetting
    attempts so duplicate requests cannot corrupt state.

------------------------------------------------------------------------

## 7. Database design

Use UUID primary keys and `timestamptz` for timestamps. Add indexes for
fields used in joins, filters, and sorting.

### 7.1 `profiles`

  Column                  Type            Notes
  ----------------------- --------------- -----------------------------------------
  `id`                    uuid            Primary key; references `auth.users.id`
  `real_name`             text nullable   Private; never exposed publicly
  `alias`                 text            Required; unique, case-insensitive
  `country_code`          text nullable   Optional, user-controlled
  `avatar_url`            text nullable   Optional; omit in MVP if not needed
  `show_on_leaderboard`   boolean         Defaults true; user can opt out
  `certificate_name`      text nullable   User-selected print name
  `created_at`            timestamptz     Server generated
  `updated_at`            timestamptz     Server generated

Use a case-insensitive unique index for aliases, such as a unique index
on `lower(alias)`. Validate allowed alias characters and length. Do not
allow aliases that impersonate staff or contain abusive content.

### 7.2 `challenges`

  Column                     Type          Notes
  -------------------------- ------------- -------------------------------------
  `id`                       uuid          Primary key
  `slug`                     text          Unique, e.g. `nnn-2026`
  `title`                    text          Display title
  `start_at`                 timestamptz   Official start
  `end_at`                   timestamptz   Exclusive end
  `timezone`                 text          IANA timezone
  `registration_opens_at`    timestamptz   Optional
  `registration_closes_at`   timestamptz   Optional
  `status`                   text          draft, scheduled, active, completed
  `created_at`               timestamptz   Server generated

Add a database check that `end_at > start_at`.

### 7.3 `participations`

  -----------------------------------------------------------------------
  Column                  Type                    Notes
  ----------------------- ----------------------- -----------------------
  `id`                    uuid                    Primary key

  `challenge_id`          uuid                    References challenges

  `user_id`               uuid                    References auth.users

  `joined_at`             timestamptz             Server generated

  `attempt_started_at`    timestamptz             Official start for
                                                  on-time users; joined
                                                  time for late joiners

  `attempt_status`        text                    active, reset,
                                                  completed, disqualified

  `is_late_joiner`        boolean                 Computed by server

  `reset_at`              timestamptz nullable    Server generated

  `completed_at`          timestamptz nullable    Server generated

  `created_at`            timestamptz             Server generated
  -----------------------------------------------------------------------

Add a unique constraint on `(challenge_id, user_id)` for one
participation per user per challenge. If future product rules allow
multiple attempts, revise the schema intentionally rather than silently
changing this constraint.

### 7.4 `certificates`

  -----------------------------------------------------------------------
  Column                  Type                    Notes
  ----------------------- ----------------------- -----------------------
  `id`                    uuid                    Primary key

  `certificate_code`      text                    Unique, random,
                                                  non-sequential public
                                                  identifier

  `participation_id`      uuid                    Unique reference to
                                                  participation

  `display_name`          text                    Name printed on
                                                  certificate

  `issued_at`             timestamptz             Server generated

  `status`                text                    valid, revoked

  `pdf_storage_path`      text nullable           Optional private
                                                  storage path
  -----------------------------------------------------------------------

Never use a sequential database ID as the public certificate code.

### 7.5 Optional `admin_audit_log`

Add this only if admin operations are implemented in the MVP.

  -----------------------------------------------------------------------
  Column                  Type                    Notes
  ----------------------- ----------------------- -----------------------
  `id`                    uuid                    Primary key

  `admin_user_id`         uuid                    Actor

  `action`                text                    Action name

  `target_type`           text                    Profile, participation,
                                                  certificate, challenge

  `target_id`             uuid                    Target record

  `reason`                text nullable           Moderation reason

  `created_at`            timestamptz             Server generated
  -----------------------------------------------------------------------

Do not store intimate details in audit logs.

------------------------------------------------------------------------

## 8. Security and Supabase RLS

Treat RLS as a required part of the project, not a final polish task.

### Profiles

-   A signed-in user can read and update their own private profile
    fields.
-   Public users can read only a safe public profile projection or view.
-   Public queries must never select `real_name`, email, certificate
    private settings, or internal IDs.
-   Alias uniqueness must be enforced by the database, not just the UI.
-   Users cannot update their own moderation role or admin status.

### Participations

-   A user can read their own full participation record.
-   Public users can read only fields needed for the leaderboard,
    preferably through a restricted database view or server endpoint.
-   Users cannot directly set `attempt_started_at`, `reset_at`,
    `completed_at`, `attempt_status`, or `is_late_joiner`.
-   Joining and resetting must go through server-validated operations.

### Certificates

-   Users can view their own certificate.
-   Public verification can read only the limited verification fields.
-   Only server-side logic can issue or revoke certificates.
-   Certificate issuance must be idempotent: repeated requests must not
    create duplicate certificates.

### General security checklist

-   Enable RLS on every exposed table.
-   Use least-privilege database permissions.
-   Never expose service-role credentials.
-   Rate-limit registration, alias checks, reset requests, and
    certificate verification.
-   Add CSRF protections where applicable to custom endpoints.
-   Avoid logging emails, private profile fields, or sensitive
    participation details.
-   Add secure headers and appropriate cookie settings.
-   Use a CAPTCHA or bot protection if abuse appears.
-   Provide account deletion and a clear data-retention policy.
-   Test RLS using separate normal-user, anonymous, and admin accounts.

------------------------------------------------------------------------

## 9. Timer and progress logic

### 9.1 Source of truth

The database timestamp is the source of truth. The browser only displays
the elapsed time.

Example client display logic:

``` ts
const elapsedMs = Math.max(0, Date.now() - new Date(startedAt).getTime());

const totalSeconds = Math.floor(elapsedMs / 1000);
const days = Math.floor(totalSeconds / 86_400);
const hours = Math.floor((totalSeconds % 86_400) / 3_600);
const minutes = Math.floor((totalSeconds % 3_600) / 60);
const seconds = totalSeconds % 60;
```

The UI should update once per second, but should not send a database
write every second.

### 9.2 Server-side join logic

When the user joins:

1.  Authenticate the user.
2.  Load the active challenge from the database.
3.  Confirm registration is open.
4.  Confirm the user has not already joined.
5.  Get the current server timestamp.
6.  Set `joined_at` to server time.
7.  If server time is before `start_at`, set `attempt_started_at` to
    `start_at` and `is_late_joiner = false`.
8.  If server time is at or after `start_at`, set `attempt_started_at`
    to server time and `is_late_joiner = true`.
9.  Insert the participation in a transaction.
10. Return the saved participation.

Do not accept a start timestamp from the browser.

### 9.3 Server-side reset logic

1.  Authenticate the user.
2.  Load their participation.
3.  Confirm it belongs to the user and is active.
4.  Confirm the challenge has not ended.
5.  Set status to `reset`.
6.  Set `reset_at` to server time.
7.  Revoke certificate eligibility for that participation.
8.  Return the updated status.

For the MVP, a reset ends the user's challenge attempt. If a restart is
supported, model a new attempt explicitly and document how it affects
leaderboard and certificate eligibility.

### 9.4 Completion logic

A user is eligible for the full NNN certificate only when all conditions
pass:

-   Participation exists for the challenge.
-   User joined before or at the official challenge start.
-   `is_late_joiner = false`.
-   `attempt_started_at <= challenge.start_at`.
-   Participation has not been reset or disqualified.
-   Server time is at or after `challenge.end_at`.
-   The user meets all published challenge rules.

Set `completed_at` only through trusted server-side logic.

Never determine certificate eligibility from a client-side progress
percentage.

------------------------------------------------------------------------

## 10. Page-by-page requirements

### 10.1 Homepage `/`

Sections:

1.  Header:
    -   Logo
    -   Home
    -   Leaderboard
    -   Rules
    -   Sign in / Dashboard
2.  Hero:
    -   "No Nut November"
    -   Year
    -   One-sentence explanation
    -   Countdown or challenge status
    -   Join button
3.  Simple statistics:
    -   Registered participants
    -   Active participants
    -   Certificates issued (after completion)
4.  Top leaderboard preview (top 5 or top 10)
5.  Short "How it works" section (three steps)
6.  Footer:
    -   Rules
    -   Privacy policy
    -   Terms
    -   Contact

Do not invent or hardcode live statistics. If there are no participants,
show a helpful empty state.

### 10.2 Rules `/rules`

Explain in plain language:

-   What the challenge is
-   Challenge start and end times, including timezone
-   What counts as a reset according to the site's stated rules
-   How late joining works
-   How leaderboard ranking works
-   How certificate eligibility works
-   Self-reported participation disclaimer
-   Adults-only requirement
-   Privacy and respectful conduct

The rules must match the backend logic.

### 10.3 Leaderboard `/leaderboard`

Display:

-   Rank
-   Alias
-   Current streak
-   Optional country only when opted in
-   Active / late-joiner grouping

Requirements:

-   Pagination or a sensible limit
-   Search by alias only, if search is included
-   Loading, error, and empty states
-   No private fields in API responses
-   Stable sorting and deterministic tie-breaker
-   Refresh control or modest refresh interval

### 10.4 Authentication

Pages:

-   `/login`
-   `/register`
-   `/forgot-password`
-   `/auth/callback` if required by the selected Supabase flow

Requirements:

-   Clear validation messages
-   Email verification if enabled
-   Password reset flow
-   Secure session handling
-   18+ confirmation
-   Rate-limited authentication attempts

### 10.5 Dashboard `/dashboard`

Show:

-   Welcome message using alias
-   Current challenge status
-   Large personal timer
-   Days elapsed
-   Challenge progress (clearly distinguish personal elapsed time from
    official challenge progress)
-   Current leaderboard position
-   Certificate eligibility status
-   Reset button with confirmation

Do not show a fake timer or sample statistics in production.

### 10.6 Profile `/profile`

Allow the user to:

-   Edit alias
-   Edit private real name
-   Choose whether to appear on the leaderboard
-   Opt in/out of country display
-   Choose certificate display name
-   View account deletion instructions

Clearly mark which fields are public and which are private.

### 10.7 Certificate `/certificate`

States:

-   Not yet available
-   Not eligible, with a neutral explanation
-   Eligible and ready to generate
-   Already issued
-   Revoked / invalid

Allow preview and PDF download. Do not issue a certificate until
server-side eligibility succeeds.

### 10.8 Certificate verification `/verify/[certificateCode]`

Show only:

-   Valid / revoked status
-   Certificate ID
-   Challenge and year
-   Printed certificate name
-   Issue date

Do not expose email, user ID, profile details, or attempt history.

### 10.9 Admin `/admin`

Keep the first admin area minimal:

-   View challenge configuration
-   Update challenge status and dates with validation
-   View participant totals
-   Suspend or hide abusive public profiles
-   Revoke a fraudulent certificate with a recorded reason

Protect admin access with server-side role checks and RLS. Never rely on
hiding an admin link in the frontend.

------------------------------------------------------------------------

## 11. Suggested project structure

``` text
nnn-challenge/
├── public/
│   ├── images/
│   └── fonts/
├── src/
│   ├── app/
│   │   ├── (public)/
│   │   │   ├── page.tsx
│   │   │   ├── rules/
│   │   │   ├── leaderboard/
│   │   │   └── verify/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   └── forgot-password/
│   │   ├── (protected)/
│   │   │   ├── dashboard/
│   │   │   ├── profile/
│   │   │   └── certificate/
│   │   ├── admin/
│   │   ├── api/
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── layout/
│   │   ├── ui/
│   │   ├── timer/
│   │   ├── leaderboard/
│   │   ├── profile/
│   │   └── certificate/
│   ├── lib/
│   │   ├── supabase/
│   │   ├── auth/
│   │   ├── validation/
│   │   ├── dates/
│   │   ├── challenge/
│   │   └── security/
│   ├── actions/
│   ├── types/
│   └── middleware.ts
├── supabase/
│   ├── migrations/
│   └── seed.sql
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── docs/
│   ├── PRODUCT_RULES.md
│   ├── DATABASE.md
│   └── DEPLOYMENT.md
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── ROADMAP.md
```

Adjust the structure to the current Next.js version and conventions. Do
not create empty folders just to match this diagram.

------------------------------------------------------------------------

## 12. Visual design direction

### Theme

Use a clean, premium dark interface. It can feel competitive without
looking like an overloaded gaming dashboard.

Suggested tokens:

  Purpose            Value
  ------------------ -----------
  Main background    `#0B0D12`
  Card background    `#151923`
  Elevated surface   `#1D2330`
  Primary accent     `#8B5CF6`
  Success accent     `#22C55E`
  Gold accent        `#F5C542`
  Main text          `#F8FAFC`
  Muted text         `#94A3B8`
  Border             `#2A3140`

### Design rules

-   Mobile-first responsive layout.
-   One clear primary action per page.
-   Large, readable timer.
-   Simple leaderboard table that becomes cards on narrow screens.
-   Consistent spacing and typography.
-   Subtle animations only; respect `prefers-reduced-motion`.
-   Avoid flashing effects, excessive gradients, and unnecessary visual
    clutter.
-   Use clear confirmation dialogs for destructive actions.
-   Provide skeleton/loading states and useful empty states.

### Responsive breakpoints

Use Tailwind's standard breakpoints unless the design requires
otherwise:

-   Mobile: below 640px
-   Tablet: 640px--1023px
-   Desktop: 1024px and above

Test at approximately 360px, 390px, 768px, 1024px, and 1440px widths.

------------------------------------------------------------------------

## 13. Development roadmap

Build in milestones. After each milestone, run the app, test it, review
the diff, and commit the working state.

### Milestone 0 --- Project setup

**Tasks**

-   [ ] Create Git repository.
-   [ ] Create Next.js app with TypeScript and App Router.
-   [ ] Configure Tailwind CSS.
-   [ ] Install shadcn/ui and Lucide icons.
-   [ ] Set up ESLint and formatting.
-   [ ] Create `.env.example`.
-   [ ] Add README with setup instructions.
-   [ ] Configure local development scripts.
-   [ ] Create Supabase project.
-   [ ] Configure local and production environment variables.

**Acceptance criteria**

-   App starts locally.
-   TypeScript and lint checks pass.
-   No secrets are committed.
-   README explains how another developer can run the project.

### Milestone 1 --- Static UI foundation

**Tasks**

-   [ ] Build global layout and navigation.
-   [ ] Build footer.
-   [ ] Define color, spacing, typography, and component styles.
-   [ ] Build homepage using temporary clearly labelled mock data.
-   [ ] Build rules page.
-   [ ] Build leaderboard visual layout.
-   [ ] Build dashboard visual layout.
-   [ ] Build profile visual layout.
-   [ ] Build certificate preview layout.
-   [ ] Test all pages on mobile, tablet, and desktop.

**Acceptance criteria**

-   All core pages are navigable.
-   Layout works at target viewport widths.
-   Mock data is clearly separated and cannot accidentally appear as
    real production data.
-   No dead buttons or fake actions.

### Milestone 2 --- Supabase and database

**Tasks**

-   [ ] Configure Supabase client utilities for browser and server.
-   [ ] Create SQL migrations for profiles, challenges, participations,
    certificates, and optional audit log.
-   [ ] Add unique alias index.
-   [ ] Add foreign keys, check constraints, and indexes.
-   [ ] Enable RLS on exposed tables.
-   [ ] Write least-privilege policies.
-   [ ] Create a safe public leaderboard view or server query.
-   [ ] Seed a development challenge record.
-   [ ] Document schema and policies.

**Acceptance criteria**

-   Migrations run on a fresh database.
-   RLS is enabled and tested.
-   Anonymous users cannot read private profile data.
-   A normal user cannot change another user's records.
-   Service-role key is not exposed to the browser.

### Milestone 3 --- Authentication and profiles

**Tasks**

-   [ ] Implement registration.
-   [ ] Implement login and logout.
-   [ ] Implement email verification or document why it is disabled.
-   [ ] Implement password reset.
-   [ ] Add 18+ confirmation.
-   [ ] Build profile creation form.
-   [ ] Validate and reserve unique aliases.
-   [ ] Add profile editing.
-   [ ] Add leaderboard visibility preference.
-   [ ] Add country opt-in if included.

**Acceptance criteria**

-   User can register, sign in, sign out, and recover access.
-   Alias uniqueness works even under concurrent requests.
-   Private fields are not exposed in public requests.
-   Protected pages redirect unauthenticated users appropriately.

### Milestone 4 --- Challenge joining and timer

**Tasks**

-   [ ] Load active challenge configuration from database.
-   [ ] Build join confirmation screen showing exact dates and timezone.
-   [ ] Implement server-side join operation.
-   [ ] Handle on-time and late joiners correctly.
-   [ ] Create participation record atomically.
-   [ ] Build timer component from server-provided timestamp.
-   [ ] Display days, hours, minutes, and seconds.
-   [ ] Display challenge status: upcoming, active, completed.
-   [ ] Add tests for timezone and boundary cases.

**Acceptance criteria**

-   Browser cannot choose or modify the official start timestamp.
-   Repeated join requests do not create duplicate participation.
-   Timer is derived from the saved timestamp.
-   Refreshing the page does not reset the timer.
-   Late joiners are labelled accurately.
-   Timer never displays negative elapsed time.

### Milestone 5 --- Reset streak

**Tasks**

-   [ ] Add reset button.
-   [ ] Add clear confirmation dialog.
-   [ ] Implement server-side reset operation.
-   [ ] Store reset timestamp and status.
-   [ ] Prevent resetting another user's attempt.
-   [ ] Prevent duplicate or invalid resets.
-   [ ] Update dashboard and leaderboard after reset.
-   [ ] Explain the effect on certificate eligibility.

**Acceptance criteria**

-   Reset is a deliberate confirmed action.
-   Client cannot supply the reset timestamp.
-   A reset cannot be undone through normal user controls.
-   Reset users disappear from the active leaderboard or move to an
    explicitly defined non-active state.
-   Reset history remains private.

### Milestone 6 --- Leaderboard

**Tasks**

-   [ ] Implement public leaderboard query.
-   [ ] Return only safe public fields.
-   [ ] Sort by streak duration descending.
-   [ ] Apply documented tie-breaker.
-   [ ] Separate late joiners if the policy requires it.
-   [ ] Add pagination or a sensible result limit.
-   [ ] Add loading, error, and empty states.
-   [ ] Add current user's rank to dashboard.
-   [ ] Test alias changes and leaderboard visibility preferences.

**Acceptance criteria**

-   Public leaderboard never returns real names or emails.
-   Hidden profiles are excluded.
-   Reset or suspended users are handled according to the rules.
-   Ranking is deterministic.
-   A user cannot manipulate rank by changing browser time.

### Milestone 7 --- Certificate generation

**Tasks**

-   [ ] Implement server-side eligibility function.
-   [ ] Add certificate display-name selection.
-   [ ] Create certificate visual design.
-   [ ] Generate PDF on the server.
-   [ ] Generate a random certificate code.
-   [ ] Store certificate issuance record.
-   [ ] Make issuance idempotent.
-   [ ] Build public verification page.
-   [ ] Add revocation status.
-   [ ] Test eligible, ineligible, late-joiner, and reset cases.

**Acceptance criteria**

-   Certificate cannot be generated early.
-   Certificate cannot be generated by manipulating frontend state.
-   Ineligible participants cannot obtain a valid certificate.
-   Duplicate requests do not create multiple certificates.
-   QR code opens the correct verification page.
-   Verification reveals only intended certificate information.

### Milestone 8 --- Admin and production readiness

**Tasks**

-   [ ] Add server-side admin role checks.
-   [ ] Protect admin routes and actions.
-   [ ] Add challenge configuration screen or documented database
    procedure.
-   [ ] Add basic user moderation.
-   [ ] Add certificate revocation.
-   [ ] Add audit log for sensitive admin actions.
-   [ ] Add privacy policy and terms.
-   [ ] Add account deletion process.
-   [ ] Add error monitoring if appropriate.
-   [ ] Add rate limits to sensitive endpoints.
-   [ ] Review logs for accidental personal-data exposure.

**Acceptance criteria**

-   Non-admin users cannot access admin data or actions.
-   Challenge configuration validates dates and timezone.
-   Admin actions are auditable.
-   Privacy and deletion information is accessible.
-   Production secrets are configured securely.

### Milestone 9 --- Testing, launch, and handover

**Tasks**

-   [ ] Run unit tests.
-   [ ] Run integration tests.
-   [ ] Run end-to-end tests.
-   [ ] Test RLS with multiple accounts.
-   [ ] Test mobile and desktop layouts.
-   [ ] Test challenge start and end boundaries.
-   [ ] Test daylight-saving/timezone edge cases.
-   [ ] Test certificate verification.
-   [ ] Test account deletion.
-   [ ] Run production build.
-   [ ] Deploy to Vercel.
-   [ ] Configure production Supabase URL and keys.
-   [ ] Configure domain and HTTPS.
-   [ ] Configure Supabase redirect URLs.
-   [ ] Test production signup and email flow.
-   [ ] Create a backup and recovery plan.
-   [ ] Write final deployment instructions.

**Acceptance criteria**

-   Production build passes.
-   Critical user journeys work in production.
-   No known critical security issue remains.
-   No private data appears on public pages.
-   Owner can operate challenge dates and basic moderation.

------------------------------------------------------------------------

## 14. Test plan

### Unit tests

Test pure functions:

-   Elapsed time calculation
-   Days remaining calculation
-   Challenge status calculation
-   On-time vs late joiner calculation
-   Certificate eligibility
-   Leaderboard sorting and tie-breaker
-   Alias validation

### Integration tests

Test database-backed behaviour:

-   Profile creation
-   Alias uniqueness
-   Joining a challenge
-   Duplicate join prevention
-   Resetting an attempt
-   Public leaderboard safe fields
-   Certificate issuance
-   Certificate verification
-   RLS access restrictions

### End-to-end tests

At minimum, automate these flows:

1.  Visitor opens homepage and rules.
2.  User registers and creates alias.
3.  User joins before challenge start.
4.  User sees a running timer.
5.  User refreshes and timer remains correct.
6.  User resets streak.
7.  Reset user is no longer an active leaderboard participant.
8.  A late joiner is marked correctly.
9.  Eligible user can generate a certificate after challenge end.
10. Ineligible user cannot generate a certificate.
11. Public visitor can verify a certificate without seeing private
    account data.
12. User can update privacy settings.

### Critical edge cases

-   Two users try to claim the same alias simultaneously.
-   User double-clicks Join.
-   User double-clicks Reset.
-   User changes their device clock.
-   User changes timezone.
-   Challenge is not yet open.
-   Challenge has ended.
-   User joins exactly at the start timestamp.
-   User joins exactly at the end timestamp.
-   Admin changes challenge dates.
-   Certificate request is repeated.
-   User deletes their account.
-   User hides their profile while appearing on the leaderboard.

------------------------------------------------------------------------

## 15. Environment variables

Create `.env.example` with placeholders only:

``` env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

NEXT_PUBLIC_SITE_URL=
```

Use the exact key names supported by the installed Supabase SDK version.
Never commit real values. Never prefix a service-role key with
`NEXT_PUBLIC_`.

If an email provider is added:

``` env
RESEND_API_KEY=
```

Keep local, preview, and production credentials separate.

------------------------------------------------------------------------

## 16. Deployment checklist

### Supabase

-   [ ] Production project created.
-   [ ] SQL migrations applied.
-   [ ] RLS policies verified.
-   [ ] Authentication URLs configured.
-   [ ] Email templates reviewed.
-   [ ] Database backups configured according to plan.
-   [ ] Production challenge record inserted.
-   [ ] Admin role assigned securely.

### Vercel

-   [ ] Git repository connected.
-   [ ] Environment variables configured.
-   [ ] Production build successful.
-   [ ] Domain connected.
-   [ ] HTTPS working.
-   [ ] Supabase redirect URLs include production domain.
-   [ ] Preview deployments do not use production secrets unnecessarily.

### Final smoke test

-   [ ] Homepage loads.
-   [ ] Registration works.
-   [ ] Login works.
-   [ ] Profile and alias save.
-   [ ] Join works.
-   [ ] Timer works after refresh.
-   [ ] Leaderboard shows aliases only.
-   [ ] Reset works.
-   [ ] Certificate eligibility is correct.
-   [ ] Verification page works.
-   [ ] Mobile layout works.

------------------------------------------------------------------------

## 17. OpenCode workflow --- how to vibe-code this safely

Do not ask OpenCode to build the entire application in one enormous
prompt. It may generate inconsistent rules, insecure database access,
and incomplete features.

Use this workflow instead:

1.  Keep this roadmap in the repository as `ROADMAP.md`.
2.  Start OpenCode in the project directory.
3.  Ask it to inspect the roadmap and current repository before changing
    files.
4.  Work on one milestone at a time.
5.  Ask for a short implementation plan before each milestone.
6.  Review the files it intends to change.
7.  Ask it to implement only the approved scope.
8.  Run lint, type checks, tests, and the development server.
9.  Ask it to fix errors and add missing tests.
10. Inspect the Git diff before committing.
11. Update the roadmap checkboxes only when work is actually complete.

### Initial OpenCode prompt

Copy this as your first prompt:

> You are the lead full-stack engineer for this project. Read
> `ROADMAP.md` completely before doing any work.
>
> We are building a small, responsive No Nut November challenge website.
> The product scope is intentionally limited to registration, private
> profiles, public aliases, a self-reported streak timer, a public
> alias-only leaderboard, streak reset, and completion certificates.
>
> Use the technology stack and architecture in the roadmap unless there
> is a clear compatibility issue. Prioritize privacy, server-side
> validation, Supabase Row Level Security, accessibility, responsive
> design, and maintainable TypeScript.
>
> Do not build features outside the roadmap. Do not invent challenge
> rules. If a rule is ambiguous, ask me before implementing it.
>
> First inspect the repository and the roadmap. Then: 1. Summarize the
> architecture you will use. 2. Identify any unresolved decisions or
> risks. 3. Propose a small implementation plan for Milestone 0 only. 4.
> List the files you expect to create or modify.
>
> Do not implement anything until I approve the plan.

### Prompt template for each milestone

> Read `ROADMAP.md` and inspect the current codebase. We are now working
> on Milestone \[NUMBER\]: \[NAME\].
>
> First provide: - The requirements from the roadmap relevant to this
> milestone. - The implementation plan. - The files you will create or
> modify. - Any database migrations required. - Security and privacy
> considerations. - Tests you will add or update.
>
> Wait for my approval before making changes.
>
> After approval, implement only this milestone. Run the relevant lint,
> type checks, and tests. Fix failures caused by your changes. Summarize
> what changed, what passed, what remains, and any decisions that need
> my input. Do not mark roadmap tasks complete unless they are
> implemented and verified.

### Prompt for code review

> Review the current changes against `ROADMAP.md`. Look specifically
> for: - Private real names or emails exposed through public queries. -
> Missing or incorrect Supabase RLS policies. - Client-controlled
> timestamps, ranks, or certificate eligibility. - Duplicate
> join/reset/certificate operations. - Timezone and challenge-boundary
> bugs. - Missing validation and error handling. - Mobile layout and
> accessibility problems. - Tests that are missing or do not test the
> real behaviour.
>
> Do not rewrite unrelated code. Report findings by severity with file
> and line references, then propose fixes.

### OpenCode working rules

-   Never paste production secrets into prompts or source files.
-   Do not let the agent disable RLS to make a feature work.
-   Do not accept a public query that returns an entire profile row.
-   Do not accept certificate eligibility calculated only in React.
-   Do not let it invent fake production statistics.
-   Do not allow it to silently change the challenge rules.
-   Require tests for security-sensitive logic.
-   Commit after each stable milestone.

------------------------------------------------------------------------

## 18. Definition of done

The first release is complete when:

-   A visitor can understand the challenge and its dates.
-   An adult user can register and create a unique alias.
-   A user can join the challenge.
-   The timer is accurate after refresh and across devices.
-   A user can reset their attempt.
-   The leaderboard shows aliases and safe public fields only.
-   Late joiners are represented honestly.
-   Certificate eligibility is calculated on the server.
-   Eligible users can download and verify a certificate.
-   Users can control public visibility and request account deletion.
-   The website works on mobile, tablet, and desktop.
-   RLS and critical user journeys have automated tests.
-   The app is deployed with production secrets protected.

------------------------------------------------------------------------

## 19. Recommended build order at a glance

    Order Deliverable                           Priority
  ------- ------------------------------------- ----------
        1 Project setup and design foundation   Must
        2 Database, authentication, and RLS     Must
        3 Profiles and public aliases           Must
        4 Challenge joining and timer           Must
        5 Reset streak                          Must
        6 Leaderboard                           Must
        7 Certificate and verification          Must
        8 Admin basics and privacy controls     Must
        9 Testing and deployment                Must

**Final advice:** Build a reliable small product rather than a large
unfinished one. The most important parts are accurate timestamps, honest
challenge rules, private identity, a safe leaderboard, and
server-verified certificate eligibility.
