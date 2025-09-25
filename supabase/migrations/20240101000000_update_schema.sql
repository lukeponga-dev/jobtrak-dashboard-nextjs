-- Profiles table (linked to auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  created_at timestamp with time zone DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON public.profiles(user_id);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Applications
CREATE TABLE IF NOT EXISTS public.applications (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  company text NOT NULL,
  role text NOT NULL,
  date timestamp with time zone NOT NULL,
  status text NOT NULL,
  notes text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_applications_user_id ON public.applications(user_id);
CREATE INDEX IF NOT EXISTS idx_applications_status ON public.applications(status);
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- Status history
CREATE TABLE IF NOT EXISTS public.status_history (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  application_id bigint NOT NULL REFERENCES public.applications(id) ON DELETE CASCADE,
  old_status text,
  new_status text,
  changed_at timestamp with time zone DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_status_history_application_id ON public.status_history(application_id);
ALTER TABLE public.status_history ENABLE ROW LEVEL SECURITY;

-- Follow ups
CREATE TABLE IF NOT EXISTS public.follow_ups (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  application_id bigint NOT NULL REFERENCES public.applications(id) ON DELETE CASCADE,
  action_type text NOT NULL,
  action_date timestamp with time zone,
  notes text,
  created_at timestamp with time zone DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_follow_ups_application_id ON public.follow_ups(application_id);
ALTER TABLE public.follow_ups ENABLE ROW LEVEL SECURITY;

-- Tags
CREATE TABLE IF NOT EXISTS public.tags (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  tag_name text NOT NULL UNIQUE
);
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;

-- Application tags (many-to-many)
CREATE TABLE IF NOT EXISTS public.application_tags (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  application_id bigint NOT NULL REFERENCES public.applications(id) ON DELETE CASCADE,
  tag_id bigint NOT NULL REFERENCES public.tags(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_application_tags_application_id ON public.application_tags(application_id);
CREATE INDEX IF NOT EXISTS idx_application_tags_tag_id ON public.application_tags(tag_id);
ALTER TABLE public.application_tags ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Profiles (owner access)
CREATE POLICY "Profiles: select own" ON public.profiles FOR SELECT TO authenticated USING ((SELECT auth.uid()) = user_id);
CREATE POLICY "Profiles: insert own" ON public.profiles FOR INSERT TO authenticated WITH CHECK ((SELECT auth.uid()) = user_id);
CREATE POLICY "Profiles: update own" ON public.profiles FOR UPDATE TO authenticated USING ((SELECT auth.uid()) = user_id) WITH CHECK ((SELECT auth.uid()) = user_id);
CREATE POLICY "Profiles: delete own" ON public.profiles FOR DELETE TO authenticated USING ((SELECT auth.uid()) = user_id);

-- Applications (owner access)
CREATE POLICY "Applications: select own" ON public.applications FOR SELECT TO authenticated USING (user_id = (SELECT auth.uid()));
CREATE POLICY "Applications: insert own" ON public.applications FOR INSERT TO authenticated WITH CHECK (user_id = (SELECT auth.uid()));
CREATE POLICY "Applications: update own" ON public.applications FOR UPDATE TO authenticated USING (user_id = (SELECT auth.uid())) WITH CHECK (user_id = (SELECT auth.uid()));
CREATE POLICY "Applications: delete own" ON public.applications FOR DELETE TO authenticated USING (user_id = (SELECT auth.uid()));

-- StatusHistory (allow when user owns the parent application)
CREATE POLICY "StatusHistory: select if app owner" ON public.status_history FOR SELECT TO authenticated USING (application_id IN (SELECT id FROM public.applications WHERE user_id = (SELECT auth.uid())));
CREATE POLICY "StatusHistory: insert if app owner" ON public.status_history FOR INSERT TO authenticated WITH CHECK (application_id IN (SELECT id FROM public.applications WHERE user_id = (SELECT auth.uid())));
CREATE POLICY "StatusHistory: delete if app owner" ON public.status_history FOR DELETE TO authenticated USING (application_id IN (SELECT id FROM public.applications WHERE user_id = (SELECT auth.uid())));

-- FollowUps (owner of parent application)
CREATE POLICY "FollowUps: select if app owner" ON public.follow_ups FOR SELECT TO authenticated USING (application_id IN (SELECT id FROM public.applications WHERE user_id = (SELECT auth.uid())));
CREATE POLICY "FollowUps: insert if app owner" ON public.follow_ups FOR INSERT TO authenticated WITH CHECK (application_id IN (SELECT id FROM public.applications WHERE user_id = (SELECT auth.uid())));
CREATE POLICY "FollowUps: delete if app owner" ON public.follow_ups FOR DELETE TO authenticated USING (application_id IN (SELECT id FROM public.applications WHERE user_id = (SELECT auth.uid())));

-- Tags: allow read to authenticated, restrict writes to admins (example JWT claim 'user_role' = 'admin')
CREATE POLICY "Tags: select" ON public.tags FOR SELECT TO authenticated USING (true);
CREATE POLICY "Tags: insert admins" ON public.tags FOR INSERT TO authenticated WITH CHECK ((auth.jwt() ->> 'user_role') = 'admin');
CREATE POLICY "Tags: update admins" ON public.tags FOR UPDATE TO authenticated USING (((auth.jwt() ->> 'user_role') = 'admin')) WITH CHECK (((auth.jwt() ->> 'user_role') = 'admin'));
CREATE POLICY "Tags: delete admins" ON public.tags FOR DELETE TO authenticated USING (((auth.jwt() ->> 'user_role') = 'admin'));

-- ApplicationTags: allow operations if application owner
CREATE POLICY "ApplicationTags: select if app owner" ON public.application_tags FOR SELECT TO authenticated USING (application_id IN (SELECT id FROM public.applications WHERE user_id = (SELECT auth.uid())));
CREATE POLICY "ApplicationTags: insert if app owner" ON public.application_tags FOR INSERT TO authenticated WITH CHECK (application_id IN (SELECT id FROM public.applications WHERE user_id = (SELECT auth.uid())));
CREATE POLICY "ApplicationTags: delete if app owner" ON public.application_tags FOR DELETE TO authenticated USING (application_id IN (SELECT id FROM public.applications WHERE user_id = (SELECT auth.uid())));

-- Optional: trigger to update applications.updated_at on change
CREATE OR REPLACE FUNCTION public.set_updated_at() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;
DROP TRIGGER IF EXISTS trg_applications_updated_at ON public.applications;
CREATE TRIGGER trg_applications_updated_at BEFORE UPDATE ON public.applications FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Drop old table
DROP TABLE IF EXISTS public.job_applications;
