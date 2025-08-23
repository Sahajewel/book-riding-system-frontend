import Logo from "@/assets/icon/Logo"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { role } from "@/constants/role"
import { ModeToggle } from "@/provider/Mode.toggle"
// import { role } from "@/constants/role"
import {   authApi, useLogoutMutation, useUserInfoQuery,  } from "@/redux/features/auth/auth.api"
import { useAppDispatch } from "@/redux/hook"
import { Link } from "react-router"

// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  { href: "/", label: "Home", active: true, role: "PUBLIC" },
  { href: "/about", label: "About", role: "PUBLIC" },
  { href: "/features", label: "Features", role: "PUBLIC" },
  { href: "/contact", label: "Contact", role: "PUBLIC" },
  { href: "/faq", label: "Faq", role: "PUBLIC" },
  { href: "/admin", label: "Dashboard", role: role.admin},
  { href: "/driver", label: "Dashboard", role: role.driver },
  { href: "/rider", label: "Dashboard", role: role.rider },
]

export default function Navbar() {
   const {data} = useUserInfoQuery(undefined);
   console.log(data)
   const [logout] = useLogoutMutation();
     const dispatch = useAppDispatch();
   const handleLogout = async()=>{
  await logout(undefined).unwrap();
  dispatch(authApi.util.resetApiState());
   }
   
  return (
    <header className="border-b px-4  container mx-auto">
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden"
                variant="ghost"
                size="icon"
              >
                <svg
                  className="pointer-events-none"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12L20 12"
                    className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-36 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {navigationLinks.map((link, index) => (
                    <NavigationMenuItem key={index} className="w-full">
                      <NavigationMenuLink
                       asChild
                        className="py-1.5"
                       
                      >
                       <Link to={link.href}> {link.label}</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>
          {/* Main nav */}
          <div className="flex items-center gap-6">
           
              <Link to="/" className="text-primary hover:text-primary/90"><Logo /></Link>
            
            {/* Navigation menu */}
            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-2">
                {navigationLinks.map((link, index) => (
                <div key={index}>
                {link.role==="PUBLIC" &&  <NavigationMenuItem key={index}>
                    <NavigationMenuLink
                    asChild
                      className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                    >
                     <Link to={link.href}> {link.label}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>}
                  </div>
                ))}
                {navigationLinks.map((link, index) => (
                <div key={index}>
                {link.role===data?.data?.role &&  <NavigationMenuItem key={index}>
                    <NavigationMenuLink
                    asChild
                      className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                    >
                     <Link to={link.href}> {link.label}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>}
                  </div>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        {/* Right side */}
        <div className="flex items-center gap-2">
           <ModeToggle></ModeToggle>
         {data?.data?.email &&  <Button  variant="outline" size="sm" className="text-sm" onClick={handleLogout}>
           Logout
          </Button>}
         {!data?.data?.email &&  <Button asChild variant="ghost" size="sm" className="text-sm">
           <Link to="/login">Login</Link>
          </Button>}
        </div>
      </div>
    </header>
  )
}
