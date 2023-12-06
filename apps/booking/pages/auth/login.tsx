import {
  Title,
  Stack,
  Flex,
  Text,
  Skeleton,
  Anchor,
} from '@collinsonx/design-system/core';
import { Button } from '@collinsonx/design-system/core';
import { useForm } from '@collinsonx/design-system/form';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import LayoutLogin from '@components/LayoutLogin';
import {
  createPasswordlessCode,
  useSessionContext,
} from '@collinsonx/utils/supertokens';
import { InputLabel } from '@collinsonx/design-system';
import validateEmail from '@collinsonx/utils/lib/validateEmail';
import LoaderLifestyleX from '@collinsonx/design-system/components/loaderLifestyleX';
import usePayload from 'hooks/payload';
import colors from 'ui/colour-constants';
import TopBarLinks from '@components/TopBarLinks';
import Notification from '@components/Notification';
import { ANALYTICS_TAGS, BookingError } from '../../constants';
import { BookingQueryParams } from '@collinsonx/constants/enums';
import { log, logAction } from '@lib';
import useLocale from 'hooks/useLocale';

const { bookingId } = BookingQueryParams;
const pageName = 'login';
interface FormValues {
  email: string;
}

const { ERR_MEMBERSHIP_ALREADY_CONNECTED } = BookingError;

export default function Login() {
  const session = useSessionContext();
  const { payload, jwt, lounge, layoutError, setLayoutError } = usePayload();

  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const [loginError, setLoginError] = useState('');

  const ref = useRef(false);

  const translations = useLocale();

  useEffect(() => {
    logAction(pageName, ANALYTICS_TAGS.ON_PAGE_ENTER_EMAIL);
  }, []);

  const form = useForm({
    initialValues: {
      email: (payload ? payload.email : '') as string,
    },
    validate: {
      email: (value: string) =>
        validateEmail(value)
          ? undefined
          : translations.auth.login.error.emailFormat,
    },
  });

  useEffect(() => {
    if (session && !session.loading) {
      const { userId } = session;
      if (userId) {
        // if (!ref.current) {
        router.push({ pathname: '/' });
        ref.current = true;
        // }
      } else {
        setLoading(false);
      }
    }
  }, [session, router, jwt]);

  const handleClickContinue = async ({ email }: FormValues) => {
    setLayoutError('');
    await logAction(pageName, ANALYTICS_TAGS.ON_CONTINUE_CLICK, email);

    if (!validateEmail(email.trim())) {
      setLoginError('Invalid email');
    } else {
      try {
        await createPasswordlessCode({
          email,
          userContext: { accountProvider: payload?.accountProvider },
        });

        router.push({
          pathname: '/auth/check-code',
          query: {
            email,
            redirectUrl: router.query?.redirectUrl,
            [bookingId]: router.query[bookingId] || '',
          },
        });
      } catch (err: any) {
        log(err);
        if (err.isSuperTokensGeneralError === true) {
          // this may be a custom error message sent from the API by you,
          // or if the input email / phone number is not valid.
          window.alert(err.message);
        } else {
          window.alert('Oops! Something went wrong.');
        }
      }
    }
  };

  return (
    <>
      {loading || !lounge ? (
        <Flex justify="center" align="center" h="100%">
          <LoaderLifestyleX />
        </Flex>
      ) : (
        <LayoutLogin>
          <Skeleton visible={!lounge}>
            <TopBarLinks page="Enter_Email" />
          </Skeleton>
          <form onSubmit={form.onSubmit(handleClickContinue)}>
            <Stack
              spacing={24}
              sx={{
                height: '100%',
                width: '440px',
                margin: '0 auto',
                '@media (max-width: 768px)': {
                  width: '100%',
                  padding: '1rem 1.5rem 0 1.5rem',
                },
              }}
            >
              <Title
                order={1}
                size={20}
                sx={{
                  textAlign: 'center',
                }}
              >
                {translations.auth.login.email.title}
              </Title>
              {layoutError === ERR_MEMBERSHIP_ALREADY_CONNECTED && (
                <Notification>
                  {translations.auth.login.error.emailError}
                </Notification>
              )}
              <Text>{translations.auth.login.email.input.description}</Text>
              <Stack spacing={10}>
                <Text>
                  <Text span color={colors.red}>
                    *
                  </Text>
                  {translations.auth.login.email.input.label}
                </Text>
                <InputLabel
                  type="text"
                  autoFocus
                  placeholder={translations.auth.login.email.input.placeholder}
                  {...form.getInputProps('email')}
                  data-testid="loginEmailAddress"
                  onClick={() =>
                    logAction(
                      pageName,
                      ANALYTICS_TAGS.ON_CHANGE_EMAIL_ADDRESS,
                      form.getInputProps('email')
                    )
                  }
                />
                <Text align="left">{translations.auth.login.passwordText}</Text>
              </Stack>
              <Button type="submit" data-testid="login">
                {translations.auth.login.btnLogin}
              </Button>
            </Stack>
          </form>
        </LayoutLogin>
      )}
    </>
  );
}
