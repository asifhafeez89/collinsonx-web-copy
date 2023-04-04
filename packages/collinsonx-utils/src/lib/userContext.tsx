import { createContext, useState, useContext } from 'react';

const userContext = createContext<any>({ user: { userId: null } });

export const UserProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState({ userId: null });
  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
};

export const useUserId = () => {
  const { user, setUser } = useContext(userContext);
  return [user, setUser];
};
