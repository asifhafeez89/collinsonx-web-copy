import { useCallback, useEffect, useState } from 'react';
import {
  doesSessionExist,
  getUserId,
  ThirdPartyPasswordless,
} from '../supertokens';

interface Props {
  onExpiredSession?: () => void;
}

const useAuth = ({ onExpiredSession }: Props) => {
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
  const [userId, setUserId] = useState<String | null>(null);

  const init = useCallback(async () => {
    console.log('------- useAuth: init');
    const sessionState = await doesSessionExist();
    setIsLoggedIn(sessionState);
    console.log('------- useAuth: session', sessionState);

    if (sessionState) {
      console.log('------- useAuth: getuserid');
      const userId = await getUserId();
      console.log('------- useAuth: getuserid', userId);
      setUserId(userId);
    } else {
      console.log('------- useAuth: onExpired');
      if(onExpiredSession) {
        onExpiredSession();
      }
      
    }
  }, [onExpiredSession]);

  useEffect(() => {
    console.log('------- useAuth: useEffect');
    init();
  }, []);

  const logout = () => {
    return ThirdPartyPasswordless.signOut();
  };

  return [isLoggedIn, userId, logout];
};

export default useAuth;
