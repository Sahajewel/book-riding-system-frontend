import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import type { TRole } from "@/types";
import type { ComponentType } from "react";
import { Navigate, useLocation } from "react-router";
import { Skeleton } from "@/components/ui/skeleton";

export const withAuth = (Component: ComponentType, requiredRole?: TRole) => {
  return function AuthWrapper() {
    const { data, isLoading } = useUserInfoQuery(undefined);
    const location = useLocation();

    // ১. লোডিং স্টেট হ্যান্ডেল করা (খুবই জরুরি, নাহলে হুট করে লগইন পেজে চলে যাবে)
    if (isLoading) {
      return (
        <div className="h-screen w-full flex items-center justify-center p-10">
          <Skeleton className="h-[400px] w-full max-w-4xl rounded-2xl" />
        </div>
      );
    }

    // ২. লগইন না থাকলে লগইন পেজে পাঠান এবং বর্তমান লোকেশন সেভ রাখুন
    if (!data?.data?.email) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // ৩. রোল না মিললে সরাসরি Unauthorized পেজে পাঠান
    if (requiredRole && requiredRole !== data?.data?.role) {
      return <Navigate to="/unauthorized" replace />;
    }

    // ৪. সব ঠিক থাকলে কম্পোনেন্ট দেখান
    return <Component />;
  };
};
