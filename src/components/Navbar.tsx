import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <span className="font-display text-xl font-bold">
              <span className="text-primary">NE</span>
              <span className="text-foreground">XUS</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-muted-foreground hover:text-primary transition-colors">Features</a>
            <a href="#skills" className="text-muted-foreground hover:text-primary transition-colors">Skill Tracks</a>
            <a href="#schools" className="text-muted-foreground hover:text-primary transition-colors">For Schools</a>
            <a href="#mentors" className="text-muted-foreground hover:text-primary transition-colors">For Mentors</a>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm">Sign In</Button>
            <Button variant="default" size="sm">Get Started</Button>
          </div>

          <button 
            className="md:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 border-t border-border/30">
            <div className="flex flex-col gap-4">
              <a href="#features" className="text-muted-foreground hover:text-primary transition-colors">Features</a>
              <a href="#skills" className="text-muted-foreground hover:text-primary transition-colors">Skill Tracks</a>
              <a href="#schools" className="text-muted-foreground hover:text-primary transition-colors">For Schools</a>
              <a href="#mentors" className="text-muted-foreground hover:text-primary transition-colors">For Mentors</a>
              <div className="flex gap-3 pt-4">
                <Button variant="ghost" size="sm">Sign In</Button>
                <Button variant="default" size="sm">Get Started</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
