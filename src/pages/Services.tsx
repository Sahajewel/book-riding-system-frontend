import { Link } from "react-router";
import { Check, Clock, Shield, Star, Users, Car, Bike, Truck, CreditCard, Headphones } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Services() {
  const services = [
    {
      id: 1,
      title: "Standard Rides",
      description: "Affordable everyday rides with professional drivers",
      icon: <Car className="h-10 w-10 text-blue-600" />,
      features: ["Up to 4 passengers", "24/7 availability", "Fixed pricing", "Professional drivers"],
      price: "₹150",
      priceNote: "for first 3 km",
      popular: false
    },
    {
      id: 2,
      title: "Premium Rides",
      description: "Luxury vehicles with premium amenities",
      icon: <Star className="h-10 w-10 text-amber-600" />,
      features: ["Luxury vehicles", "Premium amenities", "Top-rated drivers", "Priority pickup"],
      price: "₹300",
      priceNote: "for first 3 km",
      popular: true
    },
    {
      id: 3,
      title: "Ride Sharing",
      description: "Share your ride and save money with others going your way",
      icon: <Users className="h-10 w-10 text-green-600" />,
      features: ["Up to 60% cheaper", "Meet new people", "Eco-friendly option", "Fixed routes"],
      price: "₹90",
      priceNote: "for first 3 km",
      popular: false
    },
    {
      id: 4,
      title: "Bike Taxis",
      description: "Quick and affordable rides through city traffic",
      icon: <Bike className="h-10 w-10 text-purple-600" />,
      features: ["Beat traffic jams", "Very affordable", "Quick pickup", "Helmet provided"],
      price: "₹50",
      priceNote: "for first 3 km",
      popular: false
    },
    {
      id: 5,
      title: "Delivery Service",
      description: "Fast and reliable package delivery across the city",
      icon: <Truck className="h-10 w-10 text-red-600" />,
      features: ["Same-day delivery", "Package tracking", "Various size options", "Insurance available"],
      price: "₹99",
      priceNote: "starting price",
      popular: false
    },
    {
      id: 6,
      title: "Business Travel",
      description: "Corporate travel solutions with billing integration",
      icon: <CreditCard className="h-10 w-10 text-indigo-600" />,
      features: ["Monthly billing", "Receipt management", "Dedicated support", "Multiple employees"],
      price: "Custom",
      priceNote: "corporate pricing",
      popular: false
    }
  ];

  const features = [
    {
      title: "Safety First",
      description: "All drivers are verified with background checks and vehicles are regularly inspected.",
      icon: <Shield className="h-8 w-8 text-blue-600" />
    },
    {
      title: "24/7 Support",
      description: "Our customer support team is available around the clock to assist you.",
      icon: <Headphones className="h-8 w-8 text-green-600" />
    },
    {
      title: "Quick Arrival",
      description: "Average wait time of less than 5 minutes in urban areas during peak hours.",
      icon: <Clock className="h-8 w-8 text-amber-600" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
     <Navbar></Navbar>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 mt-5">Our Services</h1>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Discover the range of transportation solutions we offer to get you where you need to go
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/register" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Get Started
            </Link>
            <Link to="/contact" className="border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Transportation Solutions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Whether you need a quick ride across town or a premium experience for a special occasion, 
              we have the perfect service for your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div 
                key={service.id} 
                className={`bg-white rounded-xl shadow-md overflow-hidden border-2 ${service.popular ? 'border-blue-600 relative' : 'border-transparent'}`}
              >
                {service.popular && (
                  <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                    MOST POPULAR
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-blue-50 p-3 rounded-full">
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{service.title}</h3>
                      <p className="text-gray-600">{service.description}</p>
                    </div>
                  </div>
                  
                  <div className="my-6">
                    <div className="flex items-end gap-1">
                      <span className="text-3xl font-bold text-gray-800">{service.price}</span>
                      <span className="text-gray-600 mb-1">{service.priceNote}</span>
                    </div>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-green-500" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link 
                    to="/register" 
                    className={`block text-center py-3 rounded-lg font-medium transition-colors ${
                      service.popular 
                        ? 'bg-blue-600 text-white hover:bg-blue-700' 
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose RideX</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're committed to providing the best transportation experience with a focus on safety, 
              reliability, and customer satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-md mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    

      {/* Footer */}
      <Footer></Footer>
    </div>
  );
}