

export interface IRider {
  _id: string;
  name: string;
  email: string;
  role: "RIDER";
  isBlocked?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
