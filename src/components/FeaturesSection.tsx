import { BookOpen, Users, BarChart3, Brain, Award, Shield } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Rich Course Library",
    description: "Access hundreds of skill-based courses in digital marketing, coding, design, and finance."
  },
  {
    icon: Users,
    title: "Verified Mentors",
    description: "Learn from industry experts and experienced professionals with proven track records."
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    description: "Schools and students can monitor learning progress with detailed analytics dashboards."
  },
  {
    icon: Brain,
    title: "AI Recommendations",
    description: "Personalized learning paths powered by AI based on interests and career goals."
  },
  {
    icon: Award,
    title: "Certifications",
    description: "Earn recognized certificates upon course completion to showcase your skills."
  },
  {
    icon: Shield,
    title: "Secure Platform",
    description: "Enterprise-grade security ensuring safe learning environment for all users."
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 relative network-pattern">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-medium uppercase tracking-wider">Platform Features</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-4 mb-4">
            Everything You Need to <span className="text-primary">Succeed</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive platform designed to bridge the gap between traditional education and industry-ready skills.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="glass-card rounded-xl p-6 hover:border-primary/50 transition-all duration-300 group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="text-primary" size={24} />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
