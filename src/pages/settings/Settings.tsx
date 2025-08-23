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
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { toast } from "sonner";
import { useUpdateProfileMutation, useUserInfoQuery } from "@/redux/features/auth/auth.api";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";


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

  const removeContact = (id: number) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
    toast.success("Contact removed");
  };

  return (
    <div className="container mx-auto py-6 flex flex-col gap-6">
        <Navbar></Navbar>
        <h1>Setting</h1>
      {/* Profile Card */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
          <CardDescription>Edit your profile info and password</CardDescription>
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
      <Card>
        <CardHeader>
          <CardTitle>Emergency Contacts</CardTitle>
          <CardDescription>
            Add trusted contacts to notify in case of emergency
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {/* Add new contact */}
          <div className="flex gap-2">
            <Input
              placeholder="Name"
              value={newContact.name}
              onChange={(e) =>
                setNewContact({ ...newContact, name: e.target.value })
              }
            />
            <Input
              placeholder="Phone"
              value={newContact.phone}
              onChange={(e) =>
                setNewContact({ ...newContact, phone: e.target.value })
              }
            />
            <Button type="button" onClick={addContact}>
              Add
            </Button>
          </div>

          {/* List contacts */}
          <ul className="flex flex-col gap-2">
            {contacts.map((c) => (
              <li
                key={c.id}
                className="flex justify-between items-center border p-2 rounded"
              >
                <span>
                  {c.name} - {c.phone}
                </span>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeContact(c.id)}
                >
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
 
      <Footer></Footer>
    </div>
  );
}
