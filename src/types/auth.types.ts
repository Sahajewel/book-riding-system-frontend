// src/types/auth.types.ts
export type TRole = "ADMIN" | "RIDER" | "DRIVER";

export interface ILoginPayload {
  email: string;
  password: string;
  role?: TRole; // optional (admin login এ কাজে লাগবে)
}

export interface IRegisterPayload {
  name: string;
  email: string;
  password: string;
  role: Extract<TRole, "RIDER" | "DRIVER">; // শুধু Rider বা Driver register করতে পারবে
}
