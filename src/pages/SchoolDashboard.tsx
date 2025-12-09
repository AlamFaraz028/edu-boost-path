import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { 
  Building2, Users, TrendingUp, Award, BookOpen, 
  BarChart3, UserPlus, Clock, ChevronRight, Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";

const enrollmentData = [
  { month: "Jan", students: 45 },
  { month: "Feb", students: 62 },
  { month: "Mar", students: 78 },
  { month: "Apr", students: 95 },
  { month: "May", students: 120 },
  { month: "Jun", students: 145 }
];

const skillTrackStats = [
  { name: "Digital Marketing", enrolled: 85, completion: 72, color: "bg-green-500" },
  { name: "Web Development", enrolled: 65, completion: 58, color: "bg-blue-500" },
  { name: "UI/UX Design", enrolled: 45, completion: 80, color: "bg-pink-500" },
  { name: "Finance", enrolled: 35, completion: 65, color: "bg-yellow-500" },
  { name: "Soft Skills", enrolled: 55, completion: 88, color: "bg-teal-500" }
];

const recentActivity = [
  { id: 1, student: "Arjun Kumar", action: "Completed Digital Marketing Module 5", time: "2 hours ago" },
  { id: 2, student: "Priya Singh", action: "Earned 'Fast Learner' badge", time: "4 hours ago" },
  { id: 3, student: "Rahul Verma", action: "Started Web Development track", time: "5 hours ago" },
  { id: 4, student: "Sneha Patel", action: "Submitted Coffee Shop Challenge", time: "1 day ago" },
  { id: 5, student: "Amit Sharma", action: "Completed certification exam", time: "1 day ago" }
];

const topPerformers = [
  { rank: 1, name: "Priya Singh", score: 98, courses: 4 },
  { rank: 2, name: "Arjun Kumar", score: 95, courses: 3 },
  { rank: 3, name: "Sneha Patel", score: 92, courses: 4 },
  { rank: 4, name: "Rahul Verma", score: 89, courses: 2 },
  { rank: 5, name: "Amit Sharma", score: 87, courses: 3 }
];

const SchoolDashboard = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [schoolName, setSchoolName] = useState("Your School");

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const { data } = await supabase
          .from("profiles")
          .select("full_name")
          .eq("user_id", user.id)
          .single();
        
        if (data?.full_name) {
          setSchoolName(data.full_name);
        }
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

  const maxEnrollment = Math.max(...enrollmentData.map(d => d.students));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-3xl font-bold mb-2">
                <span className="text-primary">{schoolName}</span> Dashboard
              </h1>
              <p className="text-muted-foreground">Monitor student progress and track enrollments</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <Download size={18} className="mr-2" />
                Export Report
              </Button>
              <Button>
                <UserPlus size={18} className="mr-2" />
                Add Students
              </Button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="glass-card">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Users className="text-primary" size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold">285</p>
                  <p className="text-muted-foreground text-sm">Total Students</p>
                </div>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <BookOpen className="text-green-500" size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold">5</p>
                  <p className="text-muted-foreground text-sm">Active Tracks</p>
                </div>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                  <Award className="text-yellow-500" size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold">72%</p>
                  <p className="text-muted-foreground text-sm">Avg Completion</p>
                </div>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <TrendingUp className="text-purple-500" size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold">+23%</p>
                  <p className="text-muted-foreground text-sm">Growth Rate</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="students">Students</TabsTrigger>
              <TabsTrigger value="tracks">Skill Tracks</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Enrollment Chart */}
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="text-primary" size={20} />
                        Enrollment Trends
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-end justify-between h-48 gap-4">
                        {enrollmentData.map((data) => (
                          <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                            <div 
                              className="w-full bg-primary/80 rounded-t-lg transition-all hover:bg-primary"
                              style={{ height: `${(data.students / maxEnrollment) * 100}%` }}
                            />
                            <span className="text-xs text-muted-foreground">{data.month}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Skill Track Performance */}
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BookOpen className="text-primary" size={20} />
                        Skill Track Analytics
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {skillTrackStats.map((track) => (
                        <div key={track.name} className="p-4 rounded-xl bg-muted/50">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className={`w-3 h-3 rounded-full ${track.color}`} />
                              <span className="font-medium">{track.name}</span>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>{track.enrolled} enrolled</span>
                              <Badge variant="secondary">{track.completion}% completion</Badge>
                            </div>
                          </div>
                          <Progress value={track.completion} className="h-2" />
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-8">
                  {/* Top Performers */}
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Award className="text-primary" size={20} />
                        Top Performers
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {topPerformers.map((student) => (
                        <div key={student.rank} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                            student.rank === 1 ? "bg-yellow-500/20 text-yellow-500" :
                            student.rank === 2 ? "bg-gray-400/20 text-gray-400" :
                            student.rank === 3 ? "bg-orange-500/20 text-orange-500" :
                            "bg-muted text-muted-foreground"
                          }`}>
                            {student.rank}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-sm">{student.name}</p>
                            <p className="text-xs text-muted-foreground">{student.courses} courses</p>
                          </div>
                          <span className="font-bold text-primary">{student.score}</span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Recent Activity */}
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="text-primary" size={20} />
                        Recent Activity
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {recentActivity.slice(0, 4).map((activity) => (
                        <div key={activity.id} className="p-3 rounded-lg bg-muted/50">
                          <p className="font-medium text-sm">{activity.student}</p>
                          <p className="text-xs text-muted-foreground mt-1">{activity.action}</p>
                          <p className="text-xs text-primary mt-1">{activity.time}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="students">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Student Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Student list and management features coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tracks">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Skill Track Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Detailed track analytics coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default SchoolDashboard;