/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisterMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import { User, Mail, Lock, Car, Users, CheckCircle2 } from "lucide-react";

const registerSchema = z
  .object({
    username: z.string().min(2, "Name is too short"),
    email: z.email("Invalid email"),
    password: z.string().min(6, "Minimum 6 characters"),
    confirmPassword: z.string().min(6),
    role: z.enum(["RIDER", "DRIVER"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "RIDER",
    },
  });

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    try {
      await register({
        name: data.username,
        email: data.email,
        password: data.password,
        role: data.role,
      }).unwrap();
      toast.success("Account created successfully!");
      navigate("/login");
    } catch (error: any) {
      toast.error("Registration failed. Try again.");
      console.log(error);
    }
  };

  return (
    <div className={cn("space-y-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* --- Interactive Role Selection (The Intuitive Part) --- */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {(["RIDER", "DRIVER"] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => form.setValue("role", r)}
                className={cn(
                  "relative p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2",
                  form.watch("role") === r
                    ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20"
                    : "border-slate-100 dark:border-slate-800 hover:border-slate-200"
                )}
              >
                {form.watch("role") === r && (
                  <CheckCircle2
                    className="absolute top-2 right-2 text-indigo-600"
                    size={16}
                  />
                )}
                {r === "RIDER" ? <Users size={24} /> : <Car size={24} />}
                <span className="font-bold text-sm">
                  {r === "RIDER" ? "Rider" : "Driver"}
                </span>
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Input
                        className="pl-10"
                        placeholder="John Doe"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Input
                        className="pl-10"
                        type="email"
                        placeholder="m@example.com"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Input
                        className="pl-10"
                        type="password"
                        placeholder="******"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Input
                        className="pl-10"
                        type="password"
                        placeholder="******"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl mt-4"
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
