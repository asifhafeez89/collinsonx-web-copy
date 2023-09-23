
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
import {
  Experience,
  Consumer,
  Booking,
  BookingStatus,
} from '@collinsonx/utils/generatedTypes/graphql';
import { useRouter } from 'next/router';
import { LoungeInfo } from '@components/LoungeInfo';
import LoaderLightBox from '@collinsonx/design-system/components/loaderlightbox';
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
import BackToLounge from '@components/BackToLounge';
import { FAQLink } from 'utils/FAQLinks';

import { useContext, useEffect } from 'react';
import { useState } from 'react';
import { useMemo } from 'react';
import { useLazyQuery } from '@collinsonx/utils/apollo';
import { getBookingByID } from '@collinsonx/utils/queries';
import { AlertIcon } from '@collinsonx/design-system/assets/icons';

export default function BookingFailure() {
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
  const [open, setOpen] = useState(true);

  const handleRedoQuery = () => {
    fetchBookingDetails();
  };


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

  const { referrerUrl, payload, lounge } = usePayload();

  const loungeLocation = useMemo(
    () =>
      lounge && lounge.location
        ? lounge.location.airportName
          ? lounge.location.airportName +
            `${lounge.location.terminal ? ', ' + lounge.location.terminal : ''}`
          : ''
        : '-',
    [lounge]
  );

  const handleSubmit = () => {};

  const [
    fetchBookingDetails,
    { loading: loadingBooking, error: errorBooking, data: dataBooking },
  ] = useLazyQuery<{
    getBookingByID: Booking;
  }>(getBookingByID, {
    variables: {
      getBookingById: bookingId,

    },
    pollInterval: 300000,
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      if (
        data.getBookingByID.status === BookingStatus.Declined ||
        data.getBookingByID.status === BookingStatus.Confirmed
      ) {
        setOpen(false);

        if (data.getBookingByID.status === BookingStatus.Declined) {
          router.push({
            pathname: '/failure-booking',
          });
        }
      } else {
        setOpen(true);
      }
    },

  });

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
      <Stack spacing={16} sx={{ backgroundColor: colors.background }}>
        <Stack sx={{ width: '100%' }}>
          <BackToLounge />
        </Stack>
        <Flex

          justify="center"
          align="center"
          direction="column"

          sx={{
            justifyContent: 'center',

            '@media (max-width: 768px)': {
              width: '100%',
              justifyContent: 'initial',

              backgroundColor: colors.background,
            },
          }}

        >
          <Stack
            spacing={24}
            sx={{
              width: '591px',

              '@media (max-width: 768px)': {
                width: '100%',
                margin: '0',
              },
            }}
          >
            <LoungeInfo
              guests={{ adults, children, infants }}
              lounge={lounge}
              loading={!lounge}
            />
            <Flex
              gap={{ base: 'sm', sm: 'lg' }}
              sx={{
                width: '100%',
                flexDirection: 'row',

                '@media (max-width: 768px)': {
                  flexDirection: 'column',
                },
              }}
            >
              {loading && <BookingFormSkeleton />}
              {!loading && (
                <Box>
                  <Stack>
                    <Box
                      sx={{
                        '@media (max-width: 768px)': {
                          background: colors.white,
                          padding: '20px',
                        },
                      }}
                    >
                      <Title
                        style={{
                          fontSize: '1.5rem',
                          lineHeight: '2.25rem',
                          fontWeight: '700',
                        }}
                      >
                        <AlertIcon
                          style={{ width: '1.3rem', height: '1.3rem' }}
                        />{' '}
                        Your Booking hasn't been confirmed
                      </Title>
                      <Text>
                        Apologies for the delay in processing. Unfortunately, we
                        couldn't confirm you booking.
                      </Text>
                      <Box sx={{ marginTop: '1.5rem' }}>
                        <Text>Please consider booking another time slot.</Text>
                      </Box>
                    </Box>
                  </Stack>
                  <Flex
                    justify="center"
                    direction={{ base: 'column', sm: 'row' }}
                  >
                    <Button
                      type="submit"
                      data-testid="submit"
                      spacing="1.25rem"
                      align="center"
                      variant="outline"
                      handleClick={() => {
                        if (window) {
                          window.location.href = referrerUrl ?? '/';
                        }
                      }}
                    >
                      GO TO LOUNGES
                    </Button>

                    <Button
                      type="submit"
                      data-testid="submit"
                      spacing="1.25rem"
                      align="center"
                      handleClick={() =>
                        router.push({
                          pathname: '/',
                        })
                      }
                    >
                      FIND ANOTHER SLOT
                    </Button>
                  </Flex>
                </Box>
              )}
            </Flex>

          </Stack>
        </Flex>
      </Stack>
    </Layout>
  );
}

BookingFailure.getLayout = (page: JSX.Element) => <>{page}</>;

