import { Table as MantineTable } from '@collinsonx/design-system/core';
import styled from '@collinsonx/design-system/styled';
import { Table, flexRender } from '@tanstack/react-table';

const StyledTable = styled(MantineTable)`
  color: #333333;
  border: 1px solid #e9e9e9;
  border-top: 0;
  tr {
    height: 78px;
  }
  thead tr {
    height: 50px;
    background: #eae1cc;
  }
  tbody {
    tr:nth-of-type(even) {
      background: #f7f7f7;
    }
  }

  thead th + th,
  thead tr th:last-child {
    border-left: 1px solid #dad1bb;
  }

  tbody tr td {
    border-top: 0;
  }
`;

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

const widthColMap = {
  checked_in: 234,
};

interface BookingsTableProps {
  table: Table<Booking>;
}

const BookingsTable = ({ table }: BookingsTableProps) => {
  return (
    <StyledTable>
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
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
};

export default BookingsTable;
