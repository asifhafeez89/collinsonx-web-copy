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
  return pathname.startsWith('/auth') || pathname.startsWith('/signup');
};
const SysAuth = ({ children }: AuthWrapperProps) => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [isLoggedIn, userId, logout] = useAuth({
    onExpiredSession: () => {
      if (window && !checkIsAllowed(window.location.pathname)) {
        window.location.href = `/auth/login/?redirectUrl=${
          window.location.pathname + window.location.search
        }`;
      }
    },
  });

  useEffect(() => {
    if (isLoggedIn || checkIsAllowed(router.pathname)) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [isLoggedIn]);

  if (show) {
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

export default SysAuth;
