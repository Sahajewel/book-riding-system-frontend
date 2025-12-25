// src/pages/admin/RideOversight.tsx
import { useState, useEffect } from "react";
import type { IRide, RideStatus } from "@/types/ride.interface";
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
import { Button } from "@/components/ui/button";
import {
  Search,
  Filter,
  MoreHorizontal,
  Calendar,
  Download,
  Eye,
  MapPin,
  ChevronDown,
  BarChart3,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useGetDriverRidesQuery } from "@/redux/features/driver/driver.api";

// Location type definition
interface ILocation {
  address: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export default function RideOversight() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<DateRange | undefined>();
  const [driverFilter, setDriverFilter] = useState<string>("all");
  const [riderFilter, setRiderFilter] = useState<string>("all");

  // Backend query filters
  const [queryFilters, setQueryFilters] = useState<Record<string, any>>({});

  const {
    data: ridesResponse,
    isLoading,
    isFetching,
    error,
  } = useGetDriverRidesQuery(queryFilters, {
    refetchOnMountOrArgChange: true,
  });

  const rides = ridesResponse?.data || [];

  // Get unique drivers & riders for dropdown (client-side only)
  const uniqueDrivers = Array.from(
    new Set(rides.map((ride: IRide) => ride.driver?.name).filter(Boolean))
  );
  const uniqueRiders = Array.from(
    new Set(rides.map((ride: IRide) => ride.rider?.name).filter(Boolean))
  );

  // Update backend filters when any filter changes
  useEffect(() => {
    const params: Record<string, any> = {};

    if (statusFilter !== "all") params.status = statusFilter;
    if (dateFilter?.from)
      params.dateFrom = format(dateFilter.from, "yyyy-MM-dd");
    if (dateFilter?.to) params.dateTo = format(dateFilter.to, "yyyy-MM-dd");
    if (driverFilter !== "all") params.driver = driverFilter;
    if (riderFilter !== "all") params.rider = riderFilter;

    setQueryFilters(params);
  }, [statusFilter, dateFilter, driverFilter, riderFilter]);

  // Client-side search filtering
  const filteredRides = rides.filter((ride: IRide) => {
    if (!searchTerm) return true;

    const term = searchTerm.toLowerCase();

    const pickup =
      typeof ride.pickupLocation === "string"
        ? ride.pickupLocation
        : (ride.pickupLocation as ILocation)?.address || "";

    const dropoff =
      typeof ride.dropoffLocation === "string"
        ? ride.dropoffLocation
        : (ride.dropoffLocation as ILocation)?.address || "";

    return (
      ride.rider?.name?.toLowerCase().includes(term) ||
      ride.driver?.name?.toLowerCase().includes(term) ||
      pickup.toLowerCase().includes(term) ||
      dropoff.toLowerCase().includes(term)
    );
  });

  const getStatusVariant = (status: RideStatus) => {
    const variants: Record<RideStatus, string> = {
      completed: "default",
      active: "secondary",
      cancelled: "destructive",
      pending: "outline",
    };
    return variants[status] || "secondary";
  };

