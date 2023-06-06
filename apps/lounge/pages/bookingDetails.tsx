import Layout from '../components/Layout';
import { PageTitle } from '@collinsonx/design-system/index';
import Lightbox from '@collinsonx/design-system/components/lightbox';
import { MapPin } from '@collinsonx/design-system/assets/icons';
import cancelBooking from '@collinsonx/utils/mutations/cancelBooking';
import {
  Title,
  Stack,
  Box,
  Image,
  Text,
  Button,
  Skeleton,
} from '@collinsonx/design-system/core';
import { GetServerSideProps, NextPageContext } from 'next';
import { useMutation, useQuery } from '@collinsonx/utils/apollo';
import bookings from './bookingsMock.json';
import { useState } from 'react';
import { getBookingByID as getBookingByIDQuery } from '@collinsonx/utils/queries';
import { useRouter } from 'next/router';
import BookingBadge from '@components/BookingBadge/BookingBadge';
import { BookingStatus } from '@collinsonx/utils';
import { LOUNGE_HOURS_OFFSET } from 'config/lounge';
import LoungeError from '@components/LoungeError';
import dayjsTz from '@collinsonx/utils/lib/dayjsTz';

type Booking = (typeof bookings)[number];

interface BookingDetailProps {
  id: string;
}

const { Cancelled, Declined, Errored, CheckedIn } = BookingStatus;

const nonCancellableStatus = [Cancelled, Declined, Errored, CheckedIn];

export default function BookingDetails({ id }: BookingDetailProps) {
  const [openModal, setOpenModal] = useState(false);

  const router = useRouter();

  const {
    loading,
    error: fetchError,
    data: bookingData,
  } = useQuery(getBookingByIDQuery, {
    variables: { getBookingById: id },
  });

  const [cancel, { loading: createLoading, error: cancelError, data }] =
    useMutation(cancelBooking);

  if (loading) {
    return <Skeleton visible={loading} h={390} />;
  } else if (!fetchError && bookingData?.getBookingByID === null) {
    return <Box>Booking could not be found</Box>;
  }

  const { getBookingByID } = bookingData;

  const handleCancel = () => {
    cancel({
      variables: { cancelBookingId: id },
      onCompleted: (data) => {
        if (data.cancelBooking) {
          router.push('/bookings');
        }
      },
    });
  };

  return (
    <>
      <LoungeError error={fetchError} />
      <LoungeError error={cancelError} />
      {getBookingByID ? (
        <Stack>
          <PageTitle
            title={`${getBookingByID?.experience?.name}`}
            onClickBack={() => router.push('/bookings')}
          />
          <Stack sx={{ border: '1px solid #E9ECEF', padding: 17 }}>
            <Box
              sx={{
                borderRadius: 4,
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
              }}
            ></Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <MapPin width={16} color={'#000000'} />
              <Text color={'#000000'} sx={{ marginLeft: '10px' }}>
                {getBookingByID?.experience?.location}
              </Text>
            </Box>
            <BookingBadge
              largeBadge={true}
              sx={{
                width: 'fit-content',
              }}
              status={getBookingByID?.status}
            />
            <Stack
              spacing={17}
              sx={{ border: '1px solid #E9ECEF', padding: 17 }}
            >
              <Box>
                <Title size={18}>Date</Title>
                <Text>
                  {dayjsTz(getBookingByID?.bookedFrom).format('DD/MM/YYYY')}
                </Text>
              </Box>

              <Box>
                <Title size={18}>Your flight time</Title>
                <Text>
                  {dayjsTz(getBookingByID?.bookedFrom)
                    .add(LOUNGE_HOURS_OFFSET, 'hours')
                    .format('HH:mm')}
                </Text>
              </Box>

              <Box>
                <Title size={18}>Lounge arrival time</Title>
                <Text>
                  {dayjsTz(getBookingByID?.bookedFrom).format('HH:mm')}
                </Text>
              </Box>
            </Stack>

            {!!getBookingByID &&
            !nonCancellableStatus.includes(getBookingByID.status) ? (
              <Button
                onClick={() => {
                  setOpenModal(!openModal);
                }}
                variant="default"
                color="red"
              >
                Cancel booking
              </Button>
            ) : null}

            <Lightbox
              open={openModal}
              ctaCancel={'Go back'}
              ctaForward={'Cancel booking'}
              ctaForwardCall={handleCancel}
              title=""
              onClose={() => setOpenModal(false)}
            >
              <Box>
                <h1>Cancel Booking</h1>
                <p>If you cancel you will no longer have this reservation.</p>
              </Box>
            </Lightbox>
          </Stack>
        </Stack>
      ) : null}
    </>
  );
}

interface QueryProps extends NextPageContext {
  booking: Booking;
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const id = query?.id as string;
  if (!id) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      id,
    },
  };
};

BookingDetails.getLayout = (page: JSX.Element) => <Layout>{page}</Layout>;
