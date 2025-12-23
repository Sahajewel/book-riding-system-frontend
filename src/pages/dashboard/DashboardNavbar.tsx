import React from "react";
import { Bell, Search, User, LogOut, Settings, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // তুই shadcn ব্যবহার করলে এটা কাজ করবে

const DashboardNavbar = () => {
  return (
    <nav className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-40 px-6 flex items-center justify-between">
      {/* Search Bar - Dashboard style */}
      <div className="hidden md:flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100 w-96 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
        <Search className="h-4 w-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search for rides, drivers or receipts..."
          className="bg-transparent border-none text-sm font-medium focus:outline-none w-full text-slate-600"
        />
      </div>

      {/* Mobile Menu Icon */}
      <div className="md:hidden">
        <Menu className="h-6 w-6 text-slate-600" />
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative p-2.5 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors group">
          <Bell className="h-5 w-5 text-slate-500 group-hover:text-indigo-600" />
          <span className="absolute top-2 right-2.5 h-2 w-2 bg-rose-500 rounded-full border-2 border-white"></span>
        </button>

        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-3 p-1.5 pr-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-indigo-200 transition-all outline-none">
            <div className="h-9 w-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-200">
              <User size={20} />
            </div>
            <div className="hidden md:block text-left">
              <p className="text-[10px] font-black uppercase text-slate-400 leading-none mb-1">
                Rider
              </p>
              <p className="text-xs font-bold text-slate-700 leading-none">
                Tanvir Ahmed
              </p>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 mt-2 rounded-2xl p-2">
            <DropdownMenuLabel className="font-bold text-slate-500">
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="rounded-xl cursor-pointer gap-2 font-medium">
              <Settings size={16} /> Profile Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded-xl cursor-pointer gap-2 font-medium text-rose-600 focus:text-rose-600">
              <LogOut size={16} /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
