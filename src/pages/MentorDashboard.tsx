import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  GraduationCap, Calendar, Clock, Users, Plus, 
  CheckCircle, XCircle, AlertCircle, Video, Edit, Trash2
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface MentorProfile {
  id: string;
  verification_status: string;
  is_available: boolean;
  expertise_areas: string[];
  hourly_rate: number;
}

interface Session {
  id: string;
  title: string;
  description: string | null;
  session_date: string;
  start_time: string;
  end_time: string;
  session_type: string;
  max_participants: number;
  status: string;
  meeting_link: string | null;
}

const MentorDashboard = () => {
  const [mentorProfile, setMentorProfile] = useState<MentorProfile | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newSession, setNewSession] = useState({
    title: '',
    description: '',
    session_date: '',
    start_time: '',
    end_time: '',
    session_type: 'one-on-one',
    max_participants: 1,
    meeting_link: '',
  });

  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/mentor/auth');
      return;
    }

    if (user) {
      fetchMentorData();
    }
  }, [user, loading, navigate]);

  const fetchMentorData = async () => {
    if (!user) return;
    
    try {
      // Fetch mentor profile
      const { data: profile, error: profileError } = await supabase
        .from('mentor_profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (profileError) throw profileError;
      
      if (!profile) {
        navigate('/mentor/onboarding');
        return;
      }

      setMentorProfile(profile);

      // Fetch sessions
      const { data: sessionsData, error: sessionsError } = await supabase
        .from('mentor_sessions')
        .select('*')
        .eq('mentor_id', profile.id)
        .order('session_date', { ascending: true });

      if (sessionsError) throw sessionsError;
      setSessions(sessionsData || []);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createSession = async () => {
    if (!mentorProfile) return;

    try {
      const { error } = await supabase
        .from('mentor_sessions')
        .insert({
          mentor_id: mentorProfile.id,
          title: newSession.title,
          description: newSession.description || null,
          session_date: newSession.session_date,
          start_time: newSession.start_time,
          end_time: newSession.end_time,
          session_type: newSession.session_type,
          max_participants: newSession.session_type === 'one-on-one' ? 1 : newSession.max_participants,
          meeting_link: newSession.meeting_link || null,
        });

      if (error) throw error;

      toast({
        title: 'Session created',
        description: 'Your session has been scheduled successfully.',
      });

      setIsDialogOpen(false);
      setNewSession({
        title: '',
        description: '',
        session_date: '',
        start_time: '',
        end_time: '',
        session_type: 'one-on-one',
        max_participants: 1,
        meeting_link: '',
      });
      fetchMentorData();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const deleteSession = async (sessionId: string) => {
    try {
      const { error } = await supabase
        .from('mentor_sessions')
        .delete()
        .eq('id', sessionId);

      if (error) throw error;

      toast({
        title: 'Session deleted',
        description: 'The session has been removed.',
      });

      fetchMentorData();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30"><CheckCircle className="w-3 h-3 mr-1" /> Verified</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30"><AlertCircle className="w-3 h-3 mr-1" /> Pending</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30"><XCircle className="w-3 h-3 mr-1" /> Rejected</Badge>;
      default:
        return null;
    }
  };

  const getSessionStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return <Badge variant="outline" className="text-green-400 border-green-500/30">Available</Badge>;
      case 'booked':
        return <Badge variant="outline" className="text-blue-400 border-blue-500/30">Booked</Badge>;
      case 'completed':
        return <Badge variant="outline" className="text-muted-foreground">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="text-red-400 border-red-500/30">Cancelled</Badge>;
      default:
        return null;
    }
  };

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--accent)/0.1),transparent_50%)]" />
      
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <GraduationCap className="w-8 h-8 text-accent" />
            <span className="text-xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              Mentor Dashboard
            </span>
          </div>
          <Button variant="outline" onClick={() => signOut()}>
            Sign Out
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 relative z-10">
        {/* Status Card */}
        <Card className="bg-card/80 backdrop-blur-xl border-border/50 mb-8">
          <CardContent className="py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Welcome back!</h2>
                  <div className="flex items-center gap-2 mt-1">
                    {mentorProfile && getStatusBadge(mentorProfile.verification_status)}
                    {mentorProfile?.hourly_rate && (
                      <span className="text-sm text-muted-foreground">${mentorProfile.hourly_rate}/hour</span>
                    )}
                  </div>
                </div>
              </div>
              
              {mentorProfile?.verification_status === 'verified' && (
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="hero">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Session
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-card border-border/50">
                    <DialogHeader>
                      <DialogTitle>Create New Session</DialogTitle>
                      <DialogDescription>Schedule a new mentoring session for students to book.</DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="session-title">Session Title</Label>
                        <Input
                          id="session-title"
                          placeholder="e.g., Introduction to React"
                          value={newSession.title}
                          onChange={(e) => setNewSession({ ...newSession, title: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="session-description">Description</Label>
                        <Textarea
                          id="session-description"
                          placeholder="What will students learn?"
                          value={newSession.description}
                          onChange={(e) => setNewSession({ ...newSession, description: e.target.value })}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="session-date">Date</Label>
                          <Input
                            id="session-date"
                            type="date"
                            value={newSession.session_date}
                            onChange={(e) => setNewSession({ ...newSession, session_date: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="session-type">Type</Label>
                          <Select
                            value={newSession.session_type}
                            onValueChange={(value) => setNewSession({ ...newSession, session_type: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="one-on-one">One-on-One</SelectItem>
                              <SelectItem value="group">Group</SelectItem>
                              <SelectItem value="workshop">Workshop</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="start-time">Start Time</Label>
                          <Input
                            id="start-time"
                            type="time"
                            value={newSession.start_time}
                            onChange={(e) => setNewSession({ ...newSession, start_time: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="end-time">End Time</Label>
                          <Input
                            id="end-time"
                            type="time"
                            value={newSession.end_time}
                            onChange={(e) => setNewSession({ ...newSession, end_time: e.target.value })}
                          />
                        </div>
                      </div>

                      {newSession.session_type !== 'one-on-one' && (
                        <div className="space-y-2">
                          <Label htmlFor="max-participants">Max Participants</Label>
                          <Input
                            id="max-participants"
                            type="number"
                            min="2"
                            value={newSession.max_participants}
                            onChange={(e) => setNewSession({ ...newSession, max_participants: parseInt(e.target.value) })}
                          />
                        </div>
                      )}

                      <div className="space-y-2">
                        <Label htmlFor="meeting-link">Meeting Link (optional)</Label>
                        <Input
                          id="meeting-link"
                          type="url"
                          placeholder="https://zoom.us/j/..."
                          value={newSession.meeting_link}
                          onChange={(e) => setNewSession({ ...newSession, meeting_link: e.target.value })}
                        />
                      </div>

                      <Button 
                        variant="hero" 
                        className="w-full" 
                        onClick={createSession}
                        disabled={!newSession.title || !newSession.session_date || !newSession.start_time || !newSession.end_time}
                      >
                        Create Session
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Pending Verification Message */}
        {mentorProfile?.verification_status === 'pending' && (
          <Card className="bg-yellow-500/10 border-yellow-500/30 mb-8">
            <CardContent className="py-6">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-yellow-400" />
                <div>
                  <h3 className="font-semibold text-yellow-400">Verification Pending</h3>
                  <p className="text-sm text-muted-foreground">
                    Your profile is under review. You'll be able to create sessions once verified.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Sessions */}
        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming Sessions</TabsTrigger>
            <TabsTrigger value="past">Past Sessions</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            <div className="grid gap-4">
              {sessions.filter(s => s.status === 'available' || s.status === 'booked').length === 0 ? (
                <Card className="bg-card/80 backdrop-blur-xl border-border/50">
                  <CardContent className="py-12 text-center">
                    <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">No upcoming sessions</h3>
                    <p className="text-muted-foreground mb-4">Create your first session to start mentoring students.</p>
                  </CardContent>
                </Card>
              ) : (
                sessions
                  .filter(s => s.status === 'available' || s.status === 'booked')
                  .map((session) => (
                    <Card key={session.id} className="bg-card/80 backdrop-blur-xl border-border/50">
                      <CardContent className="py-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                              <Video className="w-5 h-5 text-accent" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-foreground">{session.title}</h3>
                              <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {new Date(session.session_date).toLocaleDateString()}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {session.start_time} - {session.end_time}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Users className="w-4 h-4" />
                                  {session.session_type}
                                </span>
                              </div>
                              {session.description && (
                                <p className="text-sm text-muted-foreground mt-2">{session.description}</p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {getSessionStatusBadge(session.status)}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive hover:text-destructive"
                              onClick={() => deleteSession(session.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="past">
            <div className="grid gap-4">
              {sessions.filter(s => s.status === 'completed' || s.status === 'cancelled').length === 0 ? (
                <Card className="bg-card/80 backdrop-blur-xl border-border/50">
                  <CardContent className="py-12 text-center">
                    <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">No past sessions</h3>
                    <p className="text-muted-foreground">Completed sessions will appear here.</p>
                  </CardContent>
                </Card>
              ) : (
                sessions
                  .filter(s => s.status === 'completed' || s.status === 'cancelled')
                  .map((session) => (
                    <Card key={session.id} className="bg-card/80 backdrop-blur-xl border-border/50 opacity-75">
                      <CardContent className="py-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                              <Video className="w-5 h-5 text-muted-foreground" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-foreground">{session.title}</h3>
                              <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {new Date(session.session_date).toLocaleDateString()}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {session.start_time} - {session.end_time}
                                </span>
                              </div>
                            </div>
                          </div>
                          {getSessionStatusBadge(session.status)}
                        </div>
                      </CardContent>
                    </Card>
                  ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default MentorDashboard;
