import { Box, MantineProvider } from '@collinsonx/design-system/core';
import { hasRequired } from '@lib';
import { useRouter } from 'next/router';
import { PropsWithChildren, useEffect, useState } from 'react';
import { createContext, useContext } from 'react';

import { AccountProvider, BridgePayload, MembershipType } from 'types/booking';
import * as jose from 'jose';

import {
  experienceX,
  hsbc,
  loungeKey,
  priorityPass,
} from '@collinsonx/design-system/themes';
import Layout from '@components/Layout';
import LayoutError from '@components/LayoutError';

type PayloadState = {
  payload: BridgePayload | undefined;
  token: string | undefined;
  setPayload(payload: BridgePayload): void;
};

const PayloadContext = createContext<PayloadState | null>(null);

export const usePayload = (): PayloadState => {
  const context = useContext(PayloadContext);

  if (!context) {
    throw new Error('Please use PayloadProvider in parent component');
  }

  return context;
};

function callThemeFunction(name: AccountProvider | MembershipType) {
  switch (name) {
    case 'Cergea':
      return experienceX();
    case 'HSBC':
      return hsbc();
    case 'PP':
      return priorityPass();
    case 'LK':
      return loungeKey();
    default:
      return priorityPass();
  }
}

/**
 * Basic field validation for payload
 * @param payload
 * @returns
 */
const validatePayload = (payload: BridgePayload) =>
  hasRequired(payload, [
    'membershipNumber',
    'accountProvider',
    'lounge',
    'sourceCode',
  ]);

const secret = jose.base64url.decode(
  process.env.NEXT_PUBLIC_JWT_SECRET as string
);

async function decryptJWT(jwt: string) {
  const { payload, protectedHeader } = await jose.jwtDecrypt(jwt, secret, {
    issuer: 'urn:collinson:issuer',
    audience: 'urn:collinson:audience',
  });

  return {
    payload,
    protectedHeader,
  };
}

export const PayloadProvider = (props: PropsWithChildren) => {
  const router = useRouter();

  const [payload, setPayload] = useState<BridgePayload>();
  const [token, setToken] = useState<string>();
  const [tokenError, setTokenError] = useState<string>();
  const [payloadError, setPayloadError] = useState<string>();

  useEffect(() => {
    if (router.isReady) {
      const token = router.query.in as string;
      setToken(token);
      console.log(token);
      decryptJWT(token)
        .then((result) => {
          const payload = result.payload as unknown as BridgePayload;

          console.log(payload);

          if (!validatePayload(payload)) {
            setPayloadError('Sorry, service is not available');
          }
          setPayload(payload);
        })
        .catch((e) => {
          setTokenError(
            e.hasOwnProperty('message')
              ? (e.message as string)
              : 'Invalid token'
          );
        });
    }
  }, [router]);

  return (
    <PayloadContext.Provider value={{ payload, setPayload, token }}>
      {tokenError && <Box>{tokenError}</Box>}
      {payload && !tokenError ? (
        <MantineProvider
          theme={callThemeFunction(
            payload?.membershipType === 'HSBC'
              ? 'HSBC'
              : payload?.accountProvider || 'PP'
          )}
          withGlobalStyles
          withNormalizeCSS
        >
          {payloadError ? (
            <LayoutError>{payloadError}</LayoutError>
          ) : (
            props.children
          )}
        </MantineProvider>
      ) : undefined}
    </PayloadContext.Provider>
  );
};

export default usePayload;
