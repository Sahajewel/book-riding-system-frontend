import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  LifeBuoy,
  CreditCard,
  User,
  ShieldCheck,
  MapPin,
  MessageCircle,
  Mail,
  PhoneCall,
  ChevronRight,
} from "lucide-react";

const categories = [
  {
    title: "Account & Profile",
    icon: <User className="text-blue-500" />,
    desc: "Manage your account settings and privacy.",
  },
  {
    title: "Payments & Pricing",
    icon: <CreditCard className="text-emerald-500" />,
    desc: "Issues with billing, refunds, and promo codes.",
  },
  {
    title: "Ride Safety",
    icon: <ShieldCheck className="text-rose-500" />,
    desc: "Safety tools and emergency reporting.",
  },
  {
    title: "Booking Rides",
    icon: <MapPin className="text-amber-500" />,
    desc: "How to book, cancel, or schedule trips.",
  },
  {
    title: "RideX Shield",
    icon: <LifeBuoy className="text-indigo-500" />,
    desc: "Understanding our premium protection.",
  },
  {
    title: "Driver Partners",
    icon: <MessageCircle className="text-purple-500" />,
    desc: "Support and resources for our drivers.",
  },
];

const HelpCenter: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="pt-28 pb-20 min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="container mx-auto px-6">
        {/* --- Hero / Search Section --- */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-6xl font-black mb-6 tracking-tight"
          >
            How can we <span className="text-indigo-600">help?</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative max-w-xl mx-auto"
          >
            <Search
              className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search for topics (e.g. 'refund policy')"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-5 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </motion.div>
        </div>

        {/* --- Category Grid --- */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              className="p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {cat.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 flex items-center justify-between">
                {cat.title}
                <ChevronRight
                  size={18}
                  className="text-slate-300 group-hover:text-indigo-500 transition-colors"
                />
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                {cat.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* --- Support Section --- */}
        <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-10 lg:p-16 border border-slate-200 dark:border-slate-800">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-black mb-4">
                Still need support?
              </h2>
              <p className="text-slate-500 dark:text-slate-400 mb-8">
                Our team is available 24/7 to help you with any issues. Choose
                your preferred way to connect with us.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
                  <div className="p-3 bg-indigo-600 text-white rounded-xl">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase">
                      Email Us
                    </p>
                    <p className="font-bold">support@ridex.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
                  <div className="p-3 bg-emerald-500 text-white rounded-xl">
                    <PhoneCall size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase">
                      Call Center
                    </p>
                    <p className="font-bold">+1 (555) 000-1234</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <MessageCircle fill="white" /> Live Chat
                </h3>
                <p className="text-indigo-100 mb-6">
                  Get instant answers from our support agents. Average response
                  time: 2 mins.
                </p>
                <button className="bg-white text-indigo-600 w-full py-4 rounded-2xl font-black shadow-lg hover:bg-indigo-50 transition-colors">
                  Start Conversation
                </button>
              </div>
              {/* Decoration */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 blur-3xl rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
