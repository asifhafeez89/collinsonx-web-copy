import React from "react";
import useAuth from '../hooks/useAuth';

interface SysAuthProps {
  children: React.ReactNode;
}

const SysAuth = ({children}:SysAuthProps) => {
  const [isLoggedIn, userId, logout] = useAuth({
    onExpiredSession: () => {
      if (window) {
        window.location.href = '/'
      }
    },
  });
    return (
        <>
          {isLoggedIn && <div>
            {children}
          </div>}
        </>
    )
}

export default SysAuth;