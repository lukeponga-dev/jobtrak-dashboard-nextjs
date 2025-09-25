-- 1. Create indexes for foreign keys
CREATE INDEX IF NOT EXISTS idx_job_applications_user_id ON public.job_applications(user_id);

-- 2. Enable Row Level Security
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

-- 3. Policies for public.job_applications (user-owned)
CREATE POLICY "JobApplications: select own" ON public.job_applications FOR SELECT TO authenticated USING ((SELECT auth.uid()) = user_id);
CREATE POLICY "JobApplications: insert own" ON public.job_applications FOR INSERT TO authenticated WITH CHECK ((SELECT auth.uid()) = user_id);
CREATE POLICY "JobApplications: update own" ON public.job_applications FOR UPDATE TO authenticated USING ((SELECT auth.uid()) = user_id) WITH CHECK ((SELECT auth.uid()) = user_id);
CREATE POLICY "JobApplications: delete own" ON public.job_applications FOR DELETE TO authenticated USING ((SELECT auth.uid()) = user_id);
