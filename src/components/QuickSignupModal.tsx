import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Heart, Mail, Lock, Building2, User as UserIcon } from "lucide-react";
import { toast } from "sonner";

interface QuickSignupModalProps {
  trigger: React.ReactNode;
}

const QuickSignupModal = ({ trigger }: QuickSignupModalProps) => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [userType, setUserType] = useState<string>("ngo");

  const handleQuickSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await signUp(email, password, { displayName, userType });

      if (error) throw error;

      toast.success("Account created! Check your email to verify and start donating food.");
      setOpen(false);
      navigate("/");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const userTypes = [
    { value: "ngo", label: "NGO", icon: Heart },
    { value: "hotel", label: "Hotel", icon: Building2 },
    { value: "restaurant", label: "Restaurant", icon: Building2 },
    { value: "party_venue", label: "Party Venue", icon: Building2 },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
              <Heart className="w-4 h-4 text-primary-foreground" />
            </div>
            Quick Sign Up
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleQuickSignup} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="quick-name" className="font-body text-sm font-medium text-foreground">
              Your Name
            </Label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="quick-name"
                placeholder="John Doe"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="pl-10 font-body"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="font-body text-sm font-medium text-foreground">I am a...</Label>
            <div className="grid grid-cols-2 gap-2">
              {userTypes.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setUserType(type.value)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-body font-medium transition-all ${
                    userType === type.value
                      ? "border-primary bg-accent text-accent-foreground"
                      : "border-border text-muted-foreground hover:border-primary/50"
                  }`}
                >
                  <type.icon className="w-4 h-4" />
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="quick-email" className="font-body text-sm font-medium text-foreground">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="quick-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 font-body"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="quick-password" className="font-body text-sm font-medium text-foreground">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="quick-password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 font-body"
                required
                minLength={6}
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-display font-bold py-3 rounded-lg"
          >
            {loading ? "Creating Account..." : "Sign Up Free"}
          </Button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                navigate("/auth");
              }}
              className="text-sm font-body text-muted-foreground hover:text-primary transition-colors"
            >
              Need more options? <span className="font-semibold text-primary">Full Sign Up</span>
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default QuickSignupModal;