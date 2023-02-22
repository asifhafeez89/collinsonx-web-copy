import React from 'react';
import useAuth from '../hooks/useAuth';

interface SysAuthProps {
  children: React.ReactNode;
}

const SysAuth = ({ children }: SysAuthProps) => {
  const [isLoggedIn, userId, logout] = useAuth({
    onExpiredSession: () => {
      if (window) {
        console.log('---- SysAuth redirect');
        window.location.href = '/';
      }
    },
  });

  if (isLoggedIn) {
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