import React, { useEffect, useState } from 'react';
import { PARTNER_ID, USER_TYPE, USER_META, SELECTED_LOUNGE } from 'config';
import { useSessionContext } from 'supertokens-auth-react/recipe/session';
import { removeItem, setItem } from '@collinsonx/utils/lib';

interface AuthWrapperProps {
  children: React.ReactNode;
}
const checkIsAllowed = (pathname: string) => {
  return pathname.startsWith('/auth') || pathname.startsWith('/signup');
};

const SysAuth = ({ children }: AuthWrapperProps) => {
  const [show, setShow] = useState(false);

  const session: any = useSessionContext();
  useEffect(() => {
    const { accessTokenPayload = {} } = session as any;
    if (accessTokenPayload.userType) {
      setItem(USER_TYPE, accessTokenPayload.userType);
    }
    if (accessTokenPayload.experiences) {
      setItem(
        USER_META,
        JSON.stringify({ experiences: accessTokenPayload.experiences })
      );
    }
  }, [session]);

  useEffect(() => {
    if (session.loading === false && session.doesSessionExist === false) {
      if (typeof window !== undefined) {
        removeItem(PARTNER_ID);
        removeItem(SELECTED_LOUNGE);
        removeItem(USER_TYPE);
        removeItem(USER_META);

        if (!checkIsAllowed(window.location.pathname)) {
          window.location.href = `/auth/login/?redirectUrl=${
            window.location.pathname + window.location.search
          }`;
        }
      }
    }

    const isLoggedIn =
      session.loading === false && session.doesSessionExist === true;

    if (isLoggedIn || checkIsAllowed(window.location.pathname)) {
      if (session.userId && typeof session.userId === 'string') {
        setItem(PARTNER_ID, session.userId);
      }
      setShow(true);
    } else {
      setShow(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return show ? (
    <>{children}</>
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
