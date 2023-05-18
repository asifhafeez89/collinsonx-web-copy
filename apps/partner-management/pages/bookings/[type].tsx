import Layout from '@components/Layout';
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
  ColumnDef,
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import Status from '@components/Status';
import dayjs from 'dayjs';
import { BackArrow, Calendar } from '@collinsonx/design-system/assets/icons';
import Link from 'next/link';
import Table from '@components/Table';
import { BookingStatus, Booking } from '@collinsonx/utils';
import { getBookingsByType } from '@collinsonx/utils/lib';
import { useMutation, useQuery } from '@collinsonx/utils/apollo';
import getAllBookings from '@collinsonx/utils/queries/getAllBookings';
import {
  checkinBooking as checkinBookingMutation,
  declineBooking as declineBookingMutation,
  confirmBooking as confirmBookingMutation,
} from '@collinsonx/utils/mutations';
import BookingModal from '@components/BookingModal';
import Error from '@components/Error';
import DetailsConfirmedActions from '@components/Details/DetailsConfirmedActions';
import DetailsPendingActions from '@components/Details/DetailsPendingActions';
import { PageType } from 'config/booking';
import { GetServerSideProps } from 'next';
import { isErrorValid } from 'lib';
import utc from 'dayjs/plugin/utc';
import { useRouter } from 'next/router';
dayjs.extend(utc);

const columnHelper = createColumnHelper<Partial<Booking>>();

const titleMap = {
  pending: 'Pending lounge booking management',
  confirmed: 'Confirmed lounge booking management',
  declined: 'Declined lounge booking management',
};

const widthColMap = {
  status: 234,
};

const DATE_FORMAT = 'DD/MM/YYYY';

const typeMap: Record<string, BookingStatus> = {
  pending: BookingStatus.Initialized,
  confirmed: BookingStatus.Confirmed,
  declined: BookingStatus.Declined,
};

export interface BookingsProps {
  type: PageType;
}

