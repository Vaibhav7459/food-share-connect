import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Building2, X } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

const ProfileCompletionModal = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [organizationName, setOrganizationName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (user) {
      checkProfileCompletion();
    }
  }, [user]);

  const checkProfileCompletion = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("profiles")
      .select("organization_name")
      .eq("user_id", user.id)
      .single();

    if (error || !data?.organization_name) {
      // Show modal if organization name is missing
      setTimeout(() => setOpen(true), 2000); // Show after 2 seconds
    }
  };

  const handleCompleteProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          organization_name: organizationName,
          phone: phone || null,
          address: address || null,
        })
        .eq("user_id", user.id);

      if (error) throw error;

      toast.success("Profile updated successfully!");
      setOpen(false);
    } catch (error: any) {
      toast.error("Failed to update profile: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    setOpen(false);
    // You could set a localStorage flag to not show again
    localStorage.setItem("profile_completion_skipped", "true");
  };

  // Don't show if user skipped before
  if (localStorage.getItem("profile_completion_skipped")) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" />
            Complete Your Profile
          </DialogTitle>
        </DialogHeader>

        <p className="text-sm text-muted-foreground mb-4">
          Help us connect you better by adding your organization details. This helps NGOs and hotels find you more easily.
        </p>

        <form onSubmit={handleCompleteProfile} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="org-name" className="font-body text-sm font-medium text-foreground">
              Organization Name
            </Label>
            <Input
              id="org-name"
              placeholder="Your NGO or Hotel name"
              value={organizationName}
              onChange={(e) => setOrganizationName(e.target.value)}
              className="font-body"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="font-body text-sm font-medium text-foreground">
              Phone Number (Optional)
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="font-body"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address" className="font-body text-sm font-medium text-foreground">
              Address (Optional)
            </Label>
            <Input
              id="address"
              placeholder="Your location"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="font-body"
            />
          </div>

          <div className="flex gap-2">
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-display font-bold"
            >
              {loading ? "Saving..." : "Complete Profile"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleSkip}
              className="font-display font-bold"
            >
              Skip for Now
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileCompletionModal;