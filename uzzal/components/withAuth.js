import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import useToken from './useToken';
import jwt_decode from 'jwt-decode';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const token = useToken();

    useEffect(() => {
      if (token === null) {
        router.replace('/login');
      }else {
        try {
          if(token && token.trim() !== ''){
            const decoded = jwt_decode(token);
            const currentTime = Date.now() / 1000;
  
            if (decoded.exp < currentTime) {
              localStorage.removeItem('token');
              router.replace('/login');
            }
          }
        } catch (error) {
          console.log('Error decoding token:', error);
          router.replace('/login');
        }
      }
    }, [token]);

    if (token === undefined) {
      return <div>Loading...</div>;
    }

    return token ? <WrappedComponent {...props} /> : null;
  };
};

export default withAuth;
