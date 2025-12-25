/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  useBlockUserMutation,
  useDeleteUserMutation,
  useGetUsersQuery,
  useUnblockUserMutation,
} from "@/redux/admin/admin.api";
import type { IUser } from "@/types/user.interface";
import {
  Search,
  MoreVertical,
  User,
  Mail,
  Shield,
  UserCheck,
  UserX,
  Trash2,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

export default function UserManagement() {
  const {
    data: usersResponse,
    isLoading,
    refetch,
  } = useGetUsersQuery(undefined);
  const [blockUser] = useBlockUserMutation();
  const [unblockUser] = useUnblockUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "blocked"
  >("all");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<"name" | "email" | "role">("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  const users = usersResponse?.data?.data || [];

  const filteredUsers = users
    .filter((user: IUser) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && !user.isBlocked) ||
        (statusFilter === "blocked" && user.isBlocked);
      const matchesRole = roleFilter === "all" || user.role === roleFilter;
      return matchesSearch && matchesStatus && matchesRole;
    })
    .sort((a: IUser, b: IUser) => {
      let aValue = a[sortField].toLowerCase();
      let bValue = b[sortField].toLowerCase();
      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

  const handleSort = (field: "name" | "email" | "role") => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleBlockAction = async (user: IUser) => {
    try {
      if (user.isBlocked) {
        await unblockUser(user._id).unwrap();
        toast.success(`${user.name} has been unblocked`);
      } else {
        await blockUser(user._id).unwrap();
        toast.error(`${user.name} has been blocked`);
      }
      refetch();
    } catch (error) {
      toast.error("Operation failed");
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;
    try {
      await deleteUser(selectedUser._id).unwrap();
      toast.success("User permanently deleted");
      refetch();
      setDeleteDialogOpen(false);
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <RefreshCw className="h-10 w-10 animate-spin text-indigo-600 mb-4" />
        <p className="text-slate-500 font-medium">Fetching secure data...</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 bg-[#fafafa] dark:bg-slate-950 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            User Intelligence
          </h1>
          <p className="text-slate-500 mt-1">
            Audit and regulate system access levels.
          </p>
        </div>
        <Button
          onClick={() => refetch()}
          variant="outline"
          className="rounded-xl border-slate-200 gap-2 shadow-sm"
        >
          <RefreshCw className="h-4 w-4" /> Sync Data
        </Button>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "Total Fleet",
            val: users.length,
            icon: User,
            color: "indigo",
          },
          {
            title: "Operational",
            val: users.filter((u: any) => !u.isBlocked).length,
            icon: UserCheck,
            color: "emerald",
          },
          {
            title: "Restricted",
            val: users.filter((u: any) => u.isBlocked).length,
            icon: UserX,
            color: "rose",
          },
          {
            title: "System Admins",
            val: users.filter((u: any) => u.role === "ADMIN").length,
            icon: Shield,
            color: "blue",
          },
        ].map((stat, i) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={i}
          >
            <Card className="rounded-[1.5rem] border-none shadow-sm overflow-hidden">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-black mt-1">{stat.val}</p>
                </div>
                <div
                  className={`p-3 rounded-2xl bg-${stat.color}-50 dark:bg-slate-800 text-${stat.color}-600`}
                >
                  <stat.icon size={22} />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Control Bar */}
      <Card className="rounded-[1.5rem] border-slate-100 shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search by name or email..."
                className="pl-10 rounded-xl border-slate-100 bg-slate-50/50 focus-visible:ring-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 bg-indigo-500 p-1 rounded-xl border border-slate-100">
                <Filter size={14} className="ml-2 text-slate-400" />
                <select
                  className="bg-transparent text-sm font-semibold focus:outline-none p-1.5"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                >
                  <option className="text-indigo-500" value="all">
                    All Status
                  </option>
                  <option className="text-indigo-500" value="active">
                    Active
                  </option>
                  <option className="text-indigo-500" value="blocked">
                    Blocked
                  </option>
                </select>
              </div>
              <div className="flex items-center gap-2 bg-indigo-500 p-1 rounded-xl border border-slate-100">
                <Shield size={14} className="ml-2 text-slate-400" />
                <select
                  className="bg-transparent text-sm font-semibold focus:outline-none p-1.5"
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                >
                  <option className="text-indigo-400" value="all">
                    All Roles
                  </option>
                  <option className="text-indigo-400" value="ADMIN">
                    Admin
                  </option>
                  <option className="text-indigo-400" value="DRIVER">
                    Driver
                  </option>
                  <option className="text-indigo-500" value="RIDER">
                    Rider
                  </option>
                </select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Table */}
      <Card className="rounded-[2rem] border-slate-100 shadow-sm overflow-hidden bg-white">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 text-slate-500 text-xs font-bold uppercase tracking-wider border-b border-slate-100">
                  <th
                    className="px-6 py-5 cursor-pointer hover:text-indigo-600 transition-colors"
                    onClick={() => handleSort("name")}
                  >
                    <div className="flex items-center gap-2">
                      User{" "}
                      {sortField === "name" &&
                        (sortDirection === "asc" ? (
                          <ChevronUp size={14} />
                        ) : (
                          <ChevronDown size={14} />
                        ))}
                    </div>
                  </th>
                  <th
                    className="px-6 py-5 cursor-pointer hover:text-indigo-600 transition-colors"
                    onClick={() => handleSort("email")}
                  >
                    <div className="flex items-center gap-2">
                      Email{" "}
                      {sortField === "email" &&
                        (sortDirection === "asc" ? (
                          <ChevronUp size={14} />
                        ) : (
                          <ChevronDown size={14} />
                        ))}
                    </div>
                  </th>
                  <th className="px-6 py-5">Role</th>
                  <th className="px-6 py-5">Access Status</th>
                  <th className="px-6 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                <AnimatePresence>
                  {filteredUsers.map((user: IUser) => (
                    <motion.tr
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      key={user._id}
                      className="hover:bg-slate-50/80 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-md">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900">
                              {user.name}
                            </p>
                            <p className="text-[10px] text-slate-400 font-mono tracking-tighter uppercase">
                              ID: {user._id.slice(-8)}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-slate-600 text-sm font-medium">
                          <Mail className="h-3 w-3 text-slate-400" />
                          {user.email}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge
                          className={`rounded-lg px-2 py-0.5 shadow-none border-none capitalize ${
                            user.role === "ADMIN"
                              ? "bg-orange-100 text-orange-600"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {user.role.toLowerCase()}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div
                            className={`h-2 w-2 rounded-full ${
                              user.isBlocked
                                ? "bg-rose-500 animate-pulse"
                                : "bg-emerald-500"
                            }`}
                          />
                          <span
                            className={`text-xs font-bold ${
                              user.isBlocked
                                ? "text-rose-600"
                                : "text-emerald-600"
                            }`}
                          >
                            {user.isBlocked ? "Blocked" : "Active"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              className="h-9 w-9 p-0 rounded-xl hover:bg-slate-200"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="w-48 rounded-2xl p-2"
                          >
                            <DropdownMenuItem
                              className={`rounded-xl gap-2 font-medium ${
                                user.isBlocked
                                  ? "text-emerald-600"
                                  : "text-amber-600"
                              }`}
                              onClick={() => handleBlockAction(user)}
                            >
                              {user.isBlocked ? (
                                <UserCheck size={16} />
                              ) : (
                                <UserX size={16} />
                              )}
                              {user.isBlocked
                                ? "Restore Access"
                                : "Restrict User"}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-rose-600 rounded-xl gap-2 font-medium focus:bg-rose-50"
                              onClick={() => {
                                setSelectedUser(user);
                                setDeleteDialogOpen(true);
                              }}
                            >
                              <Trash2 size={16} /> Delete Forever
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="py-20 text-center">
              <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserX className="h-10 w-10 text-slate-300" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                No Intelligence Found
              </h3>
              <p className="text-slate-500 text-sm mt-1 max-w-xs mx-auto">
                We couldn't find any users matching your current security
                filters.
              </p>
              <Button
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                  setRoleFilter("all");
                }}
                variant="link"
                className="text-indigo-600 mt-2"
              >
                Clear all filters
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation UI - Modern Overlay */}
      {deleteDialogOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setDeleteDialogOpen(false)}
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative bg-white dark:bg-slate-900 w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Trash2 size={120} />
            </div>
            <div className="relative">
              <div className="h-14 w-14 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mb-6">
                <Shield size={28} />
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                Security Override
              </h2>
              <p className="text-slate-500 mt-3 leading-relaxed">
                You are about to permanently purge{" "}
                <span className="font-bold text-slate-900 dark:text-white">
                  {selectedUser?.name}
                </span>{" "}
                from the system. This action is irreversible.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <Button
                  variant="outline"
                  onClick={() => setDeleteDialogOpen(false)}
                  className="flex-1 rounded-2xl h-12 border-slate-200"
                >
                  Abort Mission
                </Button>
                <Button
                  onClick={handleDeleteUser}
                  className="flex-1 rounded-2xl h-12 bg-rose-600 hover:bg-rose-700 shadow-lg shadow-rose-200"
                >
                  Confirm Purge
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
