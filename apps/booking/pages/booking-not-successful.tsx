import Layout from '@components/Layout';

import { Flex, Stack, Text } from '@collinsonx/design-system/core';

import { useRouter } from 'next/router';
import { LoungeInfo } from '@components/LoungeInfo';

import { Button } from '@collinsonx/design-system/core';

import usePayload from 'hooks/payload';

import colors from 'ui/colour-constants';
import Heading from '@collinsonx/design-system/components/heading/Heading';
import BackToLounge from '@components/BackToLounge';

export default function BookingNotSuccessful() {
  const router = useRouter();

  const { lounge } = usePayload();

  return (
    <Layout>
      <Stack spacing={16}>
        <BackToLounge />

        <Flex justify="center" align="center" direction="column">
          <Stack maw={591} spacing={24}>
            <LoungeInfo lounge={lounge} loading={!lounge} />

            <Heading as="h2" padding={0} margin={0}>
              Your booking hasn't been confimed
            </Heading>
            <Text>
              Apologies for the delay in processing. Unfortunately, we couldn't
              confirm your booking.
            </Text>
            <Text>Please consider booking another time slot.</Text>
            <Flex
              direction="row"
              w="90%"
              gap={16}
              mt={8}
              mx={'auto'}
              sx={{ justifyContent: 'center' }}
            >
              <Button
                py={8}
                fullWidth
                variant="outline"
                onClick={() => {
                  router.push({
                    pathname: '/',
                  });
                }}
                styles={{
                  root: {
                    border: 'solid',
                    width: '100%',
                    backgroundColor: 'transparent',
                    borderColor: colors.buttonBlack,
                    borderWidth: 2,
                    color: colors.buttonBlack,
                    ':hover': {
                      backgroundColor: 'lightgray',
                    },
                  },
                  label: {
                    color: colors.buttonBlack,
                  },
                }}
              >
                GO TO LOUNGE PAGE
              </Button>

              <Button
                fullWidth
                py={8}
                onClick={() => {
                  router.push({
                    pathname: '/',
                  });
                }}
                data-testid="verify"
              >
                FIND ANOTHER SLOT
              </Button>
            </Flex>
          </Stack>
        </Flex>
      </Stack>
    </Layout>
  );
}

BookingNotSuccessful.getLayout = (page: JSX.Element) => <>{page}</>;
