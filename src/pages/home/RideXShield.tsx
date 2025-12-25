import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Eye,
  Smartphone,
  Users,
  Lock,
  BellRing,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router";

const RideXShield = () => {
  return (
    <div className="pt-24 min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors overflow-hidden">
      {/* --- Hero Section with Animated Background --- */}
      <section className="relative py-20 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[500px] bg-indigo-600/5 dark:bg-indigo-500/10 blur-[120px] rounded-full -z-10" />

        <div className="container mx-auto text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-full mb-8 shadow-sm"
          >
            <ShieldCheck className="text-indigo-600" size={18} />
            <span className="text-xs font-black uppercase tracking-widest">
              Industry Leading Safety
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl lg:text-8xl font-black mb-8 tracking-tighter"
          >
            Your Safety, <br /> Our{" "}
            <span className="text-indigo-600">Priority.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-500 dark:text-slate-400 mb-10 leading-relaxed"
          >
            RideX Shield is a comprehensive safety suite designed to protect you
            before, during, and after every trip. We use advanced technology to
            ensure peace of mind.
          </motion.p>
        </div>
      </section>

      {/* --- Feature Grid --- */}
      <section className="pb-32 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <motion.div
              whileHover={{ y: -5 }}
              className="group p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 transition-all shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10"
            >
              <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Eye className="text-indigo-600" size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Real-time Monitoring</h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                Our 24/7 safety team monitors unusual trip patterns and long
                stops to ensure you're always on the right track.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              whileHover={{ y: -5 }}
              className="group p-8 bg-indigo-600 rounded-[2.5rem] text-white shadow-xl shadow-indigo-500/20"
            >
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                <Users className="text-white" size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Trusted Contacts</h3>
              <p className="text-indigo-100 leading-relaxed font-medium">
                Automatically share your trip status, driver details, and live
                location with your family members in one tap.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              whileHover={{ y: -5 }}
              className="group p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 transition-all shadow-sm"
            >
              <div className="w-14 h-14 bg-rose-50 dark:bg-rose-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BellRing className="text-rose-600" size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Emergency SOS</h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                Direct in-app connection to local police and RideX emergency
                response team for immediate assistance.
              </p>
            </motion.div>

            {/* Feature 4 */}
            <motion.div
              whileHover={{ y: -5 }}
              className="group p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800"
            >
              <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center mb-6">
                <Lock className="text-emerald-600" size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Private Numbers</h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                Your phone number is always hidden. We use secure call masking
                to keep your personal information private.
              </p>
            </motion.div>

            {/* Feature 5 - The Tech Part */}
            <motion.div className="md:col-span-2 p-8 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-[2.5rem] flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-2/3">
                <h3 className="text-3xl font-black mb-4">
                  Facial Recognition Tech
                </h3>
                <p className="text-slate-400 dark:text-slate-500 mb-6">
                  We verify our drivers using AI-powered facial recognition
                  before they start their shift to prevent identity fraud.
                </p>
                <div className="flex gap-4">
                  <div className="bg-white/10 dark:bg-slate-100 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest">
                    AI Verified
                  </div>
                  <div className="bg-white/10 dark:bg-slate-100 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest">
                    Secure Login
                  </div>
                </div>
              </div>
              <div className="md:w-1/3">
                <Smartphone className="w-32 h-32 text-indigo-500 opacity-50" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RideXShield;
