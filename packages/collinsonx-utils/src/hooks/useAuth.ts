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
    const userId = await getUserId();
    const sessionState = await doesSessionExist();
    setUserId(userId);
    setIsLoggedIn(sessionState);

    if (!sessionState) {
      if(onExpiredSession) {
        onExpiredSession();
      }
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
