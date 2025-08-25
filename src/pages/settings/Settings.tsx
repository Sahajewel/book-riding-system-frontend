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
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useUpdateProfileMutation, useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { 
  User, 
  Mail, 
  Lock, 
  Phone, 
  Plus, 
  Trash2, 
  Shield,
  Save,
  Contact
} from "lucide-react";
import { Badge } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Zod schema for profile update
const profileSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters").optional().or(z.literal('')),
    confirmPassword: z.string().optional().or(z.literal('')),
  })
  .refine((data) => !data.password || data.password === data.confirmPassword, {
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
      toast.error("Please fill all fields");
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
    setContacts(contacts.filter(contact => contact.id !== id));
    toast.success("Contact removed");
  };

  return (
   <div>
    <Navbar></Navbar>
     <div className="container mx-auto py-8 max-w-4xl space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Manage your account settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Profile Card */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-full">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your personal information
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Full Name
                  </Label>
                  <Input
                    {...form.register("name")}
                    placeholder="Enter your name"
                    className="w-full"
                  />
                  {form.formState.errors.name && (
                    <p className="text-red-500 text-sm">
                      {form.formState.errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email Address
                  </Label>
                  <Input
                    {...form.register("email")}
                    type="email"
                    placeholder="Enter your email"
                    className="w-full"
                    readOnly
                  />
                  {form.formState.errors.email && (
                    <p className="text-red-500 text-sm">
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Change Password
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="password">New Password</Label>
                    <Input
                      {...form.register("password")}
                      type="password"
                      placeholder="Enter new password"
                      className="w-full"
                    />
                    {form.formState.errors.password && (
                      <p className="text-red-500 text-sm">
                        {form.formState.errors.password.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      {...form.register("confirmPassword")}
                      type="password"
                      placeholder="Confirm new password"
                      className="w-full"
                    />
                    {form.formState.errors.confirmPassword && (
                      <p className="text-red-500 text-sm">
                        {form.formState.errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full md:w-auto"
              >
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? "Updating..." : "Update Profile"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Emergency Contacts Card */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-full">
                <Shield className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <CardTitle>Emergency Contacts</CardTitle>
                <CardDescription>
                  Your trusted emergency contacts
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-full">
                    <Contact className="h-4 w-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium">{contact.name}</p>
                    <p className="text-sm text-gray-600">{contact.phone}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeContact(contact.id)}
                  className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}

            <div className="pt-4 border-t">
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add New Contact
              </h4>
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input
                    value={newContact.name}
                    onChange={(e) =>
                      setNewContact({ ...newContact, name: e.target.value })
                    }
                    placeholder="Contact name"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Phone Number
                  </Label>
                  <Input
                    value={newContact.phone}
                    onChange={(e) =>
                      setNewContact({ ...newContact, phone: e.target.value })
                    }
                    placeholder="+81 90 1234 5678"
                  />
                </div>
                <Button
                  onClick={addContact}
                  variant="outline"
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Contact
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-gray-50 py-3">
            <p className="text-xs text-gray-600">
              These contacts will be notified in case of emergencies
            </p>
          </CardFooter>
        </Card>

        {/* Account Status Card */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle>Account Status</CardTitle>
            <CardDescription>
              Your current account information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium">Account Type</span>
              <Badge variant="secondary">Premium User</Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium">Member Since</span>
              <span className="text-sm text-gray-600">January 2024</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium">Last Updated</span>
              <span className="text-sm text-gray-600">Today</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View Account Details
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Security Notice */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900">Security Notice</h3>
              <p className="text-blue-700 text-sm mt-1">
                Your information is encrypted and secure. We never share your 
                personal data with third parties without your consent.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
    <Footer></Footer>
   </div>
  );
}