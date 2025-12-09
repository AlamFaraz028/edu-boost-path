import { Users, Target, Eye, Lightbulb, Award, GraduationCap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const team = [
  {
    name: "Md Faraz Alam",
    role: "Co-Founder & CEO",
    email: "alamfaraz028@gmail.com",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Faraz"
  },
  {
    name: "Md Mohsin Ansari",
    role: "Co-Founder & CTO",
    email: "mohsin@nexus.edu",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mohsin"
  }
];

const stats = [
  { icon: GraduationCap, value: "50,000+", label: "Students Trained" },
  { icon: Users, value: "500+", label: "Partner Schools" },
  { icon: Award, value: "2,000+", label: "Certified Mentors" },
  { icon: Lightbulb, value: "95%", label: "Placement Rate" }
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-primary text-sm font-medium uppercase tracking-wider">About NEXUS</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6">
              Bridging the <span className="text-primary">Skills Gap</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              NEXUS is India's premier upskilling platform designed specifically for 11th & 12th grade students, 
              preparing them with future-ready skills before they enter higher education or the workforce.
            </p>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-primary text-sm font-medium uppercase tracking-wider">The Problem</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mt-4 mb-6">
                Why Traditional Education Falls Short
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Despite spending years in formal education, most students graduate without practical, 
                  industry-relevant skills. The gap between academic knowledge and workplace requirements 
                  continues to widen.
                </p>
                <p>
                  Students often realize too late that they lack crucial skills like digital marketing, 
                  coding, design thinking, financial literacy, and soft skills that employers actually value.
                </p>
                <p>
                  NEXUS was born to solve this problem by introducing skill-based learning during the 
                  crucial 11th and 12th grade years, when students are most receptive to new learning.
                </p>
              </div>
            </div>
            <div className="glass-card p-8 rounded-2xl">
              <h3 className="font-display text-xl font-semibold mb-6 text-primary">Key Challenges We Address</h3>
              <ul className="space-y-4">
                {[
                  "Lack of practical skills in traditional curriculum",
                  "No exposure to real-world industry projects",
                  "Limited access to quality mentorship",
                  "Disconnect between education and employment",
                  "Absence of personalized learning paths"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary text-sm font-bold">{index + 1}</span>
                    </div>
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass-card p-8 rounded-2xl border-l-4 border-primary">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Target className="text-primary" size={28} />
                </div>
                <h3 className="font-display text-2xl font-bold">Our Mission</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                To democratize skill-based education by making high-quality, industry-relevant training 
                accessible to every student in India, regardless of their geographic or economic background. 
                We aim to create a generation of job-ready individuals who can contribute meaningfully 
                to the economy from day one.
              </p>
            </div>
            <div className="glass-card p-8 rounded-2xl border-l-4 border-accent">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center">
                  <Eye className="text-accent" size={28} />
                </div>
                <h3 className="font-display text-2xl font-bold">Our Vision</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                To become India's largest skill development ecosystem connecting schools, mentors, 
                and students on a single platform. By 2030, we envision training over 10 million students 
                with future-ready skills, making India the world's largest skilled workforce.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center glass-card p-6 rounded-xl">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="text-primary" size={24} />
                </div>
                <div className="font-display text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-primary text-sm font-medium uppercase tracking-wider">Our Team</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-4">
              Meet the <span className="text-primary">Founders</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {team.map((member) => (
              <div key={member.name} className="glass-card p-8 rounded-2xl text-center hover:scale-[1.02] transition-transform">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-primary/30"
                />
                <h3 className="font-display text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-primary font-medium mb-3">{member.role}</p>
                <p className="text-muted-foreground text-sm">{member.email}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;