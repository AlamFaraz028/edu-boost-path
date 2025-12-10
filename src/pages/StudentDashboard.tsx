import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { 
  BookOpen, Award, Brain, TrendingUp, Clock, Star, 
  ChevronRight, Play, Target, Zap, Trophy, Medal, Plus, Flame
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface StudentProfile {
  id: string;
  full_name: string | null;
  skill_tracks: string[] | null;
  interests: string[] | null;
}

interface Course {
  id: string;
  title: string;
  description: string | null;
  skill_track: string;
  instructor_name: string | null;
  total_lessons: number;
}

interface Enrollment {
  id: string;
  course_id: string;
  progress: number;
  lessons_completed: number;
  course: Course;
}

interface Achievement {
  id: string;
  title: string;
  description: string | null;
  icon_name: string;
  color: string;
  earned_at?: string;
}

const iconMap: Record<string, typeof Trophy> = {
  trophy: Trophy,
  zap: Zap,
  star: Star,
  medal: Medal,
  flame: Flame,
};

const colorMap: Record<string, string> = {
  yellow: "text-yellow-500",
  blue: "text-blue-500",
  purple: "text-purple-500",
  green: "text-green-500",
  orange: "text-orange-500",
};

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [availableCourses, setAvailableCourses] = useState<Course[]>([]);
  const [isEnrollDialogOpen, setIsEnrollDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    if (!user) return;
    setIsLoading(true);

    try {
      // Fetch profile
      const { data: profileData } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("user_id", user.id)
        .maybeSingle();

      // Fetch or create student profile
      let { data: studentData } = await supabase
        .from("student_profiles")
        .select("id, skill_tracks, interests")
        .eq("user_id", user.id)
        .maybeSingle();

      if (!studentData) {
        const { data: newStudent } = await supabase
          .from("student_profiles")
          .insert({ user_id: user.id })
          .select("id, skill_tracks, interests")
          .single();
        studentData = newStudent;
      }

      setProfile({
        id: studentData?.id || "",
        full_name: profileData?.full_name || user.email?.split("@")[0] || "Student",
        skill_tracks: studentData?.skill_tracks || [],
        interests: studentData?.interests || []
      });

      if (studentData?.id) {
        // Fetch enrollments with course data
        const { data: enrollmentData } = await supabase
          .from("student_enrollments")
          .select(`
            id,
            course_id,
            progress,
            lessons_completed,
            course:courses(id, title, description, skill_track, instructor_name, total_lessons)
          `)
          .eq("student_id", studentData.id);

        const formattedEnrollments = (enrollmentData || []).map((e: any) => ({
          id: e.id,
          course_id: e.course_id,
          progress: e.progress,
          lessons_completed: e.lessons_completed,
          course: e.course
        }));
        setEnrollments(formattedEnrollments);

        // Fetch student achievements
        const { data: studentAchievements } = await supabase
          .from("student_achievements")
          .select(`
            earned_at,
            achievement:achievements(id, title, description, icon_name, color)
          `)
          .eq("student_id", studentData.id);

        const formattedAchievements = (studentAchievements || []).map((sa: any) => ({
          ...sa.achievement,
          earned_at: sa.earned_at
        }));
        setAchievements(formattedAchievements);
      }

      // Fetch available courses for enrollment
      const { data: coursesData } = await supabase
        .from("courses")
        .select("*");
      setAvailableCourses(coursesData || []);

    } catch (error: any) {
      toast({
        title: "Error loading data",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const enrollInCourse = async (courseId: string) => {
    if (!profile?.id) return;

    try {
      const { error } = await supabase
        .from("student_enrollments")
        .insert({
          student_id: profile.id,
          course_id: courseId,
          progress: 0,
          lessons_completed: 0
        });

      if (error) throw error;

      toast({
        title: "Enrolled successfully!",
        description: "You've been enrolled in the course.",
      });

      setIsEnrollDialogOpen(false);
      fetchData();
    } catch (error: any) {
      toast({
        title: "Error enrolling",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const updateProgress = async (enrollmentId: string, currentProgress: number, totalLessons: number) => {
    const newLessonsCompleted = Math.min(currentProgress + 1, totalLessons);
    const newProgress = Math.round((newLessonsCompleted / totalLessons) * 100);

    try {
      const { error } = await supabase
        .from("student_enrollments")
        .update({
          lessons_completed: newLessonsCompleted,
          progress: newProgress
        })
        .eq("id", enrollmentId);

      if (error) throw error;

      toast({
        title: "Progress updated!",
        description: `Lesson completed. ${newProgress}% done.`,
      });

      fetchData();
    } catch (error: any) {
      toast({
        title: "Error updating progress",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const enrolledCourseIds = enrollments.map(e => e.course_id);
  const unenrolledCourses = availableCourses.filter(c => !enrolledCourseIds.includes(c.id));

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Welcome Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-3xl font-bold mb-2">
                Welcome back, <span className="text-primary">{profile?.full_name}</span>!
              </h1>
              <p className="text-muted-foreground">Continue your learning journey and unlock new achievements.</p>
            </div>
            <Dialog open={isEnrollDialogOpen} onOpenChange={setIsEnrollDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus size={18} className="mr-2" />
                  Enroll in Course
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Available Courses</DialogTitle>
                </DialogHeader>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {unenrolledCourses.length === 0 ? (
                    <p className="text-muted-foreground text-center py-4">You're enrolled in all available courses!</p>
                  ) : (
                    unenrolledCourses.map((course) => (
                      <div key={course.id} className="p-4 rounded-xl bg-muted/50 flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">{course.title}</h4>
                          <p className="text-sm text-muted-foreground">{course.skill_track} • {course.total_lessons} lessons</p>
                        </div>
                        <Button size="sm" onClick={() => enrollInCourse(course.id)}>Enroll</Button>
                      </div>
                    ))
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="glass-card">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <BookOpen className="text-primary" size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{enrollments.length}</p>
                  <p className="text-muted-foreground text-sm">Active Courses</p>
                </div>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <Award className="text-green-500" size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{enrollments.reduce((acc, e) => acc + e.lessons_completed, 0)}</p>
                  <p className="text-muted-foreground text-sm">Lessons Done</p>
                </div>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                  <Trophy className="text-yellow-500" size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{achievements.length}</p>
                  <p className="text-muted-foreground text-sm">Achievements</p>
                </div>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <Clock className="text-purple-500" size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {enrollments.length > 0 
                      ? Math.round(enrollments.reduce((acc, e) => acc + e.progress, 0) / enrollments.length) 
                      : 0}%
                  </p>
                  <p className="text-muted-foreground text-sm">Avg Progress</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Active Courses */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="text-primary" size={20} />
                    Your Courses
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {enrollments.length === 0 ? (
                    <div className="text-center py-8">
                      <BookOpen className="mx-auto text-muted-foreground mb-4" size={48} />
                      <p className="text-muted-foreground">No courses yet. Enroll in a course to get started!</p>
                    </div>
                  ) : (
                    enrollments.map((enrollment) => (
                      <div key={enrollment.id} className="p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-semibold">{enrollment.course.title}</h4>
                            <p className="text-sm text-muted-foreground">by {enrollment.course.instructor_name}</p>
                          </div>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="text-primary"
                            onClick={() => updateProgress(enrollment.id, enrollment.lessons_completed, enrollment.course.total_lessons)}
                            disabled={enrollment.progress >= 100}
                          >
                            <Play size={16} className="mr-1" /> {enrollment.progress >= 100 ? "Completed" : "Continue"}
                          </Button>
                        </div>
                        <div className="flex items-center gap-4">
                          <Progress value={enrollment.progress} className="flex-1" />
                          <span className="text-sm text-muted-foreground">
                            {enrollment.lessons_completed}/{enrollment.course.total_lessons} lessons
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>

              {/* AI Recommendations */}
              <Card className="glass-card border-primary/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="text-primary" size={20} />
                    AI Mentor Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {enrollments.length > 0 ? (
                    <>
                      {enrollments.filter(e => e.progress > 50 && e.progress < 100).slice(0, 2).map((e) => (
                        <div key={e.id} className="p-3 rounded-lg border-l-4 border-primary bg-primary/10">
                          <p className="font-medium text-sm">Complete {e.course.title}</p>
                          <p className="text-xs text-muted-foreground mt-1">You're {e.progress}% done - finish strong!</p>
                        </div>
                      ))}
                      {unenrolledCourses.slice(0, 2).map((course) => (
                        <div key={course.id} className="p-3 rounded-lg border-l-4 border-muted-foreground/30 bg-muted/50">
                          <p className="font-medium text-sm">Try {course.title}</p>
                          <p className="text-xs text-muted-foreground mt-1">Expand your skills in {course.skill_track}</p>
                        </div>
                      ))}
                    </>
                  ) : (
                    <p className="text-muted-foreground text-center py-4">Enroll in courses to get personalized recommendations</p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Achievements */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Medal className="text-primary" size={20} />
                    Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {achievements.length === 0 ? (
                    <p className="text-muted-foreground text-center py-4">Complete courses to earn achievements!</p>
                  ) : (
                    achievements.map((achievement) => {
                      const IconComponent = iconMap[achievement.icon_name] || Trophy;
                      return (
                        <div key={achievement.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                          <div className={`w-10 h-10 rounded-full bg-muted flex items-center justify-center ${colorMap[achievement.color] || "text-yellow-500"}`}>
                            <IconComponent size={20} />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{achievement.title}</p>
                            <p className="text-xs text-muted-foreground">{achievement.description}</p>
                          </div>
                        </div>
                      );
                    })
                  )}
                </CardContent>
              </Card>

              {/* Skill Tracks */}
              {profile?.skill_tracks && profile.skill_tracks.length > 0 && (
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="text-primary" size={20} />
                      Your Tracks
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {profile.skill_tracks.map((track) => (
                        <Badge key={track} variant="secondary">{track}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;