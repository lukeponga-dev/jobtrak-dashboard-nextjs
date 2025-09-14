-- Create a type for the application status
CREATE TYPE public.application_status AS ENUM ('Applied', 'Interviewing', 'Offer', 'Rejected');

-- Create the job_applications table
CREATE TABLE public.job_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company TEXT NOT NULL,
    role TEXT NOT NULL,
    date TIMESTAMPTZ NOT NULL,
    status public.application_status NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read-only access" ON public.job_applications FOR SELECT USING (true);
CREATE POLICY "Allow authenticated users to insert" ON public.job_applications FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow owner to update" ON public.job_applications FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Allow owner to delete" ON public.job_applications FOR DELETE USING (auth.uid() = user_id);

-- Add a user_id column to associate applications with users
ALTER TABLE public.job_applications ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Adjust policies to use the user_id column
DROP POLICY "Allow owner to update" ON public.job_applications;
CREATE POLICY "Allow owner to update" ON public.job_applications FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY "Allow owner to delete" ON public.job_applications;
CREATE POLICY "Allow owner to delete" ON public.job_applications FOR DELETE USING (auth.uid() = user_id);
