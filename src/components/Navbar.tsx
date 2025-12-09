import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-display text-xl font-bold">
              <span className="text-primary">NE</span>
              <span className="text-foreground">XUS</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About</Link>
            <Link to="/courses" className="text-muted-foreground hover:text-primary transition-colors">Courses</Link>
            <a href="/#skills" className="text-muted-foreground hover:text-primary transition-colors">Skill Tracks</a>
            <a href="/#users" className="text-muted-foreground hover:text-primary transition-colors">For Schools</a>
            <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <span className="text-sm text-muted-foreground">
                  {user.email}
                </span>
                <Button variant="ghost" size="sm" onClick={() => signOut()}>
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/auth">Sign In</Link>
                </Button>
                <Button variant="default" size="sm" asChild>
                  <Link to="/auth">Get Started</Link>
                </Button>
              </>
            )}
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
              <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About</Link>
              <Link to="/courses" className="text-muted-foreground hover:text-primary transition-colors">Courses</Link>
              <a href="/#skills" className="text-muted-foreground hover:text-primary transition-colors">Skill Tracks</a>
              <a href="/#users" className="text-muted-foreground hover:text-primary transition-colors">For Schools</a>
              <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link>
              <div className="flex gap-3 pt-4">
                {user ? (
                  <Button variant="ghost" size="sm" onClick={() => signOut()}>
                    Sign Out
                  </Button>
                ) : (
                  <>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to="/auth">Sign In</Link>
                    </Button>
                    <Button variant="default" size="sm" asChild>
                      <Link to="/auth">Get Started</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
