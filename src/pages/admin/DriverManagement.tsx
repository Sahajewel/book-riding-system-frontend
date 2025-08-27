// src/pages/admin/DriverManagement.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  useApproveDriverMutation,
  useGetDriversQuery,
  useSuspendDriverMutation,
} from "@/redux/admin/admin.api";
import type { IDriver } from "@/types/driver.interface";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  Filter,
  MoreHorizontal,
  UserCheck,
  UserX,
  Loader2,
  ShieldAlert,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function DriverManagement() {
  const { data: drivers, isLoading, error } = useGetDriversQuery(undefined);
  const [approveDriver, { isLoading: isApproving }] = useApproveDriverMutation();
  const [suspendDriver, { isLoading: isSuspending }] = useSuspendDriverMutation();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredDrivers = drivers?.data?.filter((driver: IDriver) => {
    const matchesSearch = driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.driverInfo.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || 
      driver.driverStatus === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleApprove = async (driverId: string) => {
    try {
      await approveDriver(driverId).unwrap();
    } catch (error) {
      console.error("Failed to approve driver:", error);
    }
  };

  const handleSuspend = async (driverId: string) => {
    try {
      await suspendDriver(driverId).unwrap();
    } catch (error) {
      console.error("Failed to suspend driver:", error);
    }
  };

  if (error) {
    return (
      <div className="p-6 flex flex-col items-center justify-center h-96">
        <ShieldAlert className="h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-xl font-semibold mb-2">Error Loading Drivers</h2>
        <p className="text-muted-foreground mb-4">
          There was a problem loading the driver data. Please try again.
        </p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Driver Management</h1>
          <p className="text-muted-foreground">
            Manage driver accounts and permissions
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Drivers</CardTitle>
              <CardDescription>
                View and manage all registered drivers
              </CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search drivers..."
                  className="pl-8 w-full md:w-[300px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="shrink-0">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                    All Statuses
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("active")}>
                    Active
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("suspended")}>
                    Suspended
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("pending")}>
                    Pending Approval
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Driver</TableHead>
                  <TableHead>License</TableHead>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDrivers?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      <div className="flex flex-col items-center justify-center py-8">
                        <Search className="h-12 w-12 text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">No drivers found.</p>
                        <p className="text-sm text-muted-foreground">
                          Try adjusting your search or filter.
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredDrivers?.map((driver: IDriver) => (
                    <TableRow key={driver._id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 flex items-center justify-center rounded-full bg-primary/10">
                            <span className="font-medium">
                              {driver.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium">{driver.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {driver.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono">
                        {driver.driverInfo.licenseNumber}
                      </TableCell>
                      <TableCell>
                        {driver.driverInfo.vehicleMake} {driver.driverInfo.vehicleModel}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            driver.driverStatus === "active"
                              ? "default"
                              : driver.driverStatus === "suspended"
                              ? "destructive"
                              : "secondary"
                          }
                          className="capitalize"
                        >
                          {driver.driverStatus === "active" && (
                            <CheckCircle className="w-3 h-3 mr-1" />
                          )}
                          {driver.driverStatus === "suspended" && (
                            <XCircle className="w-3 h-3 mr-1" />
                          )}
                          {driver.driverStatus}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {driver.driverStatus !== "active" && (
                            <Button
                              size="sm"
                              onClick={() => handleApprove(driver._id)}
                              disabled={isApproving}
                              className="gap-1"
                            >
                              {isApproving ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <UserCheck className="h-4 w-4" />
                              )}
                              Approve
                            </Button>
                          )}
                          {driver.driverStatus !== "suspended" && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleSuspend(driver._id)}
                              disabled={isSuspending}
                              className="gap-1"
                            >
                              {isSuspending ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <UserX className="h-4 w-4" />
                              )}
                              Suspend
                            </Button>
                          )}
                          {/* <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View details</DropdownMenuItem>
                              <DropdownMenuItem>View documents</DropdownMenuItem>
                              <DropdownMenuItem>Contact driver</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu> */}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}