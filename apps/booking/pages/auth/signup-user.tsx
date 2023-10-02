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
import { useState } from 'react';
import updateConsumer from '@collinsonx/utils/mutations/updateConsumer';
import linkAccount from '@collinsonx/utils/mutations/linkAccount';
import { useMutation } from '@collinsonx/utils/apollo';
import { ConsumerInput } from '@collinsonx/utils';
import { useRouter } from 'next/router';
import validateEmail from '@collinsonx/utils/lib/validateEmail';
import LoaderLifestyleX from '@collinsonx/design-system/components/loaderLifestyleX';
import Error from '@components/Error';
import usePayload from 'hooks/payload';
import colors from 'ui/colour-constants';
import BackToLounge from '@components/BackToLounge';
import getError from 'utils/getError';
import Session from 'supertokens-auth-react/recipe/session';
import { BookingError } from '../../constants';
import { BookingQueryParams } from '@collinsonx/constants/enums';

const { ERR_MEMBERSHIP_ALREADY_CONNECTED } = BookingError;

const { bookingId } = BookingQueryParams;

export default function SignupUser() {
  const { payload, lounge, jwt, setLinkedAccountId, setLayoutError } =
    usePayload();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  console.log(
    '[SIGN-UP]: ',
    JSON.stringify(payload || null),
    JSON.stringify(lounge || null),
    router.query
  );

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
        validateEmail(value) ? null : 'Please enter a valid email address.',
      firstname: (value: string) =>
        value?.length > 0 ? null : 'Please enter your name.',
      lastname: (value: string) =>
        value?.length > 0 ? null : 'Please enter your last name.',
    },
  });

  const [updateConsumerCall, { loading: loadingUpdateConsumer, error, data }] =
    useMutation(updateConsumer);

  const [dolinkAccount] = useMutation(linkAccount);

  const handleLinkAccount = (values: any, consumerId: string) =>
    dolinkAccount({
      variables: {
        linkedAccountInput: {
          token: jwt,
          analytics: { email: values.email },
        },
      },
    }).then((response) => {
      const alreadyConnectedError = getError(
        response,
        ERR_MEMBERSHIP_ALREADY_CONNECTED
      );
      if (alreadyConnectedError) {
        console.log('[SIGN OUT]: membership already connected');
        Session.signOut().then(() => {
          setLayoutError(ERR_MEMBERSHIP_ALREADY_CONNECTED);
          router.push({
            pathname: '/auth/login',
          });
        });
      } else if (response.data && response.data.linkAccount && consumerId) {
        console.log('[SIGN UP]: linkAcount ID retrieved successfully');
        setLinkedAccountId(response.data.linkAccount.id);
        if (router.query[bookingId]) {
          console.log(
            '[SIGN UP]: bookingId found - redirecting to cancel-booking page'
          );
          router.push({
            pathname: '/cancel-booking',
            query: { [bookingId]: router.query[bookingId] },
          });
        } else {
          console.log('[SIGN UP]: redirecting to index page');
          router.push({
            pathname: '/',
          });
        }
      }
    });

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
      <Stack sx={{ width: '100%' }}>
        <Skeleton visible={!lounge}>
          <BackToLounge />
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
              handleLinkAccount(values, data?.updateConsumer?.id);
            },
            onError: () => {
              setLoading(false);
            },
          });
        })}
      >
        <Stack spacing={50}>
          <Stack
            spacing={24}
            sx={{
              height: '100%',
              width: '440px',
              margin: '0 auto',
              '@media (max-width: 768px)': {
                padding: '1rem 1.5rem 0 1.5rem',
                width: '100%',
                marginBottom: '150px',
              },
            }}
          >
            <Text size={18} align="center">
              You can update your details below
            </Text>
            <Title order={1} size={24} align="center">
              Update details
            </Title>
            <Error error={error} />
            <Stack spacing={8}>
              <Text>
                <Text span color={colors.red}>
                  *
                </Text>
                First name(s)
              </Text>
              <InputLabel
                autoFocus
                type="text"
                withAsterisk
                {...form.getInputProps('firstname')}
                placeholder="First name"
                data-testid="firstName"
              />
            </Stack>
            <Stack spacing={8}>
              <Text>
                <Text span color={colors.red}>
                  *
                </Text>{' '}
                Last name
              </Text>
              <InputLabel
                type="text"
                withAsterisk
                {...form.getInputProps('lastname')}
                placeholder="Last name"
                data-testid="lastName"
              />
            </Stack>
            <InputLabel
              disabled
              {...form.getInputProps('email')}
              label="Email address"
            />
            <Checkbox
              label="I agree to receive personalised marketing emails."
              {...form.getInputProps('marketingConsent', {
                type: 'checkbox',
              })}
              data-testid="marketingCheckbox"
            />
            <Button fullWidth type="submit" data-testid="loginAfterSignUp">
              Login
            </Button>
          </Stack>
        </Stack>
      </form>
    </LayoutLogin>
  );
}
