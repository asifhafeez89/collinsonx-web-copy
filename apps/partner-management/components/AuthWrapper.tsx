import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useAuth from '../hooks/useAuth';

interface AuthWrapperProps {
  children: React.ReactNode;
}

const port = process.env.APP_PORT || 3000;
const domain =
  process.env.NEXT_PUBLIC_SITE_DOMAIN_URL ||
  process.env.NEXT_PUBLIC_VERCEL_URL ||
  process.env.APP_URL ||
  `http://partner-local.test.lifestyle-x.io:${port}`;

const checkIsAllowed = (pathname: string) => {
  return pathname.slice(0, 5) === '/auth' || pathname.slice(0, 7) === '/signup';
};

const AuthWrapper = ({ children }: AuthWrapperProps) => {
  const router = useRouter();
  const [isPageAllowed, setIsPageAllowed] = useState(false);
  const [isLoggedIn, userId, logout] = useAuth({
    onExpiredSession: () => {
      const isAllowed = () => {
        if (typeof window !== 'undefined') {
          return checkIsAllowed(window.location.pathname);
        }
        return false;
      };
      if (window && !isAllowed()) {
        window.location.href = `/auth/login?redirectUrl=${
          window.location.pathname + window.location.search
        }`;
      }
    },
  });

  useEffect(() => {
    let allowed = false;
    if (typeof window !== 'undefined') {
      allowed = checkIsAllowed(window.location.pathname);
    }
    setIsPageAllowed(allowed);
  }, []);

  if (isLoggedIn || isPageAllowed) {
    return <>{children}</>;
  }

  return (
    <div
      style={{
        padding: 0,
        top: 0,
        left: 0,
        backgroundColor: '#112132',
        position: 'fixed',
        height: '100vh',
        width: '100vw',
      }}
    ></div>
  );
};

export default AuthWrapper;
