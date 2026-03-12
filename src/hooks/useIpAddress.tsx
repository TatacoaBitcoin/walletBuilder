import { useState, useEffect } from 'react';

export const useIpAddress = () => {
  const [ipAddress, setIpAddress] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true; // Flag to prevent state update on unmounted component

    const fetchIpAddress = async () => {
      // API endpoint for fetching public IP
      const url = 'http://ip-api.com/json';

      try {
        const response = await fetch(url);
        console.log('response', response);

        // Check for HTTP errors (e.g., 404, 500)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('data', data);

        // Check if component is still mounted before setting state
        if (isMounted) {
          setIpAddress(data?.query); // The API returns the IP in the 'ip' field
          setLoading(false);
        }
      } catch (e) {
        console.log('Failed to fetch public IP:', e);
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchIpAddress();

    // Cleanup function: Set isMounted to false when component unmounts
    return () => {
      isMounted = false;
    };
  }, []); // Empty dependency array means this runs only once on mount

  return { ipAddress, loading };
};
