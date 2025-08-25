// src/types/ride.interface.ts
export const RideStatus = {
  PENDING: "pending",
  ACCEPTED: "accepted",
  ONGOING: "ongoing",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
  REJECTED: "rejected",
} as const;

export type RideStatus = (typeof RideStatus)[keyof typeof RideStatus];


// Driver is only allowed to update to these statuses
export type UpdatableRideStatus =
  | typeof RideStatus.ACCEPTED
  | typeof RideStatus.ONGOING
  | typeof RideStatus.COMPLETED
  | typeof RideStatus.CANCELLED;

export interface IRide {
  _id: string;
  rider: { _id: string; name: string };
  driver?: { _id: string; name: string };
  pickupLocation: string;
  dropoffLocation: string;
  status: RideStatus;
  fare?: number;
  requestedAt: string;
  pickUpAt?: string;
  inTransitAt?: string;
  completedAt?: string;
  createdAt: string
}
