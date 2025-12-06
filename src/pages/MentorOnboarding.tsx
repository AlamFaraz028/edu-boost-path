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
import { useToast } from '@/hooks/use-toast';
import { GraduationCap, User, Briefcase, Award, Calendar, ArrowRight, ArrowLeft, CheckCircle, Plus, X } from 'lucide-react';
import { z } from 'zod';

const expertiseAreas = [
  'Web Development', 'Mobile Development', 'Data Science', 'Machine Learning',
  'UI/UX Design', 'Cloud Computing', 'Cybersecurity', 'DevOps',
  'Blockchain', 'Game Development', 'Digital Marketing', 'Product Management'
];

const profileSchema = z.object({
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  bio: z.string().min(50, 'Bio must be at least 50 characters').max(500),
  expertise_areas: z.array(z.string()).min(1, 'Select at least one expertise area'),
  years_of_experience: z.number().min(1, 'Experience must be at least 1 year'),
  hourly_rate: z.number().min(0, 'Rate must be positive'),
  linkedin_url: z.string().url('Invalid LinkedIn URL').optional().or(z.literal('')),
  portfolio_url: z.string().url('Invalid portfolio URL').optional().or(z.literal('')),
});

const qualificationSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  institution: z.string().min(2, 'Institution is required'),
  year_obtained: z.number().min(1950).max(new Date().getFullYear()),
});

interface Qualification {
  title: string;
  institution: string;
  year_obtained: number;
  certificate_url?: string;
}

