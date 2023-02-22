import React from 'react';
import useAuth from '../hooks/useAuth';

interface LogoutProps {
  children: React.ReactNode;
}

const Logout = ({ children }: LogoutProps) => {
  const [isLoggedIn, userId, logout] = useAuth({});

  const handleLogout = async () => {
    if (typeof logout === 'function') {
      console.log('---- Logout await');
      await logout();
      console.log('---- Logout redirect');
      window.location.href = '/';
    }
  };

  return (
    <div
      onClick={handleLogout}
      style={{
        margin: 0,
        padding: 0,
        width: '100%',
        height: '100%',
        background: 'none',
      }}
    >
      {children}
    </div>
  );
};

export default Logout;
