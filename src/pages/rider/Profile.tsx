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
import { User, Mail, Lock, Save } from "lucide-react";

type ProfileForm = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function RiderProfile() {
  const { data } = useUserInfoQuery(undefined);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const form = useForm<ProfileForm>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  React.useEffect(() => {
    if (data?.data) {
      form.reset({
        name: data.data.name,
        email: data.data.email,
        password: "",
        confirmPassword: "",
      });
    }
  }, [data, form]);

  const onSubmit: SubmitHandler<ProfileForm> = async (values) => {
    // Simple check for password match
    if (values.password && values.password !== values.confirmPassword) {
      form.setError("confirmPassword", { message: "Passwords do not match" });
      return;
    }

    if (!data?.data?._id) return;

    try {
      const payload: { name?: string; email?: string; password?: string } = {
        name: values.name,
        email: values.email,
      };
      if (values.password) payload.password = values.password;

      await updateProfile({
        id: data.data._id,
        ...payload,
      }).unwrap();
      toast.success("Profile updated successfully!");
      form.reset({ ...values, password: "", confirmPassword: "" });
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update profile");
    }
  };

  return (
    <div className="container mx-auto py-8 max-w-4xl space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold ">Update Your Profile</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full">
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
              {/* Name & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <User className="h-4 w-4" /> Full Name *
                  </Label>
                  <Input
                    {...form.register("name", { required: "Name is required" })}
                    placeholder="Enter your name"
                  />
                  {form.formState.errors.name && (
                    <p className="text-red-500 text-sm">
                      {form.formState.errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" /> Email Address *
                  </Label>
                  <Input
                    {...form.register("email", { required: "Email is required" })}
                    type="email"
                    placeholder="Enter your email"
                    readOnly
                  />
                  {form.formState.errors.email && (
                    <p className="text-red-500 text-sm">
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Password */}
              <div className="pt-4 border-t">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Lock className="h-5 w-5" /> Change Password
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="password">New Password</Label>
                    <Input
                      {...form.register("password")}
                      type="password"
                      placeholder="Enter new password"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      {...form.register("confirmPassword")}
                      type="password"
                      placeholder="Confirm new password"
                    />
                    {form.formState.errors.confirmPassword && (
                      <p className="text-red-500 text-sm">
                        {form.formState.errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
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
