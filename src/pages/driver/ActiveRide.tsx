// src/pages/driver/ActiveRide.tsx
import { useState, useEffect } from "react";
import {
  useGetDriverRidesQuery,
  useUpdateRideStatusMutation,
} from "@/redux/features/driver/driver.api";
import { toast } from "react-hot-toast";
import {
  MapPin,
  Clock,
  User,
  Phone,
  Navigation,
  CheckCircle,
  ShieldAlert,
  MoreVertical,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import { RideStatus, type UpdatableRideStatus } from "@/types/ride.interface";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";

const ActiveRide = () => {
  const {
    data: ridesResponse,
    isLoading,
    refetch,
  } = useGetDriverRidesQuery(undefined);
  const [updateRideStatus] = useUpdateRideStatusMutation();
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const rides = ridesResponse?.data || [];
  const activeRide = rides.find(
    (ride) =>
      ride.status === RideStatus.ACCEPTED || ride.status === RideStatus.ONGOING
  );

  useEffect(() => {
    const interval = setInterval(() => refetch(), 15000); // 15s refresh for active tracking
    return () => clearInterval(interval);
  }, [refetch]);

  const handleStatusUpdate = async (newStatus: UpdatableRideStatus) => {
    if (!activeRide?._id) return;
    try {
      setUpdatingStatus(true);
      await updateRideStatus({
        rideId: activeRide._id,
        status: newStatus,
      }).unwrap();
      toast.success(
        newStatus === "ongoing"
          ? "Trip Started! Drive safe."
          : "Trip Completed!"
      );
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || "Status update failed");
    } finally {
      setUpdatingStatus(false);
    }
  };

  if (isLoading) return <ActiveRideSkeleton />;

  if (!activeRide) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl p-10 text-center border border-slate-100 dark:border-slate-800"
        >
          <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Navigation className="h-10 w-10 text-indigo-600 animate-pulse" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-3 italic uppercase tracking-tighter">
            No Active Ride
          </h2>
          <p className="text-slate-500 font-medium mb-8">
            You're currently offline or waiting for a passenger. Ready for your
            next mission?
          </p>
          <Link
            to="/driver/update-ride"
            className="inline-flex items-center gap-2 bg-slate-900 dark:bg-indigo-600 text-white font-black py-4 px-8 rounded-2xl transition-all hover:scale-105 active:scale-95 uppercase text-sm tracking-widest"
          >
            Find Requests <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 pb-32">
      {/* Top Status Bar */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-30 px-6 py-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-ping" />
            <span className="font-black uppercase italic tracking-tighter text-lg">
              Live <span className="text-indigo-600">Session</span>
            </span>
          </div>
          <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
            <MoreVertical size={20} />
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 lg:p-8">
        {/* Progress Step Indicator */}
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 shadow-sm border border-slate-100 dark:border-slate-800 mb-6">
          <div className="flex justify-between items-center relative">
            <div className="absolute h-1 bg-slate-100 dark:bg-slate-800 w-full top-1/2 -translate-y-1/2 z-0" />
            <Step icon={<CheckCircle />} active={true} label="Accepted" />
            <Step
              icon={<Navigation />}
              active={activeRide.status === "ongoing"}
              label="On Trip"
            />
            <Step icon={<CheckCircle />} active={false} label="Finish" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Main Info */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-xl border border-slate-100 dark:border-slate-800">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                    Passenger Info
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center text-indigo-600 font-black text-xl">
                      {activeRide._id?.slice(-1).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-xl font-black tracking-tight">
                        Customer #{activeRide._id?.slice(-6).toUpperCase()}
                      </h3>
                      <div className="flex items-center gap-2 text-emerald-500 text-xs font-bold">
                        <ShieldAlert size={14} /> Verified Profile
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                    Fare
                  </p>
                  <p className="text-3xl font-black italic tracking-tighter text-indigo-600">
                    ৳{activeRide.fare}
                  </p>
                </div>
              </div>

              {/* Route Display */}
              <div className="space-y-4 relative">
                <div className="absolute left-[11px] top-6 bottom-6 w-0.5 bg-dashed border-l-2 border-slate-100 dark:border-slate-800" />
                <RouteItem
                  iconColor="bg-emerald-500"
                  label="Pickup Location"
                  address={activeRide.pickupLocation}
                />
                <RouteItem
                  iconColor="bg-rose-500"
                  label="Drop-off Destination"
                  address={activeRide.dropoffLocation}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8">
                <button className="flex items-center justify-center gap-3 bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 text-slate-900 dark:text-white py-4 rounded-2xl font-black transition-all group">
                  <Phone
                    size={18}
                    className="group-hover:rotate-12 transition-transform"
                  />{" "}
                  Call
                </button>
                <button className="flex items-center justify-center gap-3 bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 text-slate-900 dark:text-white py-4 rounded-2xl font-black transition-all group">
                  <Navigation size={18} /> Maps
                </button>
              </div>
            </div>
          </div>

          {/* Side Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white shadow-lg shadow-indigo-200 dark:shadow-none">
              <Clock className="mb-4 opacity-60" size={32} />
              <h4 className="text-sm font-black uppercase opacity-60 tracking-widest">
                Time Elapsed
              </h4>
              <p className="text-4xl font-black italic tracking-tighter mt-1">
                12:45 <span className="text-lg uppercase">min</span>
              </p>
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="opacity-60 uppercase">Request Time</span>
                  <span>
                    {new Date(activeRide.requestedAt).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleStatusUpdate(RideStatus.CANCELLED as any)}
              className="w-full flex items-center justify-center gap-2 text-rose-500 font-black uppercase text-xs tracking-widest py-4 border-2 border-rose-100 dark:border-rose-900/30 rounded-2xl hover:bg-rose-50 dark:hover:bg-rose-900/10 transition-all"
            >
              <ShieldAlert size={16} /> Emergency Cancel
            </button>
          </div>
        </div>
      </div>

      {/* --- Floating Action Bottom Bar --- */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white dark:from-slate-950 via-white/80 dark:via-slate-950/80 to-transparent z-40">
        <div className="max-w-xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeRide.status}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
            >
              {activeRide.status === RideStatus.ACCEPTED ? (
                <button
                  disabled={updatingStatus}
                  onClick={() => handleStatusUpdate(RideStatus.ONGOING as any)}
                  className="w-full bg-slate-900 dark:bg-indigo-600 text-white py-6 rounded-[2rem] font-black uppercase tracking-[0.2em] text-sm shadow-2xl flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
                >
                  {updatingStatus ? (
                    "Processing..."
                  ) : (
                    <>
                      Start Mission <ArrowRight size={20} />
                    </>
                  )}
                </button>
              ) : (
                <button
                  disabled={updatingStatus}
                  onClick={() =>
                    handleStatusUpdate(RideStatus.COMPLETED as any)
                  }
                  className="w-full bg-emerald-500 text-white py-6 rounded-[2rem] font-black uppercase tracking-[0.2em] text-sm shadow-2xl flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
                >
                  {updatingStatus ? (
                    "Finishing..."
                  ) : (
                    <>
                      Complete Trip <CheckCircle size={20} />
                    </>
                  )}
                </button>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// --- Sub-components for Cleanliness ---

const Step = ({ icon, active, label }: any) => (
  <div className="relative z-10 flex flex-col items-center gap-2">
    <div
      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
        active
          ? "bg-indigo-600 text-white scale-110 shadow-lg"
          : "bg-slate-100 dark:bg-slate-800 text-slate-400"
      }`}
    >
      {icon}
    </div>
    <span
      className={`text-[10px] font-black uppercase tracking-tighter ${
        active ? "text-indigo-600" : "text-slate-400"
      }`}
    >
      {label}
    </span>
  </div>
);

const RouteItem = ({ iconColor, label, address }: any) => (
  <div className="flex gap-4 items-start">
    <div
      className={`w-6 h-6 rounded-full ${iconColor} flex items-center justify-center shrink-0 mt-1 ring-4 ring-white dark:ring-slate-900`}
    >
      <div className="w-2 h-2 bg-white rounded-full" />
    </div>
    <div className="overflow-hidden">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
        {label}
      </p>
      <p className="text-sm font-bold truncate dark:text-slate-200">
        {typeof address === "string" ? address : address?.address}
      </p>
    </div>
  </div>
);

const ActiveRideSkeleton = () => (
  <div className="min-h-screen bg-slate-50 p-8 animate-pulse">
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="h-20 bg-white rounded-3xl" />
      <div className="h-64 bg-white rounded-[2.5rem]" />
      <div className="h-32 bg-white rounded-3xl" />
    </div>
  </div>
);

export default ActiveRide;
