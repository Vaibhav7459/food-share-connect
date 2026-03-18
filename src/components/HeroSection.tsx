import { motion } from "framer-motion";
import { ArrowRight, Heart, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-food.jpg";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img src={heroImg} alt="Fresh food being shared" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/60 to-foreground/30" />
      </div>

      <div className="relative container mx-auto px-4 py-24 md:py-36 lg:py-44">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-4 py-1.5 text-sm font-medium text-primary-foreground backdrop-blur-sm border border-primary/30 mb-6">
              <Heart className="w-4 h-4" />
              Rescue Food. Feed Communities.
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-primary-foreground mb-6"
          >
            Turn Surplus Into
            <span className="block text-primary"> Second Servings</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-lg font-body"
          >
            Connecting hotels, restaurants & party venues with NGOs to rescue
            fresh leftover food — before it goes to waste.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-display font-bold text-base px-8 py-6 rounded-xl shadow-lg">
              <Heart className="mr-2 w-5 h-5" />
              Find Food Near You
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-display font-bold text-base px-8 py-6 rounded-xl backdrop-blur-sm">
              <Building2 className="mr-2 w-5 h-5" />
              Donate as a Hotel
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
