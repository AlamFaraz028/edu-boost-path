-- Create courses table
CREATE TABLE public.courses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  skill_track TEXT NOT NULL,
  instructor_name TEXT,
  total_lessons INTEGER DEFAULT 0,
  thumbnail_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create student course enrollments
CREATE TABLE public.student_enrollments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID NOT NULL REFERENCES public.student_profiles(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  progress INTEGER DEFAULT 0,
  lessons_completed INTEGER DEFAULT 0,
  enrolled_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(student_id, course_id)
);

-- Create achievements table
CREATE TABLE public.achievements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  icon_name TEXT DEFAULT 'trophy',
  color TEXT DEFAULT 'yellow'
);

-- Create student achievements
CREATE TABLE public.student_achievements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID NOT NULL REFERENCES public.student_profiles(id) ON DELETE CASCADE,
  achievement_id UUID NOT NULL REFERENCES public.achievements(id) ON DELETE CASCADE,
  earned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(student_id, achievement_id)
);

-- Create school profiles table
CREATE TABLE public.school_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  school_name TEXT NOT NULL,
  address TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  onboarding_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create school-student relationship
CREATE TABLE public.school_students (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  school_id UUID NOT NULL REFERENCES public.school_profiles(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES public.student_profiles(id) ON DELETE CASCADE,
  enrolled_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(school_id, student_id)
);

-- Enable RLS
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.school_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.school_students ENABLE ROW LEVEL SECURITY;

-- Courses policies (public read)
CREATE POLICY "Anyone can view courses" ON public.courses FOR SELECT USING (true);

-- Achievements policies (public read)
CREATE POLICY "Anyone can view achievements" ON public.achievements FOR SELECT USING (true);

-- Student enrollments policies
CREATE POLICY "Students can view their enrollments" ON public.student_enrollments FOR SELECT USING (
  EXISTS (SELECT 1 FROM student_profiles sp WHERE sp.id = student_id AND sp.user_id = auth.uid())
);
CREATE POLICY "Students can enroll in courses" ON public.student_enrollments FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM student_profiles sp WHERE sp.id = student_id AND sp.user_id = auth.uid())
);
CREATE POLICY "Students can update their enrollments" ON public.student_enrollments FOR UPDATE USING (
  EXISTS (SELECT 1 FROM student_profiles sp WHERE sp.id = student_id AND sp.user_id = auth.uid())
);

-- Student achievements policies
CREATE POLICY "Students can view their achievements" ON public.student_achievements FOR SELECT USING (
  EXISTS (SELECT 1 FROM student_profiles sp WHERE sp.id = student_id AND sp.user_id = auth.uid())
);

-- School profiles policies
CREATE POLICY "Schools can view their own profile" ON public.school_profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Schools can insert their own profile" ON public.school_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Schools can update their own profile" ON public.school_profiles FOR UPDATE USING (auth.uid() = user_id);

-- School students policies
CREATE POLICY "Schools can view their students" ON public.school_students FOR SELECT USING (
  EXISTS (SELECT 1 FROM school_profiles sp WHERE sp.id = school_id AND sp.user_id = auth.uid())
);
CREATE POLICY "Schools can add students" ON public.school_students FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM school_profiles sp WHERE sp.id = school_id AND sp.user_id = auth.uid())
);
CREATE POLICY "Schools can remove students" ON public.school_students FOR DELETE USING (
  EXISTS (SELECT 1 FROM school_profiles sp WHERE sp.id = school_id AND sp.user_id = auth.uid())
);

-- Insert sample courses
INSERT INTO public.courses (title, description, skill_track, instructor_name, total_lessons) VALUES
('Digital Marketing Fundamentals', 'Learn the basics of digital marketing including SEO, social media, and content marketing', 'Digital Marketing', 'Rahul Sharma', 48),
('Web Development with React', 'Build modern web applications with React and TypeScript', 'Coding', 'Priya Patel', 64),
('UI/UX Design Basics', 'Master the fundamentals of user interface and experience design', 'Design', 'Amit Kumar', 40),
('Financial Planning 101', 'Introduction to personal and business financial planning', 'Finance', 'Sneha Verma', 32),
('AI & Machine Learning Basics', 'Get started with artificial intelligence and machine learning concepts', 'AI & Machine Learning', 'Raj Patel', 56),
('Soft Skills for Success', 'Develop communication, leadership and teamwork skills', 'Soft Skills', 'Ananya Singh', 24);

-- Insert sample achievements
INSERT INTO public.achievements (title, description, icon_name, color) VALUES
('Internship Ready', 'Completed 3 skill tracks', 'trophy', 'yellow'),
('Fast Learner', 'Finished 5 lessons in a day', 'zap', 'blue'),
('Rising Star', 'Top 10% in your batch', 'star', 'purple'),
('First Steps', 'Completed your first course', 'medal', 'green'),
('Consistent Learner', '7-day learning streak', 'flame', 'orange');

-- Triggers for updated_at
CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON public.courses FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_student_enrollments_updated_at BEFORE UPDATE ON public.student_enrollments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_school_profiles_updated_at BEFORE UPDATE ON public.school_profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();