import {
  Bell,
  Search,
  User,
  LogOut,
  Settings,
  Menu,
  Loader2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  authApi,
  useLogoutMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/hook";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router";

const DashboardNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // 🛰️ ডাইনামিক ইউজার ডাটা ফেচিং
  const { data: userInfo, isLoading } = useUserInfoQuery(undefined);
  const [logout] = useLogoutMutation();

  const user = userInfo?.data;

  // 🚪 লগআউট হ্যান্ডলার
  const handleLogout = async () => {
    try {
      await logout(undefined).unwrap();
      dispatch(authApi.util.resetApiState()); // ক্লিনআপ স্টেট
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <nav className="h-20 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-slate-100 dark:border-neutral-800 sticky top-0 z-40 px-6 flex items-center justify-between">
      {/* 🔍 Search Bar (Left) */}
      <div className="hidden md:flex items-center gap-3 bg-slate-50 dark:bg-neutral-800 px-4 py-2.5 rounded-2xl border border-slate-100 dark:border-neutral-700 w-96 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
        <Search className="h-4 w-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search rides or analytics..."
          className="bg-transparent border-none text-sm font-medium focus:outline-none w-full text-slate-600 dark:text-neutral-300"
        />
      </div>

      {/* Mobile Menu Icon */}
      <div className="md:hidden">
        <Menu className="h-6 w-6 text-slate-600" />
      </div>

      {/* 🔔 Right Side Actions */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative p-2.5 bg-slate-50 dark:bg-neutral-800 rounded-xl hover:bg-slate-100 dark:hover:bg-neutral-700 transition-colors group border border-slate-100 dark:border-neutral-700">
          <Bell className="h-5 w-5 text-slate-500 group-hover:text-indigo-600" />
          <span className="absolute top-2.5 right-2.5 h-2 w-2 bg-rose-500 rounded-full border-2 border-white dark:border-neutral-800"></span>
        </button>

        {/* 👤 User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-3 p-1.5 pr-4 bg-slate-50 dark:bg-neutral-800 rounded-2xl border border-slate-100 dark:border-neutral-700 hover:border-indigo-200 dark:hover:border-indigo-900 transition-all outline-none">
            {/* Avatar Logic */}
            <div className="h-9 w-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-indigo-200 dark:shadow-none">
              {isLoading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                user?.name?.charAt(0).toUpperCase() || <User size={20} />
              )}
            </div>

            <div className="hidden md:block text-left">
              <p className="text-[9px] font-black uppercase text-indigo-500 dark:text-indigo-400 leading-none mb-1 tracking-widest">
                {user?.role || "Guest"}
              </p>
              <p className="text-xs font-black text-slate-700 dark:text-white leading-none">
                {user?.name || "Loading..."}
              </p>
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-64 mt-2 rounded-[1.5rem] p-2 border-slate-100 dark:border-neutral-800 shadow-xl"
            align="end"
          >
            <DropdownMenuLabel className="px-4 py-3">
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest">
                Account Info
              </p>
              <p className="text-sm font-bold text-slate-700 dark:text-white truncate">
                {user?.email}
              </p>
            </DropdownMenuLabel>

            <DropdownMenuSeparator className="bg-slate-50 dark:bg-neutral-800" />

            <DropdownMenuItem asChild>
              <Link
                to="/settings"
                className="rounded-xl cursor-pointer flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-slate-600 dark:text-neutral-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600 transition-all"
              >
                <Settings size={18} className="text-slate-400" /> Profile
                Settings
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={handleLogout}
              className="rounded-xl cursor-pointer flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-all focus:bg-rose-50 focus:text-rose-600"
            >
              <LogOut size={18} /> Logout Session
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
