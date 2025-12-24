// src/pages/driver/RideRequests.tsx
import {
  useAcceptRideMutation,
  useGetDriverRidesQuery,
  useRejectRideMutation,
} from "@/redux/features/driver/driver.api";
import type { IRide } from "@/types/ride.interface";
import { toast } from "sonner";
import {
  MapPin,
  Clock,
  Navigation,
  CheckCircle,
  XCircle,
  ArrowLeft,
  Phone,
  Car,
  Zap,
  RefreshCw,
  UserCheck,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";

const RideRequests = () => {
  const navigate = useNavigate();
  const { data, isLoading, refetch, isFetching } =
    useGetDriverRidesQuery(undefined);
  const [acceptRide] = useAcceptRideMutation();
  const [rejectRide] = useRejectRideMutation();

  const rides = (data as any)?.data || [];
  const requestedRides = rides.filter(
    (ride: IRide) => ride.status === "requested"
  );

  useEffect(() => {
    const interval = setInterval(() => refetch(), 15000);
    return () => clearInterval(interval);
  }, [refetch]);

  const handleAction = async (action: "accept" | "reject", rideId: string) => {
    try {
      if (action === "accept") {
        await acceptRide(rideId).unwrap();
        toast.success("Mission Started! Drive to pickup point.");
        navigate("/driver/active-ride"); // সরাসরি অ্যাক্টিভ রাইড পেজে নিয়ে যাবে
      } else {
        await rejectRide(rideId).unwrap();
        toast.error("Request Ignored");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Operation failed");
    }
  };

  if (isLoading) return <RequestSkeleton />;

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-200 pb-10">
      {/* Dynamic Header */}
      <div className="sticky top-0 z-50 bg-[#0F172A]/80 backdrop-blur-xl border-b border-slate-800 px-6 py-4">
        <div className="max-w-2xl mx-auto flex justify-between items-center">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="text-center">
            <h1 className="text-xl font-black italic tracking-tighter uppercase">
              Incoming <span className="text-indigo-500">Jobs</span>
            </h1>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.3em]">
              Nearby Requests
            </p>
          </div>
          <button
            onClick={() => refetch()}
            className={`p-2 rounded-full ${
              isFetching ? "animate-spin text-indigo-500" : "text-slate-400"
            }`}
          >
            <RefreshCw size={20} />
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4 space-y-6">
        {/* Status Dashboard */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-[2rem] flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-500">
              <Zap size={24} fill="currentColor" />
            </div>
            <div>
              <p className="text-2xl font-black italic">
                {requestedRides.length}
              </p>
              <p className="text-[10px] font-bold text-slate-500 uppercase">
                Available
              </p>
            </div>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-[2rem] flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-2xl font-black italic">Live</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase">
                Radar Mode
              </p>
            </div>
          </div>
        </div>

        {/* List of Requests */}
        <AnimatePresence mode="popLayout">
          {requestedRides.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-20 text-center space-y-4"
            >
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-indigo-500 blur-3xl opacity-20 animate-pulse" />
                <Car size={80} className="relative text-slate-700 mx-auto" />
              </div>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">
                Searching for new rides...
              </p>
            </motion.div>
          ) : (
            requestedRides.map((ride: IRide, index: number) => (
              <motion.div
                key={ride._id}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 50, opacity: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-slate-900 border border-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl"
              >
                {/* Visual Accent */}
                <div className="absolute top-0 left-0 w-2 h-full bg-indigo-600" />

                <div className="p-6 md:p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center border border-slate-700">
                        <UserCheck className="text-indigo-400" size={24} />
                      </div>
                      <div>
                        <h3 className="font-black text-lg tracking-tight">
                          {ride.passengerId?.name || "Guest Rider"}
                        </h3>
                        <p className="text-xs text-slate-500 font-bold">
                          ID: {ride._id?.slice(-6).toUpperCase()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-black italic tracking-tighter text-emerald-400">
                        ৳{ride.fare}
                      </p>
                      <p className="text-[10px] font-black text-slate-500 uppercase">
                        Estimated Fare
                      </p>
                    </div>
                  </div>

                  {/* Path Display */}
                  <div className="space-y-6 relative mb-8">
                    <div className="absolute left-[11px] top-6 bottom-6 w-0.5 bg-slate-800" />
                    <div className="flex gap-4 items-start">
                      <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center z-10">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                      </div>
                      <div className="flex-1">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                          Pickup
                        </p>
                        <p className="text-sm font-bold text-slate-200 line-clamp-1">
                          {ride.pickupLocation}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start">
                      <div className="w-6 h-6 rounded-full bg-rose-500/20 border border-rose-500/50 flex items-center justify-center z-10">
                        <div className="w-2 h-2 bg-rose-500 rounded-full" />
                      </div>
                      <div className="flex-1">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                          Drop-off
                        </p>
                        <p className="text-sm font-bold text-slate-200 line-clamp-1">
                          {ride.dropoffLocation}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => handleAction("reject", ride._id as string)}
                      className="flex items-center justify-center gap-2 py-4 rounded-2xl font-black uppercase text-xs tracking-widest bg-slate-800 hover:bg-rose-900/30 text-slate-400 hover:text-rose-400 transition-all border border-transparent hover:border-rose-900/50"
                    >
                      <XCircle size={18} /> Pass
                    </button>
                    <button
                      onClick={() => handleAction("accept", ride._id as string)}
                      className="flex items-center justify-center gap-2 py-4 rounded-2xl font-black uppercase text-xs tracking-widest bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-900/20 hover:scale-[1.02] active:scale-95 transition-all"
                    >
                      <CheckCircle size={18} /> Accept
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const RequestSkeleton = () => (
  <div className="min-h-screen bg-[#0F172A] p-6 space-y-6">
    <div className="h-20 w-full bg-slate-900 rounded-3xl animate-pulse" />
    <div className="h-64 w-full bg-slate-900 rounded-[2.5rem] animate-pulse" />
    <div className="h-64 w-full bg-slate-900 rounded-[2.5rem] animate-pulse" />
  </div>
);

export default RideRequests;