  const exportToCSV = () => {
    const headers = [
      "Rider",
      "Driver",
      "Status",
      "Fare",
      "Pickup",
      "Dropoff",
      "Date",
    ];

    const csvRows = filteredRides.map((ride: IRide) => {
      const pickup =
        typeof ride.pickupLocation === "string"
          ? ride.pickupLocation
          : (ride.pickupLocation as ILocation)?.address || "N/A";

      const dropoff =
        typeof ride.dropoffLocation === "string"
          ? ride.dropoffLocation
          : (ride.dropoffLocation as ILocation)?.address || "N/A";

      return [
        `"${ride.rider?.name || "N/A"}"`,
        `"${ride.driver?.name || "N/A"}"`,
        ride.status,
        `$${ride.fare?.toFixed(2) || "0.00"}`,
        `"${pickup}"`,
        `"${dropoff}"`,
        ride.createdAt ? format(new Date(ride.createdAt), "PPpp") : "N/A",
      ].join(",");
    });

    const csvContent = [headers.join(","), ...csvRows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `rides-export-${format(new Date(), "yyyy-MM-dd")}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center p-6">
        <BarChart3 className="h-16 w-16 text-red-500 mb-6" />
        <h2 className="text-2xl font-bold mb-3">Failed to load rides</h2>
        <p className="text-muted-foreground mb-6 max-w-md">
          There was an error fetching the ride data. Please check your
          connection or try again later.
        </p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Ride Oversight</h1>
          <p className="text-muted-foreground mt-1">
            Monitor, filter and manage all ride activities
          </p>
        </div>
        <Button onClick={exportToCSV} variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </div>

      {/* Stats Cards */}
      {isLoading || isFetching ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <Skeleton className="h-4 w-28" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-10 w-36 mb-2" />
                <Skeleton className="h-4 w-40" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Rides"
            value={rides.length}
            subtitle="All time"
          />
          <StatCard
            title="Completed"
            value={rides.filter((r) => r.status === "completed").length}
            subtitle="Successful trips"
          />
          <StatCard
            title="Active Now"
            value={rides.filter((r) => r.status === "active").length}
            subtitle="Ongoing rides"
          />
          <StatCard
            title="Total Revenue"
            value={`$${rides
              .reduce((sum, r) => sum + (r.fare || 0), 0)
              .toFixed(2)}`}
            subtitle="From completed rides"
          />
        </div>
      )}

      {/* Main Table Card */}
      <Card className="overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>All Rides</CardTitle>
              <CardDescription>
                View and manage all ride records
              </CardDescription>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search  location..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  {/* <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Filters
                    <ChevronDown className="h-4 w-4" />
                  </Button> */}
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80 p-5 space-y-5">
                  {/* Status */}
                  <FilterSection title="Status">
                    <Select
                      value={statusFilter}
                      onValueChange={setStatusFilter}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All Statuses" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </FilterSection>

                  {/* Date Range */}
                  <FilterSection title="Date Range">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !dateFilter && "text-muted-foreground"
                          )}
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {dateFilter?.from ? (
                            dateFilter.to ? (
                              <>
                                {format(dateFilter.from, "LLL dd, y")} -{" "}
                                {format(dateFilter.to, "LLL dd, y")}
                              </>
                            ) : (
                              format(dateFilter.from, "LLL dd, y")
                            )
                          ) : (
                            <span>Pick date range</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="range"
                          selected={dateFilter}
                          onSelect={setDateFilter}
                          initialFocus
                          numberOfMonths={2}
                        />
                      </PopoverContent>
                    </Popover>
                  </FilterSection>

                  {/* Driver & Rider */}
                  <FilterSection title="Driver">
                    <Select
                      value={driverFilter}
                      onValueChange={setDriverFilter}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All Drivers" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Drivers</SelectItem>
                        {uniqueDrivers.map((name) => (
                          <SelectItem key={name} value={name as string}>
                            {name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FilterSection>

                  <FilterSection title="Rider">
                    <Select value={riderFilter} onValueChange={setRiderFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Riders" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Riders</SelectItem>
                        {uniqueRiders.map((name) => (
                          <SelectItem key={name} value={name as string}>
                            {name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FilterSection>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start px-0 text-muted-foreground hover:text-primary"
                    onClick={() => {
                      setStatusFilter("all");
                      setDateFilter(undefined);
                      setDriverFilter("all");
                      setRiderFilter("all");
                    }}
                  >
                    Clear all filters
                  </Button>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {isLoading || isFetching ? (
            <TableSkeleton />
          ) : filteredRides.length === 0 ? (
            <div className="py-16 text-center">
              <Search className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No rides found</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Try adjusting your search or filter settings
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[220px]">Rider & Driver</TableHead>
                  <TableHead>Locations</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Fare</TableHead>
                  {/* <TableHead className="w-[80px] text-right">Actions</TableHead> */}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRides.map((ride: IRide) => (
                  <TableRow key={ride._id}>
                    <TableCell>
                      <div className="space-y-2">
                        <div>
                          <p className="font-medium">
                            {ride.rider?.name || "—"}
                          </p>
                          <p className="text-xs text-muted-foreground">Rider</p>
                        </div>
                        <div>
                          <p className="font-medium">
                            {ride.driver?.name || "—"}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Driver
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="space-y-2 max-w-md">
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm truncate">
                            {typeof ride.pickupLocation === "string"
                              ? ride.pickupLocation
                              : (ride.pickupLocation as ILocation)?.address ||
                                "—"}
                          </span>
                        </div>
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm truncate">
                            {typeof ride.dropoffLocation === "string"
                              ? ride.dropoffLocation
                              : (ride.dropoffLocation as ILocation)?.address ||
                                "—"}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      {ride.createdAt ? (
                        <div>
                          <div className="font-medium">
                            {format(new Date(ride.createdAt), "MMM dd, yyyy")}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {format(new Date(ride.createdAt), "hh:mm a")}
                          </div>
                        </div>
                      ) : (
                        "—"
                      )}
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant={getStatusVariant(ride.status)}
                        className="capitalize"
                      >
                        {ride.status}
                      </Badge>
                    </TableCell>

                    <TableCell className="font-medium">
                      ${ride.fare?.toFixed(2) || "0.00"}
                    </TableCell>

                    {/* <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <MapPin className="mr-2 h-4 w-4" />
                            View on Map
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// Helper Components
function StatCard({
  title,
  value,
  subtitle,
}: {
  title: string;
  value: string | number;
  subtitle: string;
}) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
      </CardContent>
    </Card>
  );
}

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">{title}</p>
      {children}
    </div>
  );
}

function TableSkeleton() {
  return (
    <div className="divide-y">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="grid grid-cols-[220px_2fr_1fr_1fr_1fr_80px] gap-6 px-6 py-5"
        >
          <div className="space-y-3">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-5 w-40 mt-2" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-4 w-64" />
            <Skeleton className="h-4 w-56" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-6 w-24 rounded-full" />
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-8 w-8 rounded-full ml-auto" />
        </div>
      ))}
    </div>
  );
}
