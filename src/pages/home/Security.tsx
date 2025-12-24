import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Lock,
  Key,
  Smartphone,
  EyeOff,
  UserRoundCheck,
  AlertTriangle,
  Fingerprint,
  ArrowRight,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const SecurityPage = () => {
  const securityFeatures = [
    {
      title: "Account Protection",
      desc: "Enable Two-Factor Authentication (2FA) to add an extra layer of security to your account login.",
      icon: <Fingerprint className="text-indigo-600" size={32} />,
    },
    {
      title: "Data Encryption",
      desc: "All your personal data and payment information are encrypted with bank-grade AES-256 security.",
      icon: <Lock className="text-indigo-600" size={32} />,
    },
    {
      title: "Real-time Verification",
      desc: "Our AI-powered system verifies drivers and vehicles before every ride to prevent fraud.",
      icon: <UserRoundCheck className="text-indigo-600" size={32} />,
    },
    {
      title: "Privacy Controls",
      desc: "You have full control over what data you share. We never sell your personal info to third parties.",
      icon: <EyeOff className="text-indigo-600" size={32} />,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          {/* --- Hero Section --- */}
          <div className="flex flex-col lg:flex-row items-center gap-16 mb-24">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:w-1/2 text-left"
            >
              <div className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-4 py-2 rounded-full mb-6 font-black text-xs uppercase tracking-widest">
                <ShieldCheck size={16} /> Secure Ecosystem
              </div>
              <h1 className="text-5xl lg:text-7xl font-black mb-8 leading-tight tracking-tighter">
                Your Security, <br /> Our{" "}
                <span className="text-indigo-600">Standard.</span>
              </h1>
              <p className="text-xl text-slate-500 dark:text-slate-400 leading-relaxed mb-10">
                At RideX, we use world-class technology and rigorous protocols
                to keep your account, data, and money safe from any threat.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="lg:w-1/2 relative"
            >
              {/* Abstract Security Graphic */}
              <div className="relative z-10 bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-2xl">
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
                    <Smartphone className="mb-4 text-indigo-500" />
                    <div className="h-2 w-12 bg-indigo-500 rounded-full mb-2"></div>
                    <div className="h-2 w-8 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
                  </div>
                  <div className="p-6 bg-indigo-600 rounded-2xl shadow-xl shadow-indigo-500/20">
                    <Key className="mb-4 text-white" />
                    <div className="h-2 w-12 bg-white/40 rounded-full mb-2"></div>
                    <div className="h-2 w-8 bg-white/20 rounded-full"></div>
                  </div>
                  <div className="col-span-2 p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-between">
                    <div className="flex gap-4 items-center">
                      <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                        <ShieldCheck size={20} />
                      </div>
                      <span className="font-bold text-sm">
                        System Status: Secure
                      </span>
                    </div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full -z-10"></div>
            </motion.div>
          </div>

          {/* --- Features Grid --- */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
            {securityFeatures.map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all"
              >
                <div className="mb-6 w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-black mb-4">{feature.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* --- Report Vulnerability Section --- */}
          <section className="bg-slate-900 dark:bg-white rounded-[3rem] p-10 lg:p-16 text-white dark:text-slate-950 flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-2/3">
              <div className="flex items-center gap-3 mb-6">
                <AlertTriangle className="text-amber-500" size={32} />
                <h2 className="text-3xl lg:text-4xl font-black">
                  Spotted a bug or threat?
                </h2>
              </div>
              <p className="text-slate-400 dark:text-slate-500 text-lg leading-relaxed mb-8">
                We take security seriously. If you find a vulnerability in our
                system, report it to our Bug Bounty team and help us build a
                safer RideX.
              </p>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <div className="w-48 h-48 border-[12px] border-slate-800 dark:border-slate-100 rounded-full flex items-center justify-center opacity-20">
                <ShieldCheck size={80} />
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default SecurityPage;
