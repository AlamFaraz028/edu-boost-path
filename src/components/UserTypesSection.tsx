import { Button } from "@/components/ui/button";
import { GraduationCap, School, UserCheck, ArrowRight } from "lucide-react";

const userTypes = [
  {
    icon: School,
    title: "For Schools",
    description: "Register your institution, onboard students, and track their upskilling journey with comprehensive dashboards.",
    features: ["Student Management", "Progress Analytics", "Custom Programs", "Bulk Enrollment"],
    cta: "Partner With Us"
  },
  {
    icon: UserCheck,
    title: "For Mentors",
    description: "Create courses, conduct live sessions, manage resources, and build your teaching portfolio on our platform.",
    features: ["Session Management", "Resource Library", "Student Analytics", "Revenue Sharing"],
    cta: "Become a Mentor"
  },
  {
    icon: GraduationCap,
    title: "For Students",
    description: "Explore skill tracks, learn from experts, earn certifications, and get AI-powered career recommendations.",
    features: ["Personalized Learning", "Live Sessions", "Certifications", "AI Recommendations"],
    cta: "Start Learning"
  }
];

const UserTypesSection = () => {
  return (
    <section id="schools" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-medium uppercase tracking-wider">Join NEXUS</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-4 mb-4">
            Built for <span className="text-primary">Everyone</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Whether you're a school, mentor, or student – NEXUS has everything you need to succeed.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {userTypes.map((type, index) => (
            <div 
              key={type.title}
              className="glass-card rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 flex flex-col"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6">
                <type.icon className="text-primary" size={32} />
              </div>
              
              <h3 className="font-display text-2xl font-bold mb-3">{type.title}</h3>
              <p className="text-muted-foreground mb-6">{type.description}</p>
              
              <ul className="space-y-3 mb-8 flex-grow">
                {type.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <Button variant="outline" className="w-full">
                {type.cta}
                <ArrowRight className="ml-2" size={16} />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserTypesSection;
