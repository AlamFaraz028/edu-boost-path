-- Create mentor_profiles table
CREATE TABLE public.mentor_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  phone TEXT,
  bio TEXT,
  expertise_areas TEXT[],
  years_of_experience INTEGER,
  hourly_rate DECIMAL(10,2),
  linkedin_url TEXT,
  portfolio_url TEXT,
  verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected')),
  is_available BOOLEAN DEFAULT true,
  onboarding_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create mentor_qualifications table
CREATE TABLE public.mentor_qualifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mentor_id UUID REFERENCES public.mentor_profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  institution TEXT NOT NULL,
  year_obtained INTEGER,
  certificate_url TEXT,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create mentor_sessions table
CREATE TABLE public.mentor_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mentor_id UUID REFERENCES public.mentor_profiles(id) ON DELETE CASCADE NOT NULL,
  student_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  session_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  session_type TEXT DEFAULT 'one-on-one' CHECK (session_type IN ('one-on-one', 'group', 'workshop')),
  max_participants INTEGER DEFAULT 1,
  status TEXT DEFAULT 'available' CHECK (status IN ('available', 'booked', 'completed', 'cancelled')),
  meeting_link TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.mentor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentor_qualifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentor_sessions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for mentor_profiles
CREATE POLICY "Anyone can view verified mentors"
ON public.mentor_profiles FOR SELECT
USING (verification_status = 'verified' OR auth.uid() = user_id);

CREATE POLICY "Mentors can update their own profile"
ON public.mentor_profiles FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Mentors can insert their own profile"
ON public.mentor_profiles FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- RLS Policies for mentor_qualifications
CREATE POLICY "Anyone can view qualifications of verified mentors"
ON public.mentor_qualifications FOR SELECT
USING (EXISTS (
  SELECT 1 FROM public.mentor_profiles mp 
  WHERE mp.id = mentor_id 
  AND (mp.verification_status = 'verified' OR mp.user_id = auth.uid())
));

CREATE POLICY "Mentors can manage their own qualifications"
ON public.mentor_qualifications FOR INSERT
WITH CHECK (EXISTS (
  SELECT 1 FROM public.mentor_profiles mp 
  WHERE mp.id = mentor_id AND mp.user_id = auth.uid()
));

CREATE POLICY "Mentors can update their own qualifications"
ON public.mentor_qualifications FOR UPDATE
USING (EXISTS (
  SELECT 1 FROM public.mentor_profiles mp 
  WHERE mp.id = mentor_id AND mp.user_id = auth.uid()
));

CREATE POLICY "Mentors can delete their own qualifications"
ON public.mentor_qualifications FOR DELETE
USING (EXISTS (
  SELECT 1 FROM public.mentor_profiles mp 
  WHERE mp.id = mentor_id AND mp.user_id = auth.uid()
));

-- RLS Policies for mentor_sessions
CREATE POLICY "Anyone can view available sessions"
ON public.mentor_sessions FOR SELECT
USING (status = 'available' OR EXISTS (
  SELECT 1 FROM public.mentor_profiles mp 
  WHERE mp.id = mentor_id AND mp.user_id = auth.uid()
) OR student_id = auth.uid());

CREATE POLICY "Mentors can create sessions"
ON public.mentor_sessions FOR INSERT
WITH CHECK (EXISTS (
  SELECT 1 FROM public.mentor_profiles mp 
  WHERE mp.id = mentor_id AND mp.user_id = auth.uid()
));

CREATE POLICY "Mentors can update their sessions"
ON public.mentor_sessions FOR UPDATE
USING (EXISTS (
  SELECT 1 FROM public.mentor_profiles mp 
  WHERE mp.id = mentor_id AND mp.user_id = auth.uid()
));

CREATE POLICY "Mentors can delete their sessions"
ON public.mentor_sessions FOR DELETE
USING (EXISTS (
  SELECT 1 FROM public.mentor_profiles mp 
  WHERE mp.id = mentor_id AND mp.user_id = auth.uid()
));

-- Triggers for timestamp updates
CREATE TRIGGER update_mentor_profiles_updated_at
  BEFORE UPDATE ON public.mentor_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_mentor_sessions_updated_at
  BEFORE UPDATE ON public.mentor_sessions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();