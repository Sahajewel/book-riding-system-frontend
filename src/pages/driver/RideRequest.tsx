/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useAcceptRideMutation,
  useGetDriverRidesQuery,
  useRejectRideMutation,
} from "@/redux/features/driver/driver.api";
import type { IRide } from "@/types/ride.interface";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  User,
  ArrowRight,
  X,
  Loader2,
  Radar,
  CircleDot,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface RidesResponse {
  data: IRide[];
  message?: string;
  success?: boolean;
}

const RideRequests = () => {
  const { data, isLoading, isFetching } = useGetDriverRidesQuery(undefined);
  const [acceptRide, { isLoading: isAccepting }] = useAcceptRideMutation();
  const [rejectRide, { isLoading: isRejecting }] = useRejectRideMutation();

  const ridesResponse = data as unknown as RidesResponse;
  const rides = ridesResponse?.data || [];

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] space-y-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-muted-foreground font-medium">
          Scanning for requests...
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8 min-h-screen">
      <header className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-3xl font-black tracking-tight flex items-center gap-3 italic uppercase">
            <span className="bg-primary text-primary-foreground px-3 py-1 rounded-lg">
              LIVE
            </span>
            Requests
          </h2>
          <p className="text-muted-foreground text-sm font-medium mt-1">
            Available trips in your area
          </p>
        </div>
        {isFetching && (
          <div className="flex items-center gap-2 text-xs font-bold text-primary animate-pulse">
            <div className="h-2 w-2 rounded-full bg-primary" />
            REFRESHING
          </div>
        )}
      </header>

      <AnimatePresence mode="popLayout">
        {rides.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-32 bg-slate-50/50 rounded-[3rem] border-4 border-dashed border-slate-100"
          >
            <Radar size={64} className="text-slate-200 mb-6 animate-pulse" />
            <h3 className="text-2xl font-bold text-slate-400">
              Waiting for riders...
            </h3>
          </motion.div>
        ) : (
          /* Grid Layout: Mobile 1, Tablet 2, Desktop 3, Large Desktop 4 */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {rides.map((ride: IRide) => (
              <motion.div
                key={ride._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 flex flex-col justify-between overflow-hidden group hover:border-primary/50 transition-all"
              >
                <div className="p-6">
                  {/* Top: Rider Info */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      <User
                        className="text-slate-500 group-hover:text-primary"
                        size={20}
                      />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <h4 className="font-bold text-slate-900 truncate uppercase text-sm tracking-tight">
                        {ride.rider?.name || "Passenger"}
                      </h4>
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                          {ride.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Route Visualizer */}
                  <div className="space-y-4 relative before:absolute before:left-[9px] before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-50">
                    <div className="flex items-start gap-4 relative">
                      <CircleDot
                        size={18}
                        className="text-primary mt-0.5 bg-white z-10"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-slate-700 text-xs font-bold leading-snug line-clamp-2">
                          {ride.pickupLocation}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 relative">
                      <MapPin
                        size={18}
                        className="text-rose-500 mt-0.5 bg-white z-10"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-slate-700 text-xs font-bold leading-snug line-clamp-2">
                          {ride.dropoffLocation}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="p-4 bg-slate-50/80 border-t border-slate-50 flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={async () => {
                      try {
                        await rejectRide(ride._id).unwrap();
                        toast.error("Declined");
                      } catch (err: any) {
                        toast.error("Failed");
                        console.log(err);
                      }
                    }}
                    disabled={isRejecting || isAccepting}
                    className="rounded-xl hover:bg-rose-100 hover:text-rose-600 shrink-0 h-11 w-11"
                  >
                    <X size={18} />
                  </Button>

                  <Button
                    onClick={async () => {
                      try {
                        await acceptRide(ride._id).unwrap();
                        toast.success("Ride Accepted!");
                      } catch (err: any) {
                        toast.error(err?.data?.message || "Error");
                      }
                    }}
                    disabled={isAccepting || isRejecting}
                    className="flex-1 h-11 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md"
                  >
                    {isAccepting ? (
                      <Loader2 className="animate-spin h-4 w-4" />
                    ) : (
                      <>
                        Accept <ArrowRight size={14} className="ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RideRequests;
