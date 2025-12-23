import { motion } from "framer-motion";
import { Link } from "react-router";
import {
  Check,
  Clock,
  Shield,
  Star,
  Users,
  Car,
  Bike,
  Truck,
  CreditCard,
  Headphones,
  Zap,
  ArrowRight,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useGetDashboardStatsQuery } from "@/redux/analytics/analytics.api";

export default function Services() {
  const { data } = useGetDashboardStatsQuery(undefined);
  const stats = data?.data || data;

  const services = [
    {
      id: 1,
      title: "Standard Rides",
      description: "Affordable everyday rides with professional drivers",
      icon: <Car className="h-7 w-7" />,
      features: ["Up to 4 passengers", "GPS Tracking", "Professional drivers"],
      price: "Base Fare",
      priceNote: "Competitive rates",
      color: "blue",
      popular: false,
    },
    {
      id: 2,
      title: "Premium Experience",
      description: "Luxury vehicles with top-rated captaincy",
      icon: <Star className="h-7 w-7" />,
      features: ["Luxury Sedans", "Priority pickup", "Top-rated drivers"],
      price: "Premium",
      priceNote: "Business class feel",
      color: "amber",
      popular: true,
    },
    {
      id: 3,
      title: "Ride Sharing",
      description: "Save money by sharing your route with others",
      icon: <Users className="h-7 w-7" />,
      features: ["Split fare", "Eco-friendly", "Fixed routes"],
      price: "Shared",
      priceNote: "Up to 40% savings",
      color: "emerald",
      popular: false,
    },
    {
      id: 4,
      title: "Quick Bike",
      description: "Beat the traffic with our fastest bike network",
      icon: <Bike className="h-7 w-7" />,
      features: ["Traffic bypass", "Quickest arrival", "Helmet provided"],
      price: "Fastest",
      priceNote: "Pocket friendly",
      color: "purple",
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-neutral-950">
      <Navbar />

      {/* 🌌 Modern Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8"
          >
            <Zap size={14} className="fill-current" /> Premium Logistics Network
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter mb-6">
            Smart Mobility <br />{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
              For Every Journey.
            </span>
          </h1>

          <p className="text-lg text-slate-500 dark:text-neutral-400 max-w-2xl mx-auto font-medium mb-10">
            Powered by a real-time fleet of{" "}
            <b>{stats?.users?.drivers || 0} verified drivers</b>. Choose the
            service that fits your schedule and budget.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/register"
              className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black text-sm shadow-xl shadow-indigo-200 dark:shadow-none hover:scale-105 transition-transform flex items-center gap-2"
            >
              Book Your First Ride <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30 dark:opacity-10">
          <div className="absolute top-20 left-1/4 w-64 h-64 bg-indigo-400 rounded-full blur-[120px]" />
          <div className="absolute bottom-10 right-1/4 w-64 h-64 bg-purple-400 rounded-full blur-[120px]" />
        </div>
      </section>

      {/* 🛠️ Services Grid */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`group relative p-8 bg-white dark:bg-neutral-900 rounded-[2.5rem] border transition-all duration-500 ${
                service.popular
                  ? "border-indigo-600 ring-4 ring-indigo-50 dark:ring-indigo-900/10 shadow-2xl scale-105 z-10"
                  : "border-slate-100 dark:border-neutral-800 hover:border-indigo-200"
              }`}
            >
              {service.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full tracking-[0.1em] uppercase">
                  Most Preferred
                </div>
              )}

              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110 duration-500 ${
                  service.color === "blue"
                    ? "bg-blue-50 text-blue-600"
                    : service.color === "amber"
                    ? "bg-amber-50 text-amber-600"
                    : service.color === "emerald"
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-purple-50 text-purple-600"
                }`}
              >
                {service.icon}
              </div>

              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
                {service.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-neutral-400 font-medium leading-relaxed mb-6">
                {service.description}
              </p>

              <div className="mb-8 p-4 bg-slate-50 dark:bg-neutral-800/50 rounded-2xl">
                <div className="text-2xl font-black text-slate-900 dark:text-white">
                  {service.price}
                </div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  {service.priceNote}
                </div>
              </div>

              <ul className="space-y-4 mb-8 text-sm">
                {service.features.map((f, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-slate-600 dark:text-neutral-400 font-medium"
                  >
                    <Check size={16} className="text-emerald-500" /> {f}
                  </li>
                ))}
              </ul>

              <Link
                to="/register"
                className={`w-full py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                  service.popular
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none"
                    : "bg-slate-100 dark:bg-neutral-800 text-slate-900 dark:text-white hover:bg-indigo-600 hover:text-white"
                }`}
              >
                Select {service.title.split(" ")[0]}
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🛡️ Trust Features */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-t border-slate-100 dark:border-neutral-900">
        <div className="grid md:grid-cols-3 gap-12">
          {[
            {
              icon: <Shield className="text-blue-600" />,
              title: "Safety Locked",
              desc: `Every ride among ${
                stats?.rides?.completed || 0
              } completed trips has been live-tracked for maximum security.`,
            },
            {
              icon: <Clock className="text-emerald-600" />,
              title: "Instant Response",
              desc: "Our automated dispatching algorithm ensures a driver reaches you in minutes, not hours.",
            },
            {
              icon: <Headphones className="text-rose-600" />,
              title: "Human Support",
              desc: "Real humans are available 24/7 to assist with any queries through our help desk.",
            },
          ].map((f, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center px-4"
            >
              <div className="w-16 h-16 bg-white dark:bg-neutral-900 shadow-xl rounded-[1.5rem] flex items-center justify-center mb-6 border border-slate-50 dark:border-neutral-800">
                {f.icon}
              </div>
              <h4 className="text-xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">
                {f.title}
              </h4>
              <p className="text-sm text-slate-500 dark:text-neutral-400 leading-relaxed font-medium">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
