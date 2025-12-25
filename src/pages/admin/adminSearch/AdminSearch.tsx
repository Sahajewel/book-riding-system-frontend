/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/admin/UserManagement.tsx
import React, { useState } from "react";

import type { FilterParams } from "@/types/filter";
import {
  useBlockUserMutation,
  useDeleteUserMutation,
  useGetUsersQuery,
  useUnblockUserMutation,
} from "@/redux/admin/admin.api";
import type { IUser } from "@/types/user.interface";
import {
  MoreVertical,
  User,
  Mail,
  Shield,
  UserCheck,
  UserX,
  Trash2,
  RefreshCw,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AdminSearchFilter from "./AdminSearchFilter";
import { usersFilterConfig } from "@/config/filterConfig";
import { toast } from "sonner";

const AdminSearch: React.FC = () => {
  // RTK Query hooks
  const {
    data: usersResponse,
    isLoading,
    refetch,
  } = useGetUsersQuery(undefined);
  const [blockUser] = useBlockUserMutation();
  const [unblockUser] = useUnblockUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  // Filter state
  const [filterParams, setFilterParams] = useState<FilterParams>({
    search: "",
    sortBy: "createdAt",
    sortOrder: "desc",
    filters: {},
  });

  // UI state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  const users = usersResponse?.data?.data || [];

  // Apply filters from AdminSearchFilter
  const filteredUsers = users
    .filter((user: IUser) => {
      // Search filter
      const matchesSearch =
        !filterParams.search ||
        user.name.toLowerCase().includes(filterParams.search.toLowerCase()) ||
        user.email.toLowerCase().includes(filterParams.search.toLowerCase());

      // Role filter
      const roleFilter = filterParams.filters.role;
      const matchesRole = !roleFilter || user.role === roleFilter;

      // Status filter
      const statusFilter = filterParams.filters.status;
      const matchesStatus =
        !statusFilter ||
        (Array.isArray(statusFilter)
          ? statusFilter.includes(user.isBlocked ? "blocked" : "active")
          : statusFilter === (user.isBlocked ? "blocked" : "active"));

      // Date filter (example - you'll need to adjust based on your user model)
      const dateFilter = filterParams.filters.createdAt;
      let matchesDate = true;
      if (dateFilter && user.createdAt) {
        const userDate = new Date(user.createdAt);
        if (dateFilter.from)
          matchesDate = matchesDate && userDate >= new Date(dateFilter.from);
        if (dateFilter.to)
          matchesDate = matchesDate && userDate <= new Date(dateFilter.to);
      }

      return matchesSearch && matchesRole && matchesStatus && matchesDate;
    })
    .sort((a: IUser, b: IUser) => {
      // Apply sorting from filterParams
      const field = filterParams.sortBy;
      const direction = filterParams.sortOrder === "asc" ? 1 : -1;

      let aValue: any = a;
      let bValue: any = b;

      // Handle nested properties if needed
      if (field.includes(".")) {
        const parts = field.split(".");
        aValue = parts.reduce((obj, part) => obj && obj[part], a);
        bValue = parts.reduce((obj, part) => obj && obj[part], b);
      } else {
        aValue = a[field as keyof IUser];
        bValue = b[field as keyof IUser];
      }

      if (typeof aValue === "string") {
        return aValue.localeCompare(bValue) * direction;
      }

      return (aValue - bValue) * direction;
    });

  const handleFilterChange = (filters: FilterParams) => {
    setFilterParams(filters);
    // Here you would typically make an API call with the filter parameters
    console.log("Filters changed:", filters);
  };

  const handleBlockUser = async (userId: string) => {
    try {
      await blockUser(userId).unwrap();
      toast("User blocked successfully");
      refetch();
    } catch (error) {
      toast("Failed to block user");
    }
  };

  const handleUnblockUser = async (userId: string) => {
    try {
      await unblockUser(userId).unwrap();
      toast("User unblocked successfully");
      refetch();
    } catch (error) {
      toast("Failed to unblock user");
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;

    try {
      await deleteUser(selectedUser._id).unwrap();
      toast("User deleted successfully");
      refetch();
      setDeleteDialogOpen(false);
      setSelectedUser(null);
    } catch (error) {
      toast("Failed to delete user");
    }
  };

  const getRoleBadge = (role: string) => {
    const roleConfig = {
      ADMIN: { variant: "destructive" as const, text: "Admin" },
      RIDER: { variant: "secondary" as const, text: "Rider" },
      DRIVER: { variant: "secondary" as const, text: "Driver" },
      USER: { variant: "outline" as const, text: "User" },
    };

    const config = roleConfig[role as keyof typeof roleConfig] || {
      variant: "outline" as const,
      text: role,
    };

    return <Badge variant={config.variant}>{config.text}</Badge>;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Search & Filter</h1>
          <p className="text-muted-foreground mt-1">
            Manage all users and their permissions
          </p>
        </div>
        <Button onClick={() => refetch()} variant="outline" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <UserCheck className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {users.filter((u: IUser) => !u.isBlocked).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blocked Users</CardTitle>
            <UserX className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {users.filter((u: IUser) => u.isBlocked).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Admins</CardTitle>
            <Shield className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {users.filter((u: IUser) => u.role === "ADMIN").length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Admin Search Filter Component */}
      <AdminSearchFilter
        resourceType="users"
        onFilterChange={handleFilterChange}
        filterConfig={usersFilterConfig}
      />

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>
            {filteredUsers.length} user(s) found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="h-12 px-4 text-left align-middle font-medium">
                    User
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium">
                    Email
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium">
                    Role
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium">
                    Status
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium">
                    Created
                  </th>
                  <th className="h-12 px-4 text-right align-middle font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user: IUser) => (
                  <tr key={user._id} className="border-b hover:bg-muted/50">
                    <td className="p-4 align-middle">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                        </div>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground">
                            ID: {user._id.slice(-8)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 align-middle">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        {user.email}
                      </div>
                    </td>
                    <td className="p-4 align-middle">
                      {getRoleBadge(user.role)}
                    </td>
                    <td className="p-4 align-middle">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          user.isBlocked
                            ? "bg-red-100 text-red-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {user.isBlocked ? "Blocked" : "Active"}
                      </span>
                    </td>
                    <td className="p-4 align-middle">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td className="p-4 align-middle text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {user.isBlocked ? (
                            <DropdownMenuItem
                              onClick={() => handleUnblockUser(user._id)}
                            >
                              <UserCheck className="h-4 w-4 mr-2" />
                              Unblock User
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem
                              onClick={() => handleBlockUser(user._id)}
                            >
                              <UserX className="h-4 w-4 mr-2" />
                              Block User
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => {
                              setSelectedUser(user);
                              setDeleteDialogOpen(true);
                            }}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium">No users found</h3>
              <p className="text-muted-foreground mt-1">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      {deleteDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 animate-in fade-in-0"
            onClick={() => setDeleteDialogOpen(false)}
          />

          {/* Dialog Content */}
          <div className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg rounded-lg">
            {/* Header */}
            <div className="flex flex-col space-y-2">
              <h2 className="text-lg font-semibold">Are you sure?</h2>
              <p className="text-sm ">
                This action cannot be undone. This will permanently delete the
                user account for {selectedUser?.name} ({selectedUser?.email}).
              </p>
            </div>

            {/* Footer */}
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
              <button
                onClick={() => setDeleteDialogOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 mt-2 sm:mt-0"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteUser}
                className="px-4 py-2 bg-red-600 rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSearch;
