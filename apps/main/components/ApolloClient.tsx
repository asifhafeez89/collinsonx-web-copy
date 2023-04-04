import { useSessionContext } from '@collinsonx/utils/supertokens';
import { ReactElement, useEffect, useState } from 'react';

import Client from '@collinsonx/utils/provider';

export interface ApolloClientProps {
  children: ReactElement;
}
const ApolloClient = ({ children }: ApolloClientProps) => {
  const session = useSessionContext();

  const [userId, setUserId] = useState<string>();

  useEffect(() => {
    if (!session.loading) {
      const { userId } = session;
      setUserId(userId);
      if (userId && typeof window !== undefined) {
        localStorage.setItem('EXPERIENCE_X_CONSUMER_ID', userId);
      }
    }
  }, [session]);

  return <Client isConsumer>{children}</Client>;
};

export default ApolloClient;
