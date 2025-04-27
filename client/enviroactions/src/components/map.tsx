import React, { useEffect, useRef } from 'react';

declare global {
    interface Window {
        initMap: () => void;
    }
  }



interface GoogleMapProps {
  center: { lat: number; lng: number };
  zoom: number;
  mapTypeId?: google.maps.MapTypeId | string;
  markers?: { position: { lat: number; lng: number }; title?: string }[];
}

const GoogleMap: React.FC<GoogleMapProps> = ({ center, zoom, mapTypeId = 'roadmap', markers }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    const loadMap = () => {
      if (mapRef.current && window.google && window.google.maps) {
        mapInstance.current = new window.google.maps.Map(mapRef.current, {
          center: center,
          zoom: zoom,
          mapTypeId: mapTypeId as google.maps.MapTypeId,
        });

        if (markers) {
          markers.forEach(marker => {
            new window.google.maps.Marker({
              position: marker.position,
              map: mapInstance.current,
              title: marker.title,
            });
          });
        }
      }
    };

    // Check if the Google Maps API is already loaded
    if (!window.google || !window.google.maps) {
      // Create a script tag to load the API
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyChjODftywEX8bMWLCcoxmelouLHd2AcrY&callback=initMap`;
      script.async = true;
      script.defer = true;
      window.initMap = loadMap; // Set the callback function globally
      document.head.appendChild(script);

      script.onerror = () => {
        console.error('Failed to load Google Maps API.');
      };
    } else {
      loadMap(); // API already loaded
    }

    // Cleanup function (optional, but good practice)
    return () => {
      // Any cleanup logic if needed
    };
  }, [center, zoom, mapTypeId, markers]);

  return (
    <div ref={mapRef} style={{ height: '400px', width: '100%' }} id="google-map-container" />
  );
};

export default GoogleMap;