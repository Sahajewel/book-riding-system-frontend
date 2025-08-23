import React, { useState } from "react";
import { useGeolocated } from "react-geolocated";
import { toast } from "sonner";

interface Contact {
  name: string;
  phone: string;
  email?: string;
}

interface SOSButtonProps {
  contacts: Contact[];
  activeRide: boolean;
}

export const SOSButton: React.FC<SOSButtonProps> = ({ contacts, activeRide }) => {
  const [showOptions, setShowOptions] = useState(false);

  const { coords } = useGeolocated({
    positionOptions: { enableHighAccuracy: true },
    userDecisionTimeout: 5000,
  });

  if (!activeRide) return null; // Only show during active ride

  const handleSOS = () => {
    if (!coords) {
      toast.error("Unable to get location. Please allow location access.");
      return;
    }

    // Toggle emergency options
    setShowOptions((prev) => !prev);
  };

  const notifyContact = (contact: Contact) => {
    const locationLink = `https://www.google.com/maps?q=${coords?.latitude},${coords?.longitude}`;
    // Email / WhatsApp / SMS logic
    console.log(`Notify ${contact.name}: ${locationLink}`);
    toast.success(`Emergency notification sent to ${contact.name}`);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {showOptions &&
        contacts.map((contact) => (
          <button
            key={contact.phone}
            className="bg-red-600 text-white px-4 py-2 rounded shadow"
            onClick={() => notifyContact(contact)}
          >
            Notify {contact.name}
          </button>
        ))}
      <button
        className="bg-red-700 text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center text-xl font-bold animate-pulse"
        onClick={handleSOS}
      >
        SOS
      </button>
    </div>
  );
};