const MentorOnboarding = () => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [profileData, setProfileData] = useState({
    phone: '',
    bio: '',
    expertise_areas: [] as string[],
    years_of_experience: 0,
    hourly_rate: 0,
    linkedin_url: '',
    portfolio_url: '',
  });

  const [qualifications, setQualifications] = useState<Qualification[]>([]);
  const [newQualification, setNewQualification] = useState<Qualification>({
    title: '',
    institution: '',
    year_obtained: new Date().getFullYear(),
  });

  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/mentor/auth');
    }
  }, [user, loading, navigate]);

  const toggleExpertise = (area: string) => {
    setProfileData(prev => ({
      ...prev,
      expertise_areas: prev.expertise_areas.includes(area)
        ? prev.expertise_areas.filter(a => a !== area)
        : [...prev.expertise_areas, area]
    }));
  };

  const addQualification = () => {
    const result = qualificationSchema.safeParse(newQualification);
    if (!result.success) {
      toast({
        title: 'Invalid qualification',
        description: result.error.errors[0].message,
        variant: 'destructive',
      });
      return;
    }
    
    setQualifications([...qualifications, newQualification]);
    setNewQualification({
      title: '',
      institution: '',
      year_obtained: new Date().getFullYear(),
    });
  };

  const removeQualification = (index: number) => {
    setQualifications(qualifications.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    setErrors({});
    
    if (step === 1) {
      const result = profileSchema.safeParse(profileData);
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
    
    if (step === 2 && qualifications.length === 0) {
      toast({
        title: 'Add qualifications',
        description: 'Please add at least one qualification.',
        variant: 'destructive',
      });
      return;
    }
    
    setStep(step + 1);
  };

  const handleSubmit = async () => {
    if (!user) return;
    
    setIsLoading(true);
    
    try {
      // Create mentor profile
      const { data: mentorProfile, error: profileError } = await supabase
        .from('mentor_profiles')
        .insert({
          user_id: user.id,
          phone: profileData.phone,
          bio: profileData.bio,
          expertise_areas: profileData.expertise_areas,
          years_of_experience: profileData.years_of_experience,
          hourly_rate: profileData.hourly_rate,
          linkedin_url: profileData.linkedin_url || null,
          portfolio_url: profileData.portfolio_url || null,
          onboarding_completed: true,
        })
        .select()
        .single();

      if (profileError) throw profileError;

      // Add qualifications
      if (qualifications.length > 0) {
        const qualificationsToInsert = qualifications.map(q => ({
          mentor_id: mentorProfile.id,
          title: q.title,
          institution: q.institution,
          year_obtained: q.year_obtained,
          certificate_url: q.certificate_url || null,
        }));

        const { error: qualError } = await supabase
          .from('mentor_qualifications')
          .insert(qualificationsToInsert);

        if (qualError) throw qualError;
      }

      toast({
        title: 'Profile complete!',
        description: 'Your mentor profile is now pending verification.',
      });
      
      navigate('/mentor/dashboard');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to save profile',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--accent)/0.1),transparent_50%)]" />
      
      <div className="max-w-2xl mx-auto relative z-10">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <GraduationCap className="w-10 h-10 text-accent" />
            <span className="text-3xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              NEXUS Mentor
            </span>
          </div>
          <h1 className="text-2xl font-semibold text-foreground mb-2">Complete Your Profile</h1>
          <p className="text-muted-foreground">Step {step} of 3</p>
        </div>

        {/* Progress Bar */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-2 flex-1 rounded-full transition-colors ${
                s <= step ? 'bg-accent' : 'bg-muted'
              }`}
            />
          ))}
        </div>

        <Card className="bg-card/80 backdrop-blur-xl border-border/50">
          <CardHeader>
            <div className="flex items-center gap-3">
              {step === 1 && <User className="w-6 h-6 text-accent" />}
              {step === 2 && <Award className="w-6 h-6 text-accent" />}
              {step === 3 && <CheckCircle className="w-6 h-6 text-accent" />}
              <div>
                <CardTitle>
                  {step === 1 && 'Professional Profile'}
                  {step === 2 && 'Qualifications & Certifications'}
                  {step === 3 && 'Review & Submit'}
                </CardTitle>
                <CardDescription>
                  {step === 1 && 'Tell us about your expertise and experience'}
                  {step === 2 && 'Add your educational background and certifications'}
                  {step === 3 && 'Review your information before submitting'}
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {step === 1 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    className={errors.phone ? 'border-destructive' : ''}
                  />
                  {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Professional Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell students about your background, expertise, and teaching philosophy..."
                    value={profileData.bio}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    className={`min-h-[120px] ${errors.bio ? 'border-destructive' : ''}`}
                  />
                  <p className="text-sm text-muted-foreground">{profileData.bio.length}/500 characters</p>
                  {errors.bio && <p className="text-sm text-destructive">{errors.bio}</p>}
                </div>

                <div className="space-y-2">
                  <Label>Expertise Areas</Label>
                  <div className="flex flex-wrap gap-2">
                    {expertiseAreas.map((area) => (
                      <Badge
                        key={area}
                        variant={profileData.expertise_areas.includes(area) ? 'default' : 'outline'}
                        className={`cursor-pointer transition-colors ${
                          profileData.expertise_areas.includes(area) 
                            ? 'bg-accent text-accent-foreground' 
                            : 'hover:bg-accent/20'
                        }`}
                        onClick={() => toggleExpertise(area)}
                      >
                        {area}
                      </Badge>
                    ))}
                  </div>
                  {errors.expertise_areas && <p className="text-sm text-destructive">{errors.expertise_areas}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="experience">Years of Experience</Label>
                    <Input
                      id="experience"
                      type="number"
                      min="1"
                      placeholder="5"
                      value={profileData.years_of_experience || ''}
                      onChange={(e) => setProfileData({ ...profileData, years_of_experience: parseInt(e.target.value) || 0 })}
                      className={errors.years_of_experience ? 'border-destructive' : ''}
                    />
                    {errors.years_of_experience && <p className="text-sm text-destructive">{errors.years_of_experience}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="rate">Hourly Rate ($)</Label>
                    <Input
                      id="rate"
                      type="number"
                      min="0"
                      placeholder="50"
                      value={profileData.hourly_rate || ''}
                      onChange={(e) => setProfileData({ ...profileData, hourly_rate: parseFloat(e.target.value) || 0 })}
                      className={errors.hourly_rate ? 'border-destructive' : ''}
                    />
                    {errors.hourly_rate && <p className="text-sm text-destructive">{errors.hourly_rate}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn Profile (optional)</Label>
                  <Input
                    id="linkedin"
                    type="url"
                    placeholder="https://linkedin.com/in/yourprofile"
                    value={profileData.linkedin_url}
                    onChange={(e) => setProfileData({ ...profileData, linkedin_url: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="portfolio">Portfolio Website (optional)</Label>
                  <Input
                    id="portfolio"
                    type="url"
                    placeholder="https://yourportfolio.com"
                    value={profileData.portfolio_url}
                    onChange={(e) => setProfileData({ ...profileData, portfolio_url: e.target.value })}
                  />
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="space-y-4">
                  <Label>Your Qualifications</Label>
                  
                  {qualifications.map((qual, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                      <Award className="w-5 h-5 text-accent mt-0.5" />
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{qual.title}</p>
                        <p className="text-sm text-muted-foreground">{qual.institution} • {qual.year_obtained}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeQualification(index)}
                        className="text-destructive hover:text-destructive"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}

                  <div className="border border-border/50 rounded-lg p-4 space-y-4">
                    <p className="text-sm font-medium text-muted-foreground">Add New Qualification</p>
                    
                    <div className="space-y-2">
                      <Label htmlFor="qual-title">Degree / Certification Title</Label>
                      <Input
                        id="qual-title"
                        placeholder="e.g., Master's in Computer Science"
                        value={newQualification.title}
                        onChange={(e) => setNewQualification({ ...newQualification, title: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="qual-institution">Institution</Label>
                      <Input
                        id="qual-institution"
                        placeholder="e.g., MIT"
                        value={newQualification.institution}
                        onChange={(e) => setNewQualification({ ...newQualification, institution: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="qual-year">Year Obtained</Label>
                      <Input
                        id="qual-year"
                        type="number"
                        min="1950"
                        max={new Date().getFullYear()}
                        value={newQualification.year_obtained}
                        onChange={(e) => setNewQualification({ ...newQualification, year_obtained: parseInt(e.target.value) || new Date().getFullYear() })}
                      />
                    </div>

                    <Button type="button" variant="outline" className="w-full" onClick={addQualification}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Qualification
                    </Button>
                  </div>
                </div>
              </>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <User className="w-5 h-5 text-accent" />
                    Profile Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Phone</p>
                      <p className="text-foreground">{profileData.phone}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Experience</p>
                      <p className="text-foreground">{profileData.years_of_experience} years</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Hourly Rate</p>
                      <p className="text-foreground">${profileData.hourly_rate}/hour</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm mb-2">Bio</p>
                    <p className="text-foreground text-sm">{profileData.bio}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm mb-2">Expertise</p>
                    <div className="flex flex-wrap gap-2">
                      {profileData.expertise_areas.map((area) => (
                        <Badge key={area} variant="secondary">{area}</Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <Award className="w-5 h-5 text-accent" />
                    Qualifications ({qualifications.length})
                  </h3>
                  {qualifications.map((qual, index) => (
                    <div key={index} className="p-3 bg-muted/50 rounded-lg">
                      <p className="font-medium text-foreground">{qual.title}</p>
                      <p className="text-sm text-muted-foreground">{qual.institution} • {qual.year_obtained}</p>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-accent/10 border border-accent/30 rounded-lg">
                  <p className="text-sm text-accent">
                    <strong>Note:</strong> Your profile will be reviewed by our team. Once verified, you'll be able to create sessions and connect with students.
                  </p>
                </div>
              </div>
            )}

            <div className="flex gap-4 pt-4">
              {step > 1 && (
                <Button variant="outline" onClick={() => setStep(step - 1)} className="flex-1">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              )}
              
              {step < 3 ? (
                <Button variant="hero" onClick={handleNext} className="flex-1">
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button 
                  variant="hero" 
                  onClick={handleSubmit} 
                  className="flex-1"
                  disabled={isLoading}
                >
                  {isLoading ? 'Submitting...' : 'Submit for Verification'}
                  <CheckCircle className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MentorOnboarding;
