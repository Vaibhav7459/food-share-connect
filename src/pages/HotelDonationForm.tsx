import * as React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const HotelDonationForm = () => {
  const [form, setForm] = useState({
    hotelName: "",
    foodType: "",
    preparedTime: "",
    servings: "",
    quantity: "",
    price: "",
    notes: "",
    contact: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const editParam = searchParams.get("edit");
    if (editParam) {
      setIsEdit(true);
      setEditId(editParam);
      loadDonation(editParam);
    }
  }, [searchParams]);

  const loadDonation = async (id: string) => {
    const { data, error } = await supabase
      .from("hotel_donations")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error loading donation", error);
      toast({
        title: "Error",
        description: "Could not load the donation for editing.",
      });
      navigate("/manage-donations");
      return;
    }

    setForm({
      hotelName: data.hotel_name,
      foodType: data.food_type,
      preparedTime: data.prepared_time || "",
      servings: data.servings?.toString() || "",
      quantity: data.quantity || "",
      price: data.price || "",
      notes: data.notes || "",
      contact: data.contact || "",
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to submit a donation.",
      });
      setIsSubmitting(false);
      return;
    }

    const donationData = {
      hotel_name: form.hotelName,
      food_type: form.foodType,
      prepared_time: form.preparedTime || null,
      servings: form.servings ? Number(form.servings) : null,
      quantity: form.quantity || null,
      price: form.price || null,
      notes: form.notes || null,
      contact: form.contact || null,
      user_id: user.id,
    };

    let error;
    if (isEdit && editId) {
      const { error: updateError } = await supabase
        .from("hotel_donations")
        .update(donationData)
        .eq("id", editId);
      error = updateError;
    } else {
      const { error: insertError } = await supabase
        .from("hotel_donations")
        .insert([donationData]);
      error = insertError;
    }

    setIsSubmitting(false);

    if (error) {
      console.error("Error saving hotel donation", error);
      toast({
        title: "Submission failed",
        description: "Could not save donation details. Check your connection and try again.",
      });
      return;
    }

    toast({
      title: isEdit ? "Donation updated" : "Donation posted",
      description: isEdit ? "Your donation has been updated successfully." : "Your hotel food donation has been saved successfully.",
    });

    setForm({
      hotelName: "",
      foodType: "",
      preparedTime: "",
      servings: "",
      quantity: "",
      price: "",
      notes: "",
      contact: "",
    });

    navigate("/manage-donations");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto p-6">
        <h1 className="text-3xl font-display font-bold mb-3">
          {isEdit ? "Edit Donation" : "Hotel Donation Form"}
        </h1>
        <p className="text-muted-foreground mb-6">
          {isEdit ? "Update your donation details." : "Fill in the food information so NGOs can claim quickly. Include food type, timing, amount, price, and any extra details."}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-border bg-card p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <label className="space-y-1">
              <span className="text-sm font-medium">Hotel Name</span>
              <input
                name="hotelName"
                value={form.hotelName}
                onChange={handleChange}
                className="w-full rounded-md border p-2"
                required
              />
            </label>
            <label className="space-y-1">
              <span className="text-sm font-medium">Contact Info</span>
              <input
                name="contact"
                value={form.contact}
                onChange={handleChange}
                className="w-full rounded-md border p-2"
                placeholder="Phone or email"
                required
              />
            </label>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <label className="space-y-1">
              <span className="text-sm font-medium">Food Type</span>
              <input
                name="foodType"
                value={form.foodType}
                onChange={handleChange}
                className="w-full rounded-md border p-2"
                placeholder="e.g. Paneer Biryani, Continental buffet"
                required
              />
            </label>
            <label className="space-y-1">
              <span className="text-sm font-medium">Prepared Time</span>
              <input
                name="preparedTime"
                value={form.preparedTime}
                onChange={handleChange}
                className="w-full rounded-md border p-2"
                placeholder="e.g. 1.5 hours ago"
                required
              />
            </label>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <label className="space-y-1">
              <span className="text-sm font-medium">Servings</span>
              <input
                name="servings"
                type="number"
                min="1"
                value={form.servings}
                onChange={handleChange}
                className="w-full rounded-md border p-2"
                placeholder="e.g. 100"
                required
              />
            </label>

            <label className="space-y-1">
              <span className="text-sm font-medium">Quantity</span>
              <input
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
                className="w-full rounded-md border p-2"
                placeholder="e.g. 25 boxes"
              />
            </label>

            <label className="space-y-1">
              <span className="text-sm font-medium">Price</span>
              <input
                name="price"
                value={form.price}
                onChange={handleChange}
                className="w-full rounded-md border p-2"
                placeholder="e.g. ₹8500"
              />
            </label>
          </div>

          <label className="space-y-1">
            <span className="text-sm font-medium">Additional Notes</span>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              className="w-full rounded-md border p-2"
              placeholder="Diet restrictions, pickup details, storage requirements..."
              rows={4}
            />
          </label>

          <div className="flex items-center gap-3">
            <Button type="submit" className="bg-primary text-primary-foreground" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : isEdit ? "Update Donation" : "Submit Donation Info"}
            </Button>
            <Link to="/" className="text-sm text-primary hover:underline">
              Cancel and return home
            </Link>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default HotelDonationForm;
