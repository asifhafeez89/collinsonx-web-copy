import Layout from '../components/Layout';
import { PageTitle, Status } from '@collinsonx/design-system/index';
import Lightbox from '@collinsonx/design-system/components/lightbox';
import { MapPin } from '@collinsonx/design-system/assets/icons';
import deleteBooking from '@collinsonx/utils/mutations/deleteBooking';
import {
  Title,
  Stack,
  Box,
  Image,
  Text,
  Button,
} from '@collinsonx/design-system/core';
import { NextPageContext } from 'next';
import { client, useMutation, useQuery } from '@collinsonx/utils/apollo';
import dayjs from 'dayjs';
import { BookingStatus } from '@components/BookingBadge';
import bookings from './bookingsMock.json';
import { useState } from 'react';
import { getBookingByID } from '@collinsonx/utils/queries';
import { useRouter } from 'next/router';

type Booking = (typeof bookings)[number];

interface BookingDetailProps {
  booking: Booking;
  loading: boolean;
}

export default function BookingDetails({}: BookingDetailProps) {
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();

  console.log(router.query.id);

  const {
    loading,
    error: bookingDataError,
    data: bookingData,
  } = useQuery(getBookingByID, {
    variables: { getBookingByIdId: router.query.id },
  });

  console.log(bookingData);

  const [cancelBooking, { loading: createLoading, error, data }] =
    useMutation(deleteBooking);

  if (loading) {
    return <div>Loading</div>;
  }
  const { id, reservationDate, additionalRequests, bookingState } = bookingData;
  // const { name, location, images } = lounge;

  console.log(id);

  const handleDelete = () => {
    cancelBooking({
      variables: {
        bookingInput: {
          experience: {
            id: id,
          },
        },
      },
      context: {
        headers: {
          'x-user-id': 1337, // demo
        },
      },
      onCompleted: () => {},
    });
  };

  return (
    <Stack>
      <PageTitle title={`Book ${name}`} url={'/bookings'} />
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
          {name}
        </Title>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <MapPin color={'#000000'} />
          {/* <Text color={'#000000'} sx={{ marginLeft: '10px' }}>
            {location}
          </Text> */}
        </Box>
        <Status status={(bookingState as BookingStatus) ?? 'PENDING'} />
        <Stack spacing={17} sx={{ border: '1px solid #E9ECEF', padding: 17 }}>
          <Box>
            <Title size={18}>Date</Title>
            <Text>{dayjs(reservationDate).format('DD/MM/YYYY')}</Text>
          </Box>

          <Box>
            <Title size={18}>Time of arrival</Title>
            <Text>{dayjs(reservationDate).format('HH:mm')}</Text>
          </Box>

          <Box>
            <Title size={18}>Additional requirements</Title>
            <Text>{additionalRequests}</Text>
          </Box>
        </Stack>

        <Button
          onClick={() => {
            setOpenModal(!openModal);
          }}
          variant="default"
          color="red"
        >
          Cancel booking
        </Button>

        <Lightbox
          open={openModal}
          ctaCancel={'Go back'}
          ctaForward={'Cancel booking'}
          ctaForwardCall={handleDelete}
          title=""
          onClose={() => setOpenModal(false)}
        >
          <div>
            <h1>Cancel Booking</h1>
            <p>If you cancel you will no longer have this reservation.</p>
          </div>
        </Lightbox>
      </Stack>
    </Stack>
  );
}

interface QueryProps extends NextPageContext {
  booking: Booking;
}

BookingDetails.getLayout = (page: JSX.Element) => <Layout>{page}</Layout>;
