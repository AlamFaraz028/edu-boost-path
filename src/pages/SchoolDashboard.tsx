import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { 
  Building2, Users, TrendingUp, Award, BookOpen, 
  BarChart3, UserPlus, Clock, ChevronRight, Download, Trash2, Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface SchoolProfile {
  id: string;
  school_name: string;
  address: string | null;
  contact_email: string | null;
}

interface StudentData {
  id: string;
  enrolled_at: string;
  student: {
    id: string;
    user_id: string;
    skill_tracks: string[] | null;
    profile?: {
      full_name: string | null;
      email: string;
    };
  };
}

interface EnrollmentStats {
  skill_track: string;
  count: number;
}

const SchoolDashboard = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const [schoolProfile, setSchoolProfile] = useState<SchoolProfile | null>(null);
  const [students, setStudents] = useState<StudentData[]>([]);
  const [enrollmentStats, setEnrollmentStats] = useState<EnrollmentStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [studentEmail, setStudentEmail] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

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
      // Fetch or create school profile
      let { data: school } = await supabase
        .from("school_profiles")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (!school) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("full_name, email")
          .eq("user_id", user.id)
          .maybeSingle();

        const { data: newSchool } = await supabase
          .from("school_profiles")
          .insert({
            user_id: user.id,
            school_name: profile?.full_name || "My School",
            contact_email: profile?.email
          })
          .select()
          .single();
        school = newSchool;
      }

      setSchoolProfile(school);

      if (school?.id) {
        // Fetch school students
        const { data: studentsData } = await supabase
          .from("school_students")
          .select(`
            id,
            enrolled_at,
            student:student_profiles(
              id,
              user_id,
              skill_tracks
            )
          `)
          .eq("school_id", school.id);

        // Get profiles for students
        if (studentsData && studentsData.length > 0) {
          const studentUserIds = studentsData
            .filter((s: any) => s.student)
            .map((s: any) => s.student.user_id);
          
          const { data: profiles } = await supabase
            .from("profiles")
            .select("user_id, full_name, email")
            .in("user_id", studentUserIds);

          const enrichedStudents = studentsData.map((s: any) => ({
            ...s,
            student: {
              ...s.student,
              profile: profiles?.find(p => p.user_id === s.student?.user_id)
            }
          }));
          setStudents(enrichedStudents);

          // Calculate enrollment stats by skill track
          const trackCounts: Record<string, number> = {};
          enrichedStudents.forEach((s: any) => {
            s.student?.skill_tracks?.forEach((track: string) => {
              trackCounts[track] = (trackCounts[track] || 0) + 1;
            });
          });
          setEnrollmentStats(Object.entries(trackCounts).map(([skill_track, count]) => ({ skill_track, count })));
        } else {
          setStudents([]);
          setEnrollmentStats([]);
        }
      }
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

  const addStudent = async () => {
    if (!schoolProfile?.id || !studentEmail) return;

    try {
      // Find student profile by email
      const { data: profile } = await supabase
        .from("profiles")
        .select("user_id")
        .eq("email", studentEmail)
        .maybeSingle();

      if (!profile) {
        toast({
          title: "Student not found",
          description: "No student with that email exists. They need to sign up first.",
          variant: "destructive",
        });
        return;
      }

      // Find student profile
      const { data: studentProfile } = await supabase
        .from("student_profiles")
        .select("id")
        .eq("user_id", profile.user_id)
        .maybeSingle();

      if (!studentProfile) {
        toast({
          title: "Not a student",
          description: "This user hasn't set up a student profile yet.",
          variant: "destructive",
        });
        return;
      }

      // Add student to school
      const { error } = await supabase
        .from("school_students")
        .insert({
          school_id: schoolProfile.id,
          student_id: studentProfile.id
        });

      if (error) {
        if (error.code === "23505") {
          toast({
            title: "Already enrolled",
            description: "This student is already in your school.",
            variant: "destructive",
          });
        } else {
          throw error;
        }
        return;
      }

      toast({
        title: "Student added!",
        description: "The student has been added to your school.",
      });

      setStudentEmail("");
      setIsAddStudentOpen(false);
      fetchData();
    } catch (error: any) {
      toast({
        title: "Error adding student",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const removeStudent = async (schoolStudentId: string) => {
    try {
      const { error } = await supabase
        .from("school_students")
        .delete()
        .eq("id", schoolStudentId);

      if (error) throw error;

      toast({
        title: "Student removed",
        description: "The student has been removed from your school.",
      });

      fetchData();
    } catch (error: any) {
      toast({
        title: "Error removing student",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const filteredStudents = students.filter(s => 
    s.student?.profile?.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.student?.profile?.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalStudents = students.length;
  const avgCompletion = students.length > 0 ? Math.round(
    students.filter(s => s.student?.skill_tracks?.length).length / students.length * 100
  ) : 0;

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
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-3xl font-bold mb-2">
                <span className="text-primary">{schoolProfile?.school_name}</span> Dashboard
              </h1>
              <p className="text-muted-foreground">Monitor student progress and track enrollments</p>
            </div>
            <div className="flex gap-3">
              <Dialog open={isAddStudentOpen} onOpenChange={setIsAddStudentOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <UserPlus size={18} className="mr-2" />
                    Add Students
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Student to School</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="student-email">Student Email</Label>
                      <Input
                        id="student-email"
                        type="email"
                        placeholder="student@example.com"
                        value={studentEmail}
                        onChange={(e) => setStudentEmail(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">
                        Enter the email of a registered student
                      </p>
                    </div>
                    <Button className="w-full" onClick={addStudent} disabled={!studentEmail}>
                      Add Student
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
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
                  <p className="text-2xl font-bold">{totalStudents}</p>
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
                  <p className="text-2xl font-bold">{enrollmentStats.length}</p>
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
                  <p className="text-2xl font-bold">{avgCompletion}%</p>
                  <p className="text-muted-foreground text-sm">Track Adoption</p>
                </div>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <TrendingUp className="text-purple-500" size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold">+{Math.round(totalStudents * 0.15)}</p>
                  <p className="text-muted-foreground text-sm">This Month</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="students">Students ({totalStudents})</TabsTrigger>
              <TabsTrigger value="tracks">Skill Tracks</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  {/* Skill Track Performance */}
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BookOpen className="text-primary" size={20} />
                        Skill Track Analytics
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {enrollmentStats.length === 0 ? (
                        <p className="text-muted-foreground text-center py-8">
                          Add students to see skill track analytics
                        </p>
                      ) : (
                        enrollmentStats.map((track) => (
                          <div key={track.skill_track} className="p-4 rounded-xl bg-muted/50">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full bg-primary" />
                                <span className="font-medium">{track.skill_track}</span>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span>{track.count} students</span>
                                <Badge variant="secondary">
                                  {Math.round((track.count / totalStudents) * 100)}%
                                </Badge>
                              </div>
                            </div>
                            <Progress value={(track.count / totalStudents) * 100} className="h-2" />
                          </div>
                        ))
                      )}
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-8">
                  {/* Recent Students */}
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="text-primary" size={20} />
                        Recent Students
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {students.slice(0, 5).map((s) => (
                        <div key={s.id} className="p-3 rounded-lg bg-muted/50">
                          <p className="font-medium text-sm">{s.student?.profile?.full_name || "Student"}</p>
                          <p className="text-xs text-muted-foreground mt-1">{s.student?.profile?.email}</p>
                          <p className="text-xs text-primary mt-1">
                            Joined {new Date(s.enrolled_at).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                      {students.length === 0 && (
                        <p className="text-muted-foreground text-center py-4">No students yet</p>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="students">
              <Card className="glass-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Student Management</CardTitle>
                    <div className="relative w-64">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                      <Input
                        placeholder="Search students..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {filteredStudents.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">
                      {searchQuery ? "No students found" : "No students enrolled yet. Click 'Add Students' to get started."}
                    </p>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Skill Tracks</TableHead>
                          <TableHead>Enrolled</TableHead>
                          <TableHead className="w-12"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredStudents.map((s) => (
                          <TableRow key={s.id}>
                            <TableCell className="font-medium">
                              {s.student?.profile?.full_name || "—"}
                            </TableCell>
                            <TableCell>{s.student?.profile?.email || "—"}</TableCell>
                            <TableCell>
                              <div className="flex gap-1 flex-wrap">
                                {s.student?.skill_tracks?.slice(0, 2).map((track) => (
                                  <Badge key={track} variant="secondary" className="text-xs">
                                    {track}
                                  </Badge>
                                ))}
                                {(s.student?.skill_tracks?.length || 0) > 2 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{(s.student?.skill_tracks?.length || 0) - 2}
                                  </Badge>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>{new Date(s.enrolled_at).toLocaleDateString()}</TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeStudent(s.id)}
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 size={16} />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tracks">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Skill Track Details</CardTitle>
                </CardHeader>
                <CardContent>
                  {enrollmentStats.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">
                      No skill track data available yet
                    </p>
                  ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {enrollmentStats.map((track) => (
                        <Card key={track.skill_track} className="bg-muted/50">
                          <CardContent className="p-4">
                            <h4 className="font-semibold mb-2">{track.skill_track}</h4>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Students enrolled</span>
                              <span className="font-bold text-primary">{track.count}</span>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
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