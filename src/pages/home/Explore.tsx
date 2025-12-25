import React from "react";
import { motion } from "framer-motion";
import {
  Car,
  Bike,
  Truck,
  ShieldCheck,
  Clock,
  MapPin,
  ArrowRight,
  Zap,
  Star,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";

const services = [
  {
    id: "city-rides",
    title: "City Rides",
    desc: "Fast and reliable daily commute within your city. Best for office and regular trips.",
    icon: <Car className="w-8 h-8 text-indigo-600" />,
    color: "bg-indigo-50 dark:bg-indigo-900/20",
    price: "Starts from $2.00",
  },
  {
    id: "ridex-flash",
    title: "RideX Flash",
    desc: "Beat the heavy traffic with our bike service. The fastest way to reach your destination.",
    icon: <Bike className="w-8 h-8 text-amber-500" />,
    color: "bg-amber-50 dark:bg-amber-900/20",
    price: "Starts from $1.00",
  },
  {
    id: "intercity",
    title: "Intercity",
    desc: "Comfortable long-distance travel across cities with experienced driver partners.",
    icon: <MapPin className="w-8 h-8 text-emerald-500" />,
    color: "bg-emerald-50 dark:bg-emerald-900/20",
    price: "Starts from $15.00",
  },
  {
    id: "ridex-delivery",
    title: "Logistics",
    desc: "Send packages across the city instantly. Safe, secure, and real-time tracking.",
    icon: <Truck className="w-8 h-8 text-rose-500" />,
    color: "bg-rose-50 dark:bg-rose-900/20",
    price: "Starts from $3.00",
  },
];

const ExplorePage: React.FC = () => {
  const navigate = useNavigate();
  const { data: userData } = useUserInfoQuery(undefined);
  const user = userData?.data;

  const handleBookingRedirect = () => {
    if (user?.role === "RIDER") {
      navigate("/rider/bookings");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="pt-28 pb-20 min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="container mx-auto px-6">
        {/* --- Header Section --- */}
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl lg:text-6xl font-black mb-6">
              Explore Our <span className="text-indigo-600">Services</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
              Whether you're commuting to work, sending a package, or planning a
              trip out of town, RideX has the perfect solution for you.
            </p>
          </motion.div>
        </div>

        {/* --- Services Grid --- */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-20">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 hover:shadow-2xl transition-all group"
            >
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div
                  className={`${service.color} p-5 rounded-2xl group-hover:scale-110 transition-transform`}
                >
                  {service.icon}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-bold">{service.title}</h3>
                    <span className="text-xs font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-full uppercase tracking-tighter">
                      Available
                    </span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
                    {service.desc}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-white">
                      {service.price}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- Why Choose Us Section --- */}
        <div className="bg-indigo-600 rounded-[3rem] p-12 text-white relative overflow-hidden">
          <div className="relative z-10 grid lg:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="bg-white/20 p-4 rounded-2xl mb-6">
                <ShieldCheck size={32} />
              </div>
              <h4 className="text-xl font-bold mb-2">Maximum Safety</h4>
              <p className="text-indigo-100">
                Every ride is tracked and every driver is verified.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-white/20 p-4 rounded-2xl mb-6">
                <Clock size={32} />
              </div>
              <h4 className="text-xl font-bold mb-2">24/7 Support</h4>
              <p className="text-indigo-100">
                Our support team is always there to help you anytime.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-white/20 p-4 rounded-2xl mb-6">
                <Zap size={32} />
              </div>
              <h4 className="text-xl font-bold mb-2">Instant Booking</h4>
              <p className="text-indigo-100">
                No more waiting. Get matched with a driver in seconds.
              </p>
            </div>
          </div>
          {/* Background Decoration */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 blur-3xl rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
