import Layout from '@components/Layout';
import { ComponentProps, useCallback, useMemo, useState } from 'react';
import {
  Title,
  Text,
  Button,
  Box,
  Stack,
  Flex,
  ActionIcon,
  TextInput,
  TextInputProps,
} from '@collinsonx/design-system/core';
import { DatePicker } from '@collinsonx/design-system';
import {
  ColumnDef,
  SortingState,
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import Status from '@components/Status';
import dayjsTz from '@collinsonx/utils/lib/dayjsTz';

import {
  BackArrow,
  Calendar,
  Magglass,
} from '@collinsonx/design-system/assets/icons';
import Link from 'next/link';
import Table from '@components/Table';
import { BookingStatus, Booking, BookingType } from '@collinsonx/utils';
import { getBookingsByType } from '@collinsonx/utils/lib';
import { useMutation, useQuery } from '@collinsonx/utils/apollo';
import getBookings from '@collinsonx/utils/queries/getBookings';
import {
  checkinBooking as checkinBookingMutation,
  declineBooking as declineBookingMutation,
  confirmBooking as confirmBookingMutation,
} from '@collinsonx/utils/mutations';
import Error from '@components/Error';
import DetailsPendingActions from '@components/Details/DetailsPendingActions';
import { PageType } from 'config/booking';
import { GetServerSideProps } from 'next';
import { expandDate, isErrorValid } from 'lib';
import { useRouter } from 'next/router';
import getSelectedLounge from 'lib/getSelectedLounge';
import getLoungeTitle from 'lib/getLoungeTitle';

const columnHelper = createColumnHelper<Partial<Booking>>();

const titleMap = {
  pending: 'Pending lounge booking management',
  confirmed: 'Confirmed lounge booking management',
  declined: 'Declined lounge booking management',
};

const bookingTypeMap = {
  [BookingType.Reservation]: 'Reservation',
  [BookingType.WalkUp]: 'Walk-up',
};

const widthColMap = {
  status: 234,
};

const DATE_FORMAT = 'DD/MM/YYYY';

const typeMap: Record<string, BookingStatus> = {
  pending: BookingStatus.Pending,
  confirmed: BookingStatus.Confirmed,
  declined: BookingStatus.Declined,
};

export interface BookingsProps {
  type: PageType;
}

export default function Bookings({ type }: BookingsProps) {
  const loungeData = getSelectedLounge();

  const {
    loading: loadingBookings,
    error: errorBookings,
    data: dataBookings,
    refetch: refetchBookings,
  } = useQuery<{ getBookings: Booking[] }>(getBookings, {
    variables: {
      experienceId: loungeData?.id,
    },
    skip: !loungeData?.id,
    pollInterval: 300000,
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onCompleted: () =>
      setLastUpdate(
        new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
      ),
  });

  const router = useRouter();

  const { date } = router.query;

  const [bookingId, setBookingId] = useState<string | null>(null);
  const [name, setName] = useState((router.query.name as string) ?? '');

  const [lastUpdate, setLastUpdate] = useState<String>();

  const [sorting, setSorting] = useState<SortingState>([
    { id: 'arrivalDate', desc: true },
  ]);

  const filteredData = useMemo(() => {
    let result;
    const data = expandDate(dataBookings);
    if (!date) {
      result = data;
    } else if (data?.getBookings) {
      result = {
        getBookings: data.getBookings.filter(
          (item) =>
            dayjsTz(item.bookedFrom).format('YYYY-MM-DD') ===
            dayjsTz(date as string).format('YYYY-MM-DD')
        ),
      };
    }
    if (name && result) {
      result = {
        getBookings: result.getBookings.filter((item) =>
          (item.consumer?.fullName ?? '')
            .toLowerCase()
            .includes(name.toLowerCase())
        ),
      };
    }
    return result;
  }, [date, name, dataBookings]);

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
      filteredData?.getBookings ?? [],
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

  const handleClickDecline = useCallback(
    (id: string) => {
      declineBooking({
        variables: { declineBookingId: id },
        onCompleted: () => {
          //setBookingId(null);
          refetchBookings();
        },
      });
    },
    [declineBooking, refetchBookings]
  );

  const handleClickConfirm = useCallback(
    (id: string) => {
      confirmBooking({
        variables: { confirmBookingId: id },
        onCompleted: () => {
          //setBookingId(null);
          refetchBookings();
        },
      });
    },
    [confirmBooking, refetchBookings]
  );

  const handleClickConfirmCheckIn = useCallback(
    (id: string) => {
      checkInBooking({
        variables: { checkinBookingId: id },
        onCompleted: () => {
          //setBookingId(null);
          refetchBookings();
        },
      });
    },
    [checkInBooking, refetchBookings]
  );

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

  const handleChangeName: TextInputProps['onChange'] = (e) => {
    const name = e.target.value;
    setName(name);
    router.replace(
      {
        query: { ...router.query, name },
      },
      undefined,
      { shallow: true }
    );
  };

  const handleChangeDate: ComponentProps<typeof DatePicker>['onChange'] = (
    date
  ) => {
    const dateStr =
      date !== null ? dayjsTz(date as Date).format('DD-MM-YYYY HH:MM') : '';
    router.replace(
      {
        query: { ...router.query, date: dateStr },
      },
      undefined,
      { shallow: true }
    );
  };

  const columns = useMemo(() => {
    // see https://github.com/TanStack/table/issues/4241
    const mainColumns: ColumnDef<Partial<Booking>, any>[] = [
      columnHelper.accessor('consumer.fullName', {
        id: 'fullName',
        header: 'Customer name',
        cell: (props) => props.getValue() || '-',
      }),
      columnHelper.accessor('type', {
        header: 'Type',
        id: 'type',
        cell: (props) => bookingTypeMap[props.getValue() as BookingType] || '-',
      }),
      columnHelper.accessor('arrivalDate', {
        header: 'Arrival date',
        id: 'arrivalDate',
        cell: (props) =>
          new Date(props.getValue().toString()).toLocaleDateString() || '-',
      }),
      columnHelper.accessor('arrivalTime', {
        header: 'Arrival time',
        id: 'arrivalTime',
        cell: (props) => props.getValue() || '-',
      }),
      columnHelper.accessor('guestCount', {
        header: 'Guests',
        id: 'guestCount',
        cell: (props) =>
          !Number.isNaN(props.getValue()) ? props.getValue() : '-',
      }),
    ];

    if (type === 'pending' || type === 'confirmed') {
      mainColumns.push(
        columnHelper.display({
          id: 'status',
          header: type === 'pending' ? 'Process request' : 'Check-In Customer',
          cell: (props) => {
            const { status, id } = props.row.original as Booking;
            if (type === 'pending') {
              return (
                <>
                  <DetailsPendingActions
                    onClickDecline={() => handleClickDecline(id)}
                    onClickConfirm={() => handleClickConfirm(id)}
                  />
                </>
              );
            }
            if (type === 'confirmed') {
              return status !== BookingStatus.CheckedIn ? (
                <Button
                  fullWidth
                  onClick={() => handleClickConfirmCheckIn(id)}
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
  }, [handleClickConfirmCheckIn, handleClickDecline, type]);

  const table = useReactTable({
    data: bookings,
    columns,
    state: {
      sorting,
    },
    enableSortingRemoval: false,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const selectedBooking = useMemo(
    () => (bookingId ? bookings.find((item) => item.id === bookingId)! : null),
    [bookingId, bookings]
  );

  return (
    <>
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
          <Text mb={33} pl={44} size={18}>
            {getLoungeTitle(loungeData)}
          </Text>
        </Box>
        <Flex justify="space-between" align="center">
          <Box>
            <Title size={24} weight={400} pb={8}>
              {tableTitle}
            </Title>
            <Text size={14} weight={600} color="#9B9CA0">
              {bookings.length ? `${bookings.length} bookings` : null}{' '}
              {lastUpdate && `Last updated ${lastUpdate}`}
            </Text>
          </Box>
          <Flex gap={24}>
            <TextInput
              miw={423}
              value={name}
              onChange={handleChangeName}
              styles={{
                rightSection: {},
              }}
              rightSection={<Magglass />}
              placeholder="Search for customer"
            />
            <DatePicker
              icon={<Calendar />}
              sx={({ colors }) => ({
                width: 224,
              })}
              placeholder="Pick a date"
              clearable
              valueFormat={DATE_FORMAT}
              defaultValue={date ? new Date(date as string) : undefined}
              onChange={handleChangeDate}
            />
          </Flex>
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
