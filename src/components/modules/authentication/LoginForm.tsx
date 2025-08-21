import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import {  Link, useNavigate } from "react-router"
import {  useForm, type FieldValues, type SubmitHandler } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useLoginMutation } from "@/redux/features/auth/auth.api"
// import config from "@/config"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
 
  const form = useForm();
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const onSubmit: SubmitHandler<FieldValues> = async(data)=>{
    console.log(data);
    try {
      const res= await login(data).unwrap();
      if(res.success){
        toast.success("Logged in successfully")
        navigate("/")
      }
      // navigate("/")
      console.log(res)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      console.log(error)
       if(error.data.message === "User is not verified"){
        toast.error("Your account is not verified");
        navigate("/verify",{state: data.email})
      }
      if(error.data.message ==="Password does not match"){
        toast.error("inavlid credentials")
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
                <Input type="password" placeholder="******" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-3">
          <Button type="submit" className="w-full cursor-pointer">
            Login
          </Button>
        </div>
      {/* <p className="text-center border-b border-gray-300 leading-[0.1em] mt-4 mb-4"> */}
  {/* <span className="bg-white px-2 text-black">or</span> */}
{/* </p> */}
<div>
{/* <Button onClick={()=>window.open(`${config.baseUrl}/auth/google`)} className="w-full cursor-pointer" variant="outline" type="button" >Continue with google</Button> */}
</div>
        <div className="text-center text-sm">
          Don&apos;t have an account? <Link to="/register"> Register </Link>
        </div>
      </form>
    </Form>
  
  )
}
