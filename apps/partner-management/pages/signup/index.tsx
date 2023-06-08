import {
  Text,
  Stack,
  Button,
  PasswordInput,
  TextInput,
  Box,
  Flex,
} from '@collinsonx/design-system/core';
import LayoutLogin from '@components/LayoutLogin';
import FormContainer from '@components/FormContainer';
import { useForm } from '@collinsonx/design-system/form';
import validateEmail from '@collinsonx/utils/lib/validateEmail';
import PageTitle from '@components/PageTitle';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';
import { InvitationToken } from 'types/InvitationToken';
import { useMutation, useQuery } from '@collinsonx/utils/apollo';
import { useEffect, useState } from 'react';
import { Experience } from '@collinsonx/utils';
import getExperienceByID from '@collinsonx/utils/queries/getExperienceByID';
import acceptInvitation from '@collinsonx/utils/mutations/acceptInvitation';
import Error from '@components/Error';
import getInvitationByID from '@collinsonx/utils/queries/getInvitationByID';
import { Invitation } from '@collinsonx/utils/generatedTypes/graphql';
import LoaderLifestyleX from '@collinsonx/design-system/components/loaderLifestyleX';

export interface FormValues {
  email: string;
  password: string;
  passwordConfirm: string;
}

// EmailPassword recipe / Custom UI / Signup form
// https://supertokens.com/docs/emailpassword/custom-ui/email-password-login#sign-up-form
// https://supertokens.com/docs/emailpassword/custom-ui/email-password-login#checking-if-email-is-unique

/*
 * - An invitation ID should be supplied in the query
 * - We should have a way to fetch details for the specific invite ID: lounge title, airport, terminal
 * - Upon invite lookup:
 *    - if successful, redirect to /signup/confirm on submission
 *    - if invite has expired redirect to /signup/expired
 */

export default function Signup() {
  const router = useRouter();

  const [payload, setPayload] = useState<InvitationToken>();

  useEffect(() => {
    if (router.isReady) {
      const { invitation } = router.query;

      try {
        const payload = jwtDecode<InvitationToken>(invitation as string);

        if (!payload.jti || !payload.experienceID) {
          router.push('/signup/expired');
        }

        setPayload(payload);
      } catch (e) {
        router.push('/signup/expired');
      }
    }
  }, [router]);

  const {
    loading: fetchInvitationLoading,
    error: fetchInvitationError,
    data: fetchInvitationData,
  } = useQuery<{ getInvitationByID: Invitation }>(getInvitationByID, {
    variables: { getInvitationById: payload?.jti },
    skip: !payload?.jti,
  });

  /*
  useEffect(() => {
    if (fetchInvitationData && fetchInvitationData.getInvitationByID === null) {
      router.push('/signup/expired');
    }
  }, [router, fetchInvitationData]);
  */

  const {
    loading: loungeLoading,
    error: loungeError,
    data: loungeData,
  } = useQuery<{ getExperienceByID: Experience }>(getExperienceByID, {
    variables: { getExperienceById: payload?.experienceID },
    skip: !payload?.experienceID,
  });

  const [
    submitAcceptInvitation,
    {
      error: acceptInvitationError,
      data: acceptInvitationData,
      loading: acceptInvitationLoading,
    },
  ] = useMutation(acceptInvitation);

  const handleSignup = async ({ email, password }: FormValues) => {
    if (!validateEmail(email.trim())) {
    } else {
      submitAcceptInvitation({
        variables: {
          acceptInvitationInput: {
            inviteToken: router.query.invitation,
            email,
            password,
          },
        },
      }).then(({ data, errors }) => {
        if (errors && errors[0]) {
          // errors should be rendered
        } else {
          router.push('/signup/confirm');
        }
      });
    }
  };

  const form = useForm({
    initialValues: {
      email: '',
      fullName: '',
      password: '',
      passwordConfirm: '',
    },
    validate: {
      email: (value: string) =>
        !validateEmail(value) ? 'Please enter a valid email address.' : null,
      password: (value: string) =>
        value.trim() === '' ? 'Password is required' : null,
      passwordConfirm: (value, values) =>
        value !== values.password ? 'Passwords did not match' : null,
    },
  });

  return !router.isReady || loungeLoading || acceptInvitationLoading ? (
    <Flex
      justify="center"
      align="center"
      h="100%"
      style={{ position: 'absolute', top: 0, bottom: 0 }}
    >
      <LoaderLifestyleX />
    </Flex>
  ) : (
    <>
      <PageTitle title="Signup" />
      <Stack justify="center" align="center" spacing={32}>
        <Stack justify="center" align="center" spacing={8}>
          <Text size={22} fw={600} color="cyan.8">
            Welcome to
          </Text>
          <Box>
            <Text align="center" size={32} fw={700}>
              {loungeData?.getExperienceByID?.loungeName}
            </Text>
            <Text size={32} align="center">
              {loungeData?.getExperienceByID?.location?.airportName} -
              {loungeData?.getExperienceByID?.location?.terminal}
            </Text>
          </Box>
        </Stack>
        <Error error={loungeError} />
        <Error error={fetchInvitationError} />
        <Error error={acceptInvitationError} />
        <FormContainer>
          <Text align="center" size={18} fw={600}>
            Create an account
          </Text>
          <form onSubmit={form.onSubmit(handleSignup)}>
            <TextInput label="Email" mt={40} {...form.getInputProps('email')} />
            <PasswordInput
              label="Password"
              mt={32}
              {...form.getInputProps('password')}
            />
            <PasswordInput
              mt={16}
              label="Confirm password"
              {...form.getInputProps('passwordConfirm')}
            />
            <Button
              mt={40}
              type="submit"
              fullWidth
              disabled={acceptInvitationLoading}
            >
              Submit
            </Button>
          </form>
        </FormContainer>
      </Stack>
    </>
  );
}

Signup.getLayout = (page: JSX.Element) => <LayoutLogin>{page}</LayoutLogin>;
