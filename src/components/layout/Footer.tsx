import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="border-t mt-16">
      <div className="container mx-auto px-4 py-10 grid md:grid-cols-4 gap-8">
        <div>
          <h4 className="font-bold text-lg">RideX</h4>
          <p className=" mt-2">
            Safe, reliable and affordable rides for everyone.
          </p>
        </div>

        <div>
          <h5 className="font-semibold mb-3">Company</h5>
          <ul className="space-y-2">
            <li><Link to="/about">About</Link></li>
            <li><Link to="/features">Features</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="font-semibold mb-3">Resources</h5>
          <ul className="space-y-2">
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="privacy-policy">Privacy Policy</Link></li>
            <li><Link to="terms">Terms</Link></li>
           
          </ul>
        </div>

        <div>
          <h5 className="font-semibold mb-3">Get the app</h5>
          <div className="space-y-2">
            <button className="w-full border px-4 py-2 rounded-lg">App Store</button>
            <button className="w-full border px-4 py-2 rounded-lg">Google Play</button>
          </div>
        </div>
      </div>

      <div className="border-t py-4 text-center text-sm">
        © {new Date().getFullYear()} RideX. All rights reserved.
      </div>
    </footer>
  );
}
