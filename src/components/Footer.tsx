import { Mail, Phone, MapPin, Twitter, Linkedin, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t border-border/50 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="font-display text-2xl font-bold mb-4">
              <span className="text-primary">NE</span>
              <span className="text-foreground">XUS</span>
            </div>
            <p className="text-muted-foreground text-sm mb-6">
              Skills for Tomorrow. Connecting schools, mentors, and students on a unified learning platform.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-lg glass-card flex items-center justify-center hover:border-primary/50 transition-colors">
                <Twitter size={18} className="text-muted-foreground" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg glass-card flex items-center justify-center hover:border-primary/50 transition-colors">
                <Linkedin size={18} className="text-muted-foreground" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg glass-card flex items-center justify-center hover:border-primary/50 transition-colors">
                <Youtube size={18} className="text-muted-foreground" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-display font-semibold mb-4">Platform</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Skill Tracks</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">For Schools</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">For Mentors</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-display font-semibold mb-4">Resources</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">API Docs</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Community</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-display font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-primary" />
                hello@nexus.edu
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-primary" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-primary mt-0.5" />
                123 Innovation Drive,<br />Tech City, TC 12345
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 NEXUS. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
