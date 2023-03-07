import Layout from '@components/Layout';
import bookingsMock from '../bookings.json';
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
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import BookingsTable from '@components/BookingsTable';
import Status from '@components/Status';
import { GetServerSideProps } from 'next';
import dayjs from 'dayjs';
import { BackArrow, Calendar } from '@collinsonx/design-system/assets/icons';
import Link from 'next/link';

const { bookings, lounge } = bookingsMock;

type Booking = {
  id: string;
  name: string;
  reservation_date: string;
  reservation_time: string;
  booking_status: string;
  adults: number;
  children: number;
  checked_in: boolean;
};

const columnHelper = createColumnHelper<Booking>();

const titleMap = {
  pending: 'Pending lounge booking management',
  confirmed: 'Confirmed lounge booking management',
  declined: 'Declined lounge booking management',
};

interface BookingsProps {
  type: 'pending' | 'confirmed' | 'declined';
}

const widthColMap = {
  checked_in: 234,
};

const DATE_FORMAT = 'DD/MM/YYYY';

export default function Bookings({ type }: BookingsProps) {
  const [data, setData] = useState(() => [...bookings]);
  const [date, setDate] = useState(dayjs(new Date()).format(DATE_FORMAT));
  const handleClickCheckIn = (id: string) => {};

  const title = titleMap[type];

  const handleChangeDate: ComponentProps<typeof DatePicker>['onChange'] = (
    date
  ) => {
    setDate(dayjs(date).format(DATE_FORMAT));
  };

  const columns = useMemo(
    () => [
      columnHelper.accessor('name', {
        header: 'Customer name',
        cell: (props) => props.getValue(),
      }),
      columnHelper.accessor('reservation_time', {
        header: 'Time of booking',
        cell: (props) => props.getValue(),
      }),
      columnHelper.display({
        header: 'Guests',
        cell: (props) => {
          const { adults, children } = props.row.original;
          return `${adults} adults, ${children} children`;
        },
      }),
      columnHelper.accessor('checked_in', {
        header: 'Check-In customer',
        cell: (props) => {
          return !props.getValue() ? (
            <Button
              sx={{ width: '100%' }}
              onClick={() => handleClickCheckIn(props.row.id)}
              variant="outline"
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
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  console.log(date, dayjs(date).format());

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
            value={dayjs(date).toDate()}
            onChange={handleChangeDate}
          />
        </Flex>
        {!bookings ? (
          <Text>No bookings found</Text>
        ) : (
          <BookingsTable>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      style={{
                        width:
                          widthColMap[header.id as keyof typeof widthColMap] ??
                          'auto',
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </BookingsTable>
        )}
      </Stack>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const type = ctx.params?.type as string;
  if (!titleMap[type as keyof typeof titleMap]) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      type,
    },
  };
};

Bookings.getLayout = (page: JSX.Element) => <Layout>{page}</Layout>;
