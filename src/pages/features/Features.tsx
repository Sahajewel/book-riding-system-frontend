/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  ShieldCheck,
  Settings,
  CheckCircle2,
  MapPin,
  Wallet,
  History,
  Power,
  Eye,
  BarChart3,
  Users,
  Zap,
} from "lucide-react";

const tabs = [
  { id: "Rider", icon: User, label: "Rider Experience" },
  { id: "Driver", icon: Zap, label: "Driver Partner" },
  { id: "Admin", icon: ShieldCheck, label: "Platform Control" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function Features() {
  const [active, setActive] = useState<TabId>("Rider");

  const content: Record<
    TabId,
    { title: string; subtitle: string; points: { text: string; icon: any }[] }
  > = {
    Rider: {
      title: "Seamless Mobility for Riders",
      subtitle:
        "Experience the fastest way to move around your city with safety and comfort.",
      points: [
        { text: "Instant ride request with fare estimate", icon: MapPin },
        { text: "Live tracking & real-time driver profile", icon: Eye },
        { text: "Detailed ride history with smart filters", icon: History },
        { text: "Secure digital payments & instant receipts", icon: Wallet },
      ],
    },
    Driver: {
      title: "Empowering our Driver Partners",
      subtitle:
        "Flexible hours, better earnings, and a robust support system at your fingertips.",
      points: [
        { text: "Smart online/offline availability toggle", icon: Power },
        {
          text: "Real-time request management (Accept/Reject)",
          icon: CheckCircle2,
        },
        { text: "Active ride status & navigation updates", icon: MapPin },
        { text: "Comprehensive earnings dashboard & history", icon: BarChart3 },
      ],
    },
    Admin: {
      title: "Powerful Oversight & Control",
      subtitle:
        "Manage the entire ecosystem with advanced monitoring and moderation tools.",
      points: [
        { text: "Full user management (Approve/Suspend/Block)", icon: Users },
        {
          text: "Real-time ride oversight & system analytics",
          icon: BarChart3,
        },
        { text: "Advanced search & multi-layer filter tools", icon: Settings },
        {
          text: "Core platform settings and global controls",
          icon: ShieldCheck,
        },
      ],
    },
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-neutral-950 py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* 🚀 Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4"
          >
            <Settings size={14} /> Ecosystem Overview
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter mb-4">
            Powerful features for <br />{" "}
            <span className="text-indigo-600">every user.</span>
          </h1>
        </div>

        {/* 🕹️ Custom Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {tabs.map((tab) => {
            const IsActive = active === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className={`flex items-center gap-3 px-8 py-4 rounded-[1.5rem] font-bold transition-all duration-300 ${
                  IsActive
                    ? "bg-indigo-600 text-white shadow-xl shadow-indigo-200 dark:shadow-none scale-105"
                    : "bg-white dark:bg-neutral-900 text-slate-500 dark:text-neutral-400 border border-slate-100 dark:border-neutral-800 hover:border-indigo-200"
                }`}
              >
                <tab.icon
                  size={20}
                  className={IsActive ? "text-white" : "text-slate-400"}
                />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* 💻 Content Display */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="grid lg:grid-cols-2 gap-12 items-center bg-white dark:bg-neutral-900 p-8 md:p-16 rounded-[3.5rem] border border-slate-100 dark:border-neutral-800 shadow-sm"
            >
              {/* Left Side: Text */}
              <div>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
                  {content[active].title}
                </h2>
                <p className="text-slate-500 dark:text-neutral-400 font-medium mb-10 leading-relaxed italic">
                  "{content[active].subtitle}"
                </p>
                <div className="grid gap-6">
                  {content[active].points.map((p, i) => (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      key={p.text}
                      className="flex items-start gap-4 group"
                    >
                      <div className="mt-1 h-10 w-10 shrink-0 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                        <p.icon size={20} />
                      </div>
                      <p className="text-slate-700 dark:text-neutral-300 font-bold leading-tight pt-2">
                        {p.text}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right Side: Visual Placeholder (Mockup style) */}
              <div className="relative">
                {(() => {
                  const IconComponent = content[active].points[0].icon;
                  return (
                    <div className="aspect-square bg-indigo-600/5 rounded-[3rem] border border-dashed border-indigo-200 dark:border-indigo-900 flex items-center justify-center p-12">
                      <div className="relative w-full h-full bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border-4 border-slate-800">
                        {/* Fake UI Bar */}
                        <div className="h-6 bg-slate-800 w-full flex items-center px-4 gap-1">
                          <div className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                          <div className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        </div>
                        <div className="p-6 flex flex-col gap-4">
                          <div className="h-4 w-3/4 bg-slate-800 rounded-full animate-pulse" />
                          <div className="h-32 w-full bg-indigo-600/20 rounded-2xl border border-indigo-500/30 flex items-center justify-center">
                            <IconComponent
                              size={48}
                              className="text-indigo-500 opacity-50"
                            />
                          </div>
                          <div className="space-y-2 mt-4">
                            <div className="h-3 w-full bg-slate-800 rounded-full" />
                            <div className="h-3 w-5/6 bg-slate-800 rounded-full" />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
                {/* Floating Badges */}
                <div className="absolute -top-4 -right-4 h-20 w-20 bg-emerald-500 rounded-3xl flex items-center justify-center text-white shadow-xl rotate-12">
                  <CheckCircle2 size={32} />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
