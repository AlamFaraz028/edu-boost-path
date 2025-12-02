import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import heroBg from "@/assets/nexus-hero-bg.jpeg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background z-10" />
      
      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <span className="inline-block px-4 py-2 rounded-full glass-card text-primary text-sm font-medium mb-6">
              🚀 Empowering Future-Ready Skills
            </span>
          </div>
          
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <span className="text-primary">Skills</span>{" "}
            <span className="text-foreground">for Tomorrow</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            Connect schools, mentors, and students on a unified platform. 
            Master digital marketing, coding, design, finance, and more with AI-powered learning paths.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <Button variant="hero" size="xl">
              Start Learning Free
              <ArrowRight className="ml-2" />
            </Button>
            <Button variant="outline" size="xl">
              <Play className="mr-2" size={18} />
              Watch Demo
            </Button>
          </div>
          
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto animate-slide-up" style={{ animationDelay: '0.5s' }}>
            <div className="text-center">
              <div className="font-display text-3xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Schools</div>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl font-bold text-primary">2K+</div>
              <div className="text-sm text-muted-foreground">Mentors</div>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl font-bold text-primary">50K+</div>
              <div className="text-sm text-muted-foreground">Students</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
