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

import { BridgePayload } from 'types/booking';

import { verifyJWT } from '@collinsonx/jwt';

import {
  experienceX,
  hsbc,
  loungeKey,
  priorityPass,
} from '@collinsonx/design-system/themes';
import LayoutError from '@components/LayoutError';
import { useQuery } from '@collinsonx/utils/apollo';
import { Experience } from '@collinsonx/utils';
import { getSearchExperiences } from '@collinsonx/utils/queries';
import { getItem, setItem } from '@lib';
import {
  AccountProvider,
  Client,
  BookingQueryParams,
} from '@collinsonx/constants/enums';

import {
  LOUNGE_CODE,
  JWT,
  apiAccountProviderMap,
  REFERRER,
} from '../constants';

const {
  loungeCode: lcParam,
  jwt: jwtParam,
  referrer: referrerParam,
} = BookingQueryParams;

type PayloadState = {
  payload: BridgePayload | undefined;
  jwt: string | undefined;
  linkedAccountId: string | undefined;
  loungeCode: string | undefined;
  lounge: Experience | undefined;
  referrerUrl: string | undefined;
  setPayload(payload: BridgePayload): void;
  setLinkedAccountId(linkedAccountId: string): void;
};

const PayloadContext = createContext<PayloadState | null>(null);

const { LK, PP } = AccountProvider;
const { Mastercard_HSBC } = Client;

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
  hasRequired(payload, ['membershipNumber', 'accountProvider']);

const secret = process.env.NEXT_PUBLIC_JWT_SECRET as string;

function callThemeFunction(name: AccountProvider | Client) {
  switch (name) {
    case Mastercard_HSBC:
      return hsbc();
    case PP:
      return priorityPass();
    case LK:
      return loungeKey();
    default:
      return priorityPass();
  }
}

export const PayloadProvider = (props: PropsWithChildren) => {
  const router = useRouter();

  const [payload, setPayload] = useState<BridgePayload>();
  const [loungeCode, setLoungeCode] = useState<string>();
  const [jwt, setJWT] = useState<string>();
  const [tokenError, setTokenError] = useState<string>();
  const [loungeNotFound, setLoungeNotFound] = useState(false);
  const [payloadError, setPayloadError] = useState<string>();
  const [linkedAccountId, setLinkedAccountId] = useState<string>();
  const [referrerUrl, setReferrerUrl] = useState<string>();

  const {
    loading: loadingLounge,
    error: loungeError,
    data: loungeData,
  } = useQuery<{ searchExperiences: Experience[] }>(getSearchExperiences, {
    skip: !loungeCode || !payload,
    variables: {
      searchFilter: {
        attribute: apiAccountProviderMap[payload?.accountProvider!],
        value: 'true',
      },
    },
  });

  const lounge = useMemo(() => {
    return loungeData?.searchExperiences.filter(
      (item) => item && item.loungeCode === loungeCode
    )[0];
  }, [loungeData, loungeCode]);

  useEffect(() => {
    if (router.isReady) {
      const queryJWT = router.query[jwtParam] as string;
      const queryLoungeCode = router.query[lcParam] as string;
      const queryReferrer = router.query[referrerParam] as string;

      const storageJWT = getItem(JWT);
      const storageLoungeCode = getItem(LOUNGE_CODE);

      const hasStoredData = storageJWT && storageLoungeCode;
      const hasQueryParams = queryJWT && queryLoungeCode;

      let jwt: string = '';
      let loungeCode: string = '';
      let referrer: string = '';

      if (hasQueryParams) {
        jwt = queryJWT;
        loungeCode = queryLoungeCode;
        referrer = queryReferrer || '';
      } else if (hasStoredData) {
        jwt = getItem(JWT)!;
        loungeCode = getItem(LOUNGE_CODE)!;
        referrer = getItem(REFERRER) || '';
      }

      if (!loungeCode || !jwt) {
        setTokenError('Sorry, service is not available');
        return;
      }

      setItem(LOUNGE_CODE, loungeCode);
      setItem(JWT, jwt);
      setItem(REFERRER, referrer);
      setLoungeCode(loungeCode);
      setJWT(jwt);
      setReferrerUrl(referrer);

      verifyJWT(jwt, secret)
        .then((result) => {
          const payload = result.payload as unknown as BridgePayload;

          if (!validatePayload(payload)) {
            setPayloadError('Sorry, service is not available');
          }
          setPayload(payload);
        })
        .catch((e) => {
          setTokenError(
            e.hasOwnProperty('message')
              ? (e.message as string)
              : 'Sorry, service is not available'
          );
        });
    }
  }, [router]);

  return (
    <PayloadContext.Provider
      value={{
        payload,
        setPayload,
        jwt,
        lounge,
        loungeCode,
        referrerUrl,
        linkedAccountId,
        setLinkedAccountId,
      }}
    >
      {tokenError && <Box>{tokenError}</Box>}
      {payload && !tokenError ? (
        <MantineProvider
          theme={callThemeFunction(
            payload?.membershipType === Mastercard_HSBC
              ? Mastercard_HSBC
              : payload?.accountProvider || PP
          )}
          withGlobalStyles
          withNormalizeCSS
        >
          {payloadError || loungeError || (!loadingLounge && !lounge) ? (
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
