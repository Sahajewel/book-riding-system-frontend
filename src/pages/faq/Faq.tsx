import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Plus,
  Minus,
  MessageCircle,
  HelpCircle,
  ArrowRight,
} from "lucide-react";
import { useGetDashboardStatsQuery } from "@/redux/analytics/analytics.api";
import { Link } from "react-router";

type QA = { q: string; a: string; category: string };

export default function FAQ() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<string | null>(null);

  // 🛰️ ডাইনামিক ডাটা ফেচিং (যাতে উত্তরের ভেতরেও আসল সংখ্যা থাকে)
  const { data } = useGetDashboardStatsQuery(undefined);
  const stats = data?.data || data;

  const DATA: QA[] = [
    {
      category: "Rider",
      q: "How do I request a ride?",
      a: `Go to your Rider Dashboard → Request Ride. We currently have ${
        stats?.users?.drivers || "active"
      } drivers online ready to pick you up.`,
    },
    {
      category: "Pricing",
      q: "How are fares calculated?",
      a: "Fares are dynamic. We calculate based on distance, traffic time, and current demand to ensure the fairest price for both parties.",
    },
    {
      category: "Driver",
      q: "How do drivers get paid?",
      a: `Drivers receive payouts based on completed trips. With ${
        stats?.rides?.completed || "thousands of"
      } rides completed, our system ensures weekly on-time payments.`,
    },
    {
      category: "Safety",
      q: "Can I cancel a ride?",
      a: "Yes, you can cancel before a driver accepts. After acceptance, a small fee may apply to compensate the driver's effort.",
    },
    {
      category: "Registration",
      q: "How do I become a driver?",
      a: `Join our fleet of ${
        stats?.users?.drivers || ""
      } professional partners. Register with 'Driver' role and upload your NID & Vehicle documents.`,
    },
  ];

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return DATA;
    return DATA.filter(
      (item) =>
        item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q)
    );
  }, [query, stats]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-neutral-950 py-20 px-6">
      <div className="max-w-3xl mx-auto">
        {/* 🧠 Header Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4"
          >
            <HelpCircle size={14} /> Support Center
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter mb-4">
            Common <span className="text-indigo-600">Questions.</span>
          </h1>
          <p className="text-slate-500 dark:text-neutral-400 font-medium">
            Everything you need to know about the RideX platform.
          </p>
        </div>

        {/* 🔍 Premium Search Bar */}
        <div className="relative mb-12">
          <Search
            className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
            size={20}
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for questions (e.g. 'payout', 'safety')..."
            className="w-full bg-white dark:bg-neutral-900 border border-slate-100 dark:border-neutral-800 rounded-[2rem] pl-14 pr-6 py-5 text-slate-900 dark:text-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all shadow-sm"
          />
        </div>

        {/* 📂 Accordion List */}
        <div className="space-y-4">
          <AnimatePresence>
            {results.map((item, idx) => {
              const isOpen = open === item.q;
              return (
                <motion.div
                  key={item.q}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`group border rounded-[2rem] transition-all duration-300 ${
                    isOpen
                      ? "bg-white dark:bg-neutral-900 border-indigo-200 dark:border-indigo-900 shadow-xl shadow-indigo-500/5"
                      : "bg-white/50 dark:bg-neutral-900/50 border-slate-100 dark:border-neutral-800 hover:border-indigo-100 dark:hover:border-neutral-700"
                  }`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : item.q)}
                    className="w-full text-left px-8 py-6 flex items-center justify-between gap-4"
                  >
                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] font-black text-indigo-500 uppercase tracking-widest">
                        {item.category}
                      </span>
                      <span
                        className={`font-bold text-lg tracking-tight transition-colors ${
                          isOpen
                            ? "text-indigo-600"
                            : "text-slate-700 dark:text-neutral-200"
                        }`}
                      >
                        {item.q}
                      </span>
                    </div>
                    <div
                      className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 transition-all ${
                        isOpen
                          ? "bg-indigo-600 text-white rotate-180"
                          : "bg-slate-100 dark:bg-neutral-800 text-slate-500"
                      }`}
                    >
                      {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-8 pb-8 pt-2 text-slate-500 dark:text-neutral-400 font-medium leading-relaxed border-t border-slate-50 dark:border-neutral-800/50 mx-4">
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* 🏜️ Empty State */}
          {results.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 bg-white dark:bg-neutral-900 rounded-[3rem] border border-dashed border-slate-200 dark:border-neutral-800"
            >
              <div className="bg-slate-50 dark:bg-neutral-800 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                <Search size={24} />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white">
                No matches found
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                Try searching for different keywords.
              </p>
            </motion.div>
          )}
        </div>

        {/* 📞 Bottom CTA */}
        <div className="mt-16 p-8 bg-indigo-600 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
          <div className="relative z-10">
            <h4 className="text-white font-bold text-xl">
              Still have questions?
            </h4>
            <p className="text-indigo-100 text-sm">
              Our support team is online to help you.
            </p>
          </div>
          <Link to="/contact">
            <button className="relative z-10 px-8 py-4 bg-white text-indigo-600 rounded-2xl font-black text-sm flex items-center gap-2 hover:scale-105 transition-transform shadow-lg">
              <MessageCircle size={18} /> Contact Support
            </button>
          </Link>
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
        </div>
      </div>
    </div>
  );
}
