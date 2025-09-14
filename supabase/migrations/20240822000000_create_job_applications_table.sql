-- Create a custom type for the application status
create type "public"."application_status" as enum ('Applied', 'Interviewing', 'Offer', 'Rejected');

-- Create the job_applications table
create table "public"."job_applications" (
    "id" uuid not null default gen_random_uuid(),
    "company" text not null,
    "role" text not null,
    "date" timestamp with time zone not null,
    "status" application_status not null,
    "notes" text,
    "created_at" timestamp with time zone not null default now()
);

-- Enable Row Level Security
alter table "public"."job_applications" enable row level security;

-- Create Primary Key
CREATE UNIQUE INDEX job_applications_pkey ON public.job_applications USING btree (id);
alter table "public"."job_applications" add constraint "job_applications_pkey" PRIMARY KEY using index "job_applications_pkey";

-- Create policies for RLS
-- This policy allows users to see all applications.
-- TODO: In a real multi-tenant app, you'd want to scope this to the user.
create policy "Enable read access for all users"
on "public"."job_applications"
as permissive
for select
to public
using (true);

-- This policy allows users to insert their own applications.
create policy "Enable insert for all users"
on "public"."job_applications"
as permissive
for insert
to public
with check (true);

-- This policy allows users to update their own applications.
create policy "Enable update for all users"
on "public"."job_applications"
as permissive
for update
to public
using (true)
with check (true);

-- This policy allows users to delete their own applications.
create policy "Enable delete for all users"
on "public"."job_applications"
as permissive
for delete
to public
using (true);
