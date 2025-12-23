import React, { useState, useMemo } from "react";
import { useGetMyRidesQuery } from "@/redux/features/rider/rider.api";
import { RideStatus } from "@/types/ride.interface";
import { format } from "date-fns";
import {
  Filter,
  Calendar,
  CreditCard,
  ChevronRight,
  Hash,
  ArrowUpDown,
  Inbox,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/layout/Footer";

const MyRides: React.FC = () => {
  const { data: rides, isLoading } = useGetMyRidesQuery();
  const [filters, setFilters] = useState({
    status: "",
    date: "",
    minFare: "",
    maxFare: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Optimized Filtering using useMemo
  const filteredRides = useMemo(() => {
    return (
      rides?.filter((ride) => {
        if (filters.status && ride.status !== filters.status) return false;
        if (filters.date) {
          const rideDate = format(new Date(ride.requestedAt), "yyyy-MM-dd");
          if (rideDate !== filters.date) return false;
        }
        if (filters.minFare && (ride.fare || 0) < Number(filters.minFare))
          return false;
        if (filters.maxFare && (ride.fare || 0) > Number(filters.maxFare))
          return false;
        return true;
      }) || []
    );
  }, [rides, filters]);

  const totalPages = Math.ceil(filteredRides.length / itemsPerPage);
  const paginatedRides = filteredRides.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const statusStyles: Record<string, string> = {
    [RideStatus.COMPLETED]: "bg-emerald-50 text-emerald-700 border-emerald-100",
    [RideStatus.CANCELLED]: "bg-rose-50 text-rose-700 border-rose-100",
    requested: "bg-amber-50 text-amber-700 border-amber-100",
    ongoing: "bg-indigo-50 text-indigo-700 border-indigo-100",
  };

  if (isLoading)
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <Loader2 className="h-10 w-10 text-indigo-600 animate-spin mb-4" />
        <p className="text-slate-500 font-bold animate-pulse uppercase tracking-widest text-xs">
          Retrieving History...
        </p>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            Trip Ledger
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            Review your past journeys and expenses.
          </p>
        </div>
        <div className="px-4 py-2 bg-indigo-50 rounded-2xl border border-indigo-100">
          <span className="text-indigo-600 font-black text-xl">
            {filteredRides.length}
          </span>
          <span className="ml-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
            Total Trips
          </span>
        </div>
      </div>

      {/* Advanced Filter Bar */}
      <div className="bg-white p-6 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase text-slate-400 ml-2 tracking-widest">
            Status
          </label>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <select
              value={filters.status}
              onChange={(e) => {
                setFilters({ ...filters, status: e.target.value });
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500 transition-all appearance-none cursor-pointer"
            >
              <option value="">All Journeys</option>
              {Object.values(RideStatus).map((s) => (
                <option key={s} value={s}>
                  {s.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase text-slate-400 ml-2 tracking-widest">
            Travel Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="date"
              value={filters.date}
              onChange={(e) => {
                setFilters({ ...filters, date: e.target.value });
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase text-slate-400 ml-2 tracking-widest">
            Price Range (Min)
          </label>
          <div className="relative">
            <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="number"
              placeholder="Min ৳"
              value={filters.minFare}
              onChange={(e) => {
                setFilters({ ...filters, minFare: e.target.value });
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase text-slate-400 ml-2 tracking-widest">
            Price Range (Max)
          </label>
          <div className="relative">
            <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="number"
              placeholder="Max ৳"
              value={filters.maxFare}
              onChange={(e) => {
                setFilters({ ...filters, maxFare: e.target.value });
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Trip Cards Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {paginatedRides.length > 0 ? (
            paginatedRides.map((ride, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2, delay: idx * 0.05 }}
                key={ride._id}
                className="group bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm hover:shadow-2xl hover:border-indigo-100 transition-all duration-300 relative overflow-hidden"
              >
                <div className="flex justify-between items-start mb-6">
                  <div
                    className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter border ${
                      statusStyles[ride.status] ||
                      "bg-slate-50 text-slate-500 border-slate-100"
                    }`}
                  >
                    {ride.status}
                  </div>
                  <div className="flex items-center gap-1 text-slate-300 group-hover:text-indigo-600 transition-colors">
                    <Hash size={12} className="font-bold" />
                    <span className="text-xs font-mono font-bold">
                      {ride._id?.slice(-6).toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="space-y-4 relative">
                  <div className="absolute left-2.5 top-2 bottom-2 w-0.5 border-l-2 border-dashed border-slate-100" />

                  <div className="flex gap-4 items-start relative">
                    <div className="h-5 w-5 rounded-full bg-emerald-500 border-4 border-emerald-50 shrink-0 z-10" />
                    <div>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                        Pickup
                      </p>
                      <p className="text-sm font-bold text-slate-700 line-clamp-1">
                        {ride.pickupLocation}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start relative">
                    <div className="h-5 w-5 rounded-full bg-rose-500 border-4 border-rose-50 shrink-0 z-10" />
                    <div>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                        Dropoff
                      </p>
                      <p className="text-sm font-bold text-slate-700 line-clamp-1">
                        {ride.dropoffLocation}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-50 flex justify-between items-center">
                  <div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                      Date & Time
                    </p>
                    <p className="text-xs font-black text-slate-600">
                      {format(new Date(ride.requestedAt), "dd MMM, hh:mm a")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                      Fare Paid
                    </p>
                    <p className="text-lg font-black text-indigo-600">
                      ৳{ride.fare || "0"}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-20 flex flex-col items-center justify-center bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
              <div className="p-6 bg-slate-50 rounded-full mb-4">
                <Inbox className="h-12 w-12 text-slate-200" />
              </div>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">
                No Matching Rides Found
              </p>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Dynamic Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 pt-8">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="h-12 w-12 flex items-center justify-center rounded-2xl bg-white border border-slate-100 text-slate-600 hover:bg-indigo-600 hover:text-white disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-slate-600 transition-all shadow-sm"
          >
            <ChevronRight className="rotate-180" />
          </button>

          <div className="flex gap-2 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`h-8 min-w-[32px] px-2 rounded-xl text-xs font-black transition-all ${
                  currentPage === page
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                    : "text-slate-400 hover:text-indigo-600"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="h-12 w-12 flex items-center justify-center rounded-2xl bg-white border border-slate-100 text-slate-600 hover:bg-indigo-600 hover:text-white disabled:opacity-30 transition-all shadow-sm"
          >
            <ChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default MyRides;
