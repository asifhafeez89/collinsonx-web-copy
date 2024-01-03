import {
  Button,
  Stack,
  Text,
  Flex,
  Notification,
  Checkbox,
  Title,
  Skeleton,
} from '@collinsonx/design-system/core';
import { useForm } from '@collinsonx/design-system/form';
import LayoutLogin from '../../components/LayoutLogin';
import { InputLabel } from '@collinsonx/design-system';
import { useCallback, useEffect, useState } from 'react';
import updateConsumer from '@collinsonx/utils/mutations/updateConsumer';
import { useMutation } from '@collinsonx/utils/apollo';
import { ConsumerInput } from '@collinsonx/utils';
import { useRouter } from 'next/router';
import validateEmail from '@collinsonx/utils/lib/validateEmail';
import LoaderLifestyleX from '@collinsonx/design-system/components/loaderLifestyleX';
import Error from '@components/Error';
import usePayload from 'hooks/payload';
import colors from 'ui/colour-constants';
import TopBarLinks from '@components/TopBarLinks';
import { BookingQueryParams } from '@collinsonx/constants/enums';

import { log, logAction } from '@lib';
import { ANALYTICS_TAGS, VALIDATION_RULES } from '../../constants';
import useLocale from 'hooks/useLocale';

import classes from '../../styles/auth.module.css';

const { bookingId } = BookingQueryParams;

export default function SignupUser() {
  const { payload, lounge, jwt, setLinkedAccountId, setLayoutError } =
    usePayload();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const pageName = 'Upd_Dtl';

  const translations = useLocale();

  useEffect(() => {
    logAction(pageName, ANALYTICS_TAGS.ON_SIGNUP_PAGE_ENTER);
  }, []);

  const form = useForm({
    initialValues: {
      email: (payload ? router.query.email : '') as string,
      firstname: (payload ? payload.firstName : '') as string,
      lastname: (payload ? payload.lastName : '') as string,
      marketingConsent: false,
      dateOfBirth: new Date('1990-01-01'),
    },
    validate: {
      email: (value: string) =>
        validateEmail(value)
          ? null
          : translations.auth.signUp.validationError.invalidEmail,
      firstname: function (value: string) {
        if (value.length > VALIDATION_RULES.MAX_LENGTH) {
          return translations.auth.signUp.validationError.maxLength;
        }

        return value?.trim().length > 0
          ? null
          : translations.auth.signUp.validationError.emptyName;
      },
      lastname: function (value: string) {
        if (value.length > VALIDATION_RULES.MAX_LENGTH) {
          return translations.auth.signUp.validationError.maxLength;
        }

        return value?.trim().length > 0
          ? null
          : translations.auth.signUp.validationError.emptyName;
      },
    },
  });

  const [updateConsumerCall, { loading: loadingUpdateConsumer, error, data }] =
    useMutation(updateConsumer);

  const redirect = useCallback(() => {
    if (router.query[bookingId]) {
      log('[SIGN UP]: bookingId found - redirecting to cancel-booking page');
      router.push({
        pathname: '/cancel-booking',
        query: { [bookingId]: router.query[bookingId] },
      });
      logAction(
        pageName,
        ANALYTICS_TAGS.ON_SIGNUP_PAGE_CONFIRM,
        'redirected to cancel'
      );
    } else {
      log('[SIGN UP]: redirecting to index page');
      router.push({
        pathname: '/',
      });
      logAction(
        pageName,
        ANALYTICS_TAGS.ON_SIGNUP_PAGE_CONFIRM,
        'redirected to /'
      );
    }
  }, [router]);

  return loading || loadingUpdateConsumer ? (
    <Flex justify="center" align="center" h="100%">
      <LoaderLifestyleX />
    </Flex>
  ) : (
    <LayoutLogin>
      {!!error && (
        <Notification color="red.7" title="An error occurred" w="100%">
          {error.graphQLErrors.map((error, index) => (
            <Text key={index}>{error.message}</Text>
          ))}
        </Notification>
      )}
      <Stack w="100%">
        <Skeleton visible={!lounge}>
          <TopBarLinks page={pageName} />
        </Skeleton>
      </Stack>
      <form
        onSubmit={form.onSubmit((values: any) => {
          const consumerInput: ConsumerInput = {
            dateOfBirth: values.dateOfBirth,
            firstName: values.firstname,
            lastName: values.lastname,
            marketingConsent: values.marketingConsent,
            emailAddress: values.email,
          };
          setLoading(true);
          updateConsumerCall({
            variables: { consumerInput },
            onCompleted: (data) => {
              redirect();
            },
            onError: () => {
              setLoading(false);
            },
          });
        })}
      >
        <Stack gap={50}>
          <Stack gap={24} className={classes.signupContainer}>
            <Text size="lg" ta="center">
              {translations.auth.signUp.subtitle}
            </Text>
            <Title order={1} size={24} ta="center">
              {translations.auth.signUp.title}
            </Title>
            <Error error={error} />
            <Stack gap={8}>
              <Text>
                <Text span color={colors.red}>
                  *
                </Text>
                {translations.auth.signUp.firstNameInput.label}
              </Text>
              <InputLabel
                autoFocus
                type="text"
                withAsterisk
                {...form.getInputProps('firstname')}
                placeholder={
                  translations.auth.signUp.firstNameInput.placeholder
                }
                data-testid="firstName"
                onClick={() =>
                  logAction(
                    pageName,
                    ANALYTICS_TAGS.ON_SIGNUP_PAGE_FIRSTNAME_UPDATE
                  )
                }
                maxLength={VALIDATION_RULES.MAX_LENGTH}
              />
            </Stack>
            <Stack gap={8}>
              <Text>
                <Text span color={colors.red}>
                  *
                </Text>{' '}
                {translations.auth.signUp.lastNameInput.label}
              </Text>
              <InputLabel
                type="text"
                withAsterisk
                {...form.getInputProps('lastname')}
                placeholder={translations.auth.signUp.lastNameInput.placeholder}
                data-testid="lastName"
                onClick={() =>
                  logAction(
                    pageName,
                    ANALYTICS_TAGS.ON_SIGNUP_PAGE_LASTNAME_UPDATE
                  )
                }
                maxLength={VALIDATION_RULES.MAX_LENGTH}
              />
            </Stack>
            <InputLabel
              disabled
              {...form.getInputProps('email')}
              label={translations.auth.signUp.emailInput.label}
            />
            <Checkbox
              label={translations.auth.signUp.marketingAgreementText}
              {...form.getInputProps('marketingConsent', {
                type: 'checkbox',
              })}
              data-testid="marketingCheckbox"
              onClick={() =>
                logAction(pageName, ANALYTICS_TAGS.ON_SIGNUP_PAGE_CONCENT)
              }
            />
            <Button fullWidth type="submit" data-testid="loginAfterSignUp">
              {translations.auth.signUp.signUpButton}
            </Button>
          </Stack>
        </Stack>
      </form>
    </LayoutLogin>
  );
}
