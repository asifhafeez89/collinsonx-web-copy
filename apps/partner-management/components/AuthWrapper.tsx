import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useAuth from '../hooks/useAuth';
import { PARTNER_ID, SELECTED_LOUNGE, USER_TYPE, USER_META } from 'config';
import { Partner } from '@collinsonx/utils';
import { useQuery } from '@collinsonx/utils/apollo';
import getPartnerByID from '@collinsonx/utils/queries/getPartnerByID';
import Error from '@components/Error';
import { Flex } from '@collinsonx/design-system/core';
import LoaderLifestyleX from '@collinsonx/design-system/components/loaderLifestyleX';
import { useSessionContext } from 'supertokens-auth-react/recipe/session';
import experiences from '../data/experiences.json';

interface AuthWrapperProps {
  children: React.ReactNode;
}

const port = process.env.APP_PORT || 3000;
const domain =
  process.env.NEXT_PUBLIC_SITE_DOMAIN_URL ||
  process.env.NEXT_PUBLIC_VERCEL_URL ||
  process.env.APP_URL ||
  `http://partner-local.test.lifestyle-x.io:${port}`;

const checkIsAllowed = (pathname: string) => {
  return pathname.startsWith('/auth') || pathname.startsWith('/signup');
};
const clearLocalStorage = () => {
  if (typeof window !== undefined) {
    localStorage.removeItem(PARTNER_ID);
    localStorage.removeItem(SELECTED_LOUNGE);
    localStorage.removeItem(USER_TYPE);
    localStorage.removeItem(USER_META);
  }
};
const SysAuth = ({ children }: AuthWrapperProps) => {
  const router = useRouter();
  const [show, setShow] = useState(false);

  const session: any = useSessionContext();
  useEffect(() => {
    const { accessTokenPayload = {} } = session as any;
    if (accessTokenPayload.userType) {
      localStorage.setItem(USER_TYPE, accessTokenPayload.userType);
    }
    if (accessTokenPayload.experiences) {
      localStorage.setItem(
        USER_META,
        JSON.stringify({ experiences: accessTokenPayload.experiences })
      );
    }
  }, [session]);

  const [userId, logout] = useAuth({
    onExpiredSession: () => {
      if (window && !checkIsAllowed(window.location.pathname)) {
        window.location.href = `/auth/login/?redirectUrl=${
          window.location.pathname + window.location.search
        }`;
      }
    },
  });

  const { loading, error, data } = useQuery<{
    getPartnerByID: Partner;
  }>(getPartnerByID, {
    variables: { getPartnerById: session.userId },
    skip: !session.userId,
    onCompleted: (data) => {
      if (data?.getPartnerByID) {
        const { experiences } = data.getPartnerByID;
        if (experiences.length) {
          if (session.accessTokenPayload.userType !== 'SUPER_USER') {
            localStorage.setItem(
              SELECTED_LOUNGE,
              JSON.stringify(experiences[0])
            );
          }
        }
      }
    },
  });

  useEffect(() => {
    const isLoggedIn =
      session.loading === false && session.doesSessionExist === true;

    if (!session.loading === false && session.doesSessinExist === false) {
      clearLocalStorage();
    }

    if (isLoggedIn || checkIsAllowed(router.pathname)) {
      if (session.userId && typeof session.userId === 'string') {
        localStorage.setItem(PARTNER_ID, session.userId);
      }
      setShow(true);
    } else {
      setShow(false);
    }
  }, [session]);

  return loading ? (
    <Flex
      justify="center"
      align="center"
      h="100%"
      w="100%"
      style={{ position: 'absolute', top: 0, bottom: 0 }}
    >
      <LoaderLifestyleX />
    </Flex>
  ) : show ? (
    <>
      <Error error={error} />
      {children}
    </>
  ) : (
    <div
      style={{
        padding: 0,
        top: 0,
        left: 0,
        backgroundColor: '#112132',
        position: 'fixed',
        height: '100vh',
        width: '100vw',
      }}
    ></div>
  );
};

export default SysAuth;
