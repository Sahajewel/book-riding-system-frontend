import { Link } from "react-router";
import {
  Home,
  ShieldCheck,
  Car,
  Zap,
  HelpCircle,
  FileText,
  Cookie,
  MessageSquare,
  Map,
  User,
  ChevronRight,
  LayoutDashboard,
  Navigation,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";

const sitemapData = [
  {
    category: "Main Pages",
    links: [
      { label: "Home", href: "/", icon: <Home size={18} /> },
      { label: "About Us", href: "/about", icon: <Navigation size={18} /> },
      { label: "Our Services", href: "/services", icon: <Car size={18} /> },
      {
        label: "Contact Us",
        href: "/contact",
        icon: <MessageSquare size={18} />,
      },
    ],
  },
  {
    category: "Specialized Services",
    links: [
      {
        label: "City Rides",
        href: "/services/city-rides",
        icon: <Car size={18} />,
      },
      {
        label: "Intercity Rides",
        href: "/services/intercity",
        icon: <Map size={18} />,
      },
      {
        label: "RideX Shield",
        href: "/services/ridex-shield",
        icon: <ShieldCheck size={18} />,
      },
    ],
  },
  {
    category: "Support & Legal",
    links: [
      {
        label: "Help Center",
        href: "/help-center",
        icon: <HelpCircle size={18} />,
      },
      {
        label: "Terms & Conditions",
        href: "/terms",
        icon: <FileText size={18} />,
      },
      {
        label: "Cookie Policy",
        href: "/cookie-policy",
        icon: <Cookie size={18} />,
      },
      {
        label: "Privacy Policy",
        href: "/privacy-policy",
        icon: <ShieldCheck size={18} />,
      },
    ],
  },
  {
    category: "Account Control",
    links: [],
  },
];

export default function Sitemap() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col transition-colors">
      {/* Main Page Content */}
      <main className="flex-grow container mx-auto px-6 pt-36 pb-20">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="mb-16">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-5xl lg:text-7xl font-black mb-6 tracking-tight text-slate-900 dark:text-white"
            >
              Site{" "}
              <span className="text-indigo-600 tracking-tighter underline decoration-indigo-200">
                Directory.
              </span>
            </motion.h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
              Quickly jump to any part of the RideX ecosystem. Organized for
              efficiency and ease of use.
            </p>
          </div>

          {/* Grid Layout - No Wrap with Footer anymore */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {sitemapData.map((group, idx) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group"
              >
                <div className="flex items-center gap-2 mb-8">
                  <div className="h-1 w-6 bg-indigo-600 rounded-full"></div>
                  <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-indigo-600 transition-colors">
                    {group.category}
                  </h3>
                </div>

                <ul className="space-y-5">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-600 dark:hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-500/5 transition-all group/link"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-slate-400 group-hover/link:text-indigo-600 transition-colors">
                            {link.icon}
                          </span>
                          <span className="font-bold text-slate-700 dark:text-slate-300 group-hover/link:text-slate-900 dark:group-hover/link:text-white">
                            {link.label}
                          </span>
                        </div>
                        <ChevronRight
                          size={16}
                          className="text-slate-300 group-hover/link:text-indigo-600 group-hover/link:translate-x-1 transition-all"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
