import useExperience from 'hooks/experience';
import Head from 'next/head';
import { useMemo } from 'react';

import { useSessionContext } from 'supertokens-auth-react/recipe/session';
import { AppSession } from 'types/Session';
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
  const session = useSessionContext() as AppSession;

  const isSuperUser = useMemo(
    () => (session.accessTokenPayload ?? {}).userType === SUPER_USER,
    [session]
  );

  const { experience } = useExperience();

  const partnerName = isSuperUser ? 'Collinson' : experience?.loungeName ?? '';

  let result = title;
  if (!customFormat) {
    result = `${title}${section ? ' | ' + section : ''}: ${partnerName}`;
  }
  return (
    <Head>
      <title>{result}</title>
    </Head>
  );
};

export default PageTitle;
