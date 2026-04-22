-- LinguaPrep initial schema.
-- Run this in the Supabase SQL editor (or via `supabase db push`).

create extension if not exists "pgcrypto";

-- ----------------------------------------------------------------
-- Profiles
-- ----------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  target_test text check (target_test in ('ielts','toefl','pte','det')),
  target_score numeric,
  created_at timestamptz not null default now()
);

-- Auto-create a profile row whenever a new auth.user is inserted.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, target_test)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce(new.raw_user_meta_data->>'target_test', 'ielts')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- ----------------------------------------------------------------
-- Tests (shared catalogue; public read)
-- ----------------------------------------------------------------
create table if not exists public.tests (
  id uuid primary key default gen_random_uuid(),
  slug text unique,
  test_type text not null check (test_type in ('ielts','toefl','pte','det')),
  section text not null check (section in ('reading','listening','writing','speaking','full')),
  title text not null,
  duration_minutes int not null,
  content jsonb not null,
  created_at timestamptz not null default now()
);

-- ----------------------------------------------------------------
-- Attempts
-- ----------------------------------------------------------------
create table if not exists public.attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  test_id uuid references public.tests(id) on delete set null,
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  answers jsonb,
  auto_score numeric,
  ai_score numeric,
  ai_feedback jsonb,
  band_score numeric,
  status text not null default 'in_progress'
    check (status in ('in_progress','completed','graded'))
);

create index if not exists attempts_user_id_idx on public.attempts (user_id);
create index if not exists attempts_completed_at_idx on public.attempts (completed_at desc);

-- ----------------------------------------------------------------
-- Drill sessions
-- ----------------------------------------------------------------
create table if not exists public.drill_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  skill text not null check (skill in ('grammar','vocabulary','reading','listening')),
  questions_attempted int not null default 0,
  questions_correct int not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists drill_sessions_user_idx on public.drill_sessions (user_id, created_at desc);

-- ----------------------------------------------------------------
-- Row Level Security
-- ----------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.tests enable row level security;
alter table public.attempts enable row level security;
alter table public.drill_sessions enable row level security;

drop policy if exists "profiles: owner select" on public.profiles;
create policy "profiles: owner select" on public.profiles
  for select using (auth.uid() = id);

drop policy if exists "profiles: owner upsert" on public.profiles;
create policy "profiles: owner upsert" on public.profiles
  for insert with check (auth.uid() = id);

drop policy if exists "profiles: owner update" on public.profiles;
create policy "profiles: owner update" on public.profiles
  for update using (auth.uid() = id);

drop policy if exists "tests: any signed-in read" on public.tests;
create policy "tests: any signed-in read" on public.tests
  for select using (auth.role() = 'authenticated' or auth.role() = 'anon');

drop policy if exists "attempts: owner full access" on public.attempts;
create policy "attempts: owner full access" on public.attempts
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "drills: owner full access" on public.drill_sessions;
create policy "drills: owner full access" on public.drill_sessions
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ----------------------------------------------------------------
-- Storage bucket for speaking audio
-- ----------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('speaking-audio', 'speaking-audio', false)
on conflict (id) do nothing;

-- Auto-delete audio older than 30 days (requires pg_cron).
-- Uncomment after enabling pg_cron in Supabase:
-- select cron.schedule(
--   'purge-speaking-audio',
--   '0 3 * * *',
--   $$ delete from storage.objects
--      where bucket_id = 'speaking-audio'
--        and created_at < now() - interval '30 days' $$
-- );
