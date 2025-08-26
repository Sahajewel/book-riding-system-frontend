export default function About() {
  const stats = [
    { label: "Total Rides", value: "1.2M+" },
    { label: "Active Drivers", value: "15k+" },
    { label: "Cities Covered", value: "120+" },
    { label: "Avg. Rating", value: "4.8/5" },
  ];

  const team = [
    { name: "Saha Jewel", role: "CEO & Co-Founder" },
    { name: "Mahin Rahman", role: "CTO & Co-Founder" },
    { name: "Nadia Islam", role: "Head of Product" },
    { name: "Siam Khan", role: "Head of Ops" },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Intro */}
      <section className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4 mt-10">About RideX</h1>
        <p >
          We’re building the most reliable ride platform — safe, affordable, and available to all.
          Our mission is to connect people and places through technology.
        </p>
      </section>

      {/* Stats */}
      <section className="grid md:grid-cols-4 gap-6 mt-12">
        {stats.map((s) => (
          <div key={s.label} className="p-6  rounded-xl border text-center">
            <div className="text-3xl font-extrabold">{s.value}</div>
            <div className=" mt-1">{s.label}</div>
          </div>
        ))}
      </section>

      {/* Mission */}
      <section className="mt-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-2xl font-bold mb-3">Our Mission</h2>
          <p>
            To deliver safe and convenient transportation while empowering drivers with fair earnings.
            We focus on transparency, community, and sustainability.
          </p>
        </div>
        <div className="p-6 rounded-xl border">
          <ul className="space-y-2">
            <li>• Safety-first approach</li>
            <li>• Financial opportunities for drivers</li>
            <li>• Technology that scales and delights</li>
          </ul>
        </div>
      </section>

      {/* Team */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Our Team</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {team.map((t) => (
            <div key={t.name} className="p-6  rounded-xl border text-center">
              <div className="w-20 h-20 mx-auto rounded-full" />
              <h3 className="mt-4 font-semibold">{t.name}</h3>
              <p className=" text-sm">{t.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
