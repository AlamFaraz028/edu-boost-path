import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { 
  BookOpen, Award, Brain, TrendingUp, Clock, Star, 
  ChevronRight, Play, Target, Zap, Trophy, Medal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";

interface StudentProfile {
  full_name: string | null;
  skill_tracks: string[] | null;
  interests: string[] | null;
}

const enrolledCourses = [
  { id: 1, title: "Digital Marketing Fundamentals", progress: 75, lessons: 48, completed: 36, instructor: "Rahul Sharma" },
  { id: 2, title: "Web Development with React", progress: 45, lessons: 64, completed: 29, instructor: "Priya Patel" },
  { id: 3, title: "UI/UX Design Basics", progress: 20, lessons: 40, completed: 8, instructor: "Amit Kumar" }
];

const achievements = [
  { id: 1, title: "Internship Ready", icon: Trophy, color: "text-yellow-500", description: "Completed 3 skill tracks" },
  { id: 2, title: "Fast Learner", icon: Zap, color: "text-blue-500", description: "Finished 5 lessons in a day" },
  { id: 3, title: "Rising Star", icon: Star, color: "text-purple-500", description: "Top 10% in your batch" }
];

const aiRecommendations = [
  { id: 1, title: "Complete your SEO module", reason: "You're 80% done - finish strong!", priority: "high" },
  { id: 2, title: "Try the Finance track", reason: "Matches your interest in trading", priority: "medium" },
  { id: 3, title: "Join the live session", reason: "React workshop tomorrow at 4 PM", priority: "high" }
];

const projectChallenge = {
  title: "The Coffee Shop Challenge",
  description: "Help a local coffee shop build their online presence",
  skills: [
    { name: "Strategy", progress: 60, icon: Target },
    { name: "SEO", progress: 40, icon: TrendingUp },
    { name: "Analytics", progress: 25, icon: Brain },
    { name: "Budget", progress: 80, icon: Award }
  ],
  deadline: "5 days left"
};

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [profile, setProfile] = useState<StudentProfile | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const { data: profileData } = await supabase
          .from("profiles")
          .select("full_name")
          .eq("user_id", user.id)
          .single();

        const { data: studentData } = await supabase
          .from("student_profiles")
          .select("skill_tracks, interests")
          .eq("user_id", user.id)
          .single();

        setProfile({
          full_name: profileData?.full_name || user.email?.split("@")[0] || "Student",
          skill_tracks: studentData?.skill_tracks || [],
          interests: studentData?.interests || []
        });
      }
    };

    fetchProfile();
  }, [user]);

  if (loading) {
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
          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold mb-2">
              Welcome back, <span className="text-primary">{profile?.full_name}</span>!
            </h1>
            <p className="text-muted-foreground">Continue your learning journey and unlock new achievements.</p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="glass-card">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <BookOpen className="text-primary" size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold">3</p>
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
                  <p className="text-2xl font-bold">73</p>
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
                  <p className="text-2xl font-bold">5</p>
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
                  <p className="text-2xl font-bold">24h</p>
                  <p className="text-muted-foreground text-sm">Learning Time</p>
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
                  {enrolledCourses.map((course) => (
                    <div key={course.id} className="p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold">{course.title}</h4>
                          <p className="text-sm text-muted-foreground">by {course.instructor}</p>
                        </div>
                        <Button size="sm" variant="ghost" className="text-primary">
                          <Play size={16} className="mr-1" /> Continue
                        </Button>
                      </div>
                      <div className="flex items-center gap-4">
                        <Progress value={course.progress} className="flex-1" />
                        <span className="text-sm text-muted-foreground">
                          {course.completed}/{course.lessons} lessons
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Project Challenge */}
              <Card className="glass-card border-primary/30">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Target className="text-primary" size={20} />
                      Project Challenge
                    </CardTitle>
                    <Badge variant="secondary">{projectChallenge.deadline}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="text-xl font-bold mb-2">{projectChallenge.title}</h3>
                  <p className="text-muted-foreground mb-6">{projectChallenge.description}</p>
                  <div className="grid grid-cols-2 gap-4">
                    {projectChallenge.skills.map((skill) => (
                      <div key={skill.name} className="p-3 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-2 mb-2">
                          <skill.icon size={16} className="text-primary" />
                          <span className="font-medium text-sm">{skill.name}</span>
                        </div>
                        <Progress value={skill.progress} className="h-2" />
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-6">
                    Continue Challenge
                    <ChevronRight size={18} className="ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* AI Recommendations */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="text-primary" size={20} />
                    AI Mentor
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {aiRecommendations.map((rec) => (
                    <div 
                      key={rec.id} 
                      className={`p-3 rounded-lg border-l-4 ${
                        rec.priority === "high" ? "border-primary bg-primary/10" : "border-muted-foreground/30 bg-muted/50"
                      }`}
                    >
                      <p className="font-medium text-sm">{rec.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{rec.reason}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Achievements */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Medal className="text-primary" size={20} />
                    Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {achievements.map((achievement) => (
                    <div key={achievement.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <div className={`w-10 h-10 rounded-full bg-muted flex items-center justify-center ${achievement.color}`}>
                        <achievement.icon size={20} />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{achievement.title}</p>
                        <p className="text-xs text-muted-foreground">{achievement.description}</p>
                      </div>
                    </div>
                  ))}
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