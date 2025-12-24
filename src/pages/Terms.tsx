import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  Scale,
  ShieldAlert,
  CreditCard,
  UserCheck,
  Ban,
  FileText,
  Clock,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router";

export default function Terms() {
  const [activeSection, setActiveSection] = useState("");

  // Progress Bar Logic
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    { id: "acceptance", title: "1. Acceptance", icon: <Scale size={18} /> },
    { id: "services", title: "2. Services", icon: <FileText size={18} /> },
    {
      id: "user-resp",
      title: "3. Responsibilities",
      icon: <UserCheck size={18} />,
    },
    { id: "payments", title: "4. Payments", icon: <CreditCard size={18} /> },
    { id: "prohibited", title: "5. Restrictions", icon: <Ban size={18} /> },
    { id: "liability", title: "6. Liability", icon: <ShieldAlert size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-indigo-600 z-[110] origin-left"
        style={{ scaleX }}
      />

      <div className="container mx-auto px-6 pt-32 pb-20">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* --- Sidebar Navigation (Desktop) --- */}
          <aside className="hidden lg:block w-72 h-fit sticky top-32">
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">
              On this page
            </h4>
            <nav className="space-y-2">
              {sections.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => {
                    document
                      .getElementById(sec.id)
                      ?.scrollIntoView({ behavior: "smooth" });
                    setActiveSection(sec.id);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                    activeSection === sec.id
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                      : "text-slate-500 hover:bg-white dark:hover:bg-slate-900"
                  }`}
                >
                  {sec.icon} {sec.title}
                </button>
              ))}
            </nav>
          </aside>

          {/* --- Main Content --- */}
          <main className="flex-1 max-w-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 lg:p-12 rounded-[2.5rem] shadow-sm">
            {/* Header */}
            <div className="mb-12 border-b border-slate-100 dark:border-slate-800 pb-8 text-center lg:text-left">
              <h1 className="text-4xl lg:text-5xl font-black mb-4 tracking-tight">
                Terms & <span className="text-indigo-600">Conditions</span>
              </h1>
              <div className="flex items-center justify-center lg:justify-start gap-4 text-slate-500 text-sm">
                <span className="flex items-center gap-1.5 font-bold">
                  <Clock size={16} /> Updated: March 01, 2025
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                <span>v2.0</span>
              </div>
            </div>

            <div className="prose prose-slate dark:prose-invert max-w-none space-y-12">
              <section id="acceptance" className="scroll-mt-32 group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600">
                    <Scale size={20} />
                  </div>
                  <h2 className="text-2xl font-bold m-0 group-hover:text-indigo-600 transition-colors">
                    1. Acceptance of Terms
                  </h2>
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  By accessing or using RideX, you agree to comply with and be
                  bound by these Terms & Conditions. Our platform connects
                  riders with driver partners, and your use signifies a legal
                  agreement between you and RideX.
                  <strong className="text-slate-900 dark:text-white">
                    {" "}
                    If you do not agree, please discontinue use of our services
                    immediately.
                  </strong>
                </p>
              </section>

              <section id="services" className="scroll-mt-32 group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600">
                    <FileText size={20} />
                  </div>
                  <h2 className="text-2xl font-bold m-0 group-hover:text-blue-600 transition-colors">
                    2. Services
                  </h2>
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  RideX provides ride-booking, logistics, and intercity travel
                  services. We act as a technology facilitator. We reserve the
                  right to modify, suspend, or discontinue any aspect of our
                  services at any time without prior notice to maintain platform
                  integrity.
                </p>
              </section>

              <section id="user-resp" className="scroll-mt-32 group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600">
                    <UserCheck size={20} />
                  </div>
                  <h2 className="text-2xl font-bold m-0 group-hover:text-emerald-600 transition-colors">
                    3. User Responsibilities
                  </h2>
                </div>
                <div className="grid gap-3">
                  {[
                    "You must be at least 18 years old to use RideX services.",
                    "You agree to provide accurate and up-to-date identification.",
                    "You are responsible for all activities under your account credentials.",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800"
                    >
                      <ChevronRight
                        className="text-emerald-500 shrink-0"
                        size={18}
                      />
                      <span className="text-sm font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section id="payments" className="scroll-mt-32 group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-900/30 text-amber-600">
                    <CreditCard size={20} />
                  </div>
                  <h2 className="text-2xl font-bold m-0 group-hover:text-amber-600 transition-colors">
                    4. Payments
                  </h2>
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  All rides booked through RideX must be paid in accordance with
                  our real-time pricing engine. Fares include base price,
                  distance, and duration. Failure to complete payment or
                  initiating unauthorized chargebacks may result in permanent
                  suspension.
                </p>
              </section>

              <section id="prohibited" className="scroll-mt-32 group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-rose-50 dark:bg-rose-900/30 text-rose-600">
                    <Ban size={20} />
                  </div>
                  <h2 className="text-2xl font-bold m-0 group-hover:text-rose-600 transition-colors">
                    5. Prohibited Conduct
                  </h2>
                </div>
                <p className="mb-4 text-slate-600 dark:text-slate-400 italic font-medium">
                  To maintain safety, users may not:
                </p>
                <ul className="grid gap-2 list-none p-0">
                  <li className="flex items-center gap-2 text-sm bg-rose-500/5 p-3 rounded-lg border border-rose-500/10">
                    ❌ Use RideX for any unlawful or criminal purposes.
                  </li>
                  <li className="flex items-center gap-2 text-sm bg-rose-500/5 p-3 rounded-lg border border-rose-500/10">
                    ❌ Harass, threaten, or harm drivers, staff, or other
                    passengers.
                  </li>
                  <li className="flex items-center gap-2 text-sm bg-rose-500/5 p-3 rounded-lg border border-rose-500/10">
                    ❌ Attempt to bypass security or scrape platform data.
                  </li>
                </ul>
              </section>

              {/* ... Other sections follow the same pattern ... */}
            </div>

            {/* Footer Contact */}
            <div className="mt-16 pt-8 border-t border-slate-100 dark:border-slate-800 text-center">
              <p className="text-slate-500 text-sm mb-4">
                Have questions regarding these terms?
              </p>
              <Link to="/contact">
                <button className="text-indigo-600 font-black hover:underline px-6 py-2 border-2 border-indigo-600 rounded-full">
                  Contact Legal Team
                </button>
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
