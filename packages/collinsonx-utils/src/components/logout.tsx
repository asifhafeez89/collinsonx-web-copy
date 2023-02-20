import React from "react";
import useAuth from '../hooks/useAuth';
import { Button } from '@mantine/core';

const Logout = () => {
  const [isLoggedIn, logout] = useAuth({});

    const handleLogout = async () => {
        if (typeof logout === 'function') {
        await logout();
        }
        window.location.href="/"
    };

    return (
        <>
          {isLoggedIn && <div>
            <Button onClick={handleLogout}>
                Signout
            </Button>
          </div>}
        </>
    )
}

export default Logout;