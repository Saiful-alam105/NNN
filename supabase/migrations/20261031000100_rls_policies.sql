alter table public.profiles enable row level security;
alter table public.challenges enable row level security;
alter table public.participations enable row level security;
alter table public.certificates enable row level security;

revoke all on public.profiles from anon;
revoke all on public.challenges from anon;
revoke all on public.participations from anon;
revoke all on public.certificates from anon;

revoke all on public.challenges from authenticated;

create policy "profiles_select_own"
on public.profiles
for select
to authenticated
using (auth.uid() = id);

create policy "profiles_insert_own"
on public.profiles
for insert
to authenticated
with check (auth.uid() = id);

create policy "profiles_update_own"
on public.profiles
for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "participations_select_own"
on public.participations
for select
to authenticated
using (auth.uid() = user_id);

create policy "certificates_select_own"
on public.certificates
for select
to authenticated
using (
  exists (
    select 1
    from public.participations p
    where p.id = certificates.participation_id
      and p.user_id = auth.uid()
  )
);
