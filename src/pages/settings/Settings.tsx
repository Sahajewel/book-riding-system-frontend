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
  Contact,
  Badge
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Zod schema for profile update - Enhanced validation
const profileSchema = z
  .object({
    name: z.string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name cannot exceed 50 characters")
      .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
    email: z.string()
      .email("Please enter a valid email address")
      .min(5, "Email must be at least 5 characters"),
    password: z.string()
      .min(6, "Password must be at least 6 characters")
    
      .optional()
      .or(z.literal('')),
    confirmPassword: z.string()
      .optional()
      .or(z.literal('')),
  })
  .refine((data) => {
    // Only validate password match if password field is not empty
    if (!data.password) return true;
    return data.password === data.confirmPassword;
  }, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .refine((data) => {
    // Check if at least one field is being updated
    return data.name !== '' || data.email !== '' || data.password !== '';
  }, {
    message: "Please update at least one field",
    path: ["name"], // This will show error on name field
  });

type ProfileForm = z.infer<typeof profileSchema>;

// Mock emergency contacts
const defaultContacts = [
  { id: 1, name: "Jhankar", phone: "+81 90 1234 5678" },
  { id: 2, name: "PhHero", phone: "+81 80 9876 5432" },
];

export default function Settings() {
  const { data } = useUserInfoQuery(undefined);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const form = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    mode: "onChange", // Validate on change for better UX
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Watch form values to check if any field has been changed
  const watchedValues = form.watch();
  const isFormDirty = form.formState.isDirty;
  const isFormValid = form.formState.isValid;

  React.useEffect(() => {
    if (data?.data) {
      form.reset({
        name: data.data.name || "",
        email: data.data.email || "",
        password: "",
        confirmPassword: "",
      });
    }
  }, [data, form]);

  const onSubmit: SubmitHandler<ProfileForm> = async (values) => {
    if (!data?.data?._id) {
      toast.error("User ID not found");
      return;
    }

    // Check if any field has actual changes (not just empty password)
    const hasChanges = values.name !== data.data.name || 
                      values.email !== data.data.email || 
                      (values.password && values.password.length > 0);

    if (!hasChanges) {
      toast.error("No changes detected");
      return;
    }

    try {
      const payload: { name?: string; email?: string; password?: string } = {};
      
      // Only include fields that have changed
      if (values.name !== data.data.name) payload.name = values.name;
      if (values.email !== data.data.email) payload.email = values.email;
      if (values.password && values.password.length > 0) payload.password = values.password;

      await updateProfile({
        id: data.data._id,
        ...payload,
      }).unwrap();
      
      toast.success("Profile updated successfully!");
      form.reset({ 
        ...values, 
        password: "", 
        confirmPassword: "" 
      });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update profile");
    }
  };

  // Emergency contacts state
  const [contacts, setContacts] = React.useState(defaultContacts);
  const [newContact, setNewContact] = React.useState({ name: "", phone: "" });

  const addContact = () => {
    if (!newContact.name.trim() || !newContact.phone.trim()) {
      toast.error("Please fill all fields");
      return;
    }

    // Validate phone number format
    const phoneRegex = /^\+?[0-9]{1,4}?[0-9]{7,14}$/;
    if (!phoneRegex.test(newContact.phone.replace(/\s/g, ''))) {
      toast.error("Please enter a valid phone number");
      return;
    }

    setContacts((prev) => [
      ...prev,
      { id: Date.now(), name: newContact.name.trim(), phone: newContact.phone.trim() },
    ]);
    setNewContact({ name: "", phone: "" });
    toast.success("Emergency contact added");
  };

  const removeContact = (id: number) => {
    setContacts(contacts.filter(contact => contact.id !== id));
    toast.success("Contact removed");
  };

  // Check if form has valid changes
  const hasValidChanges = isFormDirty && isFormValid;

  return (
   <div>
    <Navbar></Navbar>
     <div className="container mx-auto py-8 max-w-4xl space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mt-12">Settings</h1>
        <p className="mt-2">Manage your account settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Profile Card */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-blue-100">
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
                    Full Name *
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
                    Email Address *
                  </Label>
                  <Input
                    {...form.register("email")}
                    type="email"
                    placeholder="Enter your email"
                    className="w-full"
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
                      placeholder="Enter new password (min 6 characters)"
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
                <p className="text-sm text-gray-500 mt-2">
                  Leave password fields empty if you don't want to change your password
                </p>
              </div>

              {form.formState.errors.root && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.root.message}
                </p>
              )}

              <Button 
                type="submit" 
                disabled={isLoading || !hasValidChanges}
                className="w-full md:w-auto"
              >
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? "Updating..." : "Update Profile"}
              </Button>

              {!hasValidChanges && isFormDirty && (
                <p className="text-yellow-600 text-sm">
                  Please fix the validation errors above
                </p>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Emergency Contacts Card */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-red-100">
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
                  <Label>Name *</Label>
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
                    Phone Number *
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
                  disabled={!newContact.name.trim() || !newContact.phone.trim()}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Contact
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="py-3 bg-gray-50">
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
            <div className="flex justify-between items-center p-3 rounded-lg">
              <span className="text-sm font-medium">Account Type</span>
              <Badge variant="secondary" className=" text-green-800">Premium User</Badge>
            </div>
            <div className="flex justify-between items-center p-3  rounded-lg">
              <span className="text-sm font-medium">Member Since</span>
              <span className="text-sm ">January 2024</span>
            </div>
            <div className="flex justify-between items-center p-3  rounded-lg">
              <span className="text-sm font-medium">Last Updated</span>
              <span className="text-sm ">Today</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Notice */}
      <Card className="border-blue-200 bg-blue-50">
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