import { useGetDashboardStatsQuery } from "@/redux/analytics/analytics.api";
import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";

const DynamicStatsSection = () => {
  // ১. তোর ড্যাশবোর্ডের অরিজিনাল এপিআই কল
  const { data, isLoading } = useGetDashboardStatsQuery(undefined);

  // ২. ডেটা এক্সট্রাকশন (তোর ড্যাশবোর্ড লজিক অনুযায়ী)
  const stats = data?.data || data;

  // ৩. ডাইনামিক স্ট্যাটস কনফিগারেশন (যেগুলো তুই দেখাইতে বললি)
  const statItems = [
    {
      label: "Total Rides",
      value: stats?.rides?.total || 0, // এখান থেকে '9' আসবে
      description: "All time",
      color: "text-indigo-600",
    },
    {
      label: "Completed Rides",
      value: stats?.rides?.completed || 0, // এখান থেকে '5' আসবে
      description: "Successful trips",
      color: "text-emerald-600",
    },
    {
      label: "Active Rides",
      value: stats?.rides?.ongoing || 0, // লাইভ বা অনগোয়িং রাইড
      description: "Currently on road",
      color: "text-blue-600",
    },
    {
      label: "Total Users",
      value: stats?.users?.total || 0, // এখান থেকে '10' আসবে
      description: "12% increase",
      color: "text-amber-600",
    },
  ];

  if (isLoading) {
    return (
      <div className="py-12 flex justify-center items-center gap-2">
        <RefreshCw className="animate-spin text-indigo-600" size={20} />
        <span className="font-bold text-slate-400">Syncing Live Stats...</span>
      </div>
    );
  }

  return (
    <section className="py-16 bg-white dark:bg-slate-950 border-y border-slate-100 dark:border-slate-900">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {statItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2
                className={`text-5xl lg:text-6xl font-black tracking-tighter ${item.color}`}
              >
                {item.value}
              </h2>
              <p className="text-slate-900 dark:text-white font-bold text-lg mt-2">
                {item.label}
              </p>
              <p className="text-slate-500 text-xs font-medium uppercase tracking-widest mt-1">
                {item.description}
              </p>

              {/* ছোট ডেকোরেটিভ বার */}
              <div
                className={`h-1.5 w-12 mx-auto mt-4 rounded-full ${item.color.replace(
                  "text",
                  "bg"
                )} opacity-20`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DynamicStatsSection;
