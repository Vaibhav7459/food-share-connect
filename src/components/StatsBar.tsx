import { motion } from "framer-motion";
import { Utensils, Building2, Users, TrendingUp } from "lucide-react";

const stats = [
  { icon: Utensils, value: "12,450", label: "Meals Rescued", suffix: "+" },
  { icon: Building2, value: "285", label: "Partner Hotels", suffix: "" },
  { icon: Users, value: "142", label: "Active NGOs", suffix: "" },
  { icon: TrendingUp, value: "8.2", label: "Tons Saved", suffix: "T" },
];

const StatsBar = () => (
  <section className="bg-card border-y border-border">
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-4"
          >
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
              <stat.icon className="w-6 h-6 text-accent-foreground" />
            </div>
            <div>
              <p className="font-display text-2xl font-bold text-foreground">
                {stat.value}{stat.suffix}
              </p>
              <p className="text-sm text-muted-foreground font-body">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default StatsBar;
