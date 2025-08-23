// src/pages/Settings.tsx
import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { toast } from "sonner";
import { useUpdateProfileMutation, useUserInfoQuery } from "@/redux/features/auth/auth.api";



// Zod schema for profile update
const profileSchema = z
  .object({
    name: z.string().min(2, "Name too short"),
    email: z.email("Invalid email"),
    password: z.string().min(6, "Password too short").optional(),
    confirmPassword: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ProfileForm = z.infer<typeof profileSchema>;

// Mock emergency contacts
const defaultContacts = [
  { id: 1, name: "Boudi", phone: "+81 90 1234 5678" },
  { id: 2, name: "Mejda", phone: "+81 80 9876 5432" },
];


export default function Settings() {
    
  const { data } = useUserInfoQuery(undefined);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const form = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: data?.data?.name || "",
      email: data?.data?.email || "",
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
  }, [data]);
  const onSubmit: SubmitHandler<ProfileForm> = async (values) => {
    if (!data?.data?._id) return;
    try {
      // Only include password if not empty
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update profile");
    }
  };

  // Emergency contacts state
  const [contacts, setContacts] = React.useState(defaultContacts);
  const [newContact, setNewContact] = React.useState({ name: "", phone: "" });

  const addContact = () => {
    if (!newContact.name || !newContact.phone) {
      toast.error("Fill all fields");
      return;
    }
    setContacts((prev) => [
      ...prev,
      { id: Date.now(), name: newContact.name, phone: newContact.phone },
    ]);
    setNewContact({ name: "", phone: "" });
    toast.success("Emergency contact added");
  };

  

  return (
    <div className="container mx-auto py-6 flex flex-col gap-6">
       
      {/* Profile Card */}
      <Card>
        <CardHeader>
         
        </CardHeader>
        <CardContent className="flex justify-center ">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <Input {...form.register("name")} placeholder="Name" />
            <Input {...form.register("email")} placeholder="Email" readOnly />
            <Input
              {...form.register("password")}
              placeholder="New Password"
              type="password"
            />
            <Input
              {...form.register("confirmPassword")}
              placeholder="Confirm Password"
              type="password"
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Profile"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Emergency Contacts Card */}
   
    
    </div>
  );
}
