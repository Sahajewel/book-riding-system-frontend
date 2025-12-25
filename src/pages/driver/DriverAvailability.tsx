/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/driver/DriverAvailability.tsx
import { useState, useEffect } from "react";
import { toast } from "sonner"; // Using sonner for consistent UI
import {
  Power,
  Clock,
  DollarSign,
  ShieldAlert,
  CarFront,
  Activity,
  Zap,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useGetDriverProfileQuery,
  useUpdateAvailabilityMutation,
} from "@/redux/features/driver/driver.api";

const DriverAvailability = () => {
  const { data: profile, isLoading: profileLoading } =
    useGetDriverProfileQuery();
  const [updateAvailability, { isLoading: updating }] =
    useUpdateAvailabilityMutation();
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    if (profile?.driverInfo?.isAvailable !== undefined) {
      setIsOnline(profile.driverInfo.isAvailable);
    }
  }, [profile]);

  const handleToggleAvailability = async () => {
    try {
      const newStatus = !isOnline;
      await updateAvailability({ isAvailable: newStatus }).unwrap();
      setIsOnline(newStatus);
      toast.success(`System: You are now ${newStatus ? "ONLINE" : "OFFLINE"}`, {
        description: newStatus
          ? "Start receiving ride requests."
          : "Stay safe and rest well!",
      });
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update availability");
    }
  };

  if (profileLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950">
        <div className="relative">
          <div className="h-20 w-20 rounded-full border-t-4 border-indigo-600 animate-spin"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <CarFront className="text-indigo-600 animate-pulse" size={24} />
          </div>
        </div>
      </div>
    );
  }

  // --- Suspended State UI ---
  if (profile?.driverStatus === "suspended") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl p-10 text-center border-4 border-rose-500/20"
        >
          <div className="w-24 h-24 bg-rose-100 dark:bg-rose-900/30 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <ShieldAlert className="h-12 w-12 text-rose-600" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4 tracking-tighter uppercase italic">
            Account Halted
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8 font-medium leading-relaxed">
            Safety is our priority. Your driver access is currently restricted.
            Please reach out to our command center.
          </p>
          <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-3xl space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="font-bold uppercase opacity-50">
                Support Hub
              </span>
              <span className="text-indigo-600 font-black tracking-wide">
                support@ridex.com
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="font-bold uppercase opacity-50">
                Crisis Line
              </span>
              <span className="text-indigo-600 font-black">+880 123 456</span>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 lg:p-12 transition-colors">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tighter italic uppercase">
              Duty <span className="text-indigo-600">Console</span>
            </h1>
            <p className="text-slate-500 font-bold mt-2 flex items-center gap-2">
              <Activity size={18} className="text-emerald-500" /> System live
              and monitoring nearby requests.
            </p>
          </div>
          <div className="flex items-center gap-3 bg-white dark:bg-slate-900 px-6 py-3 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
            <div
              className={`w-3 h-3 rounded-full ${
                isOnline ? "bg-emerald-500 animate-pulse" : "bg-slate-300"
              }`}
            ></div>
            <span className="font-black text-sm uppercase tracking-widest italic leading-none pt-0.5">
              {isOnline ? "Active on Grid" : "Offline"}
            </span>
          </div>
        </div>

        {/* --- Main Action Card --- */}
        <motion.div
          layout
          className={`relative rounded-[4rem] shadow-2xl p-12 mb-12 overflow-hidden transition-all duration-500 ${
            isOnline
              ? "bg-emerald-600 text-white shadow-emerald-500/20"
              : "bg-slate-900 text-white shadow-slate-900/40"
          }`}
        >
          {/* Background Decorative Rings */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>

          <div className="relative z-10 flex flex-col items-center text-center">
            <motion.div
              animate={{
                scale: isOnline ? [1, 1.05, 1] : 1,
                boxShadow: isOnline
                  ? "0 0 40px rgba(16, 185, 129, 0.5)"
                  : "none",
              }}
              transition={{ repeat: Infinity, duration: 2 }}
              className={`w-32 h-32 rounded-full flex items-center justify-center mb-8 border-4 ${
                isOnline
                  ? "bg-white border-white/20"
                  : "bg-slate-800 border-white/5"
              }`}
            >
              <Power
                className={`h-16 w-16 ${
                  isOnline ? "text-emerald-600" : "text-slate-500"
                }`}
                strokeWidth={3}
              />
            </motion.div>

            <h2 className="text-4xl lg:text-5xl font-black mb-4 tracking-tighter uppercase italic">
              {isOnline ? "Receiving Missions" : "System Standby"}
            </h2>

            <p
              className={`text-lg mb-10 max-w-sm font-medium ${
                isOnline ? "text-emerald-50 opacity-80" : "text-slate-400"
              }`}
            >
              {isOnline
                ? "Stay alert! We are matching you with riders in your current radius."
                : "Tap the button below to start your shift and earn today."}
            </p>

            <button
              onClick={handleToggleAvailability}
              disabled={updating}
              className={`group relative overflow-hidden px-16 py-6 rounded-3xl font-black text-xl uppercase tracking-widest transition-all active:scale-95 disabled:opacity-50 ${
                isOnline
                  ? "bg-rose-500 hover:bg-rose-600 shadow-xl shadow-rose-900/20"
                  : "bg-emerald-500 hover:bg-emerald-600 shadow-xl shadow-emerald-500/30"
              }`}
            >
              <span className="relative z-10 flex items-center gap-3">
                {updating
                  ? "Processing..."
                  : isOnline
                  ? "End Duty"
                  : "Go Live Now"}
                {!updating && <Zap size={20} fill="currentColor" />}
              </span>
            </button>
          </div>
        </motion.div>

        {/* --- Stats Cards --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            {
              label: "Assigned Vehicle",
              val: profile?.driverInfo?.vehicleType || "None",
              icon: <CarFront size={22} />,
              color: "text-blue-500",
              bg: "bg-blue-500/10",
            },
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-sm border border-slate-100 dark:border-slate-800 flex items-center gap-6"
            >
              <div className={`p-4 ${stat.bg} ${stat.color} rounded-2xl`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">
                  {stat.label}
                </p>
                <p className="text-2xl font-black text-slate-900 dark:text-white italic">
                  {stat.val}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- Contextual Helper --- */}
        <AnimatePresence mode="wait">
          {!isOnline ? (
            <motion.div
              key="offline-tips"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-800 rounded-[3rem] p-10 flex flex-col md:flex-row items-center gap-10"
            >
              <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center text-white shrink-0 shadow-xl shadow-indigo-500/30">
                <ShieldAlert size={32} />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-black text-indigo-950 dark:text-indigo-100 mb-2 italic uppercase tracking-tight">
                  Pre-Shift Checklist
                </h3>
                <p className="text-indigo-600/70 dark:text-indigo-400 mb-6 font-medium">
                  Complete these steps to maximize your safety and earnings
                  performance.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "Fuel Check",
                    "Clean Cabin",
                    "Device Charged",
                    "Identity Card",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 text-sm font-bold text-indigo-900 dark:text-indigo-200"
                    >
                      <div className="w-2 h-2 rounded-full bg-indigo-600"></div>{" "}
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <ChevronRight
                size={40}
                className="text-indigo-200 hidden md:block"
              />
            </motion.div>
          ) : (
            <motion.div
              key="online-alert"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-emerald-500 rounded-[3rem] p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-emerald-500/20"
            >
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                  <Activity className="animate-pulse" size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-black italic uppercase tracking-tight leading-none mb-1">
                    Grid Operational
                  </h3>
                  <p className="opacity-80 font-bold">
                    You are in the high-demand zone. Stay within the city
                    limits.
                  </p>
                </div>
              </div>
              <div className="px-8 py-3 bg-white text-emerald-600 rounded-2xl font-black text-sm uppercase tracking-widest">
                Live Track
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DriverAvailability;
