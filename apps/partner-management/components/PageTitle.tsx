import useExperience from 'hooks/experience';
import Head from 'next/head';
import { useMemo } from 'react';

import { useSessionContext } from 'supertokens-auth-react/recipe/session';
import { SUPER_USER } from 'config';

export interface PageTitleProps {
  section?: string;
  title: string;
  customFormat?: boolean;
}
const PageTitle = ({
  title,
  section,
  customFormat = false,
}: PageTitleProps) => {
  const session = useSessionContext();
  const isLoggedIn = !session.loading && session.doesSessionExist;

  const isSuperUser = useMemo(() => {
    if (isLoggedIn) {
      return (session.accessTokenPayload ?? {}).userType === SUPER_USER;
    }
  }, [session, isLoggedIn]);

  const { experience } = useExperience();

  const partnerName = isSuperUser ? 'Collinson' : experience?.loungeName ?? '';

  let result = title;
  if (!customFormat && isLoggedIn) {
    result = `${title}${section ? ' | ' + section : ''}: ${partnerName}`;
  }
  return (
    <Head>
      <title>{result}</title>
    </Head>
  );
};

export default PageTitle;
