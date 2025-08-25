// Example usage in your active ride component
import React, { useState, useEffect } from 'react';
import EmergencySOS from './EmergencySosButton';


const ActiveRide: React.FC = () => {
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isRideActive, setIsRideActive] = useState(true);

  // Simulate ride activity and location updates
  useEffect(() => {
    const rideTimer = setTimeout(() => {
      setIsRideActive(false); // Ride completes after 5 minutes
    }, 300000); // 5 minutes

    return () => clearTimeout(rideTimer);
  }, []);

  // Get user's location periodically during the ride
  useEffect(() => {
    if (!isRideActive) return;

    const locationInterval = setInterval(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setCurrentLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (error) => {
            console.error('Error getting location:', error);
          }
        );
      }
    }, 30000); // Update every 30 seconds

    return () => clearInterval(locationInterval);
  }, [isRideActive]);

  return (
    <div className="p-4">
      <h1>Active Ride</h1>
      <p>Ride in progress...</p>
      
      {/* Emergency SOS Button - only visible during active ride */}
      <EmergencySOS isActive={isRideActive} currentLocation={currentLocation} />
    </div>
  );
};

export default ActiveRide;