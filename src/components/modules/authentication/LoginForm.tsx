/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from "react-router"
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useLoginMutation } from "@/redux/features/auth/auth.api"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

// Define validation schema
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required")
})

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const [login, { isLoading }] = useLoginMutation()
  
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await login(data).unwrap()
      if (res.success) {
        toast.success("Logged in successfully")
        navigate("/")
      }
    } catch (error: any) {
      console.log(error)
      if (error.data?.message === "User is not verified") {
        toast.error("Your account is not verified")
        navigate("/verify", { state: data.email })
      } else if (error.data?.message === "Password does not match") {
        toast.error("Invalid credentials")
      } else {
        toast.error("Login failed. Please try again.")
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-col gap-6", className)}
        {...props}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to login to your account
          </p>
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input 
                  type="email" 
                  placeholder="m@example.com" 
                  {...field} 
                  className={form.formState.errors.email && "border-destructive"}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="******" 
                    {...field} 
                    className={form.formState.errors.password && "border-destructive pr-10"}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                    <span className="sr-only">
                      {showPassword ? "Hide password" : "Show password"}
                    </span>
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-3">
          <Button 
            type="submit" 
            className="w-full cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </div>
        
        <div className="text-center text-sm">
          Don&apos;t have an account? <Link to="/register" className="text-primary hover:underline">Register</Link>
        </div>
      </form>
    </Form>
  )
}