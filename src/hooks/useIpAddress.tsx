import { useState, useEffect } from 'react';

export const useIpAddress = () => {
  const [ipAddress, setIpAddress] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchIpAddress = async () => {
      const url = 'http://ip-api.com/json';

      try {
        const response = await fetch(url, { signal: controller.signal });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setIpAddress(data?.query);
        setLoading(false);
      } catch (e) {
        if (!controller.signal.aborted) {
          console.log('Failed to fetch public IP:', e);
          setLoading(false);
        }
      }
    };

    fetchIpAddress();

    return () => {
      controller.abort();
    };
  }, []);

  return { ipAddress, loading };
};
