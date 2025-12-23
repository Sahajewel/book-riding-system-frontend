/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import {
  Users,
  Car,
  CheckCircle,
  Activity,
  Target,
  Zap,
  ShieldCheck,
  Heart,
  Loader2,
  Star,
  UserCheck,
} from "lucide-react";
// তোর সেই অ্যানালিটিক্স এপিআই
import { useGetDashboardStatsQuery } from "@/redux/analytics/analytics.api";

export default function About() {
  // 🛰️ আসল ডাইনামিক ডাটা ফেচিং
  const { data, isLoading } = useGetDashboardStatsQuery(undefined);

  // ডাটা এক্সট্রাক্ট করা (তোর অ্যাডমিন ড্যাশবোর্ডের লজিক অনুযায়ী)
  const statsData = data?.data || data;

  // 📊 ডাইনামিক স্ট্যাটস কনফিগারেশন
  const dynamicStats = [
    {
      label: "Total Users",
      value: statsData?.users?.total || 0,
      icon: Users,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
    {
      label: "Active Riders",
      value: statsData?.users?.riders || 0,
      icon: UserCheck,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Active Drivers",
      value: statsData?.users?.drivers || 0,
      icon: ShieldCheck,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Active Rides",
      value: statsData?.rides?.ongoing || 0,
      icon: Activity,
      color: "text-rose-600",
      bg: "bg-rose-50",
    },
    {
      label: "Completed Rides",
      value: statsData?.rides?.completed || 0,
      icon: CheckCircle,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      label: "System Rating",
      value: "4.9/5",
      icon: Star,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
  ];

  if (isLoading)
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-indigo-600 mb-4" size={40} />
        <p className="font-black text-slate-400 uppercase tracking-widest text-xs">
          Loading Real-time Data...
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-neutral-950">
      {/* 🚀 Hero Section */}
      <section className="relative pt-24 pb-12 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6">
            <Zap size={14} /> Live System Status
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter mb-6">
            Real impact,{" "}
            <span className="text-indigo-600 underline decoration-indigo-200 underline-offset-8">
              real
            </span>{" "}
            numbers.
          </h1>
          <p className="text-lg text-slate-500 dark:text-neutral-400 max-w-2xl mx-auto font-medium">
            RideX is powered by a community of <b>{statsData?.users?.total}</b>{" "}
            registered users, ensuring safe and reliable mobility every single
            day.
          </p>
        </motion.div>
      </section>

      {/* 📊 Dynamic Stats Grid */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dynamicStats.map((s, idx) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-8 bg-white dark:bg-neutral-900 rounded-[2.5rem] border border-slate-100 dark:border-neutral-800 shadow-sm flex items-center gap-6"
            >
              <div
                className={`h-16 w-16 shrink-0 rounded-3xl ${s.bg} dark:bg-opacity-10 flex items-center justify-center ${s.color}`}
              >
                <s.icon size={32} />
              </div>
              <div>
                <div className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">
                  {s.value}
                </div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  {s.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🎯 Our Mission Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center bg-white dark:bg-neutral-900 p-8 md:p-16 rounded-[3rem] border border-slate-100 dark:border-neutral-800 shadow-sm relative overflow-hidden">
          <div>
            <div className="h-14 w-14 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-6">
              <Target size={28} />
            </div>
            <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
              System Integrity
            </h2>
            <p className="text-slate-500 dark:text-neutral-400 leading-relaxed text-lg mb-8 font-medium">
              We currently manage{" "}
              <b>{statsData?.rides?.ongoing} ongoing rides</b>. Our mission is
              to maintain a 100% completion rate for our{" "}
              <b>{statsData?.users?.riders} active riders</b>.
            </p>
            <div className="flex gap-8">
              <div className="flex flex-col">
                <span className="text-2xl font-black text-indigo-600">
                  {statsData?.rides?.completionRate || 100}%
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Success Rate
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-emerald-500">
                  Live
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Monitoring
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <ValueCard
              icon={<ShieldCheck className="text-indigo-600" />}
              title="Verified Fleet"
              desc={`${statsData?.users?.drivers} professional drivers are currently verified.`}
            />
            <ValueCard
              icon={<Heart className="text-rose-500" />}
              title="Completed Trips"
              desc={`${statsData?.rides?.completed} successful journeys and counting.`}
            />
          </div>
        </div>
      </section>

      {/* 👥 Team Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Your Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="bg-white dark:bg-neutral-900 p-10 rounded-[3.5rem] border border-slate-100 dark:border-neutral-800 shadow-xl relative z-10">
              <div className="w-24 h-24 bg-indigo-600 rounded-3xl flex items-center justify-center text-3xl font-black text-white mb-8 shadow-lg shadow-indigo-200">
                JS
              </div>
              <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
                Jewel Saha
              </h2>
              <p className="text-indigo-600 font-black uppercase tracking-[0.2em] text-xs mb-6">
                Founder & Lead Engineer
              </p>
              <p className="text-slate-500 dark:text-neutral-400 leading-relaxed font-medium mb-8">
                "I started RideX to solve a simple problem: making
                transportation safe, transparent, and rewarding for both riders
                and drivers. Every line of code is written with the community in
                mind."
              </p>
              <div className="flex gap-4">
                <a
                  href="https://www.linkedin.com/in/sahajewelkumar"
                  target="_blank"
                  className="px-6 py-3 bg-[#0077b5] text-white rounded-2xl font-bold text-sm hover:scale-105 transition-transform"
                >
                  Connect on LinkedIn
                </a>
              </div>
            </div>
            {/* Decorative background shape */}
            <div className="absolute -inset-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-[4rem] -z-10 rotate-3" />
          </motion.div>

          {/* Right: Why RideX? (Core Philosophy) */}
          <div className="space-y-10">
            <div>
              <h3 className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.3em] mb-4">
                Why I Built This
              </h3>
              <h2 className="text-4xl font-black text-slate-900 dark:text-white leading-tight">
                Driven by passion, <br />
                built with <span className="text-indigo-600">Precision.</span>
              </h2>
            </div>

            <div className="grid gap-6">
              {[
                {
                  title: "Solo Architected",
                  desc: "Designed and developed the entire ecosystem from scratch, ensuring seamless integration.",
                },
                {
                  title: "Data Driven",
                  desc: "Using real-time analytics to optimize driver dispatch and minimize rider wait times.",
                },
                {
                  title: "Safety Focused",
                  desc: "Implemented SOS and live tracking modules for peace of mind.",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="mt-1 h-2 w-2 rounded-full bg-indigo-600 shrink-0" />
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-lg">
                      {item.title}
                    </h4>
                    <p className="text-slate-500 dark:text-neutral-400 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// --- Sub-components for better organization ---

function ValueCard({ icon, title, desc }: any) {
  return (
    <div className="flex gap-5 p-6 bg-[#F8FAFC] dark:bg-neutral-800/50 rounded-3xl border border-slate-100 dark:border-neutral-800 hover:bg-white transition-all duration-300 group">
      <div className="h-12 w-12 shrink-0 rounded-2xl bg-white dark:bg-neutral-900 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div>
        <h4 className="font-bold text-slate-900 dark:text-white">{title}</h4>
        <p className="text-xs text-slate-500 dark:text-neutral-400 leading-relaxed mt-1">
          {desc}
        </p>
      </div>
    </div>
  );
}