export default function Bookings({ type }: BookingsProps) {
  const {
    loading: loadingBookings,
    error: errorBookings,
    data: dataBookings,
    refetch: refetchBookings,
  } = useQuery<{ getAllBookings: Booking[] }>(getAllBookings);

  const router = useRouter();
  const { date } = router.query;

  //const [date, setDate] = useState<Date | null>(null);

  const [bookingId, setBookingId] = useState<string | null>(null);

  const filteredData = useMemo(() => {
    if (!date) {
      return dataBookings;
    } else if (dataBookings?.getAllBookings) {
      return {
        getAllBookings: dataBookings.getAllBookings.filter(
          (item) =>
            dayjs.utc(item.bookedFrom).format('YYYY-MM-DD') ===
            dayjs(date as string).format('YYYY-MM-DD')
        ),
      };
    }
    return dataBookings;
  }, [date, dataBookings]);

  const bookings = useMemo<Booking[]>(() => {
    let types;
    if (type === 'confirmed') {
      types = [BookingStatus.Confirmed, BookingStatus.CheckedIn];
    } else if (type === 'declined') {
      types = [BookingStatus.Cancelled, BookingStatus.Declined];
    } else {
      types = [typeMap[type as keyof typeof typeMap]];
    }

    return getBookingsByType(
      filteredData?.getAllBookings ?? [],
      types
    ) as Booking[];
  }, [filteredData, type]);

  const [
    checkInBooking,
    { loading: loadingCheckin, error: checkinError, data: dataCheckin },
  ] = useMutation(checkinBookingMutation);

  const [
    declineBooking,
    { loading: loadingDecline, error: declineError, data: dataDecline },
  ] = useMutation(declineBookingMutation);

  const [
    confirmBooking,
    { loading: loadingConfirm, error: confirmError, data: dataConfirm },
  ] = useMutation(confirmBookingMutation);

  const [checkIn, setCheckIn] = useState(false);
  const handleClickClose = () => {
    setCheckIn(false);
    setBookingId(null);
  };
  const handleClickConfirm = () => {
    confirmBooking({
      variables: { confirmBookingId: bookingId },
      onCompleted: () => {
        setBookingId(null);
        refetchBookings();
      },
    });
  };
  const handleClickDecline = () => {
    declineBooking({
      variables: { declineBookingId: bookingId },
      onCompleted: () => {
        setBookingId(null);
        refetchBookings();
      },
    });
  };
  const handleClickCheckIn = (id: string) => {
    setBookingId(id);
  };
  const handleClickConfirmCheckIn = () => {
    checkInBooking({
      variables: { checkinBookingId: bookingId },
      onCompleted: () => {
        setBookingId(null);
        refetchBookings();
      },
    });
  };

  const title = titleMap[type as keyof typeof titleMap];

  const tableTitle = useMemo(() => {
    if (!type) {
      return '';
    }
    if (date) {
      return `${
        type.slice(0, 1).toUpperCase() + type.slice(1)
      } - arriving ${date}`;
    }
    return `All ${type.slice(0, 1).toUpperCase() + type.slice(1)}`;
  }, [date, type]);

  const handleChangeDate: ComponentProps<typeof DatePicker>['onChange'] = (
    date
  ) => {
    const dateStr = dayjs(date as Date).format('YYYY-MM-DD');
    router.push(`/bookings/${type}?date=${dateStr}`, undefined, {
      shallow: true,
    });
  };

  const columns = useMemo(() => {
    // see https://github.com/TanStack/table/issues/4241
    const mainColumns: ColumnDef<Partial<Booking>, any>[] = [
      columnHelper.accessor('consumer.fullName', {
        header: 'Customer name',
        cell: (props) => props.getValue() || '-',
      }),
      columnHelper.display({
        header: 'Arrival time',
        id: 'arrivalTime',
        cell: (props) => {
          const { bookedFrom } = props.row.original;
          return dayjs.utc(bookedFrom).format('HH:mm');
        },
      }),
      columnHelper.accessor('bookedFrom', {
        id: 'arrivalDate',
        header: 'Arrival date',
        cell: (props) => {
          const { bookedFrom } = props.row.original;
          return dayjs.utc(bookedFrom).format('YYYY-MM-DD');
        },
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
    ];

    if (type === 'pending' || type === 'confirmed') {
      mainColumns.push(
        columnHelper.accessor('status', {
          header:
            type === 'pending' ? 'Update booking status' : 'Check-In Customer',
          cell: (props) => {
            if (type === 'pending') {
              return (
                <Button
                  fullWidth
                  onClick={() =>
                    setBookingId((props.row.original as Booking).id)
                  }
                  variant="default"
                >
                  Decline/Confirm
                </Button>
              );
            }
            if (type === 'confirmed') {
              return props.getValue() !== BookingStatus.CheckedIn ? (
                <Button
                  fullWidth
                  onClick={() =>
                    handleClickCheckIn((props.row.original as Booking).id)
                  }
                  variant="default"
                >
                  Check customer in
                </Button>
              ) : (
                <Status type="success">Checked in</Status>
              );
            }
          },
        })
      );
    }
    return mainColumns;
  }, [type]);

  const table = useReactTable({
    data: bookings,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const selectedBooking = useMemo(
    () => (bookingId ? bookings.find((item) => item.id === bookingId)! : null),
    [bookingId, bookings]
  );

  return (
    <>
      <BookingModal booking={selectedBooking} onClickClose={handleClickClose}>
        <>
          {type === 'pending' && (
            <DetailsPendingActions
              onClickConfirm={handleClickConfirm}
              onClickDecline={handleClickDecline}
            />
          )}
          {type === 'confirmed' && (
            <DetailsConfirmedActions
              checkIn={checkIn}
              onChangeCheckIn={setCheckIn}
              onClickConfirmCheckIn={handleClickConfirmCheckIn}
            />
          )}
        </>
      </BookingModal>
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
            Lounge
          </Text>
        </Box>
        <Flex justify="space-between" align="center">
          <Box>
            <Title size={24} weight={400} pb={8}>
              {tableTitle}
            </Title>
            <Text size={14} weight={600} color="#9B9CA0">
              {bookings.length ? `${bookings.length} bookings` : null}
            </Text>
          </Box>
          <DatePicker
            icon={<Calendar />}
            sx={({ colors }) => ({
              width: 224,
            })}
            placeholder="Pick a date"
            clearable
            valueFormat={DATE_FORMAT}
            defaultValue={new Date(date as string)}
            onChange={handleChangeDate}
          />
        </Flex>
        <Error error={checkinError} />
        <Error error={confirmError} />
        <Error error={declineError} />
        {errorBookings && isErrorValid(errorBookings) && (
          <Error error={errorBookings} />
        )}
        {!bookings ? (
          <Text>No bookings found</Text>
        ) : (
          <Table<Partial<Booking>>
            type={type as PageType}
            table={table}
            widthColMap={widthColMap}
          />
        )}
      </Stack>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const type = ctx.params?.type as string;
  return {
    props: {
      type,
    },
  };
};

Bookings.getLayout = (page: JSX.Element) => <Layout>{page}</Layout>;
