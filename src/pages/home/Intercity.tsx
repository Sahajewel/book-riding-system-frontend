import React from "react";
import {
  Navigation,
  Coffee,
  CalendarCheck,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const Intercity = () => {
  return (
    <div className="pt-28 pb-20 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-6xl font-black mb-6"
          >
            Go Beyond{" "}
            <span className="text-emerald-500 text-gradient bg-clip-text">
              City Borders
            </span>
          </motion.h1>
          <p className="text-lg text-slate-500 dark:text-slate-400">
            Experience premium long-distance travel. Whether it's a family
            vacation or a business trip, our Intercity service ensures comfort
            and peace of mind on the open road.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Coffee className="text-emerald-500" size={40} />,
              title: "Comfort Travel",
              desc: "Premium sedans and SUVs equipped with AC and professional chauffeurs.",
            },
            {
              icon: <CalendarCheck className="text-emerald-500" size={40} />,
              title: "Pre-Book Rides",
              desc: "Schedule your journey days in advance to ensure a perfect start.",
            },
            {
              icon: <Navigation className="text-emerald-500" size={40} />,
              title: "Flat Pricing",
              desc: "Transparent one-way or round-trip fares with no hidden costs.",
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="bg-slate-50 dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 text-center flex flex-col items-center"
            >
              <div className="mb-6 bg-white dark:bg-slate-800 p-5 rounded-3xl shadow-sm">
                {card.icon}
              </div>
              <h3 className="font-bold text-2xl mb-4">{card.title}</h3>
              <p className="text-slate-500 leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 bg-emerald-500 rounded-[3rem] p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-left">
            <h2 className="text-3xl font-bold mb-2">Planning a long trip?</h2>
            <p className="text-emerald-100">
              Get 15% off on your first Intercity booking.
            </p>
          </div>

          <Link to="/rider/bookings">
            <button className="bg-white text-emerald-600 px-8 py-4 rounded-2xl font-black hover:bg-emerald-50 transition-colors flex items-center gap-2">
              Reserve Now <ArrowRight size={20} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Intercity;
