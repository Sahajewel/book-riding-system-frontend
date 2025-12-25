/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  useUpdateProfileMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";
import {
  User,
  Lock,
  Save,
  Camera,
  X,
  ShieldCheck,
  Loader2,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

type ProfileForm = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  profileImage: FileList;
};

const PROFILE_IMAGE_KEY = "user_profile_image";

export default function RiderProfile() {
  const { data, refetch, isFetching } = useUserInfoQuery(undefined);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const [profileImageUrl, setProfileImageUrl] = React.useState<string | null>(
    null
  );

  const form = useForm<ProfileForm>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  React.useEffect(() => {
    const savedImage = localStorage.getItem(PROFILE_IMAGE_KEY);
    if (savedImage) setProfileImageUrl(savedImage);
  }, []);

  React.useEffect(() => {
    if (data?.data) {
      form.reset({
        name: data.data.name,
        email: data.data.email,
        password: "",
        confirmPassword: "",
      });
      const savedImage = localStorage.getItem(PROFILE_IMAGE_KEY);
      if (!savedImage && data.data.profileImage) {
        setProfileImageUrl(data.data.profileImage);
        localStorage.setItem(PROFILE_IMAGE_KEY, data.data.profileImage);
      }
    }
  }, [data, form]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setProfileImageUrl(imageUrl);
        localStorage.setItem(PROFILE_IMAGE_KEY, imageUrl);
        toast.info("Preview updated!");
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setProfileImageUrl(null);
    localStorage.removeItem(PROFILE_IMAGE_KEY);
    form.setValue("profileImage", {} as FileList);
    toast.warning("Profile photo removed");
  };

  const onSubmit: SubmitHandler<ProfileForm> = async (values) => {
    // ১. পাসওয়ার্ড ম্যাচিং চেক
    if (values.password && values.password !== values.confirmPassword) {
      form.setError("confirmPassword", { message: "Passwords do not match" });
      return;
    }

    if (!data?.data?._id) return;

    try {
      const formData = new FormData();

      // গুরুত্বপূর্ণ: নাম এবং ইমেইল সবসময় অ্যাপেন্ড করবি
      formData.append("name", values.name);
      formData.append("email", values.email);

      // পাসওয়ার্ড থাকলে তবেই অ্যাপেন্ড করবি
      if (values.password && values.password.length >= 6) {
        formData.append("password", values.password);
      }

      // ইমেজ হ্যান্ডলিং
      if (values.profileImage?.[0]) {
        formData.append("profileImage", values.profileImage[0]);
      }

      // API Call
      // এখানে সরাসরি unwrap() করবি এবং নিশ্চিত করবি তোর `updateProfile`
      // মিউটেশন যেন `FormData` রিসিভ করার ক্ষমতা রাখে
      await updateProfile({
        id: data.data._id,
        name: values.name,
        email: values.email,
        ...(values.password && { password: values.password }),
      }).unwrap();

      toast.success("Identity updated successfully!");

      // ২. রিফেচ করার পর ফর্ম রিসেট
      const updatedInfo = await refetch();

      if (updatedInfo.data) {
        form.reset({
          name: updatedInfo.data.data.name,
          email: updatedInfo.data.data.email,
          password: "",
          confirmPassword: "",
        });
      }
    } catch (error: any) {
      console.log("Error details:", error);
      toast.error(error?.data?.message || "Failed to sync profile");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto py-10 px-4 max-w-5xl"
    >
      {/* Dynamic Header */}
      <div className="flex flex-col items-center text-center mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wider animate-pulse">
          <Sparkles size={14} /> Personal Account
        </div>
        <h1 className="text-4xl font-black tracking-tight text-indigo-500">
          Account Control Center
        </h1>
        <p className="text-indigo-500 max-w-md">
          Customize your digital presence and keep your security credentials up
          to date.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Col: Avatar Control */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="rounded-[2.5rem] border-none shadow-xl shadow-indigo-100/50 overflow-hidden bg-white">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-xl font-bold">Your Avatar</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center pb-8">
              <div className="relative group cursor-pointer">
                <div className="absolute inset-0 bg-indigo-500 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative h-44 w-44"
                >
                  <img
                    src={
                      profileImageUrl ||
                      "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                    }
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  {profileImageUrl && (
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 bg-rose-500 text-white rounded-full p-1.5 shadow-lg hover:bg-rose-600 transition-all scale-0 group-hover:scale-100"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                  <label
                    htmlFor="profileImage"
                    className="absolute bottom-2 right-2 bg-indigo-600 text-white rounded-full p-3 shadow-lg hover:bg-indigo-700 cursor-pointer transition-transform group-hover:rotate-12"
                  >
                    <Camera className="h-5 w-5" />
                  </label>
                </motion.div>
              </div>

              <input
                id="profileImage"
                type="file"
                className="hidden"
                accept="image/*"
                {...form.register("profileImage")}
                onChange={(e) => {
                  form.register("profileImage").onChange(e);
                  handleImageChange(e);
                }}
              />

              <div className="mt-6 w-full space-y-3">
                <div className="p-4 bg-slate-50 rounded-2xl text-center">
                  <p className="text-sm font-bold text-slate-900">
                    {form.getValues("name") || "Full Name"}
                  </p>
                  <p className="text-[10px] text-slate-400 uppercase font-mono mt-1">
                    ID: {data?.data?._id?.slice(-8)}
                  </p>
                </div>
                <p className="text-[10px] text-center text-slate-400 px-4 leading-relaxed">
                  Upload a high-quality JPG or PNG. The avatar helps drivers and
                  riders recognize you easily.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Col: Form Details */}
        <div className="lg:col-span-8">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Card className="rounded-[2.5rem] border-none shadow-xl shadow-slate-200/60 bg-white p-2">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-indigo-50 text-indigo-600">
                    <User className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold">
                      Profile Identity
                    </CardTitle>
                    <CardDescription>
                      Public information that others will see
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-wide text-slate-500 ml-1">
                    Full Name
                  </Label>
                  <Input
                    {...form.register("name", { required: "Name is required" })}
                    className="h-12 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-indigo-500 transition-all"
                    placeholder="Enter full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-wide text-slate-500 ml-1">
                    Email Address
                  </Label>
                  <Input
                    {...form.register("email", {
                      required: "Email is required",
                    })}
                    className="h-12 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-indigo-500 transition-all"
                    placeholder="Email address"
                    disabled
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[2.5rem] border-none shadow-xl shadow-slate-200/60 bg-white p-2">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-rose-50 text-rose-600">
                    <Lock className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold">
                      Security & Credentials
                    </CardTitle>
                    <CardDescription>
                      Keep your password strong and secure
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-wide text-slate-500 ml-1 text-rose-600">
                      New Password
                    </Label>
                    <Input
                      {...form.register("password", {
                        minLength: { value: 6, message: "Min 6 characters" },
                      })}
                      type="password"
                      className="h-12 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all"
                      placeholder="••••••••"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-wide text-slate-500 ml-1">
                      Confirm Secret
                    </Label>
                    <Input
                      {...form.register("confirmPassword")}
                      type="password"
                      className="h-12 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                  <ShieldCheck className="text-emerald-600 h-5 w-5" />
                  <p className="text-[10px] text-emerald-700 font-medium">
                    Your account data is encrypted using industry-standard
                    protocols.
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4 pt-4">
              <Button
                type="submit"
                disabled={isLoading}
                className="h-14 px-10 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-lg shadow-indigo-200 transition-all active:scale-95 disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Synchronizing...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-5 w-5" />
                    Save All Changes
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>

      {isFetching && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-md px-6 py-3 rounded-full border shadow-2xl flex items-center gap-3 animate-bounce">
          <Loader2 className="h-4 w-4 animate-spin text-indigo-600" />
          <span className="text-xs font-bold">Syncing latest data...</span>
        </div>
      )}
    </motion.div>
  );
}
