import { Link } from "react-router";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Ride Anywhere, Anytime 🚖</h1>
          <p className="text-lg md:text-xl mb-6">
            Fast, reliable and affordable rides for everyone.
          </p>
          <div className="flex gap-3 justify-center">
            <Link to="/register" className="px-6 py-3 bg-white text-indigo-700 font-semibold rounded-lg shadow">
              Get Started
            </Link>
            <Link to="/features" className="px-6 py-3 border border-white/80 font-semibold rounded-lg">
              Explore Features
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 container mx-auto text-center px-4">
        <h2 className="text-3xl font-bold mb-8">How It Works</h2>
        <div className="grid md:grid-cols-3">
          {[
            { title: "Request a Ride", text: "Enter pickup and destination to get instant fare." },
            { title: "Meet Your Driver", text: "Verified drivers with live tracking." },
            { title: "Enjoy & Pay", text: "Cashless payment and quick receipts." },
          ].map((s, i) => (
            <div key={i} className="p-6  rounded-xl shadow border-1 border-gray-400 mr-2">
              <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="py-16">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-8">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "For Riders", desc: "Book instantly, track live, and rate your trip." },
              { title: "For Drivers", desc: "Flexible hours with transparent earnings." },
              { title: "For Admins", desc: "Powerful tools to manage users and rides." },
            ].map((service, i) => (
              <div key={i} className="p-6 rounded-xl shadow border-1 border-gray-400 mr-2">
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p>{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 container mx-auto text-center px-4">
        <h2 className="text-3xl font-bold mb-8">What Our Users Say</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl shadow border-1 border-gray-400 mr-2">
            <p>"The best ride service I’ve ever used! Drivers are always friendly."</p>
            <h4 className="mt-4 font-semibold">— Sarah, Rider</h4>
          </div>
          <div className="p-6  rounded-xl shadow border-1 border-gray-400 mr-2">
            <p>"Driving with RideX changed my life. Great income and flexibility!"</p>
            <h4 className="mt-4 font-semibold">— John, Driver</h4>
          </div>
        </div>
      </section>

      {/* CTA / Promo */}
      <section className="py-16   text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Ride?</h2>
        <Link to="/register" className="px-6 py-3 border-1 border-gray-400   font-semibold rounded-lg shadow">
          Join Now
        </Link>
      </section>
    </div>
  );
}
