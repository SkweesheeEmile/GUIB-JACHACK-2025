import React from 'react';
import GoogleMap from './map.tsx';

const MapComponent = (props: {data: any}) => {
  const montrealCenter = { lat: 45.5017, lng: -73.5673 };
  const initialZoom = 12;
  const mapType: google.maps.MapTypeId = 'roadmap' as google.maps.MapTypeId; 
  const placesOfInterest: any = [];

  props.data.Locations.forEach((location: any) => {
    console.log(location);
    const lat = location.position.lat;
    const lng = location.position.lng;
    const title = location.title || 'Location';
    placesOfInterest.push({ position: { lat, lng }, title });
  });

  console.log(placesOfInterest);

  return (
    <div>
      <GoogleMap
        center={montrealCenter}
        zoom={initialZoom}
        mapTypeId={mapType}
        markers={placesOfInterest}
      />
    </div>
  );
};

export default MapComponent;