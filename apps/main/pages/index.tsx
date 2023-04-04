import { Title, Stack } from '@collinsonx/design-system/core';
import { Button } from '@mantine/core';
import { getThemeKey } from '../lib/index';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/router';
import { Login as LoginX } from '@collinsonx/design-system/assets/graphics/experienceX';
import { Login as LoginDiners } from '@collinsonx/design-system/assets/graphics/dinersClub';
import { useEffect, KeyboardEventHandler, useState } from 'react';
import LayoutLogin from '@components/LayoutLogin';
import {
  createPasswordlessCode,
  useSessionContext,
} from '@collinsonx/utils/supertokens';
import { ApolloError, client, useLazyQuery } from '@collinsonx/utils/apollo';
import getConsumerByEmailAddress from '@collinsonx/utils/queries/getConsumerByEmailAddress';
import { Text } from '@collinsonx/design-system/core';
import { InputLabel } from '@collinsonx/design-system';
import { GraphQLError } from 'graphql';

const logos = {
  experienceX: LoginX,
  dinersClub: LoginDiners,
};

const themeKey = getThemeKey();

function validateEmail(input: string) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input);
}

interface FormValues {
  email: string;
}

export default function Home(props: unknown) {
  const session = useSessionContext();
  const [userId, setUserId] = useState<string>();
  const [consumerError, setConsumerError] = useState<readonly GraphQLError[]>();

  const router = useRouter();
  const [loginError, setLoginError] = useState('');

  const form = useForm({
    initialValues: {
      email: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  const [loadConsumer, { loading, data, error }] = useLazyQuery(
    getConsumerByEmailAddress
  );

  useEffect(() => {
    if (!session.loading) {
      const { userId } = session;
      setUserId(userId);
      if (userId) {
        router.push('/lounge');
      }
    }
  }, [session, router]);

  const handleClickContinue = async ({ email }: FormValues) => {
    if (!validateEmail(email.trim())) {
      setLoginError('Invalid email');
    } else {
      const { data, errors: consumerErrors } = await client(true).query({
        query: getConsumerByEmailAddress,
        variables: { emailAddress: email },
      });

      if (consumerErrors) {
        setConsumerError(consumerErrors);
        return;
      }

      const userId = data?.getConsumerByEmailAddress?.id;
      console.log('userId ', userId, ' ', email);

      if (userId) {
        // user is already registered
        // proceed to code verification
        try {
          await createPasswordlessCode({
            email,
          });
          router.push({ pathname: '/check-email', query: { email } });
        } catch (err: any) {
          console.log(err);
          if (err.isSuperTokensGeneralError === true) {
            // this may be a custom error message sent from the API by you,
            // or if the input email / phone number is not valid.
            window.alert(err.message);
          } else {
            window.alert('Oops! Something went wrong.');
          }
        }
      } else {
        // user needs to sign up
        router.push('/signup-user');
      }
    }
  };

  return !!consumerError ? (
    <>
      <Title fw={600} order={3}>
        An error has occurred
      </Title>
      {consumerError.map((error, index) => (
        <Text key={index}>{error.message}</Text>
      ))}
    </>
  ) : (
    <form onSubmit={form.onSubmit(handleClickContinue)}>
      {themeKey !== 'dinersClub' && (
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            overflow: 'hidden',
            width: '100%',
            height: '50%',
          }}
        >
          <div
            style={{
              backgroundColor: '#946A00',
              width: '150vh',
              height: '150vh',
              position: 'absolute',
              bottom: '-100vh',
              left: '-75vh',
              borderTopRightRadius: '50%',
            }}
          />
        </div>
      )}
      <Stack spacing={50}>
        <Stack spacing={24} sx={{ height: '100%' }}>
          <Title order={1} size={20} align="center">
            Login to your account
          </Title>
          <InputLabel
            autoFocus
            placeholder="Your email address"
            label="Your email address"
            isWhite={true}
            styles={{
              root: {
                display: 'flex',
                flexDirection: 'column',
              },
              description: {
                order: 1,
                marginTop: '4px',
                marginBottom: '0',
              },
              label: {
                order: -2,
              },
              input: {
                order: -1,
              },
              error: {
                order: 2,
              },
            }}
            withAsterisk
            {...form.getInputProps('email')}
          />

          <Button type="submit">Submit</Button>
        </Stack>
      </Stack>
    </form>
  );
}

Home.getLayout = (page: JSX.Element) => <LayoutLogin>{page}</LayoutLogin>;
