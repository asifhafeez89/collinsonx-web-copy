import { useMemo, useRef, useState } from 'react';
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
  Button,
  Checkbox,
  Box,
  Flex,
} from '../../core';

import styled from '@emotion/styled';

import { Magglass, RedCircle, GreenCircle } from '../../assets/icons';

const TriangleUp = styled('div')`
  display: inline-block;
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 9px solid #fff;
`;

const TriangleDown = styled('div')`
  display: inline-block;
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 9px solid #fff;
`;

const mockedData = [
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
];

const TableX = () => {
  const [globalFilter, setGlobalFilter] = useState('');
  type Item = {
    partnerName: string;
    loungeUID: string;
    country: string;
    airport: string;
    terminal: string;
    invite: boolean;
    signedIn: boolean;
  };

  const columnHelper = createColumnHelper<Item>();
  const editableKeyToFocus = useRef(null);

  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'partnerName', desc: true },
  ]);

  const columns = useMemo(
    () => [
      columnHelper.display({
        header: ' ',
        cell: ({ row }) => (
          <Checkbox
            pl={6}
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />
        ),
      }),
      columnHelper.accessor('partnerName', {
        header: 'Partner name',
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
        cell: (props) =>
          props.getValue() === true ? (
            <>
              <GreenCircle /> Sent
            </>
          ) : (
            <>
              <RedCircle /> No
            </>
          ),
      }),
      columnHelper.accessor('signedIn', {
        header: 'Signed in',
        cell: (props) =>
          props.getValue() === true ? (
            <>
              <GreenCircle /> Yes
            </>
          ) : (
            <>
              <RedCircle /> No
            </>
          ),
      }),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const data = useMemo(
    () =>
      globalFilter === ''
        ? mockedData
        : mockedData.filter(
            (item) =>
              item.partnerName
                .toLowerCase()
                .includes(globalFilter.toLowerCase()) ||
              item.loungeUID.toLowerCase().includes(globalFilter.toLowerCase())
          ),
    [globalFilter]
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
      rowSelection,
    },
    enableSortingRemoval: false,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    globalFilterFn: fuzzyFilter,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <Stack spacing={24}>
      <Flex direction="row" justify="space-between">
        <Flex align="center" gap={32}>
          <Checkbox
            pl={16}
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
          <Button disabled={Object.keys(rowSelection).length === 0}>
            Send invite
          </Button>
        </Flex>
        <Input
          styles={{ input: { borderRadius: 4 } }}
          sx={{ minWidth: 239 }}
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
      </Flex>
      <Table>
        <thead style={{ background: '#0C8599' }}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  style={{
                    color: '#FFFFFF',
                    fontWeight: 400,
                    userSelect: 'none',
                  }}
                >
                  {header.isPlaceholder ? null : (
                    <Box
                      {...{
                        sx: {
                          cursor: header.column.getCanSort()
                            ? 'pointer'
                            : 'auto',
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
                          asc: <TriangleUp />,
                          desc: <TriangleDown />,
                        }[header.column.getIsSorted() as string] ?? null}
                      </span>
                    </Box>
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
