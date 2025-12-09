import { Code, Palette, TrendingUp, DollarSign, Database, Brain, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const skillTracks = [
  {
    icon: Code,
    title: "Web Development",
    courses: 45,
    color: "from-cyan-500 to-blue-600"
  },
  {
    icon: TrendingUp,
    title: "Digital Marketing",
    courses: 32,
    color: "from-green-500 to-emerald-600"
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    courses: 28,
    color: "from-pink-500 to-rose-600"
  },
  {
    icon: DollarSign,
    title: "Finance & Accounting",
    courses: 24,
    color: "from-yellow-500 to-orange-600"
  },
  {
    icon: Database,
    title: "Data Science",
    courses: 36,
    color: "from-purple-500 to-violet-600"
  },
  {
    icon: Brain,
    title: "AI & Machine Learning",
    courses: 30,
    color: "from-indigo-500 to-purple-600"
  },
  {
    icon: Users,
    title: "Soft Skills",
    courses: 25,
    color: "from-teal-500 to-cyan-600"
  }
];

const SkillTracksSection = () => {
  return (
    <section id="skills" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-medium uppercase tracking-wider">Explore Paths</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-4 mb-4">
            Choose Your <span className="text-primary">Skill Track</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover industry-relevant skill tracks designed to make you job-ready from day one.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillTracks.map((track) => (
            <div 
              key={track.title}
              className="group relative rounded-xl overflow-hidden glass-card hover:scale-[1.02] transition-all duration-300"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${track.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
              <div className="relative p-6">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${track.color} flex items-center justify-center mb-4`}>
                  <track.icon className="text-foreground" size={28} />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">{track.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{track.courses} courses available</p>
                <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
                  Explore Track →
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillTracksSection;
