import {
  TriangleDown,
  TriangleUp,
} from '@collinsonx/design-system/components/table/index';
import { Box, Table as MTable } from '@collinsonx/design-system/core';
import styled from '@collinsonx/design-system/styled';
import { Table as ReactTable, flexRender } from '@tanstack/react-table';
import { PageType, bookingPageConfig } from 'config/booking';

const CustomTable = ({
  headerBg,
  ...props
}: {
  headerBg: string;
  children: JSX.Element[];
}) => <MTable {...props} />;

const StyledTable = styled(CustomTable)`
  color: #333333;
  border: 1px solid #e9e9e9;
  border-top: 0;
  tr {
    height: 78px;
  }
  thead tr {
    height: 50px;
    background: ${(props) => props.headerBg};
  }
  tbody {
    tr:nth-of-type(even) {
      background: #f9f9f9;
    }
    tr:hover {
      background: #ededed;
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

interface BookingsTableProps<T> {
  table: ReactTable<T>;
  type: PageType;
  widthColMap?: Record<string, number>;
}

function Table<T extends unknown>({
  table,
  type,
  widthColMap = {},
}: BookingsTableProps<T>) {
  return (
    <StyledTable
      headerBg={bookingPageConfig[type as keyof typeof bookingPageConfig].color}
    >
      <MTable.Thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <MTable.Tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <MTable.Th
                key={header.id}
                style={{
                  width:
                    widthColMap[header.id as keyof typeof widthColMap] ??
                    'auto',
                }}
              >
                <Box
                  {...{
                    style: {
                      cursor: header.column.getCanSort() ? 'pointer' : 'auto',
                    },
                    onClick: header.column.getToggleSortingHandler(),
                  }}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}

                  <span style={{ paddingLeft: 8 }}>
                    {{
                      asc: <TriangleUp color="#000" />,
                      desc: <TriangleDown color="#000" />,
                    }[header.column.getIsSorted() as string] ?? null}
                  </span>
                </Box>
              </MTable.Th>
            ))}
          </MTable.Tr>
        ))}
      </MTable.Thead>
      <MTable.Tbody>
        {table.getRowModel().rows.map((row) => (
          <MTable.Tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <MTable.Td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </MTable.Td>
            ))}
          </MTable.Tr>
        ))}
      </MTable.Tbody>
    </StyledTable>
  );
}

export default Table;
