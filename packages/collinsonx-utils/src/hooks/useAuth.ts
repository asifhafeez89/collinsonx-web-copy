import { useCallback, useEffect, useState } from 'react';
import {
  doesSessionExist,
  getUserId,
  ThirdPartyPasswordless,
  Session,
} from '../supertokens';

interface Props {
  onExpiredSession?: () => void;
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
      if (onExpiredSession) {
        onExpiredSession();
      }
    }
  }, [onExpiredSession]);

  useEffect(() => {
    init();
  }, []);

  const logout = () => Session.signOut();

  return [isLoggedIn, userId, logout];
};

export default useAuth;
