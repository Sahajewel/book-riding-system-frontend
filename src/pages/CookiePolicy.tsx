import { Link } from "react-router";
import { ChevronRight, Shield, Cookie, Settings, Database } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b ">
      {/* Header */}
    <Navbar></Navbar>
     

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-6">
        <nav className="flex items-center text-sm ">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <ChevronRight size={16} className="mx-2" />
          <span >Cookie Policy</span>
        </nav>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className=" rounded-xl shadow-md overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8">
            <div className="flex items-center gap-4 mb-4">
              <Cookie size={32} />
              <h1 className="text-3xl font-bold text-white">Cookie Policy</h1>
            </div>
            <p className="text-blue-100">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          </div>

          <div className="p-8">
            <p className=" mb-6">
              At RideX, we use cookies and similar technologies to provide and improve our services. 
              This policy explains what cookies are, how we use them, and your choices regarding their use.
            </p>

            {/* What are Cookies Section */}
            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Database className="text-blue-600" size={24} />
                <h2 className="text-2xl font-semibold ">What Are Cookies?</h2>
              </div>
              <p className=" mb-4">
                Cookies are small text files that are stored on your device (computer, tablet, or mobile) 
                when you visit websites. They are widely used to make websites work more efficiently and 
                provide information to the website owners.
              </p>
              <p >
                Cookies can be "persistent" or "session" cookies. Persistent cookies remain on your device 
                after you close your browser until you delete them or they expire. Session cookies are 
                deleted automatically when you close your browser.
              </p>
            </section>

            {/* How We Use Cookies Section */}
            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Settings className="text-blue-600" size={24} />
                <h2 className="text-2xl font-semibold">How We Use Cookies</h2>
              </div>
              
              <div className=" rounded-lg p-6 mb-4">
                <h3 className="font-medium  mb-2">Essential Cookies</h3>
                <p className=" mb-4">
                  These cookies are necessary for the website to function and cannot be switched off. 
                  They are usually only set in response to actions made by you such as setting your 
                  privacy preferences, logging in, or filling in forms.
                </p>
                
                <h3 className="font-medium  mb-2">Analytics Cookies</h3>
                <p className=" mb-4">
                  These cookies allow us to count visits and traffic sources so we can measure and 
                  improve the performance of our site. They help us to know which pages are the most 
                  and least popular and see how visitors move around the site.
                </p>
                
                <h3 className="font-medium  mb-2">Functionality Cookies</h3>
                <p className=" mb-4">
                  These cookies enable the website to provide enhanced functionality and personalization. 
                  They may be set by us or by third-party providers whose services we have added to our pages.
                </p>
                
                <h3 className="font-medium  mb-2">Targeting Cookies</h3>
                <p>
                  These cookies may be set through our site by our advertising partners. They may be 
                  used by those companies to build a profile of your interests and show you relevant 
                  advertisements on other sites.
                </p>
              </div>
            </section>

            {/* Your Choices Section */}
            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="text-blue-600" size={24} />
                <h2 className="text-2xl font-semibold">Your Cookie Choices</h2>
              </div>
              <p className=" mb-4">
                You have the right to decide whether to accept or reject cookies. You can exercise your 
                cookie preferences by modifying your browser settings to accept or refuse cookies.
              </p>
              <p className=" mb-4">
                Most web browsers automatically accept cookies, but you can usually modify your browser 
                setting to decline cookies if you prefer. However, this may prevent you from taking full 
                advantage of the website.
              </p>
              <p>
                You can also manage your cookie preferences through our cookie consent banner, which 
                appears when you first visit our website.
              </p>
            </section>

            {/* Updates Section */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold  mb-4">Updates to This Policy</h2>
              <p>
                We may update this Cookie Policy from time to time to reflect changes in technology, 
                legislation, or our operations. We will post any changes on this page and, if the changes 
                are significant, we will provide a more prominent notice.
              </p>
            </section>

            {/* Contact Section */}
            <section className=" rounded-lg p-6">
              <h2 className="text-xl font-semibold  mb-4">Contact Us</h2>
              <p className=" mb-4">
                If you have any questions about our use of cookies or this Cookie Policy, please contact us:
              </p>
              <ul className=" list-disc pl-5">
                <li className="mb-2">By email: privacy@ridex.com</li>
                <li className="mb-2">Through our contact form: <Link to="/contact" className="text-blue-600 hover:underline">Contact Us</Link></li>
                <li>By mail: 123 Transportation Ave, City, Country</li>
              </ul>
            </section>
          </div>
        </div>
      </main>

      {/* Call to Action */}
      <section className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-center ">
          <h2 className="text-2xl font-bold mb-4">Need Help With Your Privacy Settings?</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Our support team is here to help you understand and manage your privacy preferences.
          </p>
          <Link 
            to="/contact" 
            className="inline-block  text-blue-600 font-medium py-3 px-6 rounded-lg  transition-colors"
          >
            Contact Support
          </Link>
        </div>
      </section>

      {/* Footer */}
     <Footer></Footer>
    </div>
  );
}