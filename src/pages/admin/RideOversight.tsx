// src/pages/admin/RideOversight.tsx
import { useState, useEffect } from "react";
// import { useGetAllRidesQuery } from "@/redux/admin/admin.api";
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

// Define the location interface to fix the TypeScript error
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
  const [filters, setFilters] = useState({});
  
  const { data: ridesResponse, isLoading, error } = useGetDriverRidesQuery(filters);
  
  // Extract data from response
  const rides = ridesResponse?.data || [];

  // Get unique drivers and riders for filter options
  const drivers = Array.from(
    new Set(rides?.map((ride: IRide) => ride.driver?.name).filter(Boolean))
  );
  const riders = Array.from(
    new Set(rides?.map((ride: IRide) => ride.rider?.name).filter(Boolean))
  );

  // যখন filter change হয়, তখন নতুন data fetch করতে
  useEffect(() => {
    // filters object থেকে query parameters বানান
    const queryParams = {
      status: statusFilter !== 'all' ? statusFilter : undefined,
      dateFrom: dateFilter?.from ? format(dateFilter.from, 'yyyy-MM-dd') : undefined,
      dateTo: dateFilter?.to ? format(dateFilter.to, 'yyyy-MM-dd') : undefined,
      rider: riderFilter !== 'all' ? riderFilter : undefined,
      driver: driverFilter !== 'all' ? driverFilter : undefined,
    };
    
    // undefined values remove করুন
    const cleanedParams = Object.fromEntries(
      Object.entries(queryParams).filter(([_, value]) => value !== undefined)
    );
    
    setFilters(cleanedParams);
  }, [statusFilter, dateFilter, riderFilter, driverFilter]);

  const filteredRides = rides?.filter((ride: IRide) => {
    // Handle location data properly - check if it's a string or object
    const pickupAddress = typeof ride.pickupLocation === 'string' 
      ? ride.pickupLocation 
      : (ride.pickupLocation as ILocation)?.address || '';
      
    const dropoffAddress = typeof ride.dropoffLocation === 'string'
      ? ride.dropoffLocation
      : (ride.dropoffLocation as ILocation)?.address || '';

    // Search filter
    const matchesSearch =
      searchTerm === "" ||
      ride.rider?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ride.driver?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pickupAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dropoffAddress.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  const getStatusVariant = (status: RideStatus) => {
    switch (status) {
      case "completed":
        return "default";
      case "active":
        return "secondary";
      case "cancelled":
        return "destructive";
      case "pending":
        return "outline";
      default:
        return "secondary";
    }
  };

  const exportToCSV = () => {
    // Simple CSV export implementation
    const headers = ["Rider", "Driver", "Status", "Fare", "Pickup", "Dropoff", "Date"];
    
    const csvData = filteredRides?.map((ride: IRide) => {
      // Handle location data properly
      const pickupAddress = typeof ride.pickupLocation === 'string' 
        ? ride.pickupLocation 
        : (ride.pickupLocation as ILocation)?.address || 'N/A';
        
      const dropoffAddress = typeof ride.dropoffLocation === 'string'
        ? ride.dropoffLocation
        : (ride.dropoffLocation as ILocation)?.address || 'N/A';
      
      return [
        ride.rider?.name || "N/A",
        ride.driver?.name || "N/A",
        ride.status,
        `$${ride.fare?.toFixed(2) || '0.00'}`,
        pickupAddress,
        dropoffAddress,
        ride.createdAt ? format(new Date(ride.createdAt), "PPpp") : "N/A",
      ];
    });

    const csvContent = [
      headers.join(","),
      ...csvData?.map(row => row.join(",")) || [],
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `rides-${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (error) {
    return (
      <div className="p-6 flex flex-col items-center justify-center h-96">
        <BarChart3 className="h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-xl font-semibold mb-2">Error Loading Rides</h2>
        <p className="text-muted-foreground mb-4">
          There was a problem loading the ride data. Please try again.
        </p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Ride Oversight</h1>
          <p className="text-muted-foreground">
            Monitor and manage all rides in the system
          </p>
        </div>
        <Button onClick={exportToCSV} className="gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>

      {/* Stats Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Rides</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rides?.length || 0}</div>
            <p className="text-xs text-muted-foreground">
              All time
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed Rides</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {rides?.filter((ride: IRide) => ride.status === "completed").length || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Successful trips
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Rides</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {rides?.filter((ride: IRide) => ride.status === "active").length || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Currently ongoing
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${rides?.reduce((total: number, ride: IRide) => total + (ride.fare || 0), 0).toFixed(2) || "0.00"}
            </div>
            <p className="text-xs text-muted-foreground">
              From completed rides
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>All Rides</CardTitle>
              <CardDescription>
                View and monitor all ride activities
              </CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search rides..."
                  className="pl-8 w-full md:w-[300px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="shrink-0 gap-1">
                    <Filter className="h-4 w-4" />
                    Filters
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px] p-4 space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Status</p>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Date Range</p>
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
                            <span>Pick a date range</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          initialFocus
                          mode="range"
                          defaultMonth={dateFilter?.from}
                          selected={dateFilter}
                          onSelect={setDateFilter}
                          numberOfMonths={2}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Driver</p>
                    <Select value={driverFilter} onValueChange={setDriverFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Filter by driver" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Drivers</SelectItem>
                        {drivers.map((driver) => (
                          <SelectItem key={driver} value={driver as string}>
                            {driver}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Rider</p>
                    <Select value={riderFilter} onValueChange={setRiderFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Filter by rider" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Riders</SelectItem>
                        {riders.map((rider) => (
                          <SelectItem key={rider} value={rider as string}>
                            {rider}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      setStatusFilter("all");
                      setDateFilter(undefined);
                      setDriverFilter("all");
                      setRiderFilter("all");
                    }}
                  >
                    Clear Filters
                  </Button>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rider & Driver</TableHead>
                  <TableHead>Pickup & Dropoff</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Fare</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRides?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      <div className="flex flex-col items-center justify-center py-8">
                        <Search className="h-12 w-12 text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">No rides found.</p>
                        <p className="text-sm text-muted-foreground">
                          Try adjusting your search or filter criteria.
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredRides?.map((ride: IRide) => {
                    // Handle location data properly for display
                    const pickupAddress = typeof ride.pickupLocation === 'string' 
                      ? ride.pickupLocation 
                      : (ride.pickupLocation as ILocation)?.address || 'N/A';
                      
                    const dropoffAddress = typeof ride.dropoffLocation === 'string'
                      ? ride.dropoffLocation
                      : (ride.dropoffLocation as ILocation)?.address || 'N/A';
                    
                    return (
                      <TableRow key={ride._id}>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            <div>
                              <p className="font-medium">{ride.rider?.name || "N/A"}</p>
                              <p className="text-xs text-muted-foreground">Rider</p>
                            </div>
                            <div>
                              <p className="font-medium">{ride.driver?.name || "N/A"}</p>
                              <p className="text-xs text-muted-foreground">Driver</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1 max-w-[200px]">
                            <div className="flex items-start gap-1">
                              <MapPin className="h-3 w-3 mt-0.5 text-green-500 flex-shrink-0" />
                              <p className="text-xs truncate">
                                {pickupAddress}
                              </p>
                            </div>
                            <div className="flex items-start gap-1">
                              <MapPin className="h-3 w-3 mt-0.5 text-red-500 flex-shrink-0" />
                              <p className="text-xs truncate">
                                {dropoffAddress}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {ride.createdAt ? (
                            <div className="flex flex-col">
                              <p className="text-sm">
                                {format(new Date(ride.createdAt), "PP")}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {format(new Date(ride.createdAt), "p")}
                              </p>
                            </div>
                          ) : (
                            "N/A"
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
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <MapPin className="h-4 w-4 mr-2" />
                                View Route
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}