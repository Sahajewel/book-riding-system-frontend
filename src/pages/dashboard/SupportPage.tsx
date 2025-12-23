import {
  HelpCircle,
  MessageSquare,
  Phone,
  Mail,
  Search,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";

const SupportPage = () => {
  const faqs = [
    {
      q: "How to cancel a ride?",
      a: "Go to Ride Details and click the 'Cancel' button. Note that cancellation fees may apply if the driver has already arrived.",
    },
    {
      q: "Lost an item in the car?",
      a: "Contact your driver directly via the ride history or message our 24/7 support team with your Ride ID.",
    },
    {
      q: "Payment issues?",
      a: "Check your transaction history. If you were overcharged, click 'Report Issue' on that specific ride card.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 md:py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-black text-slate-900 mb-4">
          How can we help you?
        </h1>
        <div className="relative max-w-xl mx-auto">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search for topics (e.g. refunds, safety...)"
            className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-slate-100 shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          />
        </div>
      </div>

      {/* Quick Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          {
            icon: MessageSquare,
            label: "Live Chat",
            sub: "2 min wait",
            color: "text-blue-500",
          },
          {
            icon: Mail,
            label: "Email Us",
            sub: "24h response",
            color: "text-purple-500",
          },
          {
            icon: Phone,
            label: "Call Support",
            sub: "Emergency only",
            color: "text-rose-500",
          },
        ].map((item, i) => (
          <motion.div
            whileHover={{ y: -5 }}
            key={i}
            className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm text-center cursor-pointer"
          >
            <item.icon className={`mx-auto mb-3 ${item.color}`} size={28} />
            <p className="font-bold text-slate-800">{item.label}</p>
            <p className="text-xs text-slate-400 font-bold uppercase">
              {item.sub}
            </p>
          </motion.div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
        <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
          <HelpCircle className="text-indigo-600" /> Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details key={i} className="group border-b border-slate-50 pb-4">
              <summary className="flex items-center justify-between cursor-pointer list-none font-bold text-slate-700 hover:text-indigo-600 transition-colors">
                {faq.q}
                <ChevronRight
                  className="group-open:rotate-90 transition-transform text-slate-300"
                  size={18}
                />
              </summary>
              <p className="mt-3 text-slate-500 text-sm leading-relaxed">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
