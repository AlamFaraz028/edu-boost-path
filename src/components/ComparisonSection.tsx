import { Check, X } from "lucide-react";

const competitors = [
  {
    name: "Coursera / Udemy",
    target: "College & Professionals",
    mentorship: false,
    schoolIntegration: false,
    advantage: "Large content library"
  },
  {
    name: "BYJU'S / Unacademy",
    target: "School Students",
    mentorship: false,
    schoolIntegration: "partial",
    advantage: "Academic foundation"
  },
  {
    name: "Internshala",
    target: "College Students",
    mentorship: "partial",
    schoolIntegration: false,
    advantage: "Internship opportunities"
  },
  {
    name: "NEXUS",
    target: "Grades 11-12",
    mentorship: true,
    schoolIntegration: true,
    advantage: "First-of-its-kind school-level upskilling",
    highlight: true
  }
];

const ComparisonSection = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-medium uppercase tracking-wider">Why Choose Us</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-4 mb-4">
            How <span className="text-primary">NEXUS</span> Compares
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The first comprehensive upskilling platform specifically designed for high school students with full school integration.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-4 px-4 font-display text-sm text-muted-foreground">Platform</th>
                <th className="text-left py-4 px-4 font-display text-sm text-muted-foreground">Target Audience</th>
                <th className="text-center py-4 px-4 font-display text-sm text-muted-foreground">Mentorship</th>
                <th className="text-center py-4 px-4 font-display text-sm text-muted-foreground">School Integration</th>
                <th className="text-left py-4 px-4 font-display text-sm text-muted-foreground">Key Advantage</th>
              </tr>
            </thead>
            <tbody>
              {competitors.map((comp) => (
                <tr 
                  key={comp.name} 
                  className={`border-b border-border/50 ${comp.highlight ? 'bg-primary/5' : ''}`}
                >
                  <td className={`py-4 px-4 font-semibold ${comp.highlight ? 'text-primary' : ''}`}>
                    {comp.name}
                  </td>
                  <td className="py-4 px-4 text-sm text-muted-foreground">{comp.target}</td>
                  <td className="py-4 px-4 text-center">
                    {comp.mentorship === true ? (
                      <Check className="inline text-green-500" size={20} />
                    ) : comp.mentorship === "partial" ? (
                      <span className="text-yellow-500 text-xs">Partial</span>
                    ) : (
                      <X className="inline text-muted-foreground" size={20} />
                    )}
                  </td>
                  <td className="py-4 px-4 text-center">
                    {comp.schoolIntegration === true ? (
                      <Check className="inline text-green-500" size={20} />
                    ) : comp.schoolIntegration === "partial" ? (
                      <span className="text-yellow-500 text-xs">Partial</span>
                    ) : (
                      <X className="inline text-muted-foreground" size={20} />
                    )}
                  </td>
                  <td className={`py-4 px-4 text-sm ${comp.highlight ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                    {comp.advantage}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
