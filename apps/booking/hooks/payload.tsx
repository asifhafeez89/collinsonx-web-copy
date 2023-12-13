import { MantineProvider, Flex } from '@collinsonx/design-system/core';
import { log, hasRequired, logDataError } from '../lib/index';
import { loggerDataError } from '@collinsonx/utils/lib/analytics';
import { useRouter } from 'next/router';
import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
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
import LoaderLifestyleX from '@collinsonx/design-system/components/loaderLifestyleX';
import { accountIsEqual, consumerIsValid } from '../lib/index';
import {
  LOUNGE_CODE,
  JWT,
  apiAccountProviderMap,
  REFERRER,
  PLATFORM,
  LANGUAGE,
  VERSION,
  PDF_VERSION_ACCEPTED,
  ALLOW_LOCAL,
} from '../constants';
import { Consumer } from 'types/consumer';

const {
  loungeCode: lcParam,
  jwt: jwtParam,
  referrer: referrerParam,
  platform: platformParam,
  ln: ln,
  version: version,
  showLocal: showLocale,
} = BookingQueryParams;

type PayloadState = {
  consumerData: Consumer | undefined;
  jwt: string | undefined;
  layoutError: string | undefined;
  linkedAccountId: string | undefined;
  lounge: Experience | undefined;
  loungeCode: string | undefined;
  payload: BridgePayload | undefined;
  platform: string | undefined;
  referrerUrl: string | undefined;
  setConsumerData(consumer: Consumer): void;
  setLayoutError: (err: string) => void;
  setLinkedAccountId(linkedAccountId: string): void;
  setPayload(payload: BridgePayload): void;
  setTokenError: (err: string) => void;
};

const PayloadContext = createContext<PayloadState | null>(null);

