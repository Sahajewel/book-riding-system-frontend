/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import {
  useCancelRideMutation,
  useGetMyRidesQuery,
} from "@/redux/features/rider/rider.api";
import type { IRide } from "@/types/ride.interface";
import { toast } from "sonner";
import {
  Clock,
  XCircle,
  Navigation,
  User,
  Car,
  CheckCircle,
  Loader2,
  Phone,
  MessageCircle,
  History,
} from "lucide-react";
import EmergencySOS from "../sosButton/EmergencySosButton";
import { motion, AnimatePresence } from "framer-motion";

const RideDetails = () => {
  const { data: rides, isLoading, refetch } = useGetMyRidesQuery();
  const [cancelRide, { isLoading: isCancelling }] = useCancelRideMutation();
  const [activeRide, setActiveRide] = useState<IRide | null>(null);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  useEffect(() => {
    if (rides) {
      const currentActiveRide = rides.find((ride: IRide) =>
        ["requested", "accepted", "ongoing"].includes(ride.status)
      );
      setActiveRide(currentActiveRide || null);
    }
  }, [rides]);

  // Location Watcher (সেম থাকছে)
  useEffect(() => {
    if (activeRide && navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (pos) =>
          setUserLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          }),
        (err) => console.error(err),
        { enableHighAccuracy: true }
      );
      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, [activeRide]);

  const handleCancel = async (id: string) => {
    try {
      await cancelRide(id).unwrap();
      toast.success("Ride cancelled. We're sorry to see you go.");
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Action failed");
    }
  };

  const statusConfig = {
    completed: {
      icon: CheckCircle,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      label: "Finished",
    },
    cancelled: {
      icon: XCircle,
      color: "text-rose-600",
      bg: "bg-rose-50",
      border: "border-rose-200",
      label: "Cancelled",
    },
    requested: {
      icon: Loader2,
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-200",
      label: "Searching",
    },
    accepted: {
      icon: Car,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-200",
      label: "On the way",
    },
    ongoing: {
      icon: Navigation,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      border: "border-indigo-200",
      label: "In Trip",
    },
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <div className="relative">
          <div className="h-20 w-20 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin" />
          <Car className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-600 h-8 w-8" />
        </div>
        <p className="mt-4 text-slate-500 font-bold animate-pulse">
          Syncing your trips...
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20">
      {/* Premium Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30 backdrop-blur-md bg-white/80">
        <div className="max-w-5xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-200">
              <History className="text-white h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-900 tracking-tight">
                Trip History
              </h1>
              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">
                Activity Center
              </p>
            </div>
          </div>
          <EmergencySOS
            isActive={!!activeRide}
            currentLocation={userLocation}
          />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 pt-8">
        <AnimatePresence>
          {rides?.map((ride: IRide, index: number) => {
            const config =
              statusConfig[ride.status as keyof typeof statusConfig] ||
              statusConfig.requested;
            const StatusIcon = config.icon;

            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                key={ride._id}
                className="mb-6 group"
              >
                <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all duration-300 overflow-hidden">
                  <div className="p-1 md:p-2">
                    {/* Status Bar */}
                    <div
                      className={`flex items-center justify-between p-4 rounded-t-[1.8rem] ${config.bg}`}
                    >
                      <div className="flex items-center gap-2">
                        <StatusIcon
                          className={`h-5 w-5 ${config.color} ${
                            ride.status === "requested" ? "animate-spin" : ""
                          }`}
                        />
                        <span
                          className={`text-sm font-black uppercase tracking-wider ${config.color}`}
                        >
                          {config.label}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 font-bold bg-white/50 px-3 py-1 rounded-full">
                        ID: {ride._id?.slice(-8).toUpperCase()}
                      </span>
                    </div>

                    <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
                      {/* Left: Route Details */}
                      <div className="lg:col-span-7 space-y-6">
                        <div className="relative">
                          <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-slate-100 border-l-2 border-dashed border-slate-200" />

                          <div className="relative flex gap-4 items-start mb-8">
                            <div className="h-5 w-5 rounded-full bg-emerald-500 border-4 border-emerald-100 shrink-0 z-10" />
                            <div>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                                Pickup Point
                              </p>
                              <p className="text-slate-800 font-bold leading-tight">
                                {ride.pickupLocation}
                              </p>
                            </div>
                          </div>

                          <div className="relative flex gap-4 items-start">
                            <div className="h-5 w-5 rounded-full bg-rose-500 border-4 border-rose-100 shrink-0 z-10" />
                            <div>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                                Destination
                              </p>
                              <p className="text-slate-800 font-bold leading-tight">
                                {ride.dropoffLocation}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Driver & Info Mini Cards */}
                        <div className="flex flex-wrap gap-3">
                          <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl">
                            <Clock className="h-4 w-4 text-slate-400" />
                            <span className="text-xs font-bold text-slate-600">
                              {new Date(ride.requestedAt).toLocaleTimeString(
                                [],
                                { hour: "2-digit", minute: "2-digit" }
                              )}
                            </span>
                          </div>
                          {ride.fare && (
                            <div className="flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-xl">
                              <span className="text-xs font-black text-indigo-600">
                                ৳ {ride.fare}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right: Driver profile / Timeline */}
                      <div className="lg:col-span-5 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-100 lg:pl-8 pt-6 lg:pt-0">
                        {ride.driver ? (
                          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                            <div className="flex items-center gap-4 mb-4">
                              <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center border-2 border-white shadow-sm">
                                <User className="text-indigo-600 h-6 w-6" />
                              </div>
                              <div className="flex-1">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-tight">
                                  Your Driver
                                </p>
                                <h4 className="font-bold text-slate-900">
                                  {ride.driver.name}
                                </h4>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <a
                                href={`tel:${ride.driver.phone}`}
                                className="flex-1 bg-white hover:bg-indigo-600 hover:text-white transition-colors border border-slate-200 h-10 rounded-xl flex items-center justify-center gap-2 text-xs font-bold text-slate-600"
                              >
                                <Phone size={14} /> Call
                              </a>
                              <a
                                href={`sms:${ride.driver.phone}`}
                                className="flex-1 bg-white hover:bg-indigo-600 hover:text-white transition-colors border border-slate-200 h-10 rounded-xl flex items-center justify-center gap-2 text-xs font-bold text-slate-600"
                              >
                                <MessageCircle size={14} /> SMS
                              </a>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center h-full text-center space-y-2 opacity-60">
                            <div className="p-3 bg-slate-100 rounded-full animate-bounce">
                              <Car className="text-slate-400 h-6 w-6" />
                            </div>
                            <p className="text-xs font-bold text-slate-500">
                              Wait, we're finding a driver...
                            </p>
                          </div>
                        )}

                        {(ride.status as string) === "requested" && (
                          <button
                            onClick={() => handleCancel(ride._id!)}
                            disabled={isCancelling}
                            className="mt-4 w-full h-12 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-all font-bold text-sm flex items-center justify-center gap-2 border border-rose-100"
                          >
                            {isCancelling ? (
                              <Loader2 className="animate-spin h-4 w-4" />
                            ) : (
                              <XCircle size={16} />
                            )}
                            Cancel Request
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Floating Stats Footer */}
        {rides && rides.length > 0 && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur-xl px-6 py-4 rounded-3xl shadow-2xl border border-white/10 flex items-center gap-8 z-50">
            <div className="text-center">
              <p className="text-white font-black text-lg leading-none">
                {rides.length}
              </p>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                Total
              </p>
            </div>
            <div className="h-8 w-[1px] bg-white/10" />
            <div className="text-center">
              <p className="text-emerald-400 font-black text-lg leading-none">
                {rides.filter((r: any) => r.status === "completed").length}
              </p>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                Done
              </p>
            </div>
            <div className="h-8 w-[1px] bg-white/10" />
            <div className="text-center">
              <p className="text-amber-400 font-black text-lg leading-none">
                {
                  rides.filter((r: any) =>
                    ["requested", "accepted", "ongoing"].includes(r.status)
                  ).length
                }
              </p>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                Live
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RideDetails;
