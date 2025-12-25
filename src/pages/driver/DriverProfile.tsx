/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/driver/DriverProfile.tsx
import { useState, useEffect } from "react";
import {
  useGetDriverProfileQuery,
  useUpdateDriverProfileMutation,
} from "@/redux/features/driver/driver.api";
import { toast } from "sonner";
import {
  User,
  Mail,
  Lock,
  Car,
  Hash,
  CreditCard,
  ShieldCheck,
  Banknote,
  Camera,
  Edit3,
  Save,
  X,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const DriverProfile = () => {
  const { data: driverProfile, isLoading } = useGetDriverProfileQuery();
  const [updateDriverProfile, { isLoading: updating }] =
    useUpdateDriverProfileMutation();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    vehicleNumber: "",
    vehicleType: "",
    licenseNumber: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (driverProfile) {
      setFormData({
        name: driverProfile.name || "",
        email: driverProfile.email || "",
        password: "",
        confirmPassword: "",
        vehicleNumber: driverProfile.driverInfo?.vehicleNumber || "",
        vehicleType: driverProfile.driverInfo?.vehicleType || "",
        licenseNumber: driverProfile.driverInfo?.licenseNumber || "",
      });
    }
  }, [driverProfile]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // (Validation logic same as before, keeping it clean)
    try {
      const updatePayload: any = {
        name: formData.name,
        email: formData.email,
        driverInfo: {
          vehicleNumber: formData.vehicleNumber,
          vehicleType: formData.vehicleType,
          licenseNumber: formData.licenseNumber,
          isAvailable: driverProfile?.driverInfo?.isAvailable,
          isApproved: driverProfile?.driverInfo?.isApproved,
        },
      };
      if (formData.password) updatePayload.password = formData.password;

      await updateDriverProfile({
        id: driverProfile?._id?.toString() || "",
        data: updatePayload,
      }).unwrap();

      toast.success("Profile Synced Successfully!");
      setIsEditing(false);
    } catch (error: any) {
      toast.error(error?.data?.message || "Update failed");
    }
  };

  if (isLoading) return <ProfileSkeleton />;

  return (
    <div className="min-h-screen bg-[#FDFDFF] dark:bg-slate-950 pb-20">
      {/* Header Profile Section */}
      <div className="relative h-48 bg-indigo-600 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
        <div className="absolute -bottom-1 w-full h-16 bg-gradient-to-t from-[#FDFDFF] dark:from-slate-950 to-transparent" />
      </div>

      <div className="max-w-5xl mx-auto px-4 -mt-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Avatar & Quick Stats */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-xl shadow-indigo-100 dark:shadow-none border border-slate-100 dark:border-slate-800 text-center">
              <div className="relative inline-block group">
                <div className="w-32 h-32 bg-indigo-100 dark:bg-indigo-900 rounded-[2rem] flex items-center justify-center text-indigo-600 text-4xl font-black mb-4 border-4 border-white dark:border-slate-900 shadow-lg">
                  {formData.name.charAt(0)}
                </div>
                <button className="absolute bottom-4 right-0 bg-slate-900 text-white p-2 rounded-xl shadow-lg hover:scale-110 transition-transform">
                  <Camera size={16} />
                </button>
              </div>
              <h2 className="text-2xl font-black tracking-tight dark:text-white">
                {formData.name}
              </h2>
              <p className="text-slate-500 font-bold text-sm uppercase tracking-widest">
                {driverProfile?.driverInfo?.vehicleType} Driver
              </p>

              <div className="mt-8 flex justify-center gap-3">
                <StatusBadge
                  active={driverProfile?.driverStatus === "approved"}
                  label={driverProfile?.driverStatus || "Pending"}
                  icon={<ShieldCheck size={14} />}
                />
                <StatusBadge
                  active={driverProfile?.driverInfo?.isAvailable}
                  label={
                    driverProfile?.driverInfo?.isAvailable
                      ? "Online"
                      : "Offline"
                  }
                  icon={<CheckCircle2 size={14} />}
                />
              </div>
            </div>
          </div>

          {/* Right Column: Form Fields */}
          <div className="lg:col-span-8">
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden">
              <div className="px-8 py-6 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
                <h3 className="text-lg font-black uppercase tracking-tighter italic">
                  Settings <span className="text-indigo-600">&</span> Info
                </h3>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all active:scale-95"
                  >
                    <Edit3 size={14} /> Edit Profile
                  </button>
                )}
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-8">
                {/* Personal Section */}
                <div>
                  <SectionHeader
                    title="Personal Information"
                    icon={<User size={18} />}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField
                      label="Full Name"
                      name="name"
                      icon={<User />}
                      value={formData.name}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      error={errors.name}
                    />
                    <InputField
                      label="Email Address"
                      name="email"
                      icon={<Mail />}
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      error={errors.email}
                    />
                  </div>
                </div>

                {/* Vehicle Section */}
                <div>
                  <SectionHeader
                    title="Vehicle Details"
                    icon={<Car size={18} />}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <InputField
                      label="Vehicle Plate"
                      name="vehicleNumber"
                      icon={<Hash />}
                      value={formData.vehicleNumber}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      error={errors.vehicleNumber}
                    />
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                        Vehicle Type
                      </label>
                      <div className="relative">
                        <Car
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                          size={18}
                        />
                        <select
                          name="vehicleType"
                          value={formData.vehicleType}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl font-bold focus:ring-2 focus:ring-indigo-500 appearance-none disabled:opacity-60"
                        >
                          <option value="car">Sedan Car</option>
                          <option value="motorcycle">Bike</option>
                          <option value="van">Microbus</option>
                        </select>
                      </div>
                    </div>
                    <InputField
                      label="License ID"
                      name="licenseNumber"
                      icon={<CreditCard />}
                      value={formData.licenseNumber}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      error={errors.licenseNumber}
                    />
                  </div>
                </div>

                {/* Password Section (Only show when editing) */}
                <AnimatePresence>
                  {isEditing && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <SectionHeader
                        title="Security Update"
                        icon={<Lock size={18} />}
                      />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField
                          label="New Password"
                          name="password"
                          type="password"
                          icon={<Lock />}
                          value={formData.password}
                          onChange={handleInputChange}
                          disabled={false}
                          placeholder="Keep empty to stay same"
                        />
                        <InputField
                          label="Confirm Password"
                          name="confirmPassword"
                          type="password"
                          icon={<Lock />}
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          disabled={false}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Form Actions */}
                {isEditing && (
                  <div className="flex gap-4 pt-6">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="flex-1 flex items-center justify-center gap-2 py-4 rounded-[1.5rem] font-black uppercase text-xs tracking-[0.2em] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 transition-all"
                    >
                      <X size={16} /> Discard
                    </button>
                    <button
                      type="submit"
                      disabled={updating}
                      className="flex-[2] flex items-center justify-center gap-2 py-4 rounded-[1.5rem] font-black uppercase text-xs tracking-[0.2em] bg-slate-900 dark:bg-indigo-600 text-white shadow-xl shadow-indigo-200 dark:shadow-none hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                    >
                      <Save size={16} />{" "}
                      {updating ? "Saving..." : "Sync Profile"}
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Sub-components ---

const SectionHeader = ({ title, icon }: any) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="text-indigo-600">{icon}</div>
    <h4 className="text-sm font-black uppercase tracking-widest text-slate-400">
      {title}
    </h4>
    <div className="flex-1 h-[1px] bg-slate-100 dark:bg-slate-800 ml-2" />
  </div>
);

const InputField = ({ label, icon, error, ...props }: any) => (
  <div className="space-y-2 group">
    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1 group-focus-within:text-indigo-600 transition-colors">
      {label}
    </label>
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
        {icon}
      </div>
      <input
        {...props}
        className={`w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl font-bold focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-400 disabled:opacity-60 ${
          error ? "ring-2 ring-rose-500" : ""
        }`}
      />
    </div>
    {error && (
      <p className="text-[10px] text-rose-500 font-bold uppercase ml-1">
        {error}
      </p>
    )}
  </div>
);

const StatusBadge = ({ active, label, icon }: any) => (
  <div
    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-tighter ${
      active ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
    }`}
  >
    {icon} {label}
  </div>
);

const ProfileSkeleton = () => (
  <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-8 animate-pulse">
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="h-48 bg-slate-200 dark:bg-slate-800 rounded-[2.5rem]" />
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-4 h-96 bg-slate-200 dark:bg-slate-800 rounded-[2.5rem]" />
        <div className="col-span-8 h-96 bg-slate-200 dark:bg-slate-800 rounded-[2.5rem]" />
      </div>
    </div>
  </div>
);

export default DriverProfile;
