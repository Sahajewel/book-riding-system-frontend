import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";
import { useNavigate } from "react-router";

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-slate-50 px-4 text-center">
      <div className="p-6 bg-red-100 rounded-full mb-6">
        <ShieldAlert className="w-16 h-16 text-red-600" />
      </div>
      <h1 className="text-4xl font-black text-slate-900 mb-2">
        Access Denied!
      </h1>
      <p className="text-slate-500 max-w-md mb-8 font-medium">
        Sorry, you don't have the required permissions to access this dashboard.
        Please contact your administrator if you think this is a mistake.
      </p>
      <div className="flex gap-4">
        <Button
          onClick={() => navigate("/")}
          className="bg-indigo-600 hover:bg-indigo-700 rounded-xl font-bold text-white"
        >
          Return Home
        </Button>
      </div>
    </div>
  );
}
