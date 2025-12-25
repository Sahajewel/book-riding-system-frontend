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
  UserCheck,
  UserX,
  Loader2,
  ShieldAlert,
  CheckCircle2,
  AlertCircle,
  Clock,
  Mail,
  Car,
  ChevronRight,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function DriverManagement() {
  const { data: drivers, isLoading, error } = useGetDriversQuery(undefined);
  const [approveDriver, { isLoading: isApproving }] =
    useApproveDriverMutation();
  const [suspendDriver, { isLoading: isSuspending }] =
    useSuspendDriverMutation();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredDrivers = drivers?.data?.filter((driver: IDriver) => {
    const matchesSearch =
      driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.driverInfo.licenseNumber
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      driver.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || driver.driverStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const TableSkeleton = () => (
    <div className="rounded-md border border-muted">
      <Table>
        <TableHeader>
          <TableRow className="border-muted">
            <TableHead className="w-[250px]">
              <Skeleton className="h-4 w-20" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-4 w-20" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-4 w-24" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-4 w-16" />
            </TableHead>
            <TableHead className="text-right">
              <Skeleton className="h-4 w-20 ml-auto" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, i) => (
            <TableRow key={i} className="border-muted">
              <TableCell>
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-24" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-32" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-20 rounded-full" />
              </TableCell>
              <TableCell>
                <div className="flex justify-end gap-2">
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-8 w-20" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-500 min-h-screen bg-background text-foreground">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent uppercase italic">
            Driver <span className="text-primary">Management</span>
          </h1>
          <p className="text-muted-foreground flex items-center gap-2 font-medium">
            Control driver access and verification status{" "}
            <ChevronRight className="h-4 w-4 text-primary" />
          </p>
        </div>
      </div>

      <Card className="border border-muted shadow-2xl bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-1">
              <CardTitle className="text-xl font-black italic tracking-tight uppercase">
                Active <span className="text-primary">Drivers</span>
              </CardTitle>
              <CardDescription className="font-bold">
                A total of {filteredDrivers?.length || 0} drivers listed
              </CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  placeholder="Search by license or email..."
                  className="pl-9 w-full md:w-[350px] transition-all focus:ring-2 ring-primary/20 bg-background border-muted"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="gap-2 border-muted hover:bg-muted font-bold"
                  >
                    <Filter className="h-4 w-4" />
                    Filter:{" "}
                    {statusFilter.charAt(0).toUpperCase() +
                      statusFilter.slice(1)}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-48 bg-card border-muted"
                >
                  <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                    All Statuses
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-emerald-500 font-bold"
                    onClick={() => setStatusFilter("active")}
                  >
                    Active
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-destructive font-bold"
                    onClick={() => setStatusFilter("suspended")}
                  >
                    Suspended
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-blue-500 font-bold"
                    onClick={() => setStatusFilter("pending")}
                  >
                    Pending
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <TableSkeleton />
          ) : error ? (
            <div className="p-12 text-center border-2 border-dashed rounded-xl border-destructive/20 bg-destructive/5">
              <ShieldAlert className="h-12 w-12 text-destructive mx-auto mb-4" />
              <h2 className="text-xl font-bold text-destructive">
                Unable to load drivers
              </h2>
              <p className="text-muted-foreground mt-2 mb-6">
                আমাদের সার্ভারে সমস্যা হচ্ছে, দয়া করে আবার চেষ্টা করুন।
              </p>
              <Button
                onClick={() => window.location.reload()}
                variant="destructive"
              >
                Retry Connection
              </Button>
            </div>
          ) : (
            <div className="rounded-xl border border-muted shadow-sm overflow-hidden bg-card">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow className="border-muted hover:bg-transparent">
                    <TableHead className="font-black uppercase text-[11px] tracking-widest">
                      Driver Identity
                    </TableHead>
                    <TableHead className="font-black uppercase text-[11px] tracking-widest">
                      License Details
                    </TableHead>
                    <TableHead className="font-black uppercase text-[11px] tracking-widest">
                      Vehicle Info
                    </TableHead>
                    <TableHead className="font-black uppercase text-[11px] tracking-widest">
                      Status
                    </TableHead>
                    <TableHead className="text-right font-black uppercase text-[11px] tracking-widest">
                      Manage
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDrivers?.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="h-64 text-center border-none"
                      >
                        <div className="flex flex-col items-center justify-center">
                          <Search className="h-8 w-8 text-muted-foreground mb-4 opacity-20" />
                          <p className="text-lg font-medium">
                            No results match your search
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredDrivers?.map((driver: IDriver) => (
                      <TableRow
                        key={driver._id}
                        className="hover:bg-muted/30 transition-colors group border-muted"
                      >
                        <TableCell>
                          <div className="flex items-center gap-4">
                            <div className="h-11 w-11 flex items-center justify-center rounded-full bg-primary/10 text-primary font-black shadow-inner">
                              {driver.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex flex-col">
                              <span className="font-bold text-foreground italic">
                                {driver.name}
                              </span>
                              <span className="text-xs text-muted-foreground flex items-center gap-1 font-medium">
                                <Mail className="h-3 w-3" /> {driver.email}
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="font-mono text-[11px] bg-muted/20 text-foreground border-muted px-2 py-0.5"
                          >
                            {driver.driverInfo.licenseNumber}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 text-sm">
                            <Car className="h-4 w-4 text-primary opacity-70" />
                            <span className="font-medium text-foreground/80">
                              {driver.driverInfo.vehicleMake} •{" "}
                              {driver.driverInfo.vehicleModel}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {driver.driverStatus === "active" ? (
                            <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 border-emerald-500/20 gap-1 font-bold">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Active
                            </Badge>
                          ) : driver.driverStatus === "suspended" ? (
                            <Badge
                              variant="destructive"
                              className="gap-1 font-bold"
                            >
                              <AlertCircle className="w-3.5 h-3.5" /> Suspended
                            </Badge>
                          ) : (
                            <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 border-amber-500/20 gap-1 font-bold">
                              <Clock className="w-3.5 h-3.5" /> Pending
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            {driver.driverStatus !== "active" && (
                              <Button
                                size="sm"
                                className="bg-emerald-600 hover:bg-emerald-700 h-8 font-bold shadow-lg shadow-emerald-600/20 transition-all active:scale-95"
                                onClick={() => approveDriver(driver._id)}
                                disabled={isApproving}
                              >
                                {isApproving ? (
                                  <Loader2 className="h-3 w-3 animate-spin" />
                                ) : (
                                  <UserCheck className="h-3.5 w-3.5 mr-1" />
                                )}
                                Approve
                              </Button>
                            )}
                            {driver.driverStatus !== "suspended" && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-destructive/20 text-destructive hover:bg-destructive hover:text-white h-8 font-bold transition-all active:scale-95"
                                onClick={() => suspendDriver(driver._id)}
                                disabled={isSuspending}
                              >
                                {isSuspending ? (
                                  <Loader2 className="h-3 w-3 animate-spin" />
                                ) : (
                                  <UserX className="h-3.5 w-3.5 mr-1" />
                                )}
                                Suspend
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
