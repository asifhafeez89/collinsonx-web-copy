import Layout from '@components/Layout';
import bookingsMock from 'bookings.json';
import { ComponentProps, useMemo, useState } from 'react';
import {
  Title,
  Text,
  Button,
  Box,
  Stack,
  Flex,
  ActionIcon,
} from '@collinsonx/design-system/core';
import { DatePicker } from '@collinsonx/design-system';
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import Status from '@components/Status';
import { GetServerSideProps } from 'next';
import dayjs from 'dayjs';
import { BackArrow, Calendar } from '@collinsonx/design-system/assets/icons';
import Link from 'next/link';
import Table from '@components/Table';
import { BookingStatus, Booking } from '@collinsonx/utils';
import { getBookingsByType } from '@collinsonx/utils/lib';
import { client, useMutation } from '@collinsonx/utils/apollo';
import { getBookings } from '@collinsonx/utils/queries';
import { checkinBooking } from '@collinsonx/utils/mutations';
import BookingModal from '@components/BookingModal';

const { lounge } = bookingsMock;

const columnHelper = createColumnHelper<Partial<Booking>>();

const titleMap = {
  pending: 'Pending lounge booking management',
  confirmed: 'Confirmed lounge booking management',
  declined: 'Declined lounge booking management',
};

interface BookingsProps {
  type: 'pending' | 'confirmed' | 'declined';
  bookings: Booking[];
}

const widthColMap = {
  checked_in: 234,
};

const DATE_FORMAT = 'DD/MM/YYYY';

export default function Bookings({ type, bookings }: BookingsProps) {
  const [bookingId, setBookingId] = useState<string | null>(null);

  const [checkInBooking, { loading, error, data }] =
    useMutation(checkinBooking);

  const [date, setDate] = useState(dayjs(new Date()).format());
  const [checkIn, setCheckIn] = useState(false);
  const handleClickClose = () => {
    setCheckIn(false);
    setBookingId(null);
  };
  const handleClickCheckIn = (id: string) => {
    setBookingId(id);
  };
  const handleClickConfirmCheckIn = () => {
    checkInBooking({
      variables: { id: bookingId },
      onCompleted: () => {
        setBookingId(null);
      },
    });
  };

  const title = titleMap[type];

  const handleChangeDate: ComponentProps<typeof DatePicker>['onChange'] = (
    date
  ) => {
    setDate(dayjs(date).format());
  };

  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: 'Customer ID',
        cell: (props) => props.getValue(),
      }),
      columnHelper.accessor('bookedFrom', {
        header: 'Time of booking',
        cell: (props) => props.getValue(),
      }),
      columnHelper.display({
        header: 'Guests',
        cell: (props) => {
          // currently not available
          //const { adults, children } = props.row.original;
          //return `${adults} adults, ${children} children`;
          return `-`;
        },
      }),
      columnHelper.accessor('status', {
        header: 'Check-In customer',
        cell: (props) => {
          return props.getValue() !== BookingStatus.CheckedIn ? (
            <Button
              sx={{ width: '100%' }}
              onClick={() => handleClickCheckIn(props.row.id)}
              variant="default"
            >
              Check customer in
            </Button>
          ) : (
            <Status type="success">Checked in</Status>
          );
        },
      }),
    ],
    []
  );

  const table = useReactTable({
    data: bookings,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <BookingModal
        bookingId={bookingId}
        onClickClose={handleClickClose}
        checkIn={checkIn}
        onChangeCheckIn={setCheckIn}
        onClickConfirmCheckIn={handleClickConfirmCheckIn}
      />
      <Stack spacing={32}>
        <Box sx={{ borderBottom: '1px solid #E1E1E1' }}>
          <Flex gap={16} align="center" mb={8}>
            <Link href="/">
              <ActionIcon
                sx={{
                  svg: {
                    width: 20,
                    height: 37,
                  },
                }}
              >
                <BackArrow />
              </ActionIcon>
            </Link>
            <Title size={32}>{title}</Title>
          </Flex>
          <Text mb={33} pl={44} size={18} w={300}>
            {lounge.name}
          </Text>
        </Box>
        <Flex justify="space-between" align="center">
          <Box>
            <Title size={24} weight={400} pb={8}>
              Today&apos;s
            </Title>
            <Text size={14} weight={600} color="#9B9CA0">
              {bookings.length ? `${bookings.length} customers` : null}
            </Text>
          </Box>
          <DatePicker
            icon={<Calendar />}
            sx={({ colors }) => ({
              width: 224,
              '.mantine-Input-icon': {
                paddingLeft: 14,
              },
              Input: {
                paddingLeft: 56,
                border: '1px solid #CED4DA',
                borderRadius: 4,
                color: colors.gray[6],
              },
            })}
            placeholder="Pick a date"
            clearable={false}
            inputFormat={DATE_FORMAT}
            defaultValue={dayjs(date).toDate()}
            onChange={handleChangeDate}
          />
        </Flex>
        {!bookings ? (
          <Text>No bookings found</Text>
        ) : (
          <Table<Partial<Booking>> table={table} widthColMap={widthColMap} />
        )}
      </Stack>
    </>
  );
}

const typeMap: Record<string, BookingStatus> = {
  pending: BookingStatus.Initialized,
  confirmed: BookingStatus.Confirmed,
  declined: BookingStatus.Declined,
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const type = ctx.params?.type as string;
  if (!titleMap[type as keyof typeof titleMap]) {
    return {
      notFound: true,
    };
  }
  const { data } = await client.query({
    query: getBookings,
  });

  const bookings = getBookingsByType(data.getBookings, typeMap[type]);

  return {
    props: {
      type,
      bookings,
    },
  };
};

Bookings.getLayout = (page: JSX.Element) => <Layout>{page}</Layout>;
