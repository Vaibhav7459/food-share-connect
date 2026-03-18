import { motion } from "framer-motion";
import DonationCard from "./DonationCard";

const donations = [
  {
    hotelName: "Grand Hyatt",
    foodType: "Biryani, Naan & Curry",
    servings: 120,
    rating: 4.8,
    reviewCount: 64,
    timeProcessed: "30 min ago",
    urgency: "fresh" as const,
    location: "MG Road, Bangalore",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&h=400&fit=crop",
  },
  {
    hotelName: "Taj Palace",
    foodType: "Mixed Continental Buffet",
    servings: 85,
    rating: 4.9,
    reviewCount: 112,
    timeProcessed: "1 hour ago",
    urgency: "fresh" as const,
    location: "Connaught Place, Delhi",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=400&fit=crop",
  },
  {
    hotelName: "Marriott Suites",
    foodType: "Pasta, Salads & Desserts",
    servings: 60,
    rating: 4.5,
    reviewCount: 38,
    timeProcessed: "2 hours ago",
    urgency: "moderate" as const,
    location: "Andheri West, Mumbai",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop",
  },
  {
    hotelName: "ITC Royal",
    foodType: "South Indian Thali",
    servings: 200,
    rating: 4.7,
    reviewCount: 89,
    timeProcessed: "45 min ago",
    urgency: "fresh" as const,
    location: "Jubilee Hills, Hyderabad",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&h=400&fit=crop",
  },
  {
    hotelName: "The Leela",
    foodType: "Chinese & Thai Combo",
    servings: 40,
    rating: 4.3,
    reviewCount: 27,
    timeProcessed: "3.5 hours ago",
    urgency: "urgent" as const,
    location: "Park Street, Kolkata",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&h=400&fit=crop",
  },
  {
    hotelName: "Oberoi Grand",
    foodType: "Wedding Banquet Surplus",
    servings: 350,
    rating: 4.6,
    reviewCount: 53,
    timeProcessed: "1.5 hours ago",
    urgency: "moderate" as const,
    location: "Banjara Hills, Hyderabad",
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&h=400&fit=crop",
  },
];

const FoodGrid = () => (
  <section className="bg-background py-16 md:py-24">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="font-display text-3xl md:text-4xl font-extrabold text-foreground mb-3">
          Available <span className="text-primary">Right Now</span>
        </h2>
        <p className="text-muted-foreground font-body text-lg max-w-xl mx-auto">
          Fresh food from top-rated hotels and restaurants near you — claim before it's gone.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {donations.map((d) => (
          <DonationCard key={d.hotelName} {...d} />
        ))}
      </div>
    </div>
  </section>
);

export default FoodGrid;
