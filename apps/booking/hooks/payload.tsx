import { Box, MantineProvider } from '@collinsonx/design-system/core';
import { hasRequired } from '@lib';
import { useRouter } from 'next/router';
import { PropsWithChildren, useEffect, useState } from 'react';
import { createContext, useContext } from 'react';

import { BridgePayload } from 'types/booking';
import * as jose from 'jose';
import { Be_Vietnam_Pro } from 'next/font/google';
import { experienceX } from '@collinsonx/design-system';

type PayloadState = {
  payload: BridgePayload | undefined;
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

const beVietnamPro = Be_Vietnam_Pro({
  style: ['normal'],
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

/**
 * Basic field validation for payload
 * @param payload
 * @returns
 */
const validatePayload = (payload: BridgePayload) =>
  hasRequired(payload, [
    'consumerNumber',
    'membershipNumber',
    'brand_affiliation',
    'lounge',
    'source_code',
  ]);

export const PayloadProvider = (props: PropsWithChildren) => {
  const router = useRouter();
  const [payload, setPayload] = useState<BridgePayload>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (router.isReady) {
      const { token } = router.query;

      try {
        const payload = jose.decodeJwt(token as string) as any;
        if (!validatePayload(payload)) {
          setError('Token is invalid');
        }
        setPayload(payload);
      } catch (e: any) {
        setError(
          e.hasOwnProperty('message') ? (e.message as string) : 'Invalid token'
        );
      }
    }
  }, [router]);

  return (
    <PayloadContext.Provider value={{ payload, setPayload }}>
      {error && <Box>{error}</Box>}
      {payload && !error ? (
        <MantineProvider
          theme={experienceX({
            fontFamily: beVietnamPro.style.fontFamily,
          })}
          withGlobalStyles
          withNormalizeCSS
        >
          {props.children}
        </MantineProvider>
      ) : undefined}
    </PayloadContext.Provider>
  );
};

export default usePayload;
