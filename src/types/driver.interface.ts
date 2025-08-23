



export interface IDriverVehicleInfo {
  vehicleNumber: string;
  vehicleType: string;
  isApproved: boolean;
  isAvailable: boolean;
  licenseNumber: string;
}

export interface IDriver {
  _id: string;
  name: string;
  email: string;
  role: "DRIVER";
  isVerified?: boolean;
  driverInfo: IDriverVehicleInfo;
  totalEarnings: number;
  driverStatus?: "pending" | "approved" | "suspended";
}
