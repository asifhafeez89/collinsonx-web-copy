import {
  Box,
  MantineProvider,
  Center,
  Text,
} from '@collinsonx/design-system/core';
import { hasRequired } from '@lib';
import { useRouter } from 'next/router';
import { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { createContext, useContext } from 'react';

import { AccountProvider, BridgePayload, MembershipType } from 'types/booking';
import * as jose from 'jose';
import { Be_Vietnam_Pro } from 'next/font/google';

import {
  experienceX,
  hsbc,
  loungeKey,
  priorityPass,
} from '@collinsonx/design-system/themes';
import { useQuery } from '@collinsonx/utils/apollo';
import { Experience } from '@collinsonx/utils';
import { getSearchExperiences } from '@collinsonx/utils/queries';
import Layout from '@components/Layout';
import { getItem, setItem } from '@lib';
import { LOUNGE_CODE, JWT } from '../constants';

type PayloadState = {
  payload: BridgePayload | undefined;
  jwt: string | undefined;
  loungeCode: string | undefined;
  lounge: Experience | undefined;
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

const beVietnamPro = Be_Vietnam_Pro({
  style: ['normal'],
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

const themeSettingsShared = {
  fontFamily: beVietnamPro.style.fontFamily,
};

function callThemeFunction(name: AccountProvider | MembershipType) {
  switch (name) {
    case 'Cergea':
      return experienceX(themeSettingsShared);
    case 'HSBC':
      return hsbc(themeSettingsShared);
    case 'PP':
      return priorityPass(themeSettingsShared);
    case 'LK':
      return loungeKey(themeSettingsShared);
    default:
      return priorityPass(themeSettingsShared);
  }
}

export const PayloadProvider = (props: PropsWithChildren) => {
  const router = useRouter();
  const [payload, setPayload] = useState<BridgePayload>();
  const [loungeCode, setLoungeCode] = useState<string>();
  const [jwt, setJWT] = useState<string>();
  const [error, setError] = useState<string>();
  const [loungeNotFound, setLoungeNotFound] = useState(false);

  const {
    loading: loadingLounge,
    error: loungeError,
    data: loungeData,
  } = useQuery<{ searchExperiences: Experience[] }>(getSearchExperiences, {
    skip: !loungeCode,
  });

  const lounge = useMemo(() => {
    return loungeData?.searchExperiences.filter(
      (item) => item.loungeCode === loungeCode
    )[0];
  }, [loungeData, loungeCode]);

  useEffect(() => {
    if (router.isReady) {
      const queryJWT = router.query.in as string;
      const queryLoungeCode = router.query.lc as string;

      const storageJWT = getItem(JWT);
      const storageLoungeCode = getItem(LOUNGE_CODE);

      const hasStoredData = storageJWT && storageLoungeCode;
      const hasQueryParams = queryJWT && queryLoungeCode;

      let jwt: string = '';
      let loungeCode: string = '';

      if (hasQueryParams) {
        jwt = queryJWT;
        loungeCode = queryLoungeCode;
      } else if (hasStoredData) {
        jwt = getItem(JWT)!;
        loungeCode = getItem(LOUNGE_CODE)!;
      }

      if (!loungeCode || !jwt) {
        setError('jwt is invalid');
        return;
      }

      setItem(LOUNGE_CODE, loungeCode);
      setItem(JWT, jwt);
      setLoungeCode(loungeCode);
      setJWT(jwt);

      decryptJWT(jwt)
        .then((result) => {
          const payload = result.payload as unknown as BridgePayload;

          if (!validatePayload(payload)) {
            setError('jwt is invalid');
          }
          setPayload(payload);
        })
        .catch((e) => {
          setError(
            e.hasOwnProperty('message') ? (e.message as string) : 'Invalid jwt'
          );
        });
    }
  }, [router]);

  return (
    <PayloadContext.Provider
      value={{ payload, setPayload, jwt, lounge, loungeCode }}
    >
      {error && <Box>{error}</Box>}
      {payload && !error ? (
        <MantineProvider
          theme={callThemeFunction(
            payload?.membershipType === 'HSBC'
              ? 'HSBC'
              : payload?.accountProvider || 'PP'
          )}
          withGlobalStyles
          withNormalizeCSS
        >
          {loungeError || (!loadingLounge && !lounge) ? (
            <Layout>
              <Center>
                <Text>
                  Something went wrong. This service is not available for the
                  moment
                </Text>
              </Center>
            </Layout>
          ) : (
            props.children
          )}
        </MantineProvider>
      ) : undefined}
    </PayloadContext.Provider>
  );
};

export default usePayload;
