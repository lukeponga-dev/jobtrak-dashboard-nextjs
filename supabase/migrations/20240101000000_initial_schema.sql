-- Create a custom type for application status
CREATE TYPE public.application_status AS ENUM (
    'Applied',
    'Interviewing',
    'Offer',
    'Rejected'
);

-- Create the profiles table to store user-specific public information
CREATE TABLE public.profiles (
    user_id uuid NOT NULL,
    full_name text,
    avatar_url text,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT profiles_pkey PRIMARY KEY (user_id),
    CONSTRAINT profiles_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);
COMMENT ON TABLE public.profiles IS 'Stores public-facing profile information for each user.';

-- Create the job_applications table
CREATE TABLE public.job_applications (
    id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
    user_id uuid NOT NULL,
    company text NOT NULL,
    role text NOT NULL,
    date timestamp with time zone NOT NULL,
    status public.application_status NOT NULL,
    notes text,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT job_applications_pkey PRIMARY KEY (id),
    CONSTRAINT job_applications_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);
COMMENT ON TABLE public.job_applications IS 'Stores job application entries for each user.';

-- Create indexes for foreign keys to improve query performance
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON public.profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_job_applications_user_id ON public.job_applications(user_id);

-- Enable Row Level Security (RLS) for both tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles table
-- Users can select their own profile.
CREATE POLICY "Profiles: select own" ON public.profiles FOR SELECT TO authenticated USING ((SELECT auth.uid()) = user_id);
-- Users can insert their own profile.
CREATE POLICY "Profiles: insert own" ON public.profiles FOR INSERT TO authenticated WITH CHECK ((SELECT auth.uid()) = user_id);
-- Users can update their own profile.
CREATE POLICY "Profiles: update own" ON public.profiles FOR UPDATE TO authenticated USING ((SELECT auth.uid()) = user_id) WITH CHECK ((SELECT auth.uid()) = user_id);
-- Users can delete their own profile.
CREATE POLICY "Profiles: delete own" ON public.profiles FOR DELETE TO authenticated USING ((SELECT auth.uid()) = user_id);


-- RLS Policies for job_applications table
-- Users can select their own job applications.
CREATE POLICY "JobApplications: select own" ON public.job_applications FOR SELECT TO authenticated USING ((SELECT auth.uid()) = user_id);
-- Users can insert their own job applications.
CREATE POLICY "JobApplications: insert own" ON public.job_applications FOR INSERT TO authenticated WITH CHECK ((SELECT auth.uid()) = user_id);
-- Users can update their own job applications.
CREATE POLICY "JobApplications: update own" ON public.job_applications FOR UPDATE TO authenticated USING ((SELECT auth.uid()) = user_id) WITH CHECK ((SELECT auth.uid()) = user_id);
-- Users can delete their own job applications.
CREATE POLICY "JobApplications: delete own" ON public.job_applications FOR DELETE TO authenticated USING ((SELECT auth.uid()) = user_id);


-- Function to create a profile entry when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, avatar_url)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call the function after a new user is created in auth.users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
