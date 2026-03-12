import { useState } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

import { Location } from '../types';

export const useLocation = () => {
  const [location, setLocation] = useState<Location>({
    latitude: 0,
    longitude: 0,
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const requestAndroidLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Access',
          message: 'This app needs location access',
          buttonNegative: 'Cancel',
          buttonPositive: 'Accept',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const getLocation = async () => {
    setIsLoading(true);
    setError(null);

    let hasPermission = true;

    // 1. Handle Android Permission Request
    if (Platform.OS === 'android') {
      hasPermission = await requestAndroidLocationPermission();
    }
    // For iOS, you usually configure permissions in Info.plist,
    // and Geolocation.getCurrentPosition handles the prompt.

    if (!hasPermission) {
      setError('Location permission denied.');
      setIsLoading(false);
      return;
    }

    // 2. Fetch Location
    Geolocation.getCurrentPosition(
      position => {
        // Success callback
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setIsLoading(false);
      },
      geoError => {
        // Error callback
        console.log('Geolocation Error:', geoError);
        // Map common error codes to a user-friendly message
        let errorMessage = 'Could not get location.';
        switch (geoError.code) {
          case 1:
            errorMessage = 'User has denied permission.';
            break;
          case 2:
            errorMessage = 'Location could not be determined.';
            break;
          case 3:
            errorMessage = 'Finding location is taking too long.';
            break;
        }
        setError(errorMessage);
        setIsLoading(false);
      },
      // Configuration options
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };

  return {
    location,
    error,
    isLoading,
    getLocation, // Allows manual retry/refresh
  };
};
