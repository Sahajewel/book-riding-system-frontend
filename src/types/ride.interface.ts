// src/types/ride.interface.ts (frontend-friendly)
export const RideStatus = {
  REQUESTED: "requested",
  ACCEPTED: "accepted",
  REJECTED: "rejected",
  ONGOING: "ongoing",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
  PENDING: "pending",
} as const;

export type RideStatus = (typeof RideStatus)[keyof typeof RideStatus];

// export interface IRide {
//   _id: string;
//   rider: string;
//   driver?: string;
//   pickupLocation: string;
//   dropoffLocation: string;
//   status: RideStatus;
//   fare?: number;
//   requestedAt: string;
//   pickUpAt?: string;
//   inTransitAt?: string;
//   completedAt?: string;
// }
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
}

