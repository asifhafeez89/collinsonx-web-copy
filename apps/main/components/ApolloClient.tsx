import { useSessionContext } from '@collinsonx/utils/supertokens';
import { ReactElement, useEffect, useState } from 'react';

import Client from '@collinsonx/utils/provider';

export interface ApolloClientProps {
  children: ReactElement;
}
const ApolloClient = ({ children }: ApolloClientProps) => {
  const session = useSessionContext();

  const [userId, setUserId] = useState<string>();

  const NAMESPACE = 'EXPERIENCE_X_CONSUMER_ID';

  useEffect(() => {
    if (!session.loading) {
      const { userId } = session;
      setUserId(userId);
      if (userId && typeof window !== undefined) {
        localStorage.setItem(NAMESPACE, userId);
      }
      if (!userId) {
        localStorage.removeItem(NAMESPACE);
      }
    }
  }, [session]);

  return <Client isConsumer>{children}</Client>;
};

export default ApolloClient;
