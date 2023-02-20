import { useCallback, useEffect, useState } from 'react';
import {
  doesSessionExist,
  getUserId,
  ThirdPartyPasswordless,
} from '../supertokens';

interface Props {
  onExpiredSession: () => void;
}

const useAuth = ({ onExpiredSession }: Props) => {
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
  const [userId, setUserId] = useState<String | null>(null);

  const init = useCallback(async () => {
    const sessionState = await doesSessionExist();
    setIsLoggedIn(sessionState);

    if (sessionState) {
      const userId = await getUserId();
      setUserId(userId);
    } else {
      onExpiredSession();
      /*
      router.push({
        pathname: '/',
      });*/
    }
  }, [onExpiredSession, setUserId, setIsLoggedIn]);

  useEffect(() => {
    init();
  }, [init]);

  const logout = () => {
    return ThirdPartyPasswordless.signOut();
  };

  return [isLoggedIn, userId, logout];
};

export default useAuth;
