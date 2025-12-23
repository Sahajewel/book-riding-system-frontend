import { ShieldCheck, Scale, Clock } from "lucide-react";

const LegalPage = ({ type }: { type: "privacy" | "terms" }) => {
  const isPrivacy = type === "privacy";

  return (
    <div className="max-w-3xl mx-auto p-6 md:py-16">
      <div className="flex items-center gap-4 mb-8">
        <div
          className={`p-4 rounded-3xl ${
            isPrivacy
              ? "bg-emerald-50 text-emerald-600"
              : "bg-indigo-50 text-indigo-600"
          }`}
        >
          {isPrivacy ? <ShieldCheck size={32} /> : <Scale size={32} />}
        </div>
        <div>
          <h1 className="text-3xl font-black text-slate-900">
            {isPrivacy ? "Privacy Policy" : "Terms of Service"}
          </h1>
          <p className="flex items-center gap-1 text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">
            <Clock size={12} /> Last Updated: October 2023
          </p>
        </div>
      </div>

      <div className="prose prose-slate max-w-none bg-white p-8 md:p-12 rounded-[3rem] border border-slate-100 shadow-sm space-y-8 text-slate-600 leading-relaxed text-sm md:text-base">
        <section>
          <h3 className="text-lg font-black text-slate-900 mb-4">
            1. Introduction
          </h3>
          <p>
            Welcome to SafeRide Japan. We value your trust and are committed to
            protecting your
            {isPrivacy ? " personal information" : " rights as a user"}. This
            document outlines how we operate and what we expect from our
            community.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-black text-slate-900 mb-4">
            {isPrivacy ? "2. Data We Collect" : "2. User Obligations"}
          </h3>
          <p>
            {isPrivacy
              ? "We collect location data, contact details, and payment information to provide a seamless ride-sharing experience. Your data is encrypted and never sold to third parties."
              : "Users must be 18+ years old, provide accurate information, and maintain respectful behavior towards drivers. Any violation may result in account termination."}
          </p>
          <ul className="list-disc pl-5 mt-4 space-y-2">
            <li>Account Information</li>
            <li>Real-time GPS Tracking</li>
            <li>Transaction Records</li>
          </ul>
        </section>

        <section className="bg-slate-50 p-6 rounded-2xl border border-dashed border-slate-200">
          <h3 className="text-sm font-black text-slate-900 mb-2 uppercase tracking-widest">
            Important Note
          </h3>
          <p className="text-xs">
            By using SafeRide, you agree to the automated collection of trip
            data for safety and billing purposes. Please read this carefully.
          </p>
        </section>
      </div>
    </div>
  );
};

export default LegalPage;
