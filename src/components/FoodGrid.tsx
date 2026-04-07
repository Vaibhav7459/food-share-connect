import { motion } from "framer-motion";
import DonationCard from "./DonationCard";
import { hotelList } from "@/lib/hotels";

const donations = hotelList;

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
        <p className="text-muted-foreground font-body text-lg max-w-xl mx-auto mb-6">
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
