import { useState } from "react";

const tabs = ["Rider", "Driver", "Admin"] as const;

export default function Features() {
  const [active, setActive] = useState<(typeof tabs)[number]>("Rider");

  const content: Record<(typeof tabs)[number], { title: string; points: string[] }> = {
    Rider: {
      title: "Rider Features",
      points: [
        "Instant ride request with fare estimate",
        "Live tracking & driver profile",
        "Ride history with filters",
        "Secure payment & receipts",
      ],
    },
    Driver: {
      title: "Driver Features",
      points: [
        "Online/Offline availability",
        "Accept/Reject requests",
        "Active ride status updates",
        "Earnings dashboard & history",
      ],
    },
    Admin: {
      title: "Admin Features",
      points: [
        "User management (approve/suspend/block)",
        "Ride oversight & analytics",
        "Search & filter tools",
        "Platform settings and controls",
      ],
    },
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-10 mt-10">Features</h1>

      {/* Tabs */}
      <div className="flex justify-center gap-2 mb-8">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActive(t)}
            className={`px-4 py-2 rounded-lg border ${
              active === t ? "bg-indigo-600 text-white" : "bg-indigo-500 text-white"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto p-6 rounded-xl border">
        <h2 className="text-2xl font-bold mb-4">{content[active].title}</h2>
        <ul className="space-y-2">
          {content[active].points.map((p) => (
            <li key={p}>• {p}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
