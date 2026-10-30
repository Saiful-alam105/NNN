create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  real_name text,
  alias text not null,
  country_code text,
  show_country boolean not null default false,
  show_on_leaderboard boolean not null default true,
  certificate_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profiles_alias_format check (alias ~ '^[a-z][a-z0-9_]{2,23}$'),
  constraint profiles_alias_reserved check (
    lower(alias) not in (
      'admin',
      'administrator',
      'staff',
      'support',
      'moderator',
      'system',
      'nnn',
      'official'
    )
  ),
  constraint profiles_country_code_format check (
    country_code is null or country_code ~ '^[A-Z]{2}$'
  ),
  constraint profiles_real_name_length check (
    real_name is null or char_length(real_name) between 1 and 120
  ),
  constraint profiles_certificate_name_length check (
    certificate_name is null or char_length(certificate_name) between 1 and 120
  )
);

create unique index profiles_alias_lower_key on public.profiles (lower(alias));

create table public.challenges (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  start_at timestamptz not null,
  end_at timestamptz not null,
  timezone text not null,
  registration_opens_at timestamptz,
  registration_closes_at timestamptz,
  status text not null default 'draft',
  created_at timestamptz not null default now(),
  constraint challenges_end_after_start check (end_at > start_at),
  constraint challenges_status_check check (
    status in ('draft', 'scheduled', 'active', 'completed')
  ),
  constraint challenges_slug_format check (slug ~ '^[a-z0-9-]+$'),
  constraint challenges_timezone_not_blank check (char_length(timezone) > 0),
  constraint challenges_registration_window_check check (
    registration_opens_at is null
    or registration_closes_at is null
    or registration_closes_at > registration_opens_at
  )
);

create index challenges_status_idx on public.challenges (status);

create table public.participations (
  id uuid primary key default gen_random_uuid(),
  challenge_id uuid not null references public.challenges (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  joined_at timestamptz not null default now(),
  attempt_started_at timestamptz not null,
  attempt_status text not null default 'active',
  is_late_joiner boolean not null default false,
  reset_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  constraint participations_challenge_user_key unique (challenge_id, user_id),
  constraint participations_attempt_status_check check (
    attempt_status in ('active', 'reset', 'completed', 'disqualified')
  ),
  constraint participations_reset_at_status_check check (
    (attempt_status = 'reset') = (reset_at is not null)
  ),
  constraint participations_completed_at_status_check check (
    (attempt_status = 'completed') = (completed_at is not null)
  )
);

create index participations_leaderboard_idx
  on public.participations (challenge_id, attempt_status, attempt_started_at);

create index participations_user_idx on public.participations (user_id);

create table public.certificates (
  id uuid primary key default gen_random_uuid(),
  certificate_code text not null unique,
  participation_id uuid not null unique references public.participations (id) on delete cascade,
  display_name text not null,
  issued_at timestamptz not null default now(),
  status text not null default 'valid',
  pdf_storage_path text,
  constraint certificates_status_check check (status in ('valid', 'revoked')),
  constraint certificates_code_format check (certificate_code ~ '^[A-Z0-9-]{8,64}$'),
  constraint certificates_display_name_length check (
    char_length(display_name) between 1 and 120
  )
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at();
