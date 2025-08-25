// src/components/EmergencySOS.tsx
import React, { useState, useEffect } from 'react';
import { AlertTriangle, Phone, MessageCircle, MapPin, X } from 'lucide-react';

interface EmergencyContact {
  name: string;
  phone: string;
  type: 'police' | 'contact' | 'emergency';
}

interface EmergencySOSProps {
  isActive: boolean;
  currentLocation?: { lat: number; lng: number };
}

const EmergencySOS: React.FC<EmergencySOSProps> = ({ isActive, currentLocation }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  // Pre-defined emergency contacts
  const emergencyContacts: EmergencyContact[] = [
    { name: 'Local Police', phone: '999', type: 'police' },
    { name: 'Emergency Services', phone: '112', type: 'emergency' },
    // Add user's saved contacts from settings
    ...contacts,
  ];

  // Get user's current location
  useEffect(() => {
    if (isActive && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
      );
    }
  }, [isActive]);

  // Load user's saved emergency contacts
  useEffect(() => {
    // In a real app, this would come from user settings/API
    const savedContacts = localStorage.getItem('emergencyContacts');
    if (savedContacts) {
      try {
        setContacts(JSON.parse(savedContacts));
      } catch (e) {
        console.error('Error parsing saved contacts:', e);
      }
    }
  }, []);

  const handleSOSClick = () => {
    setIsOpen(!isOpen);
  };

  const makeEmergencyCall = (phoneNumber: string) => {
    window.open(`tel:${phoneNumber}`, '_self');
  };

  const sendEmergencySMS = (contact: EmergencyContact) => {
    const message = `EMERGENCY! I need help! My current location: ${userLocation ? `https://maps.google.com/?q=${userLocation.lat},${userLocation.lng}` : 'Location unavailable'}`;
    window.open(`sms:${contact.phone}?body=${encodeURIComponent(message)}`, '_self');
  };

  const shareLocation = (contact: EmergencyContact) => {
    if (userLocation) {
      const message = `I'm sharing my live location: https://maps.google.com/?q=${userLocation.lat},${userLocation.lng}`;
      
      // Try WhatsApp if available, otherwise fall back to SMS
      if (navigator.userAgent.includes('WhatsApp')) {
        window.open(`https://wa.me/${contact.phone}?text=${encodeURIComponent(message)}`, '_blank');
      } else {
        window.open(`sms:${contact.phone}?body=${encodeURIComponent(message)}`, '_self');
      }
    }
  };

  const shareLiveLocation = () => {
    if (navigator.share && userLocation) {
      navigator.share({
        title: 'My Live Location',
        text: 'I need help! Here is my current location:',
        url: `https://maps.google.com/?q=${userLocation.lat},${userLocation.lng}`,
      }).catch(console.error);
    } else if (userLocation) {
      // Fallback for browsers that don't support Web Share API
      alert(`Share this URL: https://maps.google.com/?q=${userLocation.lat},${userLocation.lng}`);
    }
  };

  if (!isActive) return null;

  return (
    <>
      {/* Floating SOS Button */}
      <button
        onClick={handleSOSClick}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
        aria-label="Emergency SOS"
      >
        <AlertTriangle size={28} />
      </button>

      {/* Emergency Options Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-11/12 max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-red-600">Emergency Assistance</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-3">
              <div className="bg-red-50 p-4 rounded-lg mb-4">
                <p className="text-red-800 font-medium">
                  {userLocation 
                    ? `Your location: ${userLocation.lat.toFixed(4)}, ${userLocation.lng.toFixed(4)}`
                    : 'Getting your location...'
                  }
                </p>
              </div>

              {/* Emergency Services */}
              <h3 className="font-semibold text-gray-700 mb-2">Emergency Services:</h3>
              {emergencyContacts.filter(c => c.type !== 'contact').map((contact, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">{contact.name}</span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => makeEmergencyCall(contact.phone)}
                      className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700"
                      title={`Call ${contact.name}`}
                    >
                      <Phone size={18} />
                    </button>
                    <button
                      onClick={() => sendEmergencySMS(contact)}
                      className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
                      title={`Message ${contact.name}`}
                    >
                      <MessageCircle size={18} />
                    </button>
                  </div>
                </div>
              ))}

              {/* Personal Contacts */}
              {contacts.length > 0 && (
                <>
                  <h3 className="font-semibold text-gray-700 mb-2 mt-4">Your Emergency Contacts:</h3>
                  {contacts.map((contact, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">{contact.name}</span>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => makeEmergencyCall(contact.phone)}
                          className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700"
                          title={`Call ${contact.name}`}
                        >
                          <Phone size={18} />
                        </button>
                        <button
                          onClick={() => sendEmergencySMS(contact)}
                          className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
                          title={`Message ${contact.name}`}
                        >
                          <MessageCircle size={18} />
                        </button>
                        <button
                          onClick={() => shareLocation(contact)}
                          className="p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700"
                          title={`Share location with ${contact.name}`}
                        >
                          <MapPin size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </>
              )}

              {/* Share Location Button */}
              <button
                onClick={shareLiveLocation}
                className="w-full mt-4 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 flex items-center justify-center space-x-2"
              >
                <MapPin size={20} />
                <span>Share Live Location</span>
              </button>

              {/* Add Emergency Contact Button */}
              <button
                onClick={() => {
                  // This would navigate to settings in a real app
                  alert('Navigate to settings to add emergency contacts');
                }}
                className="w-full mt-2 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
              >
                + Add Emergency Contact
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EmergencySOS;