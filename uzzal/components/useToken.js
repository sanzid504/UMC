import { useState, useEffect } from 'react';

export default function useToken() {
  const [token, setToken] = useState(undefined);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setToken(localStorage.getItem('token'));
    }
  }, []);

  return token;
}
