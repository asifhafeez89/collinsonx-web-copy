import { Box, MantineProvider } from '@collinsonx/design-system/core';
import { hasRequired } from '@lib';
import { useRouter } from 'next/router';
import { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { createContext, useContext } from 'react';

import { BridgePayload } from 'types/booking';

import { decodeJWT } from '@collinsonx/jwt';

import {
  hsbc,
  loungeKey,
  priorityPass,
} from '@collinsonx/design-system/themes';
import LayoutError from '@components/LayoutError';
import { useLazyQuery, useQuery } from '@collinsonx/utils/apollo';
import { Experience, LinkedAccount } from '@collinsonx/utils';
import {
  getConsumerByID,
  getSearchExperiences,
} from '@collinsonx/utils/queries';
import { getItem, setItem } from '@lib';
import {
  AccountProvider,
  Client,
  BookingQueryParams,
} from '@collinsonx/constants/enums';

import {
  useSessionContext,
  signOut,
} from 'supertokens-auth-react/recipe/session';
import LoungeError from '@components/LoungeError';
import {
  LOUNGE_CODE,
  JWT,
  apiAccountProviderMap,
  REFERRER,
  PLATFORM,
} from '../constants';

const {
  loungeCode: lcParam,
  jwt: jwtParam,
  referrer: referrerParam,
  platform: platformParam,
} = BookingQueryParams;

type PayloadState = {
  payload: BridgePayload | undefined;
  jwt: string | undefined;
  linkedAccountId: string | undefined;
  loungeCode: string | undefined;
  lounge: Experience | undefined;
  referrerUrl: string | undefined;
  layoutError: string | undefined;
  platform: string | undefined;
  setLayoutError: (err: string) => void;
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
  const session = useSessionContext();

  const [payload, setPayload] = useState<BridgePayload>();
  const [loungeCode, setLoungeCode] = useState<string>();
  const [jwt, setJWT] = useState<string>();
  const [tokenError, setTokenError] = useState<string>();
  const [payloadError, setPayloadError] = useState<string>();
  const [linkedAccountId, setLinkedAccountId] = useState<string>();
  const [referrerUrl, setReferrerUrl] = useState<string>();
  const [platform, setPlatform] = useState<string>();
  const [layoutError, setLayoutError] = useState<string>();

  const [
    fetchConsumer,
    { loading: fetchConsumerLoading, error: fetchConsumerError },
  ] = useLazyQuery(getConsumerByID);

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
      const queryPlatform = router.query[platformParam] as string;

      const storageJWT = getItem(JWT);
      const storageLoungeCode = getItem(LOUNGE_CODE);

      const hasStoredData = storageJWT && storageLoungeCode;
      const hasQueryParams = queryJWT && queryLoungeCode;

      let jwt: string = '';
      let loungeCode: string = '';
      let referrer: string = '';
      let platform: string = 'web';

      if (hasQueryParams) {
        console.log(`Param found: ${jwtParam}:${queryJWT}`);
        console.log(`Param found: ${lcParam}:${queryLoungeCode}`);
        jwt = queryJWT;
        loungeCode = queryLoungeCode;
        referrer = queryReferrer || '';
        platform = queryPlatform || 'web';
      } else if (hasStoredData) {
        jwt = getItem(JWT)!;
        loungeCode = getItem(LOUNGE_CODE)!;
        referrer = getItem(REFERRER) || '';
        platform = getItem(PLATFORM) || 'web';
        console.log(`Retrieved ${jwtParam} and ${lcParam} from storage`);
      }

      if (!loungeCode || !jwt) {
        console.log(
          `Unable to retrieve ${jwtParam} or ${lcParam} from both query and storage`
        );
        setTokenError('Sorry, service is not available');
        return;
      }

      setItem(LOUNGE_CODE, loungeCode);
      setItem(JWT, jwt);
      setItem(REFERRER, referrer);
      setItem(PLATFORM, platform);
      setLoungeCode(loungeCode);
      setJWT(jwt);
      setReferrerUrl(referrer);
      setPlatform(platform);

      const payload = decodeJWT(jwt) as unknown as BridgePayload;
      if (!validatePayload(payload)) {
        console.log('JWT did not pass validatePayload() checks');
        setPayloadError('Sorry, service is not available');
      }
      setPayload(payload);
    }
  }, [router]);

  useEffect(() => {
    if (
      router.isReady &&
      !session.loading &&
      session.doesSessionExist &&
      !router.pathname.includes('/auth') &&
      payload
    ) {
      const { userId } = session;
      if (userId) {
        fetchConsumer({
          variables: {
            getConsumerById: userId,
          },
        })
          .then(({ data }) => {
            const { linkedAccounts } = data.getConsumerByID;
            console.log(`[PAYLOAD] ${JSON.stringify(payload || null)}`);
            console.log(
              `[GET CONSUMER] ${JSON.stringify(data.getConsumerByID || null)}`
            );
            console.log(
              `[GET CONSUMER LINKED ACCOUNTS] ${
                JSON.stringify(data.getConsumerByID?.linkedAccounts) || null
              }`
            );
            if (linkedAccounts) {
              const matchedAccount = linkedAccounts.find(
                (item: LinkedAccount) =>
                  String(item.externalID) === String(payload.externalId) &&
                  String(item.membershipID) ===
                    String(payload.membershipNumber) &&
                  (item.provider as unknown as AccountProvider) ===
                    payload.accountProvider
              );
              if (!matchedAccount) {
                console.log(
                  `[SIGN OUT]: data.getConsumerByID.linkedAccounts does not contain an item matching fields in payload: ${JSON.stringify(
                    payload || null
                  )}`
                );
                signOut();
              }
            }
          })
          .catch((err) => {
            setPayloadError(err.message ?? err);
          });
      }
    }
  }, [session, payload, router]);

  return (
    <PayloadContext.Provider
      value={{
        payload,
        setPayload,
        jwt,
        lounge,
        loungeCode,
        referrerUrl,
        platform,
        linkedAccountId,
        setLinkedAccountId,
        layoutError,
        setLayoutError,
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
          <LoungeError error={fetchConsumerError} />
          {fetchConsumerLoading ? null : (
            <>
              {payloadError || loungeError || (!loadingLounge && !lounge) ? (
                <LayoutError>{payloadError}</LayoutError>
              ) : (
                props.children
              )}
            </>
          )}
        </MantineProvider>
      ) : undefined}
    </PayloadContext.Provider>
  );
};

export default usePayload;
