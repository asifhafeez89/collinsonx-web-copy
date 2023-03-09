import Layout from '../components/Layout';
import { PageTitle, Status } from '@collinsonx/design-system/index';
import { MapPin } from '@collinsonx/design-system/assets/icons';
import { Title, Stack, Box, Image, Text } from '@collinsonx/design-system/core';
import { NextPageContext } from 'next';
import { client } from '@collinsonx/utils/apollo';
import { getBooking } from '@collinsonx/utils/queries';
import dayjs from 'dayjs';
import { BookingStatus } from '@components/BookingBadge';
import bookings from './bookingsMock.json';

type Booking = (typeof bookings)[number];

interface BookingDetailProps {
  booking: Booking;
  loading: boolean;
}

export default function BookingDetails({
  booking,
  loading,
}: BookingDetailProps) {
  if (loading) {
    return <div>Loading</div>;
  }
  const { lounge, reservationDate, additionalRequests, bookingState } = booking;
  const { name, location, images } = lounge;

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
          <Image
            src={images?.[0]?.url ?? ''}
            alt={name ?? ''}
            width={'100%'}
            height={190}
          />
        </Box>
        <Title size={18} color={'#000000'}>
          {name}
        </Title>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <MapPin color={'#000000'} />
          <Text color={'#000000'} sx={{ marginLeft: '10px' }}>
            {location}
          </Text>
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
      </Stack>
    </Stack>
  );
}

interface QueryProps extends NextPageContext {
  booking: Booking;
}

export async function getServerSideProps({ query }: QueryProps) {
  const bookingId = query?.id ?? '';

  try {
    const { data, loading } = await client.query({
      query: getBooking,
      variables: { id: bookingId },
    });
    return {
      props: {
        booking: data?.booking,
        loading: loading,
      },
    };
  } catch (err) {
    return {
      props: {
        booking: bookings.find((item) => item.id === bookingId),
        loading: false,
      },
    };
  }
}

BookingDetails.getLayout = (page: JSX.Element) => <Layout>{page}</Layout>;
