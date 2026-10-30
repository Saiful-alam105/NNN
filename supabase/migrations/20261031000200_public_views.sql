create view public.public_challenges
with (security_invoker = false)
as
select
  c.slug,
  c.title,
  c.start_at,
  c.end_at,
  c.timezone,
  c.registration_opens_at,
  c.registration_closes_at,
  c.status
from public.challenges c
where c.status in ('scheduled', 'active', 'completed');

create view public.public_leaderboard
with (security_invoker = false)
as
select
  c.slug as challenge_slug,
  p.is_late_joiner,
  rank() over (
    partition by c.slug, p.is_late_joiner
    order by p.attempt_started_at asc
  )::int as rank,
  pr.alias,
  case when pr.show_country then pr.country_code else null end as country_code,
  greatest(0, floor(extract(epoch from (now() - p.attempt_started_at))))::bigint as streak_seconds
from public.participations p
join public.profiles pr on pr.id = p.user_id
join public.challenges c on c.id = p.challenge_id
where p.attempt_status = 'active'
  and pr.show_on_leaderboard = true
  and c.status in ('scheduled', 'active', 'completed');

create view public.public_certificates
with (security_invoker = false)
as
select
  cert.certificate_code,
  cert.display_name,
  c.title as challenge_title,
  extract(year from c.start_at at time zone c.timezone)::int as challenge_year,
  cert.issued_at,
  cert.status
from public.certificates cert
join public.participations p on p.id = cert.participation_id
join public.challenges c on c.id = p.challenge_id;

revoke all on public.public_challenges from public;
revoke all on public.public_leaderboard from public;
revoke all on public.public_certificates from public;

grant select on public.public_challenges to anon, authenticated;
grant select on public.public_leaderboard to anon, authenticated;
grant select on public.public_certificates to anon, authenticated;
