import { Link } from "react-router";
import { Facebook, Twitter, Instagram, Mail, MapPin, Phone } from "lucide-react";
import Logo from "@/assets/icon/Logo";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white mt-20">
      <div className="container mx-auto px-4 py-12 grid md:grid-cols-4 gap-8">
        {/* Company Description */}
        <div className="space-y-4">
          <h4 className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            <Logo></Logo>
          </h4>
          <p className="text-gray-300 leading-relaxed">
            Safe, reliable, and affordable rides for everyone. Experience the future of transportation with our premium service.
          </p>
          
          <div className="flex space-x-4 pt-2">
            <a 
              href="https://www.facebook.com/sahajewelkumar" 
              className="bg-gray-800 p-2 rounded-full hover:bg-blue-600 transition-colors"
              aria-label="Follow us on Facebook"
            >
              <Facebook size={18} />
            </a>
            <a 
              href="https://x.com/sahaJewelkumar" 
              className="bg-gray-800 p-2 rounded-full hover:bg-blue-400 transition-colors"
              aria-label="Follow us on Twitter"
            >
              <Twitter size={18} />
            </a>
            <a 
              href="https://www.instagram.com/sahajewelkumarbd/" 
              className="bg-gray-800 p-2 rounded-full hover:bg-pink-600 transition-colors"
              aria-label="Follow us on Instagram"
            >
              <Instagram size={18} />
            </a>
          </div>
        </div>

        {/* Company Links */}
        <div>
          <h5 className="font-semibold text-lg mb-4 pb-2 border-b border-gray-700 inline-block">Company</h5>
          <ul className="space-y-3">
            <li>
              <Link 
                to="/about" 
                className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"
              >
                <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                About
              </Link>
            </li>
            <li>
              <Link 
                to="/features" 
                className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"
              >
                <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                Features
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"
              >
                <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources Links */}
        <div>
          <h5 className="font-semibold text-lg mb-4 pb-2 border-b border-gray-700 inline-block">Resources</h5>
          <ul className="space-y-3">
            <li>
              <Link 
                to="/faq" 
                className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"
              >
                <div className="w-1 h-1 bg-purple-400 rounded-full"></div>
                FAQ
              </Link>
            </li>
            <li>
              <Link 
                to="/privacy-policy" 
                className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"
              >
                <div className="w-1 h-1 bg-purple-400 rounded-full"></div>
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link 
                to="/terms" 
                className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"
              >
                <div className="w-1 h-1 bg-purple-400 rounded-full"></div>
                Terms
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <h5 className="font-semibold text-lg mb-4 pb-2 border-b border-gray-700 inline-block">Contact Us</h5>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 text-gray-300">
              <MapPin size={16} className="mt-1 flex-shrink-0 text-blue-400" />
              <span>Tokyo, Japan</span>
            </li>
            <li className="flex items-center gap-3 text-gray-300">
              <Mail size={16} className="text-blue-400" />
              <span>jewelsaha072@gmail.com</span>
            </li>
            <li className="flex items-center gap-3 text-gray-300">
              <Phone size={16} className="text-blue-400" />
              <span>+81 80 5052 6822</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="border-t border-gray-800 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} RideX. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link to="/privacy-policy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}