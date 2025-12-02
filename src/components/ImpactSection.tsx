import { Brain, Wallet, Award, Rocket } from "lucide-react";

const impacts = [
  {
    icon: Brain,
    title: "Essential Soft Skills",
    description: "Develop critical thinking, problem-solving, communication, and collaboration—skills fundamental for success in personal and professional life."
  },
  {
    icon: Wallet,
    title: "Financial Literacy",
    description: "Learn trading and investing from a young age, making informed financial decisions and potentially growing savings responsibly."
  },
  {
    icon: Award,
    title: "Enhanced College Applications",
    description: "Demonstrated proficiency in practical skills makes applications stand out, showcasing initiative, creativity, and commitment to lifelong learning."
  },
  {
    icon: Rocket,
    title: "Future-Ready Mindset",
    description: "Build an entrepreneurial mindset with exposure to digital marketing, design, and technology that prepares students for the modern workforce."
  }
];

const ImpactSection = () => {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-medium uppercase tracking-wider">Benefits</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-4 mb-4">
            Impact & <span className="text-primary">Benefits</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real outcomes that transform students into confident, capable, and future-ready individuals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {impacts.map((impact, index) => (
            <div 
              key={impact.title}
              className="flex gap-4 glass-card rounded-xl p-6 hover:border-primary/50 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shrink-0">
                <impact.icon className="text-primary" size={28} />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold mb-2">{impact.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{impact.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
