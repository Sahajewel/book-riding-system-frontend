// src/pages/driver/DriverRideHistory.tsx
import { useState, useMemo } from "react";
import { useGetDriverRidesQuery } from "@/redux/features/driver/driver.api";
import {
  Search,
  Filter,
  MapPin,
  Clock,
  DollarSign,
  Eye,
  RefreshCcw,
  Calendar,
  X,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  CheckCircle,
  Ban,
} from "lucide-react";
import { RideStatus } from "@/types/ride.interface";
import type { IRide } from "@/types/ride.interface";
import { motion, AnimatePresence } from "framer-motion";

const DriverRideHistory = () => {
  const {
    data: ridesData,
    isLoading,
    refetch,
    isFetching,
  } = useGetDriverRidesQuery(undefined);

  const rides = Array.isArray(ridesData)
    ? ridesData
    : Array.isArray(ridesData?.data)
    ? ridesData.data
    : [];

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<RideStatus | "all">("all");
  const [dateFilter, setDateFilter] = useState<
    "all" | "today" | "week" | "month"
  >("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRide, setSelectedRide] = useState<IRide | null>(null);

  const itemsPerPage = 10;

  // --- Search & Filter Logic ---
  const filteredRides = useMemo(() => {
    let filtered = [...rides];

    // 1. Search Logic
    if (searchTerm) {
      filtered = filtered.filter((ride: IRide) => {
        const pickup =
          typeof ride.pickupLocation === "string"
            ? ride.pickupLocation
            : ride.pickupLocation?.address || "";
        const dropoff =
          typeof ride.dropoffLocation === "string"
            ? ride.dropoffLocation
            : ride.dropoffLocation?.address || "";
        return (
          pickup.toLowerCase().includes(searchTerm.toLowerCase()) ||
          dropoff.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ride._id?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    }

    // 2. Status Logic
    if (statusFilter !== "all") {
      filtered = filtered.filter((ride: IRide) => ride.status === statusFilter);
    }

    // 3. Date Logic
    if (dateFilter !== "all") {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      filtered = filtered.filter((ride: IRide) => {
        const rideDate = new Date(ride.requestedAt);
        if (dateFilter === "today") return rideDate >= today;
        if (dateFilter === "week") {
          const weekAgo = new Date(today);
          weekAgo.setDate(weekAgo.getDate() - 7);
          return rideDate >= weekAgo;
        }
        if (dateFilter === "month") {
          const monthAgo = new Date(today);
          monthAgo.setMonth(monthAgo.getMonth() - 1);
          return rideDate >= monthAgo;
        }
        return true;
      });
    }

    return filtered.sort(
      (a, b) =>
        new Date(b.requestedAt).getTime() - new Date(a.requestedAt).getTime()
    );
  }, [rides, searchTerm, statusFilter, dateFilter]);

  const totalPages = Math.ceil(filteredRides.length / itemsPerPage);
  const paginatedRides = filteredRides.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const resetFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setDateFilter("all");
    setCurrentPage(1);
  };

  // --- Skeletons ---
  const Skeleton = () => (
    <tr className="animate-pulse">
      {Array(6)
        .fill(0)
        .map((_, i) => (
          <td key={i} className="px-6 py-4">
            <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-full"></div>
          </td>
        ))}
    </tr>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 p-4 lg:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic">
              Ride <span className="text-indigo-600">Logs</span>
            </h1>
            <p className="text-slate-500 font-bold flex items-center gap-2 mt-1">
              <TrendingUp size={16} className="text-indigo-500" /> Track your
              business progress
            </p>
          </div>
          <button
            onClick={() => refetch()}
            className="group flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-2xl shadow-lg shadow-indigo-200 dark:shadow-none font-bold hover:bg-indigo-700 transition-all active:scale-95"
          >
            <RefreshCcw
              size={18}
              className={
                isFetching
                  ? "animate-spin"
                  : "group-hover:rotate-180 transition-transform duration-500"
              }
            />
            Sync Records
          </button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <StatCard
            icon={<MapPin size={24} />}
            label="Total Trips"
            value={rides.length}
            color="blue"
            loading={isLoading}
          />
          <StatCard
            icon={<CheckCircle size={24} />}
            label="Completed"
            value={
              rides.filter((r) => r.status?.toLowerCase() === "completed")
                .length
            }
            color="emerald"
            loading={isLoading}
          />
          <StatCard
            icon={<Ban size={24} />}
            label="Cancelled"
            value={
              rides.filter((r) => r.status?.toLowerCase() === "cancelled")
                .length
            }
            color="rose"
            loading={isLoading}
          />
          <StatCard
            icon={<DollarSign size={24} />}
            label="Total Earnings"
            value={`৳${rides.reduce((s, r) => s + (r.fare || 0), 0)}`}
            color="amber"
            loading={isLoading}
          />
        </div>

        {/* --- Filters & Search Bar --- */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 mb-8 flex flex-col xl:flex-row gap-4 items-center">
          <div className="relative w-full xl:max-w-md">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search ID, Pickup, or Dropoff..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-[1.5rem] font-bold text-sm outline-none focus:ring-2 ring-indigo-500/20 transition-all"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="bg-slate-50 dark:bg-slate-800 border-none rounded-[1.5rem] py-4 px-6 font-bold text-sm outline-none"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="ongoing">Ongoing</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value as any)}
              className="bg-slate-50 dark:bg-slate-800 border-none rounded-[1.5rem] py-4 px-6 font-bold text-sm outline-none"
            >
              <option value="all">Any Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
            <button
              onClick={resetFilters}
              className="flex items-center justify-center gap-2 bg-slate-900 dark:bg-slate-700 text-white rounded-[1.5rem] py-4 px-6 font-black uppercase text-xs tracking-widest hover:bg-slate-800 transition-colors"
            >
              <Filter size={16} /> Reset
            </button>
          </div>
        </div>

        {/* --- Table Section --- */}
        <div className="bg-white dark:bg-slate-900 rounded-[3rem] shadow-xl overflow-hidden border border-slate-100 dark:border-slate-800">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 text-slate-400 text-[10px] uppercase font-black tracking-widest">
                  <th className="px-8 py-6">Identity</th>
                  <th className="px-8 py-6">Route Information</th>
                  <th className="px-8 py-6">Timestamp</th>
                  <th className="px-8 py-6">Status</th>
                  <th className="px-8 py-6">Fare</th>
                  <th className="px-8 py-6 text-center">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                {isLoading ? (
                  Array(6)
                    .fill(0)
                    .map((_, i) => <Skeleton key={i} />)
                ) : paginatedRides.length > 0 ? (
                  paginatedRides.map((ride: IRide) => (
                    <tr
                      key={ride._id}
                      className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-all cursor-default"
                    >
                      <td className="px-8 py-6">
                        <span className="text-xs font-black text-slate-400 group-hover:text-indigo-600 transition-colors">
                          #{ride._id?.slice(-6).toUpperCase()}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex flex-col gap-1.5 max-w-[240px]">
                          <div className="text-sm font-bold truncate flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500" />{" "}
                            {typeof ride.pickupLocation === "string"
                              ? ride.pickupLocation
                              : ride.pickupLocation?.address}
                          </div>
                          <div className="text-sm font-bold truncate text-slate-400 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-rose-500" />{" "}
                            {typeof ride.dropoffLocation === "string"
                              ? ride.dropoffLocation
                              : ride.dropoffLocation?.address}
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold">
                            {new Date(ride.requestedAt).toLocaleDateString()}
                          </span>
                          <span className="text-[10px] font-black text-slate-400">
                            {new Date(ride.requestedAt).toLocaleTimeString()}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <StatusPill status={ride.status} />
                      </td>
                      <td className="px-8 py-6 font-black text-slate-900 dark:text-white">
                        ৳{ride.fare || 0}
                      </td>
                      <td className="px-8 py-6 text-center">
                        <button
                          onClick={() => setSelectedRide(ride)}
                          className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-all"
                        >
                          <Eye size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-24 text-center">
                      <div className="flex flex-col items-center opacity-20">
                        <MapPin size={64} />
                        <p className="font-black italic uppercase mt-4">
                          No rides found in log
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="p-8 bg-slate-50/30 border-t border-slate-100 flex justify-between items-center">
              <p className="text-xs font-black text-slate-400 uppercase italic">
                Showing {paginatedRides.length} of {filteredRides.length}
              </p>
              <div className="flex gap-3">
                <PaginationButton
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((c) => c - 1)}
                  icon={<ChevronLeft size={20} />}
                />
                <PaginationButton
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((c) => c + 1)}
                  icon={<ChevronRight size={20} />}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* --- Details Modal --- */}
      <AnimatePresence>
        {selectedRide && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedRide(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white dark:bg-slate-900 w-full max-w-xl rounded-[3rem] shadow-2xl overflow-hidden p-8 border border-white/20"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-black italic uppercase tracking-tighter">
                  Ride <span className="text-indigo-600">Blueprint</span>
                </h3>
                <button
                  onClick={() => setSelectedRide(null)}
                  className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full hover:rotate-90 transition-transform"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-5 bg-slate-50 dark:bg-slate-800 rounded-[2rem]">
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-1">
                      Status
                    </p>
                    <StatusPill status={selectedRide.status} />
                  </div>
                  <div className="p-5 bg-slate-50 dark:bg-slate-800 rounded-[2rem]">
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-1">
                      Fare Amount
                    </p>
                    <p className="text-xl font-black italic tracking-tighter">
                      ৳{selectedRide.fare}
                    </p>
                  </div>
                </div>

                <div className="p-6 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-[2.5rem]">
                  <div className="flex gap-4 mb-6">
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" />
                      <div className="w-0.5 h-10 bg-slate-200" />
                      <div className="w-4 h-4 rounded-full bg-rose-500 ring-4 ring-rose-500/20" />
                    </div>
                    <div className="flex flex-col justify-between py-0.5">
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase">
                          Pickup
                        </p>
                        <p className="text-sm font-bold">
                          {typeof selectedRide.pickupLocation === "string"
                            ? selectedRide.pickupLocation
                            : selectedRide.pickupLocation?.address}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase">
                          Dropoff
                        </p>
                        <p className="text-sm font-bold">
                          {typeof selectedRide.dropoffLocation === "string"
                            ? selectedRide.dropoffLocation
                            : selectedRide.dropoffLocation?.address}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-5 bg-indigo-50 dark:bg-indigo-900/20 rounded-[2rem] text-indigo-600">
                  <Clock size={24} />
                  <div>
                    <p className="text-xs font-black uppercase">Requested At</p>
                    <p className="font-bold">
                      {new Date(selectedRide.requestedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedRide(null)}
                className="w-full mt-8 bg-slate-900 dark:bg-slate-700 text-white py-5 rounded-[2rem] font-black uppercase tracking-widest hover:shadow-xl transition-all"
              >
                Close Details
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Sub Components ---
const StatCard = ({ icon, label, value, color, loading }: any) => (
  <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm">
    <div
      className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${
        color === "blue"
          ? "bg-blue-50 text-blue-600"
          : color === "emerald"
          ? "bg-emerald-50 text-emerald-600"
          : color === "rose"
          ? "bg-rose-50 text-rose-600"
          : "bg-amber-50 text-amber-600"
      }`}
    >
      {icon}
    </div>
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
      {label}
    </p>
    {loading ? (
      <div className="h-8 w-16 bg-slate-100 animate-pulse rounded" />
    ) : (
      <p className="text-2xl font-black italic tracking-tighter">{value}</p>
    )}
  </div>
);

const StatusPill = ({ status }: { status: string }) => {
  const s = status?.toLowerCase();
  const colors: any = {
    completed: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30",
    ongoing: "bg-amber-100 text-amber-700 dark:bg-amber-900/30",
    cancelled: "bg-rose-100 text-rose-700 dark:bg-rose-900/30",
    accepted: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30",
  };
  return (
    <span
      className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
        colors[s] || "bg-slate-100 text-slate-600"
      }`}
    >
      {status}
    </span>
  );
};

const PaginationButton = ({ disabled, onClick, icon }: any) => (
  <button
    disabled={disabled}
    onClick={onClick}
    className="w-12 h-12 flex items-center justify-center bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:bg-slate-50 disabled:opacity-30 transition-all active:scale-90"
  >
    {icon}
  </button>
);

export default DriverRideHistory;
