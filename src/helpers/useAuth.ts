import { useState, useEffect } from 'react';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // This endpoint should return 200 if the HttpOnly cookie is valid
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URI}auth/status`, {
          credentials: 'include',
        });
        
        setIsAuthenticated(response.ok);
      } catch (error) {
          console.error('Error checking authentication status:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  return { isAuthenticated, isLoading };
}