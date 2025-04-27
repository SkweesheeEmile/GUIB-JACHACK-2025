import React, { useState, useEffect, useRef, Dispatch } from 'react';

declare global {
    interface Window {
      initAutocomplete: () => void;
    }
  }

interface AddressAutocompleteProps {
  onPlaceSelect?: (place: google.maps.places.PlaceResult | null) => void;
  setAddress: Dispatch<React.SetStateAction<string>>; // To receive the setter function from the parent
  address: string; // To receive the current address value from the parent
  countryCodes?: string[]; // Optional: Array of ISO 3166-1 alpha-2 country codes
}

const AddressAutocomplete: React.FC<AddressAutocompleteProps> = ({ onPlaceSelect, countryCodes, setAddress, address }) => {
  const autocompleteInput = useRef<HTMLInputElement | null>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  useEffect(() => {
    let autocompleteInstance: google.maps.places.Autocomplete | null = null;

    const loadPlacesApi = () => {
      if (window.google && window.google.maps && window.google.maps.places) {
        autocompleteInstance = new window.google.maps.places.Autocomplete(
          autocompleteInput.current!,
          {
            componentRestrictions: countryCodes ? { country: countryCodes } : undefined,
            fields: ['address_components', 'geometry', 'name'],
          }
        );

        autocompleteInstance.addListener('place_changed', handlePlaceChanged);
        autocompleteRef.current = autocompleteInstance;
      } else {
        // Retry loading the API after a short delay
        setTimeout(loadPlacesApi, 200);
      }
    };

    // Check if the Google Maps API is already loaded
    if (!window.google || !window.google.maps || !window.google.maps.places) {
      // Create a script tag to load the API
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyChjODftywEX8bMWLCcoxmelouLHd2AcrY&libraries=places&callback=initAutocomplete`;
      script.async = true;
      script.defer = true;
      window.initAutocomplete = loadPlacesApi; // Set the callback function globally
      document.head.appendChild(script);

      // Handle potential API loading errors (simplified)
      script.onerror = () => {
        console.error('Failed to load Google Maps API.');
      };
    } else {
      loadPlacesApi(); // API already loaded
    }

    // Cleanup function to remove the event listener
    return () => {
      if (autocompleteInstance) {
        google.maps.event.clearInstanceListeners(autocompleteInstance);
      }
      delete (window as any).initAutocomplete; // Clean up the global callback
    };
  }, [countryCodes, onPlaceSelect]);

  const handlePlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      setAddress(autocompleteInput.current?.value || '');
      if (onPlaceSelect) {
        onPlaceSelect(place);
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
    // Optionally, you can clear the selected place if the user types again
    if (onPlaceSelect && autocompleteRef.current && autocompleteRef.current.getPlace()) {
      onPlaceSelect(null);
    }
  };

  return (
    <>
        <input
      ref={autocompleteInput}
      id="autocomplete-input"
      placeholder="Enter an address"
      type="text"
      value={address}
      onChange={handleChange}
      style={{ width: '80%' }}
    />
    </>
  );
};

export default AddressAutocomplete;