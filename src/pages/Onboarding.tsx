import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { Zap, ArrowLeft, ArrowRight, Check, Code, Palette, TrendingUp, Briefcase, GraduationCap, Users } from 'lucide-react';

const stepOneSchema = z.object({
  phone: z.string().min(10, 'Phone number must be at least 10 digits').max(15).optional().or(z.literal('')),
  dateOfBirth: z.string().optional(),
  schoolName: z.string().min(2, 'School name is required').max(200),
  gradeLevel: z.string().min(1, 'Grade level is required'),
});

const skillTracks = [
  { id: 'coding', label: 'Coding & Development', icon: Code, description: 'Web, mobile, and software development' },
  { id: 'design', label: 'Design & Creativity', icon: Palette, description: 'UI/UX, graphic design, and multimedia' },
  { id: 'marketing', label: 'Digital Marketing', icon: TrendingUp, description: 'SEO, social media, and content creation' },
  { id: 'business', label: 'Business & Finance', icon: Briefcase, description: 'Entrepreneurship and financial literacy' },
  { id: 'data', label: 'Data Science', icon: GraduationCap, description: 'Analytics, AI, and machine learning' },
  { id: 'leadership', label: 'Leadership & Communication', icon: Users, description: 'Soft skills and team management' },
];

const interests = [
  'Technology', 'Arts', 'Sports', 'Music', 'Science', 'Writing', 
  'Gaming', 'Photography', 'Social Media', 'Entrepreneurship', 'Environment', 'Health'
];

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    phone: '',
    dateOfBirth: '',
    schoolName: '',
    gradeLevel: '',
    selectedTracks: [] as string[],
    selectedInterests: [] as string[],
    bio: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    const checkOnboarding = async () => {
      if (user) {
        const { data } = await supabase
          .from('student_profiles')
          .select('onboarding_completed')
          .eq('user_id', user.id)
          .maybeSingle();
        
        if (data?.onboarding_completed) {
          navigate('/');
        }
      }
    };
    checkOnboarding();
  }, [user, navigate]);

  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  const handleNextStep = () => {
    if (step === 1) {
      const result = stepOneSchema.safeParse(formData);
      if (!result.success) {
        const fieldErrors: Record<string, string> = {};
        result.error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(fieldErrors);
        return;
      }
    }
    if (step === 2 && formData.selectedTracks.length === 0) {
      toast({
        title: 'Select at least one skill track',
        description: 'Choose the skills you want to learn.',
        variant: 'destructive',
      });
      return;
    }
    setErrors({});
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const toggleTrack = (trackId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedTracks: prev.selectedTracks.includes(trackId)
        ? prev.selectedTracks.filter(t => t !== trackId)
        : [...prev.selectedTracks, trackId]
    }));
  };

  const toggleInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      selectedInterests: prev.selectedInterests.includes(interest)
        ? prev.selectedInterests.filter(i => i !== interest)
        : [...prev.selectedInterests, interest]
    }));
  };

  const handleComplete = async () => {
    if (!user) return;
    
    setIsLoading(true);
    
    const { error } = await supabase
      .from('student_profiles')
      .upsert({
        user_id: user.id,
        phone: formData.phone || null,
        date_of_birth: formData.dateOfBirth || null,
        school_name: formData.schoolName,
        grade_level: formData.gradeLevel,
        skill_tracks: formData.selectedTracks,
        interests: formData.selectedInterests,
        bio: formData.bio || null,
        onboarding_completed: true,
      });

    setIsLoading(false);

    if (error) {
      toast({
        title: 'Error saving profile',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Welcome aboard!',
        description: 'Your profile is complete. Start exploring courses!',
      });
      navigate('/');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-primary">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.15),transparent_50%)]" />
      
      <div className="w-full max-w-2xl relative z-10">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Zap className="w-8 h-8 text-primary" />
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            NEXUS
          </span>
        </div>
        
        <Progress value={progress} className="mb-6 h-2" />
        
        <Card className="bg-card/80 backdrop-blur-xl border-border/50">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">
              {step === 1 && 'Tell us about yourself'}
              {step === 2 && 'Choose your skill tracks'}
              {step === 3 && 'Almost done!'}
            </CardTitle>
            <CardDescription>
              {step === 1 && 'Step 1 of 3 - Basic Information'}
              {step === 2 && 'Step 2 of 3 - Select the skills you want to master'}
              {step === 3 && 'Step 3 of 3 - Interests & Bio'}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {step === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number (Optional)</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={errors.phone ? 'border-destructive' : ''}
                    />
                    {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth (Optional)</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="schoolName">School/Institution Name *</Label>
                  <Input
                    id="schoolName"
                    type="text"
                    placeholder="Enter your school or institution name"
                    value={formData.schoolName}
                    onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                    className={errors.schoolName ? 'border-destructive' : ''}
                  />
                  {errors.schoolName && <p className="text-sm text-destructive">{errors.schoolName}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="gradeLevel">Grade/Year *</Label>
                  <Input
                    id="gradeLevel"
                    type="text"
                    placeholder="e.g., 10th Grade, 2nd Year B.Tech"
                    value={formData.gradeLevel}
                    onChange={(e) => setFormData({ ...formData, gradeLevel: e.target.value })}
                    className={errors.gradeLevel ? 'border-destructive' : ''}
                  />
                  {errors.gradeLevel && <p className="text-sm text-destructive">{errors.gradeLevel}</p>}
                </div>
              </div>
            )}
            
            {step === 2 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skillTracks.map((track) => {
                  const Icon = track.icon;
                  const isSelected = formData.selectedTracks.includes(track.id);
                  return (
                    <button
                      key={track.id}
                      onClick={() => toggleTrack(track.id)}
                      className={`p-4 rounded-lg border text-left transition-all ${
                        isSelected
                          ? 'bg-primary/20 border-primary shadow-[0_0_15px_hsl(var(--primary)/0.3)]'
                          : 'bg-card/50 border-border/50 hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${isSelected ? 'bg-primary/30' : 'bg-muted'}`}>
                          <Icon className={`w-5 h-5 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-foreground">{track.label}</h3>
                            {isSelected && <Check className="w-4 h-4 text-primary" />}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{track.description}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
            
            {step === 3 && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label>Your Interests (Optional)</Label>
                  <div className="flex flex-wrap gap-2">
                    {interests.map((interest) => {
                      const isSelected = formData.selectedInterests.includes(interest);
                      return (
                        <button
                          key={interest}
                          onClick={() => toggleInterest(interest)}
                          className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                            isSelected
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-muted-foreground hover:bg-muted/80'
                          }`}
                        >
                          {interest}
                        </button>
                      );
                    })}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio">Short Bio (Optional)</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell us a bit about yourself, your goals, and what you hope to achieve..."
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    rows={4}
                  />
                </div>
              </div>
            )}
            
            <div className="flex justify-between mt-8">
              {step > 1 ? (
                <Button variant="outline" onClick={handlePrevStep}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              ) : (
                <div />
              )}
              
              {step < totalSteps ? (
                <Button variant="hero" onClick={handleNextStep}>
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button variant="hero" onClick={handleComplete} disabled={isLoading}>
                  {isLoading ? 'Saving...' : 'Complete Setup'}
                  <Check className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;
