import { Check, Zap, Shield, Crown } from "lucide-react";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const pricingPlans = [
  {
    name: "Basic",
    price: "0",
    description: "Perfect for occasional city travelers.",
    features: [
      "Standard Support",
      "City Rides Only",
      "Digital Receipts",
      "No Hidden Fees",
    ],
    icon: <Zap className="text-blue-500" size={24} />,
    color: "border-slate-200 dark:border-slate-800",
    buttonVariant: "outline" as const,
  },
  {
    name: "Premium",
    price: "29",
    description: "Best for regular commuters & families.",
    features: [
      "Priority Booking",
      "Intercity Travel",
      "RideX Shield Protection",
      "24/7 VIP Support",
      "Child Seat Options",
    ],
    icon: <Shield className="text-indigo-500" size={24} />,
    color:
      "border-indigo-500 shadow-2xl shadow-indigo-200 dark:shadow-none scale-105",
    popular: true,
    buttonVariant: "default" as const,
  },
  {
    name: "Business",
    price: "99",
    description: "Dedicated solutions for corporate teams.",
    features: [
      "Bulk Employee Booking",
      "Monthly Billing",
      "Dedicated Account Manager",
      "Custom Routes",
      "Executive Luxury Cars",
    ],
    icon: <Crown className="text-amber-500" size={24} />,
    color: "border-slate-200 dark:border-slate-800",
    buttonVariant: "outline" as const,
  },
];

export default function PricingPage() {
  return (
    <div>
      <Navbar></Navbar>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-24 px-6">
        <div className="container mx-auto">
          {/* Header Section */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-indigo-600 font-bold tracking-widest uppercase text-sm mb-4"
            >
              Pricing Plans
            </motion.h2>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl lg:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter"
            >
              Choose the ride that <br /> fits your lifestyle.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-slate-500 dark:text-slate-400 text-lg"
            >
              Transparent pricing with no hidden costs. Whether you're going
              across the street or across the country, we've got a plan for you.
            </motion.p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "relative p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border-2 transition-all duration-300",
                  plan.color
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase">
                    Most Popular
                  </div>
                )}

                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl">
                    {plan.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                    <p className="text-xs text-slate-500">{plan.description}</p>
                  </div>
                </div>

                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-black tracking-tighter">
                      ${plan.price}
                    </span>
                    <span className="text-slate-500 font-medium">/month</span>
                  </div>
                </div>

                <div className="space-y-4 mb-10">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-5 h-5 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center">
                        <Check
                          className="text-indigo-600 dark:text-indigo-400"
                          size={12}
                          strokeWidth={3}
                        />
                      </div>
                      <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
