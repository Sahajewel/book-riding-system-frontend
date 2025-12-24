import { Link } from "react-router";
import {
  ChevronRight,
  Shield,
  Cookie,
  Settings,
  Database,
  ExternalLink,
  Info,
  ArrowRight,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <Navbar />

      {/* --- Simple Breadcrumb --- */}
      <div className="container mx-auto px-6 pt-32 pb-6">
        <nav className="flex items-center text-sm font-medium text-slate-500">
          <Link to="/" className="hover:text-indigo-600 transition-colors">
            Home
          </Link>
          <ChevronRight size={14} className="mx-2 opacity-50" />
          <span className="text-slate-900 dark:text-slate-300">
            Cookie Policy
          </span>
        </nav>
      </div>

      <main className="container mx-auto px-6 max-w-5xl pb-20">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[3rem] shadow-sm overflow-hidden">
          {/* --- Modern Header Section --- */}
          <div className="bg-indigo-600 p-10 lg:p-16 text-white relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-md">
                  <Info size={14} /> Transparency First
                </div>
                <h1 className="text-4xl lg:text-6xl font-black mb-4 tracking-tighter">
                  Cookie Policy
                </h1>
                <p className="text-indigo-100 font-medium max-w-xl">
                  We value your privacy. This policy outlines how RideX uses
                  cookies to enhance your journey and secure your data.
                </p>
                <p className="mt-6 text-indigo-200 text-sm font-bold">
                  Last updated:{" "}
                  {new Date().toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div className="hidden lg:block">
                <Cookie
                  size={120}
                  className="text-white/20 animate-pulse"
                  strokeWidth={1.5}
                />
              </div>
            </div>
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl rounded-full -mr-20 -mt-20"></div>
          </div>

          <div className="p-8 lg:p-16">
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-12 leading-relaxed italic">
              "At RideX, we believe in being clear about how we collect and use
              data related to you. This policy provides detailed information
              about how and when we use cookies."
            </p>

            {/* --- What Are Cookies --- */}
            <section className="mb-16">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-2xl">
                  <Database size={24} />
                </div>
                <h2 className="text-3xl font-black tracking-tight">
                  What Are Cookies?
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-8 text-slate-600 dark:text-slate-400 leading-relaxed">
                <p>
                  Cookies are small text files that are stored on your device
                  (computer, tablet, or mobile) when you visit websites. They
                  act as a "memory" for the website, allowing it to remember
                  your device upon return.
                </p>
                <p>
                  Cookies can be{" "}
                  <span className="text-slate-900 dark:text-white font-bold">
                    "persistent"
                  </span>{" "}
                  (remain until you delete them) or{" "}
                  <span className="text-slate-900 dark:text-white font-bold">
                    "session"
                  </span>{" "}
                  (deleted when you close the browser). Both help us provide a
                  seamless experience.
                </p>
              </div>
            </section>

            {/* --- Cookie Categories Grid --- */}
            <section className="mb-16">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-amber-50 dark:bg-amber-900/30 text-amber-600 rounded-2xl">
                  <Settings size={24} />
                </div>
                <h2 className="text-3xl font-black tracking-tight">
                  How We Use Cookies
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    t: "Essential",
                    d: "Necessary for the website to function. Without these, you can't log in or book a ride.",
                    bg: "bg-slate-50 dark:bg-slate-800/50",
                  },
                  {
                    t: "Analytics",
                    d: "Help us understand how users interact with our app, enabling us to improve performance.",
                    bg: "bg-blue-50/50 dark:bg-blue-900/10",
                  },
                  {
                    t: "Functionality",
                    d: "Remember your language, region, and custom settings for a personalized feel.",
                    bg: "bg-emerald-50/50 dark:bg-emerald-900/10",
                  },
                  {
                    t: "Targeting",
                    d: "Used by our partners to show relevant ads based on your interests across the web.",
                    bg: "bg-purple-50/50 dark:bg-purple-900/10",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 ${item.bg}`}
                  >
                    <h3 className="text-xl font-bold mb-3">{item.t} Cookies</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                      {item.d}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* --- Your Choices --- */}
            <section className="mb-16 bg-slate-900 dark:bg-white text-white dark:text-slate-900 p-10 lg:p-14 rounded-[3rem] relative overflow-hidden">
              <div className="relative z-10 flex flex-col md:flex-row gap-10 items-center">
                <div className="md:w-2/3">
                  <div className="flex items-center gap-4 mb-6">
                    <Shield
                      className="text-indigo-400 dark:text-indigo-600"
                      size={32}
                    />
                    <h2 className="text-3xl font-black tracking-tight">
                      Your Cookie Choices
                    </h2>
                  </div>
                  <p className="text-slate-400 dark:text-slate-500 mb-6 leading-relaxed">
                    You have the right to decide whether to accept or reject
                    cookies. Most browsers allow you to control cookies through
                    their settings.
                  </p>
                </div>
                <div className="md:w-1/3 flex justify-center">
                  <div className="w-32 h-32 border-4 border-indigo-600 rounded-full flex items-center justify-center animate-spin-slow">
                    <Settings className="text-indigo-600" size={40} />
                  </div>
                </div>
              </div>
            </section>

            {/* --- Contact & Updates --- */}
            <div className="grid md:grid-cols-2 gap-12 border-t border-slate-100 dark:border-slate-800 pt-16">
              <section>
                <h2 className="text-2xl font-bold mb-6">
                  Contact Privacy Team
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                    <div className="w-10 h-10 bg-white dark:bg-slate-700 rounded-xl flex items-center justify-center shadow-sm">
                      <ExternalLink size={18} className="text-indigo-600" />
                    </div>
                    <span className="font-bold text-sm">privacy@ridex.com</span>
                  </div>
                  <Link
                    to="/contact"
                    className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl group"
                  >
                    <span className="font-bold text-sm">
                      Contact Support Form
                    </span>
                    <ChevronRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </Link>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-6">Policy Updates</h2>
                <p className="text-slate-500 text-sm leading-relaxed">
                  We update this policy from time to time to stay compliant with
                  global laws. Significant changes will be notified via our app
                  banner or email notifications.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

      {/* --- Help CTA --- */}
      <section className="container mx-auto px-6 mb-20">
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-[3rem] p-12 text-center text-white">
          <h2 className="text-3xl font-black mb-4 italic">
            Confused about privacy settings?
          </h2>
          <p className="mb-8 opacity-80 max-w-xl mx-auto font-medium">
            Our support team can help you understand how your data is processed.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-white text-indigo-600 font-black py-4 px-10 rounded-2xl shadow-xl hover:bg-indigo-50 transition-all"
          >
            Talk to Experts <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
