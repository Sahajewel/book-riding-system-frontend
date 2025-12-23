/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  MapPin,
  PhoneCall,
  UserCheck,
  Lock,
  CheckCircle,
  LifeBuoy,
  ShieldAlert,
  Smartphone,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";

const Safety: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Animation variants
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  return (
    <div className={`${isDarkMode ? "dark" : ""} min-h-screen font-sans`}>
      <div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
        {/* --- 1. HERO SECTION --- */}
        <section className="relative pt-32 pb-20 bg-[#0F172B]">
          <div className="container mx-auto px-6 text-center relative z-10 text-white">
            <motion.div {...fadeIn}>
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-6">
                <ShieldCheck size={20} />
                <span className="text-sm font-bold uppercase tracking-wider">
                  Safety Standards
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                Your Safety Is Our <br /> #1 Commitment.
              </h1>
              <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
                Whether you’re in the back seat or behind the wheel, your safety
                is at the heart of everything we do.
              </p>
            </motion.div>
          </div>
          {/* Background Decorative Circles */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>
        </section>

        {/* --- 2. CORE SAFETY PILLARS --- */}
        <section className="py-24 container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: <UserCheck className="text-blue-500" />,
                title: "Verified Partners",
                desc: "Every driver undergoes rigorous background checks and vehicle inspections before joining our fleet.",
              },
              {
                icon: <Lock className="text-green-500" />,
                title: "Secure Technology",
                desc: "Our app uses end-to-end encryption for your personal data and anonymized phone numbers for privacy.",
              },
              {
                icon: <LifeBuoy className="text-purple-500" />,
                title: "24/7 Support",
                desc: "A dedicated safety team is always on standby to assist you with any issues, day or night.",
              },
            ].map((pillar, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800"
              >
                <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl w-fit shadow-sm mb-6">
                  {pillar.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{pillar.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                  {pillar.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- 3. IN-APP SAFETY FEATURES --- */}
        <section className="py-24 bg-slate-900 text-white rounded-[3rem] mx-4 lg:mx-10 overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold">
                Safety Features in Your App
              </h2>
              <p className="text-slate-400 mt-4">
                Powerful tools right at your fingertips during every trip.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                {[
                  {
                    icon: <ShieldAlert size={32} />,
                    title: "Emergency SOS Button",
                    text: "One-tap connection to local emergency services and our internal safety response team.",
                  },
                  {
                    icon: <MapPin size={32} />,
                    title: "Live Trip Sharing",
                    text: "Let your loved ones follow your route in real-time until you reach your destination safely.",
                  },
                  {
                    icon: <Users size={32} />,
                    title: "Trusted Contacts",
                    text: "Set up contacts who will be automatically notified if any unusual activity is detected.",
                  },
                  {
                    icon: <CheckCircle size={32} />,
                    title: "PIN Verification",
                    text: "Ensure you're getting into the right car with our mandatory 4-digit PIN system.",
                  },
                ].map((feature, i) => (
                  <div
                    key={i}
                    className="flex gap-6 p-6 hover:bg-white/5 rounded-2xl transition-colors"
                  >
                    <div className="text-indigo-400">{feature.icon}</div>
                    <div>
                      <h4 className="text-xl font-bold">{feature.title}</h4>
                      <p className="text-slate-400 mt-1">{feature.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&q=80&w=800"
                  alt="Safety UI"
                  className="rounded-3xl shadow-2xl border-8 border-slate-800"
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-600 p-6 rounded-full animate-pulse shadow-[0_0_50px_rgba(220,38,38,0.5)]">
                  <ShieldAlert size={48} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- 4. DRIVER VERIFICATION PROCESS --- */}
        <section className="py-24 container mx-auto px-6">
          <div className="flex flex-col lg:row items-center gap-16">
            <div className="lg:w-1/2 order-2 lg:order-1">
              <img
                src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=800"
                alt="Driver Verification"
                className="rounded-3xl shadow-xl"
              />
            </div>
            <div className="lg:w-1/2 order-1 lg:order-2">
              <h2 className="text-4xl font-bold mb-8">
                How we verify our Driver Partners
              </h2>
              <div className="space-y-6">
                {[
                  "Mandatory background check by local authorities.",
                  "Full documentation review (License, NID, Insurance).",
                  "Physical vehicle inspection for safety and comfort.",
                  "Safety training and behavioral workshops.",
                  "Zero-tolerance policy for guideline violations.",
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="bg-green-100 dark:bg-green-900/30 p-1 rounded-full text-green-600">
                      <CheckCircle size={20} />
                    </div>
                    <p className="font-medium text-slate-700 dark:text-slate-300">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
              <button className="mt-10 px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all">
                Learn about Drive Policy
              </button>
            </div>
          </div>
        </section>

        {/* --- 5. EMERGENCY CONTACTS --- */}
        <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">Emergency Support</h2>
            <p className="text-slate-500 mb-12">
              Immediate help is available. Don't hesitate to reach out.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  label: "Police / Emergency",
                  number: "999",
                  color: "bg-red-500",
                },
                {
                  label: "RideX Safety Team",
                  number: "+880 1234 567",
                  color: "bg-indigo-600",
                },
                { label: "Ambulance", number: "10666", color: "bg-orange-500" },
                {
                  label: "Roadside Assist",
                  number: "0800 555",
                  color: "bg-slate-700",
                },
              ].map((contact, i) => (
                <div
                  key={i}
                  className="p-8 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-800"
                >
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">
                    {contact.label}
                  </p>
                  <h4 className="text-2xl font-black mb-4">{contact.number}</h4>
                  <a
                    href={`tel:${contact.number}`}
                    className={`inline-flex items-center gap-2 text-white px-4 py-2 rounded-lg ${contact.color} text-sm font-bold`}
                  >
                    <PhoneCall size={16} /> Call Now
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- 6. COMMUNITY GUIDELINES --- */}
        <section className="py-24 container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Community Guidelines</h2>
            <p className="text-slate-500 mt-2">
              Respect is a two-way street. Help us keep the RideX family safe.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl border border-indigo-100 dark:border-indigo-900/30 bg-indigo-50/30 dark:bg-indigo-900/10">
              <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Users className="text-indigo-600" /> For Riders
              </h4>
              <ul className="space-y-3 text-slate-600 dark:text-slate-400 text-sm">
                <li>• Always wear your seatbelt.</li>
                <li>• Be ready at the pickup point.</li>
                <li>• Treat your driver with respect.</li>
                <li>• No smoking or illegal substances.</li>
              </ul>
            </div>
            <div className="p-8 rounded-3xl border border-purple-100 dark:border-purple-900/30 bg-purple-50/30 dark:bg-purple-900/10">
              <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Smartphone className="text-purple-600" /> For Drivers
              </h4>
              <ul className="space-y-3 text-slate-600 dark:text-slate-400 text-sm">
                <li>• Follow all traffic laws strictly.</li>
                <li>• Keep your vehicle clean and safe.</li>
                <li>• Avoid distracted driving (phone use).</li>
                <li>• Respect rider's privacy and space.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* --- 7. SAFETY CTA --- */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="bg-[#0F172B] rounded-[3rem] p-12 lg:p-20 text-center text-white relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-4xl lg:text-6xl font-bold mb-8">
                  Ride with Confidence.
                </h2>
                <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">
                  Your safety is integrated into every part of the experience.
                  Join millions who trust RideX for their daily commute.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link
                    to="/register"
                    className="bg-white text-indigo-600 px-10 py-5 rounded-2xl font-black shadow-xl hover:scale-105 transition-transform"
                  >
                    Start Your Safe Ride
                  </Link>
                  <Link
                    to="/contact"
                    className="bg-transparent border-2 border-white/50 px-10 py-5 rounded-2xl font-bold hover:bg-white/10 transition-all"
                  >
                    Report a Concern
                  </Link>
                </div>
              </div>
              <ShieldCheck className="absolute -bottom-10 -right-10 text-white/10 w-64 h-64 rotate-12" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Safety;
