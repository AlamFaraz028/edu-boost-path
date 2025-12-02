import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10" />
      <div className="absolute inset-0 network-pattern opacity-50" />
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-primary text-sm font-medium mb-6">
            <Sparkles size={16} />
            Start Your Journey Today
          </div>
          
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
            Ready to Build <span className="text-primary">Future-Ready Skills?</span>
          </h2>
          
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Join thousands of schools, mentors, and students already transforming education with NEXUS.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="xl">
              Get Started Free
              <ArrowRight className="ml-2" />
            </Button>
            <Button variant="glass" size="xl">
              Schedule a Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
