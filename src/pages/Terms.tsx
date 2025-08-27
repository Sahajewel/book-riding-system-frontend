import { useEffect } from "react";

export default function Terms() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center mt-10">Terms & Conditions</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-12">
          Effective Date: March 01, 2025
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
            <p>
              By accessing or using RideX, you agree to comply with and be bound by
              these Terms & Conditions. If you do not agree, please discontinue use
              of our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">2. Services</h2>
            <p>
              RideX provides ride-booking and related services. We reserve the right
              to modify, suspend, or discontinue any aspect of our services at any
              time without prior notice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">3. User Responsibilities</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>You must be at least 18 years old to use RideX.</li>
              <li>You agree to provide accurate and up-to-date information.</li>
              <li>You are responsible for maintaining the confidentiality of your account.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">4. Payments</h2>
            <p>
              All rides booked through RideX must be paid in accordance with our
              pricing and payment policies. Failure to complete payment may result
              in suspension of your account.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">5. Prohibited Conduct</h2>
            <p>Users may not:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Use RideX for unlawful purposes.</li>
              <li>Harass, threaten, or harm drivers, passengers, or staff.</li>
              <li>Attempt to disrupt the platform or compromise security.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">6. Limitation of Liability</h2>
            <p>
              RideX is not responsible for damages, losses, or liabilities arising
              from use of the platform, including ride delays, accidents, or
              third-party actions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">7. Termination</h2>
            <p>
              We may suspend or terminate your access to RideX at any time for
              violation of these Terms & Conditions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">8. Governing Law</h2>
            <p>
              These Terms & Conditions are governed by and construed under the laws
              of your local jurisdiction.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">9. Changes to Terms</h2>
            <p>
              RideX reserves the right to update or modify these Terms & Conditions
              at any time. Updates will be effective immediately upon posting.
            </p>
          </section>

         
        </div>
      </div>
    </div>
  );
}