const { LK, PP } = AccountProvider;
const { Mastercard_HSBC, None } = Client;

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
  hasRequired(payload, ['accountProvider', 'externalId']);

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
  const [payloadError, setPayloadError] = useState<boolean>(false);
  const [payloadErrorTitle, setPayloadErrorTitle] = useState<string>();
  const [linkedAccountId, setLinkedAccountId] = useState<string>();
  const [referrerUrl, setReferrerUrl] = useState<string>();
  const [platform, setPlatform] = useState<string>();
  const [layoutError, setLayoutError] = useState<string>();
  const [consumerData, setConsumerData] = useState<Consumer>();

  867; //Flag for language
  //Todo: Remove this when we are completely ready

  const ErrorAppMsgApp =
    'There might be an error in the system. Please make sure to update to the latest version of the app.';
  const ErrorWebTitle =
    'There might be an error in the system. Please try again or browse other options.';

  const [
    fetchConsumer,
    {
      loading: fetchConsumerLoading,
      error: fetchConsumerError,
      data: fetchConsumerData,
    },
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
      const queryLanguage = router.query[ln] as string;
      const queryVersion = router.query[version] as string;
      const queryLocalSwitch = router.query[showLocale] as string;

      const storageJWT = getItem(JWT);
      const storageLoungeCode = getItem(LOUNGE_CODE);

      const hasStoredData = storageJWT && storageLoungeCode;
      const hasQueryParams = queryJWT && queryLoungeCode;

      let jwt: string = '';
      let loungeCode: string = '';
      let language: string = '';
      let versionPDF: string = PDF_VERSION_ACCEPTED;
      let referrer: string = '';
      let platform: string = 'web';
      let localSwitch: string = 'OFF';

      if (hasQueryParams) {
        log(`Param found: ${jwtParam}:${queryJWT}`);
        log(`Param found: ${lcParam}:${queryLoungeCode}`);
        jwt = queryJWT;
        loungeCode = queryLoungeCode;
        referrer = queryReferrer || '';
        platform = queryPlatform || 'web';
        language = queryLanguage || 'en';
        versionPDF = queryVersion || PDF_VERSION_ACCEPTED;
        localSwitch = queryLocalSwitch || 'OFF';
      } else if (hasStoredData) {
        jwt = getItem(JWT)!;
        loungeCode = getItem(LOUNGE_CODE)!;
        referrer = getItem(REFERRER) || '';
        platform = getItem(PLATFORM) || 'web';
        language = getItem(LANGUAGE) || 'en';
        localSwitch = getItem(ALLOW_LOCAL) || 'OFF';
        versionPDF = getItem(VERSION) || PDF_VERSION_ACCEPTED;
        log(`Retrieved ${jwtParam} and ${lcParam} from storage`);
        log('referrer:', referrer);
        log('platform:', platform);
      }

      setPlatform(queryPlatform);

      if (!loungeCode || !jwt) {
        log(
          `Unable to retrieve ${jwtParam} or ${lcParam} from both query and storage`
        );
        logDataError(
          new Error(
            `Unable to retrieve ${jwtParam} or ${lcParam} from both query and storage`
          ),
          'payload',
          'catch: token is not found',
          jwt
        );

        setTokenError('Sorry, service is not available');
        return;
      }

      setItem(LOUNGE_CODE, loungeCode);
      setItem(LANGUAGE, language);
      setItem(JWT, jwt);
      setItem(REFERRER, referrer);
      setItem(PLATFORM, platform);
      setLoungeCode(loungeCode);
      setJWT(jwt);
      setReferrerUrl(referrer);
      setPlatform(platform);
      setItem(VERSION, versionPDF);
      setItem(ALLOW_LOCAL, localSwitch);

      let payload: BridgePayload;

      try {
        payload = decodeJWT(jwt) as BridgePayload;
      } catch (e) {
        log('Decode JWT error: ', e);

        logDataError(
          new Error(
            `Unable to retrieve ${jwtParam} or ${lcParam} from both query and storage`
          ),
          'payload',
          'catch: token is not found',
          jwt
        );

        setPayloadErrorTitle('Sorry, service is not available');
        setPayloadError(true);

        return;
      }

      if (!validatePayload(payload)) {
        log('JWT did not pass validatePayload() checks');
        setPayloadErrorTitle('Sorry, service is not available');
        setPayloadError(true);

        logDataError(
          new Error('Validation Failed'),
          'payload',
          'if: token failed validation',
          payload
        );
      }

      setPayload(payload);
    }
  }, [router]);

  const findLinkedAccount = useCallback(
    (linkedAccounts: LinkedAccount[] = []) => {
      return linkedAccounts.find(accountIsEqual(payload));
    },
    [payload]
  );

  useEffect(() => {
    if (router.isReady && !session.loading) {
      if (payloadError || tokenError !== undefined) {
        setPayloadErrorTitle('Sorry, service is not available');
      } else if (!loadingLounge && !lounge) {
        setPayloadErrorTitle("Sorry we can't find the lounge you requested");
      }
    }
  }, [lounge, loadingLounge, tokenError, router, session]);

  // user already logged-in
  useEffect(() => {
    if (
      router.isReady &&
      payload &&
      !session.loading &&
      !linkedAccountId &&
      !router.pathname.includes('/auth')
    ) {
      const { userId } = session;
      if (userId) {
        log('[payload hook] fetchConsumer ID: ', userId);
        fetchConsumer({
          variables: {
            getConsumerById: userId,
          },
        }).then(({ data }) => {
          log(
            '[payload hook] fetchConsumer response: ',
            JSON.stringify(data || null)
          );
          const consumer = data.getConsumerByID;
          if (consumerIsValid(consumer)) {
            setConsumerData(data);
            const accountMatched = findLinkedAccount(
              data.getConsumerByID.linkedAccounts
            );
            if (accountMatched) {
              setLinkedAccountId(accountMatched?.id);
            } else {
              signOut();
            }
          } else {
            log('[payload hook] consumer is not valid');
            signOut();
          }
        });
      }
    }
  }, [payload, linkedAccountId, router, session]);

  const providerTheme = () => {
    if (!payload) return PP;

    return payload.membershipType === Mastercard_HSBC
      ? Mastercard_HSBC
      : payload.accountProvider || PP;
  };

  const layoutErrorTheme = () => {
    if (!payload) {
      return {
        accountProvider: PP,
        membershipType: None,
      };
    }

    return {
      accountProvider: payload.accountProvider,
      membershipType: payload.membershipType || None,
    };
  };

  return (
    <PayloadContext.Provider
      value={{
        consumerData,
        jwt,
        layoutError,
        linkedAccountId,
        lounge,
        loungeCode,
        payload,
        platform,
        referrerUrl,
        setConsumerData,
        setLayoutError,
        setLinkedAccountId,
        setPayload,
        setTokenError,
      }}
    >
      <MantineProvider
        theme={callThemeFunction(providerTheme())}
        withGlobalStyles
        withNormalizeCSS
      >
        <LoungeError error={fetchConsumerError} />
        {!session.loading &&
          (fetchConsumerLoading || loadingLounge ? (
            <Flex justify="center" align="center" h="100%">
              <LoaderLifestyleX />
            </Flex>
          ) : (
            <>
              {payloadErrorTitle &&
              (loungeError ||
                tokenError ||
                (!loadingLounge && !lounge) ||
                payloadError) ? (
                <>
                  <LayoutError
                    payloadTheme={layoutErrorTheme()}
                    payloadErrorTitle={payloadErrorTitle}
                    payloadErrorMessage={
                      platform === 'android' || platform === 'ios'
                        ? ErrorAppMsgApp
                        : ErrorWebTitle
                    }
                    payloadPlatform={platform ?? ''}
                  />
                </>
              ) : (
                payload && props.children
              )}
            </>
          ))}
      </MantineProvider>
    </PayloadContext.Provider>
  );
};

export default usePayload;
