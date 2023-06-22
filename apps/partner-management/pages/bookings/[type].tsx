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
  cancelBooking as cancelBookingMutation,
} from '@collinsonx/utils/mutations';
import Error from '@components/Error';
import DetailsPendingActions from '@components/Details/DetailsPendingActions';
import { PageType } from 'config/booking';
import { GetServerSideProps } from 'next';
import { expandDate, isErrorValid } from 'lib';
import { useRouter } from 'next/router';
import getSelectedLounge from 'lib/getSelectedLounge';
import getLoungeTitle from 'lib/getLoungeTitle';
import { useSessionContext } from 'supertokens-auth-react/recipe/session';
import { AppSession } from 'types/Session';
import DetailsConfirmedActions from '@components/Details/DetailsConfirmedActions';
import { Modal } from '@collinsonx/design-system/core';
import Details from '@components/Details';

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

  let session = useSessionContext() as AppSession;

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
  const [checkIn, setCheckIn] = useState(false);
  const [search, setSearch] = useState((router.query.search as string) ?? '');

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
    if (search && result) {
      result = {
        getBookings: result.getBookings.filter((item) => {
          return (
            (item.consumer?.fullName ?? '')
              .toLowerCase()
              .includes((search ?? '').trim().toLowerCase()) ||
            (item.id ?? '').toLowerCase() ===
              (search ?? '').trim().toLowerCase()
          );
        }),
      };
    }
    return result;
  }, [date, search, dataBookings]);

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

  const isSuperUser = useMemo(
    () => (session.accessTokenPayload ?? {}).userType === 'SUPER_USER',
    [session]
  );

  const handleClickDecline = useCallback(
    (id: string) => {
      declineBooking({
        variables: { declineBookingId: id },
        onCompleted: () => {
          refetchBookings();
        },
      });
    },
    [declineBooking, refetchBookings]
  );

  const handleClickCheckIn = (id: string) => {
    setBookingId(id);
  };

  const handleClickCancel = useCallback(
    (id: string) => {
      confirmBooking({
        variables: { cancelBookingId: id },
        onCompleted: () => {
          refetchBookings();
        },
      });
    },
    [confirmBooking, refetchBookings]
  );

  const handleClickConfirm = useCallback(
    (id: string) => {
      confirmBooking({
        variables: { confirmBookingId: id },
        onCompleted: () => {
          refetchBookings();
        },
      });
    },
    [confirmBooking, refetchBookings]
  );

  const handleClickConfirmCheckIn = useCallback(() => {
    setBookingId(null);
    checkInBooking({
      variables: { checkinBookingId: bookingId },
      onCompleted: () => {
        refetchBookings();
      },
    });
  }, [checkInBooking, refetchBookings, bookingId]);

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
    const search = e.target.value;
    setSearch(search);
    router.replace(
      {
        query: { ...router.query, search: (search ?? '').trim() },
      },
      undefined,
      { shallow: true }
    );
  };

  const handleChangeCheckIn = useCallback(
    (value: boolean) => {
      setCheckIn(value);
    },
    [setCheckIn]
  );

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
      columnHelper.accessor('id', {
        id: 'id',
        header: 'Booking ID',
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
          header: type === 'pending' ? 'Process request' : 'Process booking',
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
              return (
                <Flex h={70} align="center" gap={24}>
                  {isSuperUser && status === BookingStatus.Confirmed ? (
                    <Button
                      variant="default"
                      onClick={() => handleClickCancel(id)}
                    >
                      Cancel
                    </Button>
                  ) : null}
                  {status !== BookingStatus.CheckedIn ? (
                    <Button
                      w={180}
                      fullWidth
                      onClick={() => handleClickCheckIn(id)}
                      variant="default"
                    >
                      Check customer in
                    </Button>
                  ) : (
                    <Status type="success">Checked in</Status>
                  )}
                </Flex>
              );
            }
          },
        })
      );
    }
    return mainColumns;
  }, [
    isSuperUser,
    handleClickCheckIn,
    handleClickConfirm,
    handleClickCancel,
    handleClickDecline,
    type,
  ]);

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
    () =>
      bookingId ? bookings.find((item) => item.id === bookingId)! : undefined,
    [bookingId, bookings]
  );

  const handleCloseModal = useCallback(() => {
    setCheckIn(false);
    setBookingId(null);
  }, [setCheckIn, setBookingId]);

  return (
    <>
      <Modal
        opened={bookingId !== null}
        onClose={handleCloseModal}
        sx={{
          '.mantine-Modal-content': {
            flex: 'none',
          },
        }}
        styles={{
          close: {
            color: '#000',
          },
          content: {
            flex: 'none',
          },
        }}
      >
        <Details booking={selectedBooking}>
          <DetailsConfirmedActions
            checkIn={checkIn}
            onClickConfirmCheckIn={handleClickConfirmCheckIn}
            onChangeCheckIn={handleChangeCheckIn}
          />
        </Details>
      </Modal>
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
            </Text>
            {lastUpdate && (
              <Text
                size={14}
                weight={600}
                color="#9B9CA0"
              >{`Last updated ${lastUpdate}`}</Text>
            )}
          </Box>
          <Flex gap={24}>
            <TextInput
              miw={423}
              value={search}
              onChange={handleChangeName}
              styles={{
                rightSection: {},
              }}
              rightSection={<Magglass />}
              placeholder="Search for Customer or Booking ID"
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
