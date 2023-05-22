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

const AuthWrapper = ({ children }: AuthWrapperProps) => {
  const router = useRouter();
  const [isLoginPage, setIsLoginPage] = useState(false);
  const [isLoggedIn, userId, logout] = useAuth({
    onExpiredSession: () => {
      const isLogin = () => {
        if (typeof window !== 'undefined') {
          return window.location.pathname.slice(0, 11) === '/auth/login';
        }
        return false;
      };
      if (window && !isLogin()) {
        window.location.href = `/auth/login?redirectUrl=${
          window.location.pathname + window.location.search
        }`;
      }
    },
  });

  useEffect(() => {
    let isLoginPage = false;
    if (typeof window !== 'undefined') {
      isLoginPage = window.location.pathname.slice(0, 11) === '/auth/login';
    }
    setIsLoginPage(isLoginPage);
  }, []);

  if (isLoggedIn || isLoginPage) {
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
