insert into public.challenges (
  slug,
  title,
  start_at,
  end_at,
  timezone,
  registration_opens_at,
  registration_closes_at,
  status
)
values (
  'nnn-2026',
  'No Nut November 2026',
  '2026-10-31T18:00:00Z',
  '2026-11-30T18:00:00Z',
  'Asia/Dhaka',
  null,
  null,
  'scheduled'
)
on conflict (slug) do update
set
  title = excluded.title,
  start_at = excluded.start_at,
  end_at = excluded.end_at,
  timezone = excluded.timezone,
  registration_opens_at = excluded.registration_opens_at,
  registration_closes_at = excluded.registration_closes_at,
  status = excluded.status;
