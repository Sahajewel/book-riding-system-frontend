import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
// ✅ Corrected import
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router"
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import { useRegisterMutation } from "@/redux/features/auth/auth.api"
import { toast } from "sonner"
import Password from "@/components/Password"



 
const registerSchema = z.object({
  username: z.string().min(2, {error: "User Name is too small"}).max(50),
  email: z.email(),
  password: z.string().min(6,{error: "Password is too small"}),
  confirmPassword: z.string().min(6, {error:"Password does not match"}),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

export function RegisterForm({ className, ...props }: React.ComponentProps<"div">) {
  const [register] = useRegisterMutation();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    }
  })

  const onSubmit = async(data:z.infer<typeof registerSchema>) => {
    const userInfo = {
      name: data.username,
      email: data.email,
      password: data.password
    };
    try {
      const result = await register(userInfo).unwrap();
      console.log(result);
      toast.success("User successfully created")
      navigate("/")
    } catch (error) {
      console.log(error)
    }
    console.log("Submitted data:", data)
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Register to your account</CardTitle>
          <CardDescription>
            Enter your credentials below to register your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input autoComplete="username" placeholder="Type your name" type="text" {...field} />
                    </FormControl>
                    <FormDescription className="sr-only">This is your public display name.</FormDescription>
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
                      <Input type="email" placeholder="m@example.com" {...field} />
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
                      {/* <Password {...field}></Password>
                       */}
                       <Password {...field}></Password>
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
                    <FormLabel>confirm Password</FormLabel>
                    <FormControl>
                     <Password {...field}></Password>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Register
                </Button>
                <Button type="button" variant="outline" className="w-full">
                  Register with Google
                </Button>
              </div>

              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link to="/login" className="underline">
                  Login
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
