import Layout from '@components/Layout';
import bookingsMock from './bookings.json';
import { useMemo, useState } from 'react';
import { Title, Text } from '@collinsonx/design-system/core';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import ButtonAction from '@components/ButtonAction';
import BookingsTable from '@components/BookingsTable';
import BookingStatus, { Status } from '@components/BookingStatus';

const { bookings, lounge } = bookingsMock;

type Booking = {
  id: string;
  name: string;
  reservation_date: string;
  reservation_time: string;
  booking_status: string;
};

const columnHelper = createColumnHelper<Booking>();

export default function PartnerManagement() {
  const [data, setData] = useState(() => [...bookings]);
  const handleClickCheckIn = (id: string) => {};

  const columns = useMemo(
    () => [
      columnHelper.accessor('name', {
        header: 'Customer name',
        cell: (booking) => booking.getValue(),
      }),
      columnHelper.accessor('reservation_date', {
        header: 'Date of booking',
        cell: (booking) => booking.getValue(),
      }),
      columnHelper.accessor('reservation_time', {
        header: 'Time of booking',
        cell: (booking) => booking.getValue(),
      }),
      columnHelper.accessor('booking_status', {
        header: 'Booking status',
        cell: (booking) => (
          <BookingStatus status={booking.getValue() as Status} />
        ),
      }),
      columnHelper.display({
        id: 'action',
        header: 'Action',
        cell: (props) => (
          <ButtonAction onClick={() => handleClickCheckIn(props.row.id)}>
            Check in customer
          </ButtonAction>
        ),
      }),
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <Title mb={8} size={32}>
        Lounge booking management
      </Title>
      <Text mb={33} size={18}>
        {lounge.name}
      </Text>
      {!bookings ? (
        <Text>No bookings found</Text>
      ) : (
        <BookingsTable>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </BookingsTable>
      )}
    </>
  );
}

PartnerManagement.getLayout = (page: JSX.Element) => <Layout>{page}</Layout>;
