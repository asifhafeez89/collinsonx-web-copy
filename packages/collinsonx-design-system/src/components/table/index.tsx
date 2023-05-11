import { useMemo, useState } from 'react';
import {
  useReactTable,
  getSortedRowModel,
  createColumnHelper,
  getCoreRowModel,
  SortingState,
  flexRender,
  FilterFn,
} from '@tanstack/react-table';

import { rankItem } from '@tanstack/match-sorter-utils';

import {
  Stack,
  Grid,
  Input,
  Table,
  Tooltip,
  Button,
  Checkbox,
  Flex,
} from '../../core';
import { Magglass } from '../../assets/icons';

const TableX = () => {
  const [globalFilter, setGlobalFilter] = useState('');
  type Item = {
    partnerName: string;
    loungeUID: string;
    country: string;
    airport: string;
    terminal: string;
    progress: number;
    invite?: boolean;
  };

  const columnHelper = createColumnHelper<Item>();

  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo(
    () => [
      columnHelper.accessor('partnerName', {
        header: 'PartnerName',
      }),
      columnHelper.accessor('loungeUID', {
        header: 'Lounge UID',
      }),
      columnHelper.accessor('country', {
        header: 'Country',
      }),
      columnHelper.accessor('airport', {
        header: 'Airport',
      }),
      columnHelper.accessor('terminal', {
        header: 'Terminal',
      }),
      columnHelper.accessor('invite', {
        header: 'Invite',
      }),
      columnHelper.accessor('signedIn', {
        header: 'Signed In',
      }),
    ],
    []
  );

  const data = useMemo(
    () => [
      {
        age: 22,
        partnerName: 'AMEX',
        loungeUID: '12345',
        country: 'UK',
        airport: 'Heathrow',
        terminal: 'T5',
        invite: true,
        signedIn: true,
      },
      {
        age: 2,
        partnerName: 'SCODA',
        loungeUID: '133234',
        country: 'USA',
        airport: 'JFK',
        terminal: 'T2',
        invite: true,
        signedIn: false,
      },
    ],
    []
  );

  const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    // Rank the item
    const itemRank = rankItem(row.getValue(columnId), value);

    // Store the itemRank info
    addMeta({
      itemRank,
    });

    // Return if the item should be filtered in/out
    return itemRank.passed;
  };

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });

  return (
    <Stack>
      <Grid>
        <Grid.Col span={1}>
          <Checkbox sx={{ marginTop: '10px' }} />
        </Grid.Col>
        <Grid.Col span={2}>
          <Button>Send</Button>
        </Grid.Col>
        <Grid.Col span={3} offset={6}>
          <Input
            placeholder="Search by partner or by UID"
            value={globalFilter ?? ''}
            onChange={(value) => setGlobalFilter(String(value.target.value))}
            rightSection={
              <div>
                <Magglass
                  size="0.5rem"
                  style={{ display: 'block', opacity: 0.5 }}
                />
              </div>
            }
          />
        </Grid.Col>
      </Grid>
      <Table>
        <thead style={{ background: '#0C8599' }}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  style={{ color: '#FFFFFF' }}
                >
                  {header.isPlaceholder ? null : (
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? 'cursor-pointer select-none'
                          : '',
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: ' 🔼',
                        desc: ' 🔽',
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table
            .getRowModel()
            .rows.slice(0, 10)
            .map((row) => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
        </tbody>
      </Table>
    </Stack>
  );
};

export default TableX;
