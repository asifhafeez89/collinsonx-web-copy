import { useQuery } from '@collinsonx/utils/apollo';
import Layout from '@components/Layout';

import {
  Anchor,
  Box,
  Center,
  Flex,
  Stack,
  Text,
  Title,
} from '@collinsonx/design-system/core';
import Breadcramp from '@components/Breadcramp';
import { Experience, Consumer } from '@collinsonx/utils/generatedTypes/graphql';
import { useRouter } from 'next/router';
import { LoungeInfo } from '@components/LoungeInfo';
import {
  getSearchExperiences,
  getConsumerByID,
} from '@collinsonx/utils/queries';
import { Details, Button } from '@collinsonx/design-system';

import BookingFormSkeleton from '@components/BookingFormSkeleton';
import LoungeError from '@components/LoungeError';

import { TIME_FORMAT, DATE_REDABLE_FORMAT } from '../config/Constants';
import { formatDate } from '../utils/DateFormatter';
import usePayload from 'hooks/payload';

import { InfoGroup } from '@collinsonx/design-system/components/details';
import colors from 'ui/colour-constants';
import Heading from '@collinsonx/design-system/components/heading/Heading';
import { BookingContext } from 'context/bookingContext';
import { useSessionContext } from 'supertokens-auth-react/recipe/session';

import { useContext, useEffect } from 'react';

export default function ConfirmPayment() {
  const router = useRouter();
  const session: any = useSessionContext();

  const {
    loading,
    error: fetchError,
    data: experienceData,
  } = useQuery<{ searchExperiences: Experience[] }>(getSearchExperiences);

  const {
    loading: userLoading,
    error: userError,
    data: userData,
  } = useQuery<{
    getConsumerByID: Consumer;
  }>(getConsumerByID, { variables: { getConsumerById: session.userId } });

  const { getBooking, setBooking } = useContext(BookingContext);

  const {
    flightNumber,
    departureDate,
    children,
    bookingId,
    carrierCode,
    adults,
    arrival,
    infants,
  } = getBooking();

  const { payload, lounge } = usePayload();

  const handleSubmit = () => {};

  const infos = [
    {
      header: 'Day of flight',
      description: formatDate(
        new Date(`${departureDate}`),
        DATE_REDABLE_FORMAT
      ),
    },
    {
      header: 'Time of flight',
      description: formatDate(new Date(`${departureDate}`), TIME_FORMAT),
    },
    {
      header: 'Flight number',
      description: flightNumber,
    },
  ];

  return (
    <Layout>
      <Stack spacing={16}>
        <Breadcramp
          lefttitle={`BACK TO ${lounge?.loungeName?.toUpperCase()}`}
          lefturl="https://bbc.co.uk"
          righttile={`FAQs`}
          righturl="https://bbc.co.uk"
        />

        <Flex justify="center" align="center" direction="column">
          <Stack maw={591} spacing={24}>
            <LoungeInfo
              guests={{ adults, children, infants }}
              lounge={lounge}
              loading={!lounge}
            />

            <Flex
              direction={{ base: 'column', sm: 'row' }}
              gap={{ base: 'sm', sm: 'lg' }}
              justify={{ sm: 'center' }}
            >
              {loading && <BookingFormSkeleton />}
              {!loading && (
                <Box>
                  <LoungeError error={fetchError} />
                  <Title
                    style={{
                      fontSize: '1.5rem',
                      lineHeight: '2.25rem',
                      fontWeight: '700',
                    }}
                  >
                    Your Booking has been confirmed
                  </Title>
                  <Text
                    style={{
                      fontSize: '1.125rem',
                      lineHeight: '1.75rem',
                      fontWeight: '700',
                      marginTop: '0.75rem',
                      marginBottom: '0.75rem',
                    }}
                  >
                    Booking reference {bookingId}
                  </Text>

                  <Text
                    style={{
                      fontSize: '1.125rem',
                      lineHeight: '1.75rem',
                      marginTop: '0.75rem',
                      marginBottom: '0.75rem',
                    }}
                  >
                    A confirmation email has been sent to{' '}
                    <span style={{ fontWeight: 700 }}>
                      {userData?.getConsumerByID?.emailAddress}
                    </span>
                  </Text>

                  {lounge && (
                    <Stack spacing={8}>
                      <Heading as="h2" padding={0} margin={0}>
                        Flight details
                      </Heading>
                      <Details infos={infos as InfoGroup[]} direction="row" />

                      <Heading as="h2" padding={0} margin={0}>
                        Who's coming
                      </Heading>
                      <Flex direction="row" gap={10}>
                        <p style={{ padding: '0', margin: '0' }}>
                          {' '}
                          <strong>Adults</strong> {adults}
                        </p>{' '}
                        {Number(children) > 0 ? (
                          <>
                            <p style={{ padding: '0', margin: '0' }}>
                              {' '}
                              <strong>Children</strong> {children}
                            </p>
                          </>
                        ) : null}
                      </Flex>

                      <Heading as="h2" padding={0} margin={0}>
                        Estimated time of arrival
                      </Heading>
                      <Flex direction="row" gap={10}>
                        <p style={{ padding: '0', margin: '0' }}> {arrival}</p>{' '}
                      </Flex>
                    </Stack>
                  )}
                  <Center>
                    <Anchor
                      href={'#'}
                      style={{
                        textDecoration: 'underline',
                        color: colors.blue,
                        fontSize: '1.125rem',
                        lineHeight: '1.75rem',
                        fontWeight: '600',
                        marginTop: '0.75rem',
                      }}
                    >
                      Return to lounge page
                    </Anchor>
                  </Center>

                  <Button
                    type="submit"
                    data-testid="submit"
                    spacing="1.25rem"
                    align="center"
                    handleClick={handleSubmit}
                  >
                    DOWNLOAD COPY
                  </Button>
                </Box>
              )}
            </Flex>
          </Stack>
        </Flex>
      </Stack>
    </Layout>
  );
}

ConfirmPayment.getLayout = (page: JSX.Element) => <>{page}</>;
