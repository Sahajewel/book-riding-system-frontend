

// Drop this file at: src/pages/PrivacyPolicy.tsx (or wherever your routes expect)
// TailwindCSS dark mode is supported via the `dark:` classes. No extra theme logic is required
// if your app already toggles `class="dark"` on <html> or <body>.

export default function PrivacyPolicy() {
  const lastUpdated = "2025-08-01"; // ← update as needed
  const appName = "RideX"; // ← reuse across the doc
  const companyName = "RideX Technologies"; // ← update to your legal entity
 // ← replace with your contact

  const sections = [
    { id: "intro", label: "Overview" },
    { id: "data-we-collect", label: "Information We Collect" },
    { id: "how-we-use", label: "How We Use Information" },
    { id: "sharing", label: "Sharing & Disclosure" },
    { id: "location", label: "Location & Background Location" },
    { id: "cookies", label: "Cookies & Similar Technologies" },
    { id: "permissions", label: "App & Device Permissions" },
    { id: "retention", label: "Data Retention" },
    { id: "security", label: "Security" },
    { id: "your-rights", label: "Your Rights & Choices" },
    { id: "children", label: "Children’s Privacy" },
    { id: "intl", label: "International Transfers" },
    { id: "third-parties", label: "Third‑Party Services" },
    { id: "changes", label: "Changes to this Policy" },
    { id: "contact", label: "Contact Us" },
  ];

  return (
    <main className="min-h-screen bg-white text-gray-900 dark:bg-neutral-950 dark:text-neutral-100">
      <div className="mx-auto w-full max-w-4xl px-6 py-12 lg:py-16">
        {/* Header */}
        <header className="mb-10 border-b border-gray-200 pb-6 dark:border-neutral-800">
          <p className="text-sm text-gray-500 dark:text-neutral-400">
            Last updated: <time dateTime={lastUpdated}>{lastUpdated}</time>
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            {appName} Privacy Policy
          </h1>
          <p className="mt-3 max-w-prose text-base text-gray-600 dark:text-neutral-300">
            This Privacy Policy explains how {companyName} ("we", "us", or "our") collects, uses, shares, and protects
            your information when you use {appName}’s websites, mobile apps, and related services (collectively, the
            "Services"). By using the Services, you agree to this Policy.
          </p>
        </header>

        {/* In‑page nav */}
        <nav aria-label="Table of contents" className="mb-10 overflow-x-auto">
          <ol className="flex flex-wrap gap-2 text-sm">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="inline-flex items-center rounded-full border border-gray-300 px-3 py-1.5 text-gray-700 transition hover:bg-gray-50 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-900"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="space-y-10">
          {/* Overview */}
          <section id="intro" className="scroll-mt-24">
            <h2 className="text-xl font-semibold">Overview</h2>
            <p className="mt-3 text-gray-700 dark:text-neutral-300">
              We process personal information to provide reliable ride‑hailing, delivery, and related features, including
              matching riders with drivers, navigation, payments, customer support, and safety. The types of information
              we collect and how we use it may vary depending on whether you are a rider, driver, or visitor.
            </p>
          </section>

          {/* Information We Collect */}
          <section id="data-we-collect" className="scroll-mt-24">
            <h2 className="text-xl font-semibold">Information We Collect</h2>
            <div className="mt-4 grid gap-6 rounded-2xl border border-gray-200 p-6 dark:border-neutral-800">
              <Item
                title="Account & Profile"
                bullets={[
                  "Name, email, phone number, profile photo, password (hashed)",
                  "Government ID, driver license, vehicle details (drivers)",
                ]}
              />
              <Item
                title="Ride & Usage Data"
                bullets={[
                  "Pickup & drop‑off addresses, route, trip timestamps, fare, feedback",
                  "App interactions, crash logs, device identifiers, and diagnostics",
                ]}
              />
              <Item
                title="Location Data"
                bullets={[
                  "Precise or approximate location from your device (with permission)",
                  "Background location to enable live tracking and trip continuity (drivers)",
                ]}
              />
              <Item
                title="Payment & Transaction"
                bullets={[
                  "Masked card details, transaction IDs, billing address, receipts",
                  "Processed securely by our payment partners; we do not store full card numbers",
                ]}
              />
              <Item
                title="Communications"
                bullets={[
                  "Support tickets, in‑app chats/calls (may be recorded where permitted)",
                  "Marketing preferences and survey responses",
                ]}
              />
            </div>
          </section>

          {/* How We Use */}
          <section id="how-we-use" className="scroll-mt-24">
            <h2 className="text-xl font-semibold">How We Use Information</h2>
            <ul className="mt-3 list-inside list-disc space-y-2 text-gray-700 dark:text-neutral-300">
              <li>Provide, personalize, and improve the Services (including matching, routing, and ETAs).</li>
              <li>Process payments, receipts, and fraud prevention.</li>
              <li>Safety features, identity verification, and trust & safety investigations.</li>
              <li>Customer support and service communications.</li>
              <li>Research, analytics, and product development.</li>
              <li>Legal obligations, dispute resolution, and enforcement of terms.</li>
            </ul>
          </section>

          {/* Sharing & Disclosure */}
          <section id="sharing" className="scroll-mt-24">
            <h2 className="text-xl font-semibold">Sharing & Disclosure</h2>
            <p className="mt-3 text-gray-700 dark:text-neutral-300">
              We share information as needed to operate the Services and as required by law.
            </p>
            <ul className="mt-3 list-inside list-disc space-y-2 text-gray-700 dark:text-neutral-300">
              <li><span className="font-medium">Between Riders & Drivers:</span> names, ratings, pickup/drop‑off details, and in‑trip contact channels.</li>
              <li><span className="font-medium">Service Providers:</span> cloud hosting, maps, payments, analytics, communications.</li>
              <li><span className="font-medium">Legal & Safety:</span> to law enforcement or others when necessary to protect rights, safety, and property.</li>
              <li><span className="font-medium">Business Transfers:</span> as part of a merger, acquisition, or asset sale with appropriate safeguards.</li>
            </ul>
          </section>

          {/* Location */}
          <section id="location" className="scroll-mt-24">
            <h2 className="text-xl font-semibold">Location & Background Location</h2>
            <p className="mt-3 text-gray-700 dark:text-neutral-300">
              {appName} uses location to enable pickups, navigation, accurate ETAs, and safety features. Drivers may
              enable background location to receive requests and provide live trip status even when the app is minimized.
              You can change permissions in your device settings.
            </p>
          </section>

          {/* Cookies */}
          <section id="cookies" className="scroll-mt-24">
            <h2 className="text-xl font-semibold">Cookies & Similar Technologies</h2>
            <p className="mt-3 text-gray-700 dark:text-neutral-300">
              We use cookies, SDKs, and web beacons to remember preferences, keep you signed in, measure performance,
              and deliver relevant content. You can manage cookies through your browser or device settings; restricting
              cookies may affect certain features.
            </p>
          </section>

          {/* Permissions */}
          <section id="permissions" className="scroll-mt-24">
            <h2 className="text-xl font-semibold">App & Device Permissions</h2>
            <ul className="mt-3 list-inside list-disc space-y-2 text-gray-700 dark:text-neutral-300">
              <li>Location (precise/background) — routing, matching, and safety.</li>
              <li>Notifications — ride updates, receipts, promotions (opt‑out anytime).</li>
              <li>Camera & Photos — profile photo, document capture (drivers).</li>
              <li>Microphone — in‑app calls or voice notes (optional, where available).</li>
              <li>Contacts — SOS/trusted contacts (optional, if you enable such feature).</li>
            </ul>
          </section>

          {/* Retention */}
          <section id="retention" className="scroll-mt-24">
            <h2 className="text-xl font-semibold">Data Retention</h2>
            <p className="mt-3 text-gray-700 dark:text-neutral-300">
              We keep information as long as needed to provide the Services, comply with legal obligations, resolve
              disputes, and enforce agreements. Retention periods vary by data type and applicable law.
            </p>
          </section>

          {/* Security */}
          <section id="security" className="scroll-mt-24">
            <h2 className="text-xl font-semibold">Security</h2>
            <p className="mt-3 text-gray-700 dark:text-neutral-300">
              We implement administrative, technical, and physical safeguards designed to protect your information.
              However, no method of transmission or storage is completely secure.
            </p>
          </section>

          {/* Rights */}
          <section id="your-rights" className="scroll-mt-24">
            <h2 className="text-xl font-semibold">Your Rights & Choices</h2>
            <ul className="mt-3 list-inside list-disc space-y-2 text-gray-700 dark:text-neutral-300">
              <li>Access, correct, or delete your information (subject to legal limits).</li>
              <li>Opt‑out of marketing communications.</li>
              <li>Control device permissions and cookie preferences.</li>
              <li>Where applicable, exercise rights under laws like GDPR/CCPA by contacting us.</li>
            </ul>
          </section>

          {/* Children */}
          <section id="children" className="scroll-mt-24">
            <h2 className="text-xl font-semibold">Children’s Privacy</h2>
            <p className="mt-3 text-gray-700 dark:text-neutral-300">
              {appName} is not directed to children under the age required by local law. We do not knowingly collect
              personal information from children. If you believe a child has provided data, please contact us for
              deletion.
            </p>
          </section>

          {/* International */}
          <section id="intl" className="scroll-mt-24">
            <h2 className="text-xl font-semibold">International Transfers</h2>
            <p className="mt-3 text-gray-700 dark:text-neutral-300">
              Your information may be processed and stored in countries other than your own. We use appropriate
              safeguards (such as standard contractual clauses) where required by law.
            </p>
          </section>

          {/* Third Parties */}
          <section id="third-parties" className="scroll-mt-24">
            <h2 className="text-xl font-semibold">Third‑Party Services</h2>
            <p className="mt-3 text-gray-700 dark:text-neutral-300">
              We rely on third‑party providers for maps, payments, communications, analytics, and cloud infrastructure.
              Their use of your information is governed by their own policies. Examples include map providers (e.g.,
              Google Maps), payment processors, and SMS/call masking services.
            </p>
          </section>

          {/* Changes */}
          <section id="changes" className="scroll-mt-24">
            <h2 className="text-xl font-semibold">Changes to this Policy</h2>
            <p className="mt-3 text-gray-700 dark:text-neutral-300">
              We may update this Policy from time to time. We will notify you of material changes through the app,
              email, or by updating the date at the top. Continued use of the Services means you accept the updated
              Policy.
            </p>
          </section>

          {/* Contact */}
         
        </div>

        {/* Footer actions */}
      
      </div>
    </main>
  );
}

function Item({ title, bullets }: { title: string; bullets: string[] }) {
  return (
    <div className="rounded-xl bg-gray-50 p-4 dark:bg-neutral-900">
      <h3 className="text-base font-semibold">{title}</h3>
      <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-700 dark:text-neutral-300">
        {bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
    </div>
  );
}
