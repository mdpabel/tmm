import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export const useLoading = () => {
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    router.isReady && setIsLoading(false);
  }, [router.isReady]);

  return isLoading;
};
