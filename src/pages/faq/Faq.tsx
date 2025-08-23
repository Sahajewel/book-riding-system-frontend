import { useMemo, useState } from "react";

type QA = { q: string; a: string };

const DATA: QA[] = [
  { q: "How do I request a ride?", a: "Go to the Rider dashboard → Request Ride, enter locations and confirm." },
  { q: "How are fares calculated?", a: "Based on distance, time, surge and local pricing rules." },
  { q: "How do drivers get paid?", a: "Drivers receive weekly payouts and can view earnings in their dashboard." },
  { q: "Can I cancel a ride?", a: "Yes, you can cancel requested rides before driver accepts." },
  { q: "How do I become a driver?", a: "Register with 'Driver' role and submit vehicle & license details." },
];

export default function FAQ() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<string | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return DATA;
    return DATA.filter(
      (item) => item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-4xl font-bold mb-6 text-center">FAQs</h1>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search questions…"
        className="w-full border rounded-lg px-4 py-2 mb-6"
      />

      <div className="space-y-3">
        {results.map((item) => {
          const isOpen = open === item.q;
          return (
            <div key={item.q} className="border rounded-lg">
              <button
                onClick={() => setOpen(isOpen ? null : item.q)}
                className="w-full text-left px-4 py-3 font-semibold flex justify-between"
              >
                <span>{item.q}</span>
                <span>{isOpen ? "−" : "+"}</span>
              </button>
              {isOpen && <div className="px-4 pb-4 text-gray-500">{item.a}</div>}
            </div>
          );
        })}

        {results.length === 0 && (
          <div className="text-center  py-10">No results found.</div>
        )}
      </div>
    </div>
  );
}
