import React, { useState } from "react";
import {
  ShieldAlert,
  PhoneCall,
  MapPin,
  X,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface SOSProps {
  isActive: boolean;
  currentLocation: { lat: number; lng: number } | null;
}

const EmergencySOS: React.FC<SOSProps> = ({ isActive, currentLocation }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // SOS ট্রিগার করার মেইন ফাংশন
  const triggerSOS = async () => {
    setIsSending(true);

    // এখানে তোর ব্যাকএন্ড API কল হবে
    // উদাহরণ: await sendSOSAlert({ location: currentLocation });

    setTimeout(() => {
      setIsSending(false);
      setIsOpen(false);
      toast.error("SOS Alert Broadcasted to Authorities!", {
        description: "Your live location is being tracked by our safety team.",
        duration: 5000,
      });
      // জাপানের ইমারজেন্সি পুলিশ নাম্বার (১১০) এ কল করার অপশন
      window.location.href = "tel:110";
    }, 2000);
  };

  if (!isActive) return null;

  return (
    <div className="relative">
      {/* মেইন পালসিং বাটন */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="relative group flex items-center gap-2 bg-rose-600 text-white px-5 py-2.5 rounded-2xl font-black text-xs uppercase tracking-tighter shadow-lg shadow-rose-200"
      >
        <span className="absolute inset-0 rounded-2xl bg-rose-600 animate-ping opacity-25"></span>
        <ShieldAlert className="h-4 w-4 animate-pulse" />
        SOS Emergency
      </motion.button>

      {/* ইমারজেন্সি কন্ট্রোল প্যানেল (Overlay) */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* ব্যাকড্রপ ব্লার */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isSending && setIsOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100]"
            />

            {/* ইমারজেন্সি কার্ড */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 100 }}
              className="fixed inset-x-4 bottom-10 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[400px] bg-white rounded-[2.5rem] shadow-2xl z-[101] overflow-hidden border border-rose-100"
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-4 bg-rose-50 rounded-3xl">
                    <AlertTriangle className="h-8 w-8 text-rose-600" />
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                  >
                    <X className="h-6 w-6 text-slate-400" />
                  </button>
                </div>

                <h2 className="text-2xl font-black text-slate-900 mb-2">
                  Emergency Assistance
                </h2>
                <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8">
                  Are you in danger? Pressing the button below will share your{" "}
                  <span className="text-rose-600 font-bold">
                    live GPS location
                  </span>{" "}
                  with the police and our 24/7 safety team.
                </p>

                {/* লোকেশন ইন্ডিকেটর */}
                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl mb-8 border border-slate-100">
                  <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                    <MapPin
                      className={`h-5 w-5 ${
                        currentLocation
                          ? "text-emerald-500"
                          : "text-slate-300 animate-bounce"
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">
                      Current Status
                    </p>
                    <p className="text-xs font-bold text-slate-700">
                      {currentLocation
                        ? `GPS: ${currentLocation.lat.toFixed(
                            4
                          )}, ${currentLocation.lng.toFixed(4)}`
                        : "Acquiring GPS Signal..."}
                    </p>
                  </div>
                </div>

                {/* মেইন কনফার্মেশন বাটন */}
                <button
                  onClick={triggerSOS}
                  disabled={isSending}
                  className="w-full bg-rose-600 hover:bg-rose-700 active:scale-95 transition-all text-white h-16 rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-xl shadow-rose-200 disabled:opacity-70"
                >
                  {isSending ? (
                    <Loader2 className="h-6 w-6 animate-spin" />
                  ) : (
                    <PhoneCall className="h-6 w-6" />
                  )}
                  {isSending ? "BROADCASTING..." : "CONFIRM SOS"}
                </button>

                <p className="text-center mt-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  False alerts may lead to account suspension
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EmergencySOS;
