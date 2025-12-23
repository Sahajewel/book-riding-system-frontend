import { useForm } from "react-hook-form";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  MessageSquare,
  Sparkles,
  Clock,
  Globe,
} from "lucide-react";

type FormValues = {
  name: string;
  email: string;
  message: string;
};

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (data: FormValues) => {
    await new Promise((r) => setTimeout(r, 1500));
    console.log("Contact form data:", data);
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-neutral-950 py-16 lg:py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4"
          >
            <Sparkles size={14} /> Get in touch
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight">
            Let’s start a <span className="text-indigo-600">conversation</span>
          </h1>
          <p className="mt-4 text-slate-500 dark:text-neutral-400 max-w-xl mx-auto font-medium">
            Got questions about RideX? We're here to help you move faster and
            safer.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left Side: Contact Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-6">
              <ContactInfoCard
                icon={<Mail className="text-blue-500" />}
                title="Email Us"
                detail="sahajewel072@gmail.com"
                sub="Expect a response within 2 hours"
              />
              <ContactInfoCard
                icon={<Phone className="text-rose-500" />}
                title="Call Anywhere"
                detail="+81 80 5052 6822"
                sub="Mon-Fri from 9am to 6pm"
              />
              <ContactInfoCard
                icon={<MapPin className="text-emerald-500" />}
                title="Global Office"
                detail="Saitama, Tokyo, Japan"
                sub="Innovation Hub"
              />
            </div>

            {/* Availability Badge */}
            <div className="p-6 bg-indigo-600 rounded-[2rem] text-white relative overflow-hidden shadow-xl shadow-indigo-200 dark:shadow-none">
              <div className="relative z-10 flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-bold">24/7 Support</h4>
                  <p className="text-indigo-100 text-xs">
                    Our riders & drivers safety is our priority.
                  </p>
                </div>
              </div>
              <Globe
                className="absolute -right-4 -bottom-4 text-white/10"
                size={100}
              />
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="lg:col-span-7">
            <motion.div
              layout
              className="bg-white dark:bg-neutral-900 p-8 md:p-10 rounded-[2.5rem] border border-slate-100 dark:border-neutral-800 shadow-sm"
            >
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="text-center py-12"
                  >
                    <div className="h-20 w-20 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 size={40} />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                      Message Sent!
                    </h3>
                    <p className="text-slate-500 mt-2 font-medium">
                      We'll get back to you shortly.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-8 text-indigo-600 font-bold text-sm uppercase tracking-widest hover:underline"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                          Full Name
                        </label>
                        <input
                          {...register("name", {
                            required: "Name is required",
                          })}
                          className="w-full bg-slate-50 dark:bg-neutral-800 border-none rounded-2xl px-5 py-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                          placeholder="John Doe"
                        />
                        {errors.name && (
                          <p className="text-[10px] text-red-500 font-bold ml-1">
                            {errors.name.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                          Email Address
                        </label>
                        <input
                          {...register("email", {
                            required: "Email is required",
                            pattern: {
                              value: /\S+@\S+\.\S+/,
                              message: "Enter a valid email",
                            },
                          })}
                          className="w-full bg-slate-50 dark:bg-neutral-800 border-none rounded-2xl px-5 py-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                          placeholder="john@example.com"
                        />
                        {errors.email && (
                          <p className="text-[10px] text-red-500 font-bold ml-1">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                        Message
                      </label>
                      <textarea
                        {...register("message", {
                          required: "Message is required",
                          minLength: {
                            value: 10,
                            message: "Tell us a bit more (min 10 chars)",
                          },
                        })}
                        className="w-full bg-slate-50 dark:bg-neutral-800 border-none rounded-2xl px-5 py-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 transition-all outline-none h-40 resize-none"
                        placeholder="How can our team help you?"
                      />
                      {errors.message && (
                        <p className="text-[10px] text-red-500 font-bold ml-1">
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full group relative flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-5 rounded-2xl shadow-lg shadow-indigo-200 dark:shadow-none transition-all disabled:opacity-70 overflow-hidden"
                    >
                      <AnimatePresence mode="wait">
                        {isSubmitting ? (
                          <motion.div
                            key="loader"
                            animate={{ rotate: 360 }}
                            transition={{
                              repeat: Infinity,
                              duration: 1,
                              ease: "linear",
                            }}
                            className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full"
                          />
                        ) : (
                          <motion.div
                            key="text"
                            className="flex items-center gap-3"
                          >
                            Submit Inquiry{" "}
                            <Send
                              size={18}
                              className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                  </form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Helper Component ---

function ContactInfoCard({
  icon,
  title,
  detail,
  sub,
}: {
  icon: React.ReactNode;
  title: string;
  detail: string;
  sub: string;
}) {
  return (
    <div className="flex gap-5 p-2 group">
      <div className="h-14 w-14 shrink-0 rounded-2xl bg-white dark:bg-neutral-900 border border-slate-100 dark:border-neutral-800 flex items-center justify-center shadow-sm group-hover:shadow-md transition-all group-hover:scale-110">
        {icon}
      </div>
      <div>
        <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">
          {title}
        </h4>
        <p className="text-slate-900 dark:text-white font-bold">{detail}</p>
        <p className="text-slate-500 dark:text-neutral-500 text-[10px] font-medium">
          {sub}
        </p>
      </div>
    </div>
  );
}
