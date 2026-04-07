import * as React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Edit, Trash2 } from "lucide-react";

interface Donation {
  id: string;
  hotel_name: string;
  food_type: string;
  prepared_time: string | null;
  servings: number | null;
  quantity: string | null;
  price: string | null;
  notes: string | null;
  contact: string | null;
  created_at: string;
}

const ManageDonations = () => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to view your donations.",
      });
      return;
    }

    const { data, error } = await supabase
      .from("hotel_donations")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching donations", error);
      toast({
        title: "Error",
        description: "Could not load your donations.",
      });
    } else {
      setDonations(data || []);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this donation?")) return;

    const { error } = await supabase
      .from("hotel_donations")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting donation", error);
      toast({
        title: "Error",
        description: "Could not delete the donation.",
      });
    } else {
      toast({
        title: "Deleted",
        description: "Donation has been removed.",
      });
      fetchDonations(); // Refresh the list
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto p-6">
          <h1 className="text-3xl font-display font-bold mb-6">My Donations</h1>
          <p>Loading...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-display font-bold">My Donations</h1>
          <Link to="/donate-hotel">
            <Button>Add New Donation</Button>
          </Link>
        </div>

        {donations.length === 0 ? (
          <p className="text-muted-foreground">You haven't submitted any donations yet.</p>
        ) : (
          <div className="space-y-4">
            {donations.map((donation) => (
              <Card key={donation.id}>
                <CardHeader>
                  <CardTitle className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg">{donation.hotel_name}</h3>
                      <p className="text-sm text-muted-foreground">{donation.food_type}</p>
                    </div>
                    <div className="flex gap-2">
                      <Link to={`/donate-hotel?edit=${donation.id}`}>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(donation.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Prepared:</span> {donation.prepared_time || "N/A"}
                    </div>
                    <div>
                      <span className="font-medium">Servings:</span> {donation.servings || "N/A"}
                    </div>
                    <div>
                      <span className="font-medium">Quantity:</span> {donation.quantity || "N/A"}
                    </div>
                    <div>
                      <span className="font-medium">Price:</span> {donation.price || "N/A"}
                    </div>
                  </div>
                  {donation.notes && (
                    <div className="mt-4">
                      <span className="font-medium">Notes:</span> {donation.notes}
                    </div>
                  )}
                  <div className="mt-2 text-xs text-muted-foreground">
                    Submitted on {new Date(donation.created_at).toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ManageDonations;