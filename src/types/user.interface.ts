import type { TRole } from ".";

export interface IUser {
  _id: string; // frontend e string ID use korbo
  email: string;
  name: string;
  isBlocked?: boolean;
  role: TRole;
  driverStatus?: "pending" | "approved" | "suspended";
}
