import { Brain, BookOpen, Users, Target, Lightbulb, GraduationCap, Monitor, Briefcase, TrendingUp, Sparkles } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Learning",
    description: "Machine Learning for personalized experiences, NLP for communication support, and predictive analytics for career recommendations."
  },
  {
    icon: Target,
    title: "Targeted for Grades 11-12",
    description: "Specifically designed for high school students at a critical career-building stage, bridging academic learning with real-world skills."
  },
  {
    icon: Monitor,
    title: "Blended Learning Model",
    description: "Unique combination of online LMS courses and in-school live sessions, workshops, and hands-on projects."
  },
  {
    icon: Users,
    title: "Expert Mentorship",
    description: "Live mentorship sessions with industry professionals and real project guidance—not just recorded videos."
  },
  {
    icon: Lightbulb,
    title: "Project-Based Assessment",
    description: "Design brand identities, run digital campaigns, manage virtual portfolios—build tangible proof of skills."
  },
  {
    icon: GraduationCap,
    title: "Skill Certifications",
    description: "Earn recognized certificates that enhance college applications and showcase initiative to future employers."
  }
];

const aiFeatures = [
  { tech: "Machine Learning", use: "Personalized learning experiences", benefit: "Smarter, faster progress" },
  { tech: "Natural Language Processing", use: "Virtual mentorship & communication", benefit: "Better speaking & writing" },
  { tech: "Predictive Analytics", use: "Career and skill recommendations", benefit: "Clearer career direction" },
  { tech: "Computer Vision", use: "Feedback on design projects", benefit: "Improved design skills" },
  { tech: "AI Trading Models", use: "Simulated trading practice", benefit: "Real-world financial insights" },
  { tech: "Sentiment Analysis", use: "Understanding marketing trends", benefit: "Data-driven thinking" },
];

const gaps = [
  {
    title: "Limited Practical Exposure",
    description: "Most programs focus on theory, leaving students without exposure to digital tools, creative platforms, or financial systems."
  },
  {
    title: "Lack of Curriculum Integration",
    description: "While NEP 2020 encourages skill-based education, implementation remains inconsistent across schools."
  },
  {
    title: "Accessibility Gap",
    description: "Urban students have better access to workshops and resources, while semi-urban and rural areas lack opportunities."
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 relative network-pattern">
      <div className="container mx-auto px-4">
        {/* Problem Statement */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <span className="text-primary text-sm font-medium uppercase tracking-wider">The Challenge</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-4 mb-6">
            Why <span className="text-primary">NEXUS</span> Matters
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            In India, only <span className="text-primary font-semibold">47%</span> of young students will gain the right skills at the right time. 
            Traditional education focuses on marks, but the world demands real-world skills. 
            NEXUS bridges this gap for 11th and 12th graders at their most critical career-building stage.
          </p>
        </div>

        {/* Current Gaps */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {gaps.map((gap, index) => (
            <div 
              key={gap.title}
              className="glass-card rounded-xl p-6 border-destructive/20 hover:border-destructive/40 transition-all duration-300"
            >
              <div className="w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center mb-4 text-destructive font-bold">
                {index + 1}
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">{gap.title}</h3>
              <p className="text-muted-foreground text-sm">{gap.description}</p>
            </div>
          ))}
        </div>

        {/* Main Features */}
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-medium uppercase tracking-wider">Our Solution</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-4 mb-4">
            Everything You Need to <span className="text-primary">Succeed</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive platform combining academic learning with hands-on, 21st-century skills like digital literacy, creativity, and entrepreneurship.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="glass-card rounded-xl p-6 hover:border-primary/50 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="text-primary" size={24} />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* AI Integration Section */}
        <div className="glass-card rounded-2xl p-8 md:p-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <Sparkles className="text-primary" size={24} />
            </div>
            <div>
              <h3 className="font-display text-2xl font-bold">AI Integration</h3>
              <p className="text-muted-foreground text-sm">Cutting-edge technology powering personalized learning</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {aiFeatures.map((ai) => (
              <div key={ai.tech} className="bg-muted/50 rounded-lg p-4 hover:bg-muted/70 transition-colors">
                <h4 className="font-semibold text-sm text-primary mb-1">{ai.tech}</h4>
                <p className="text-xs text-muted-foreground mb-2">{ai.use}</p>
                <span className="text-xs text-foreground/70">→ {ai.benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
