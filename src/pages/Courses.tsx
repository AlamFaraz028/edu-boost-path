import { useState } from "react";
import { Code, Palette, TrendingUp, DollarSign, Users, Brain, Clock, BookOpen, Award, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const courses = [
  {
    id: "digital-marketing",
    icon: TrendingUp,
    title: "Digital Marketing",
    description: "Master SEO, social media marketing, Google Ads, content marketing, and analytics to drive business growth in the digital age.",
    duration: "12 weeks",
    lessons: 48,
    level: "Beginner to Advanced",
    color: "from-green-500 to-emerald-600",
    skills: ["SEO & SEM", "Social Media Marketing", "Google Analytics", "Content Strategy", "Email Marketing"],
    outcomes: ["Run successful ad campaigns", "Build brand presence online", "Analyze marketing data", "Create content strategies"],
    popular: true
  },
  {
    id: "graphic-design",
    icon: Palette,
    title: "Graphic Design",
    description: "Learn visual design principles, UI/UX fundamentals, and master tools like Figma, Canva, and Adobe Creative Suite.",
    duration: "10 weeks",
    lessons: 40,
    level: "Beginner to Intermediate",
    color: "from-pink-500 to-rose-600",
    skills: ["UI/UX Design", "Figma & Canva", "Typography", "Color Theory", "Brand Identity"],
    outcomes: ["Design stunning graphics", "Create user interfaces", "Build design portfolios", "Freelance opportunities"],
    popular: true
  },
  {
    id: "finance",
    icon: DollarSign,
    title: "Finance & Trading",
    description: "Understand personal finance, stock market basics, trading strategies, and financial planning for long-term wealth building.",
    duration: "8 weeks",
    lessons: 32,
    level: "Beginner",
    color: "from-yellow-500 to-orange-600",
    skills: ["Stock Market Basics", "Technical Analysis", "Personal Finance", "Investment Strategies", "Risk Management"],
    outcomes: ["Make informed investments", "Manage personal finances", "Understand market trends", "Build wealth early"],
    popular: false
  },
  {
    id: "coding",
    icon: Code,
    title: "Web Development",
    description: "Start your coding journey with HTML, CSS, JavaScript, and React. Build real websites and web applications from scratch.",
    duration: "16 weeks",
    lessons: 64,
    level: "Beginner to Advanced",
    color: "from-cyan-500 to-blue-600",
    skills: ["HTML & CSS", "JavaScript", "React.js", "Git & GitHub", "Responsive Design"],
    outcomes: ["Build complete websites", "Create web applications", "Collaborate on projects", "Land internships"],
    popular: true
  },
  {
    id: "soft-skills",
    icon: Users,
    title: "Soft Skills",
    description: "Develop communication, leadership, teamwork, and presentation skills essential for career success in any field.",
    duration: "6 weeks",
    lessons: 24,
    level: "All Levels",
    color: "from-teal-500 to-cyan-600",
    skills: ["Public Speaking", "Leadership", "Team Collaboration", "Time Management", "Critical Thinking"],
    outcomes: ["Communicate confidently", "Lead teams effectively", "Ace interviews", "Build professional network"],
    popular: false
  },
  {
    id: "ai-ml",
    icon: Brain,
    title: "AI & Machine Learning",
    description: "Explore the world of artificial intelligence, machine learning basics, and understand how AI is transforming industries.",
    duration: "14 weeks",
    lessons: 56,
    level: "Intermediate",
    color: "from-indigo-500 to-purple-600",
    skills: ["Python Basics", "Machine Learning", "Data Analysis", "AI Applications", "Neural Networks"],
    outcomes: ["Understand AI concepts", "Build ML models", "Analyze data sets", "Future-proof your career"],
    popular: true
  }
];

const Courses = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredCourses = selectedCategory === "all" 
    ? courses 
    : courses.filter(c => c.popular);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-primary text-sm font-medium uppercase tracking-wider">Explore Courses</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6">
              Future-Ready <span className="text-primary">Skill Courses</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Industry-designed courses to help you build practical skills and become job-ready 
              before you graduate. Learn from expert mentors with real-world experience.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex gap-4 justify-center">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              onClick={() => setSelectedCategory("all")}
            >
              All Courses
            </Button>
            <Button
              variant={selectedCategory === "popular" ? "default" : "outline"}
              onClick={() => setSelectedCategory("popular")}
            >
              Popular
            </Button>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            {filteredCourses.map((course) => (
              <div 
                key={course.id}
                className="glass-card rounded-2xl overflow-hidden hover:scale-[1.01] transition-all duration-300"
              >
                {/* Course Header */}
                <div className={`bg-gradient-to-r ${course.color} p-6`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-background/20 flex items-center justify-center">
                        <course.icon className="text-foreground" size={28} />
                      </div>
                      <div>
                        <h3 className="font-display text-2xl font-bold text-foreground">{course.title}</h3>
                        <p className="text-foreground/80 text-sm">{course.level}</p>
                      </div>
                    </div>
                    {course.popular && (
                      <Badge className="bg-background/20 text-foreground border-0">Popular</Badge>
                    )}
                  </div>
                </div>

                {/* Course Body */}
                <div className="p-6">
                  <p className="text-muted-foreground mb-6">{course.description}</p>
                  
                  {/* Stats */}
                  <div className="flex gap-6 mb-6">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock size={16} className="text-primary" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <BookOpen size={16} className="text-primary" />
                      <span>{course.lessons} Lessons</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Award size={16} className="text-primary" />
                      <span>Certificate</span>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold mb-3">Skills You'll Learn:</h4>
                    <div className="flex flex-wrap gap-2">
                      {course.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Outcomes */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold mb-3">What You'll Achieve:</h4>
                    <ul className="grid grid-cols-2 gap-2">
                      {course.outcomes.map((outcome) => (
                        <li key={outcome} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {outcome}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <div className="flex gap-4">
                    <Button className="flex-1" asChild>
                      <Link to="/auth">
                        Enroll Now
                        <ArrowRight className="ml-2" size={18} />
                      </Link>
                    </Button>
                    <Button variant="outline">Learn More</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Join thousands of students already building future-ready skills with NEXUS.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/auth">Get Started Free</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Courses;