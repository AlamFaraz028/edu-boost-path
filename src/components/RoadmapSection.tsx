import { Rocket, Scale, Globe } from "lucide-react";

const phases = [
  {
    icon: Rocket,
    phase: "Phase 1",
    title: "Pilot Implementation",
    timeline: "Year 1",
    items: [
      "Launch pilot programs in select partner schools",
      "Train teachers through certification workshops",
      "Collect feedback to refine course content",
      "Measure impact through assessments"
    ]
  },
  {
    icon: Scale,
    phase: "Phase 2",
    title: "Expansion & Standardization",
    timeline: "Years 2-3",
    items: [
      "Integrate into regular school timetables",
      "Collaborate with CBSE, ICSE, State Boards",
      "Partner with edtech & industry mentors",
      "Develop multilingual versions"
    ]
  },
  {
    icon: Globe,
    phase: "Phase 3",
    title: "National Scale",
    timeline: "Years 4+",
    items: [
      "Nationwide adoption across all states",
      "University partnerships for credit transfers",
      "International expansion opportunities",
      "Continuous AI-driven improvements"
    ]
  }
];

const RoadmapSection = () => {
  return (
    <section id="mentors" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-medium uppercase tracking-wider">Future Scope</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-4 mb-4">
            Our <span className="text-primary">Roadmap</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A phased implementation strategy ensuring continuous growth, relevance, and nationwide transformation of education.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {phases.map((phase, index) => (
            <div 
              key={phase.phase}
              className="relative glass-card rounded-2xl p-8 hover:border-primary/50 transition-all duration-300"
            >
              <div className="absolute -top-4 left-8">
                <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">
                  {phase.timeline}
                </span>
              </div>
              
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6 mt-2">
                <phase.icon className="text-primary" size={28} />
              </div>
              
              <div className="text-sm text-primary font-medium mb-1">{phase.phase}</div>
              <h3 className="font-display text-xl font-bold mb-4">{phase.title}</h3>
              
              <ul className="space-y-3">
                {phase.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;
