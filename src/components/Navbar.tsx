import { useState } from "react";
import { Heart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
            <Heart className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display font-extrabold text-xl text-foreground">
            Second<span className="text-primary">Servings</span>
          </span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors font-body">Browse Food</a>
          <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors font-body">For Hotels</a>
          <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors font-body">How It Works</a>
          <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors font-body">About</a>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" className="font-display font-bold text-sm">Log In</Button>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-display font-bold text-sm rounded-lg">
            Sign Up Free
          </Button>
        </div>

        {/* Mobile */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-background border-b border-border px-4 pb-4 space-y-3">
          <a href="#" className="block text-sm font-medium text-muted-foreground font-body py-2">Browse Food</a>
          <a href="#" className="block text-sm font-medium text-muted-foreground font-body py-2">For Hotels</a>
          <a href="#" className="block text-sm font-medium text-muted-foreground font-body py-2">How It Works</a>
          <a href="#" className="block text-sm font-medium text-muted-foreground font-body py-2">About</a>
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-display font-bold rounded-lg">Sign Up Free</Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
