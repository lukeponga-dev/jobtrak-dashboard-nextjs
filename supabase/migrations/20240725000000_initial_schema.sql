-- Create a custom enum type for application status
create type public.application_status as enum ('Applied', 'Interviewing', 'Offer', 'Rejected');

-- Ensure a public.profiles table exists to link to auth.users (recommended pattern)
-- NOTE: If you already have a profiles table, skip this CREATE TABLE or adjust columns as needed.
create table if not exists public.profiles (
  id bigint primary key generated always as identity,
  user_id uuid not null references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  created_at timestamp with time zone not null default now()
);

-- Create the job_applications table
create table public.job_applications (
  id bigint primary key generated always as identity,
  user_id uuid not null references auth.users(id) on delete cascade,
  company text not null,
  role text not null,
  date timestamp with time zone not null,
  status public.application_status not null,
  notes text,
  created_at timestamp with time zone not null default now()
);

-- Index for the foreign key to improve join performance
create index if not exists idx_job_applications_user_id on public.job_applications(user_id);

-- Enable Row Level Security
alter table public.job_applications enable row level security;

-- RLS policies (per Supabase best practices)
-- Allow authenticated users to SELECT only their own rows
create policy "Allow select for owner" on public.job_applications
  for select
  to authenticated
  using ((SELECT auth.uid()) = user_id);

-- Allow authenticated users to INSERT rows only for themselves
create policy "Allow insert for owner" on public.job_applications
  for insert
  to authenticated
  with check ((SELECT auth.uid()) = user_id);

-- Allow authenticated users to UPDATE their own rows
create policy "Allow update for owner" on public.job_applications
  for update
  to authenticated
  using ((SELECT auth.uid()) = user_id)
  with check ((SELECT auth.uid()) = user_id);

-- Allow authenticated users to DELETE their own rows
create policy "Allow delete for owner" on public.job_applications
  for delete
  to authenticated
  using ((SELECT auth.uid()) = user_id);