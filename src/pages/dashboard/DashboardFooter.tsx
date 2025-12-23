import { ShieldCheck, LifeBuoy } from "lucide-react";

import { Link } from "react-router-dom";
const DashboardFooter = () => {
  return (
    <footer className="mt-auto py-8 px-6 border-t border-slate-100">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Security Badge */}
        <div className="flex items-center gap-3 text-slate-400">
          <div className="p-2 bg-slate-50 rounded-lg">
            <ShieldCheck size={18} className="text-emerald-500" />
          </div>
          <p className="text-[11px] font-bold uppercase tracking-widest">
            Secure Ride Dashboard <span className="mx-2 opacity-30">|</span>{" "}
            v2.4.0
          </p>
        </div>

        {/* Center: Copyright */}
        <p className="text-slate-400 text-xs font-medium">
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-indigo-600 font-bold">SafeRide</span> Japan Inc.
        </p>

        {/* Right: Support Links */}
        <div className="flex items-center gap-6">
          <Link
            to="/rider/support"
            className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors"
          >
            <LifeBuoy size={16} /> Support Center
          </Link>
          <div className="h-4 w-[1px] bg-slate-200" />
          <div className="flex gap-4">
            <a
              href="#"
              className="text-[10px] font-bold text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-[10px] font-bold text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default DashboardFooter;
