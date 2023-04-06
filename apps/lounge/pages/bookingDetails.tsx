import Layout from '../components/Layout';
import { PageTitle, Status } from '@collinsonx/design-system/index';
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
} from '@collinsonx/design-system/core';
import { GetServerSideProps, NextPageContext } from 'next';
import { useMutation, useQuery } from '@collinsonx/utils/apollo';
import dayjs from 'dayjs';
import bookings from './bookingsMock.json';
import { useState } from 'react';
import { getBookingByID as getBookingByIDQuery } from '@collinsonx/utils/queries';
import { useRouter } from 'next/router';
import { getLoungeArrivalTime } from '../lib/index';
import BookingBadge from '@components/BookingBadge';
import { BookingStatus } from '@collinsonx/utils';

type Booking = (typeof bookings)[number];

interface BookingDetailProps {
  id: string;
}

const { Cancelled, Declined, Errored } = BookingStatus;

const nonCancellableStatus = [Cancelled, Declined, Errored];

export default function BookingDetails({ id }: BookingDetailProps) {
  const [openModal, setOpenModal] = useState(false);

  const router = useRouter();

  const {
    loading,
    error: bookingDataError,
    data: bookingData,
  } = useQuery(getBookingByIDQuery, {
    variables: { getBookingById: id },
  });

  const [cancel, { loading: createLoading, error, data }] =
    useMutation(cancelBooking);

  if (loading) {
    return <Box>Loading</Box>;
  } else if (!error && bookingData?.getBookingByID === null) {
    return <Box>Booking could not be found</Box>;
  }

  const { getBookingByID } = bookingData;

  const handleDelete = () => {
    cancel({
      variables: { cancelBookingId: id },
      onCompleted: () => {
        router.push('/bookings');
      },
    });
  };

  return (
    <>
      {getBookingByID ? (
        <Stack>
          <PageTitle
            title={`Book ${getBookingByID?.experience?.name}`}
            url={'/bookings'}
          />
          <Stack sx={{ border: '1px solid #E9ECEF', padding: 17 }}>
            <Box
              sx={{
                borderRadius: 4,
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              {/* <Image
            src={images?.[0]?.url ?? ''}
            alt={name ?? ''}
            width={'100%'}
            height={190}
          /> */}
            </Box>
            <Title size={18} color={'#000000'}>
              {getBookingByID?.experience?.name}
            </Title>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <MapPin color={'#000000'} />
              <Text color={'#000000'} sx={{ marginLeft: '10px' }}>
                {getBookingByID?.experience?.location}
              </Text>
            </Box>
            <BookingBadge
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
                  {dayjs(getBookingByID?.bookedFrom).format('DD/MM/YYYY')}
                </Text>
              </Box>

              <Box>
                <Title size={18}>Your flight time</Title>
                <Text>{dayjs(getBookingByID?.bookedFrom).format('HH:mm')}</Text>
              </Box>

              <Box>
                <Title size={18}>Lounge arrival time</Title>
                <Text>{getLoungeArrivalTime(getBookingByID?.bookedFrom)}</Text>
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
              ctaForwardCall={handleDelete}
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
