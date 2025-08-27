/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/Settings.tsx
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
import { useUpdateProfileMutation, useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { User, Mail, Lock, Save, Camera, X } from "lucide-react";

type ProfileForm = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  profileImage: FileList;
};

// localStorage key for profile image
const PROFILE_IMAGE_KEY = 'user_profile_image';

export default function RiderProfile() {
  const { data, refetch } = useUserInfoQuery(undefined);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  
  // Local state to persist profile image even after reload
  const [profileImageUrl, setProfileImageUrl] = React.useState<string | null>(null);

  const form = useForm<ProfileForm>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Load profile image from localStorage on component mount
  React.useEffect(() => {
    const savedImage = localStorage.getItem(PROFILE_IMAGE_KEY);
    if (savedImage) {
      setProfileImageUrl(savedImage);
    }
  }, []);

  // Initialize form and profile image from API
  React.useEffect(() => {
    if (data?.data) {
      form.reset({
        name: data.data.name,
        email: data.data.email,
        password: "",
        confirmPassword: "",
      });

      // Only set from API if no image is saved in localStorage and API has image
      const savedImage = localStorage.getItem(PROFILE_IMAGE_KEY);
      if (!savedImage && data.data.profileImage) {
        setProfileImageUrl(data.data.profileImage);
        // Save to localStorage for future use
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
        // Save to localStorage
        localStorage.setItem(PROFILE_IMAGE_KEY, imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setProfileImageUrl(null);
    // Remove from localStorage
    localStorage.removeItem(PROFILE_IMAGE_KEY);
    form.setValue("profileImage", {} as FileList);
    const fileInput = document.getElementById("profileImage") as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  const onSubmit: SubmitHandler<ProfileForm> = async (values) => {
    if (values.password && values.password !== values.confirmPassword) {
      form.setError("confirmPassword", { message: "Passwords do not match" });
      return;
    }

    if (!data?.data?._id) return;

    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);

      if (values.password) formData.append("password", values.password);
      if (values.profileImage && values.profileImage.length > 0) {
        formData.append("profileImage", values.profileImage[0]);
      } else if (!profileImageUrl && data.data.profileImage) {
        formData.append("removeProfileImage", "true");
      }

      const response = await updateProfile({ id: data.data._id, body: formData } as any).unwrap();

      toast.success("Profile updated successfully!");
      form.reset({ ...values, password: "", confirmPassword: "" });

      // Update local state and localStorage after successful update
      const refreshed = await refetch();
      if (refreshed.data?.data?.profileImage) {
        const newImageUrl = refreshed.data.data.profileImage;
        setProfileImageUrl(newImageUrl);
        localStorage.setItem(PROFILE_IMAGE_KEY, newImageUrl);
      } else if (!profileImageUrl) {
        // If image was removed
        localStorage.removeItem(PROFILE_IMAGE_KEY);
      }

    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update profile");
    }
  };

  return (
    <div className="container mx-auto py-8 max-w-4xl space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Update Your Profile</h1>
        <p className="text-gray-600">Manage your personal information and profile photo</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Profile Image Card */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-blue-100">
                <Camera className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <CardTitle>Profile Photo</CardTitle>
                <CardDescription>Update your profile picture</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="relative mb-4">
              <img
                src={profileImageUrl || "/default-avatar.png"}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
              />
              {profileImageUrl && (
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                  aria-label="Remove profile image"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <div className="w-full">
              <Label htmlFor="profileImage" className="flex items-center gap-2 mb-2">
                <Camera className="h-4 w-4" /> Upload Photo
              </Label>
              <Input
                id="profileImage"
                type="file"
                accept="image/*"
                {...form.register("profileImage")}
                onChange={(e) => {
                  form.register("profileImage").onChange(e);
                  handleImageChange(e);
                }}
                className="w-full cursor-pointer"
              />
              <p className="text-xs text-gray-500 mt-2">
                Supported formats: JPG, PNG, GIF. Max size: 2MB
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Profile Info Card */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-blue-100">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <User className="h-4 w-4" /> Full Name *
                  </Label>
                  <Input {...form.register("name", { required: "Name is required" })} placeholder="Enter your name" />
                  {form.formState.errors.name && (
                    <p className="text-red-500 text-sm">{form.formState.errors.name.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" /> Email Address *
                  </Label>
                  <Input
                    {...form.register("email", { 
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                      }
                    })}
                    type="email"
                    placeholder="Enter your email"
                  />
                  {form.formState.errors.email && (
                    <p className="text-red-500 text-sm">{form.formState.errors.email.message}</p>
                  )}
                </div>
              </div>

              {/* Password */}
              <div className="pt-4 border-t">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Lock className="h-5 w-5" /> Change Password
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">New Password</Label>
                    <Input
                      {...form.register("password", { minLength: { value: 6, message: "Password must be at least 6 characters" } })}
                      type="password"
                      placeholder="Enter new password"
                    />
                    {form.formState.errors.password && (
                      <p className="text-red-500 text-sm">{form.formState.errors.password.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input {...form.register("confirmPassword")} type="password" placeholder="Confirm new password" />
                    {form.formState.errors.confirmPassword && (
                      <p className="text-red-500 text-sm">{form.formState.errors.confirmPassword.message}</p>
                    )}
                  </div>
                </div>
              </div>

              <Button type="submit" disabled={isLoading} className="w-full bg-blue-600 hover:bg-blue-700">
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? "Updating..." : "Update Profile"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}