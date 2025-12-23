/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useLoginMutation } from "@/redux/features/auth/auth.api";
import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, Zap, ShieldCheck, User } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  // --- 🔥 Intuitive Demo Login Function ---
  const fillDemoData = (role: "admin" | "driver" | "rider") => {
    const credentials = {
      admin: { email: "admin@gmail.com", pass: "123456" },
      driver: { email: "saha@gmail.com", pass: "123456" },
      rider: { email: "rider@gmail.com", pass: "123456" },
    };
    form.setValue("email", credentials[role].email);
    form.setValue("password", credentials[role].pass);
    toast.info(
      `${role.charAt(0).toUpperCase() + role.slice(1)} credentials loaded!`
    );
  };

  const onSubmit: SubmitHandler<z.infer<typeof loginSchema>> = async (data) => {
    try {
      const res = await login(data).unwrap();
      if (res.success) {
        toast.success("Welcome back! Redirecting...");
        navigate("/");
      }
    } catch (error: any) {
      toast.error(
        error.data?.message || "Login failed. Check your credentials."
      );
    }
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn("flex flex-col gap-5", className)}
          {...props}
        >
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input
                      placeholder="name@example.com"
                      className="pl-10 h-11 focus-visible:ring-indigo-600 transition-all"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center">
                  <FormLabel>Password</FormLabel>
                  <Link
                    to="/forgot"
                    className="text-xs text-indigo-600 hover:underline"
                  >
                    Forgot?
                  </Link>
                </div>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10 h-11 focus-visible:ring-indigo-600 transition-all"
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-slate-400 hover:text-indigo-600 transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 dark:shadow-none transition-all"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </Form>

      {/* --- Demo Access Cards --- */}
      <div className="space-y-3 pt-2">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-slate-200 dark:border-slate-800" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white dark:bg-slate-950 px-2 text-slate-500">
              Quick Demo Access
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {[
            {
              role: "admin" as const,
              icon: <ShieldCheck size={14} />,
              label: "Admin",
            },
            {
              role: "driver" as const,
              icon: <Zap size={14} />,
              label: "Driver",
            },
            {
              role: "rider" as const,
              icon: <User size={14} />,
              label: "Rider",
            },
          ].map((item) => (
            <button
              key={item.role}
              onClick={() => fillDemoData(item.role)}
              className="flex flex-col items-center gap-1 p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all group"
            >
              <div className="text-slate-400 group-hover:text-indigo-600">
                {item.icon}
              </div>
              <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
