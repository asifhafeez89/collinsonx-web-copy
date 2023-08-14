import { useSessionContext } from '@collinsonx/utils/supertokens';
import { ReactElement, useEffect } from 'react';

export interface SessionManagerProps {
  children: ReactElement;
}
const SessionManager = ({ children }: SessionManagerProps) => {
  const session = useSessionContext();

  const NAMESPACE = 'EXPERIENCE_X_CONSUMER_ID';

  useEffect(() => {
    if (!session.loading) {
      const { userId } = session;
      if (userId && typeof window !== undefined) {
        localStorage.setItem(NAMESPACE, userId);
      }
      if (!userId) {
        localStorage.removeItem(NAMESPACE);
      }
    }
  }, [session]);

  return <>{children}</>;
};

export default SessionManager;
