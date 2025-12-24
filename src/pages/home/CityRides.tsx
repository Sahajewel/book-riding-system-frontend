import React from "react";
import { motion } from "framer-motion";
import { Car, Clock, ShieldCheck, MapPin, Star, Zap } from "lucide-react";

const CityRides = () => {
  return (
    <div className="pt-28 pb-20 min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-1/2"
          >
            <div className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-4 py-2 rounded-full mb-6 font-bold text-sm">
              <Zap size={16} fill="currentColor" /> FASTEST IN TOWN
            </div>
            <h1 className="text-5xl lg:text-7xl font-black mb-6 tracking-tight">
              Urban <span className="text-indigo-600">Mobility</span> <br />{" "}
              Simplified.
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              Navigate your city with ease. From daily office commutes to
              spontaneous evening hangouts, RideX provides the quickest and
              safest way to get where you're going.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {[
                {
                  icon: <Clock className="text-indigo-600" />,
                  t: "Instant Matching",
                  d: "Matched with a driver in under 60 seconds.",
                },
                {
                  icon: <ShieldCheck className="text-indigo-600" />,
                  t: "Safe & Secure",
                  d: "Every trip is monitored by our 24/7 safety team.",
                },
                {
                  icon: <MapPin className="text-indigo-600" />,
                  t: "Anywhere",
                  d: "Door-to-door pickup from any corner of the city.",
                },
                {
                  icon: <Star className="text-indigo-600" />,
                  t: "Top Rated",
                  d: "Access to our highest-rated driver partners.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm"
                >
                  <div className="mb-3">{item.icon}</div>
                  <h4 className="font-bold text-slate-900 dark:text-white">
                    {item.t}
                  </h4>
                  <p className="text-sm text-slate-500">{item.d}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Image with Decoration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:w-1/2 relative"
          >
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-500/10 blur-[100px] rounded-full"></div>
            <img
              src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=1000"
              className="rounded-[3.5rem] shadow-2xl border-8 border-white dark:border-slate-900 relative z-10"
              alt="City Ride"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};
export default CityRides;
