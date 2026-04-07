import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Building2, Mail, Phone, MapPin, User as UserIcon, ArrowLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface Profile {
  display_name: string | null;
  organization_name: string | null;
  user_type: string;
  phone: string | null;
  address: string | null;
  avatar_url: string | null;
}

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<Profile>({
    display_name: "",
    organization_name: "",
    user_type: "ngo",
    phone: "",
    address: "",
    avatar_url: null,
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
    } else {
      navigate("/auth");
    }
  }, [user, navigate]);

  const fetchProfile = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (error) {
      console.error("Error fetching profile", error);
      toast({
        title: "Error",
        description: "Could not load your profile.",
      });
    } else {
      setProfile({
        display_name: data.display_name || "",
        organization_name: data.organization_name || "",
        user_type: data.user_type || "ngo",
        phone: data.phone || "",
        address: data.address || "",
        avatar_url: data.avatar_url || null,
      });
    }
    setLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          display_name: profile.display_name,
          organization_name: profile.organization_name,
          user_type: profile.user_type,
          phone: profile.phone || null,
          address: profile.address || null,
          avatar_url: profile.avatar_url,
        })
        .eq("user_id", user.id);

      if (error) throw error;

      toast({
        title: "Profile updated",
        description: "Your profile has been saved successfully.",
      });
    } catch (error: any) {
      console.error("Error updating profile", error);
      toast({
        title: "Error",
        description: "Could not update your profile.",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field: keyof Profile, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto p-6">
          <p>Loading...</p>
        </main>
        <Footer />
      </div>
    );
  }

  const userTypeLabels = {
    ngo: "NGO",
    hotel: "Hotel",
    restaurant: "Restaurant",
    party_venue: "Party Venue",
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto p-6 max-w-2xl">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 font-body text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </button>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src={profile.avatar_url || undefined} />
                <AvatarFallback>
                  <UserIcon className="w-6 h-6" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-display font-bold">My Profile</h1>
                <p className="text-sm text-muted-foreground font-body">
                  {userTypeLabels[profile.user_type as keyof typeof userTypeLabels] || "User"}
                </p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="display_name" className="font-body text-sm font-medium">
                    Full Name
                  </Label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="display_name"
                      value={profile.display_name || ""}
                      onChange={(e) => handleChange("display_name", e.target.value)}
                      className="pl-10 font-body"
                      placeholder="Your full name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="organization_name" className="font-body text-sm font-medium">
                    Organization Name
                  </Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="organization_name"
                      value={profile.organization_name || ""}
                      onChange={(e) => handleChange("organization_name", e.target.value)}
                      className="pl-10 font-body"
                      placeholder="Your NGO or business name"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="font-body text-sm font-medium">
                    Phone Number
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      value={profile.phone || ""}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      className="pl-10 font-body"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="user_type" className="font-body text-sm font-medium">
                    Account Type
                  </Label>
                  <select
                    id="user_type"
                    value={profile.user_type}
                    onChange={(e) => handleChange("user_type", e.target.value)}
                    className="w-full rounded-md border p-2 font-body"
                  >
                    <option value="ngo">NGO</option>
                    <option value="hotel">Hotel</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="party_venue">Party Venue</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="font-body text-sm font-medium">
                  Address
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="address"
                    value={profile.address || ""}
                    onChange={(e) => handleChange("address", e.target.value)}
                    className="pl-10 font-body"
                    placeholder="Your location"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="font-body text-sm font-medium">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    value={user?.email || ""}
                    className="pl-10 font-body bg-muted"
                    disabled
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Email cannot be changed. Contact support if needed.
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  type="submit"
                  disabled={saving}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-display font-bold"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/")}
                  className="font-display font-bold"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;