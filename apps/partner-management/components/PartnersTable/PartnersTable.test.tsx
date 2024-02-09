import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Table from '@components/PartnersTable';
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { PartnerBrand } from '@collinsonx/utils';
import { MantineProvider } from '@collinsonx/design-system/core';

describe('PartnersTable', () => {
  it('renders the table with data', () => {
    const columnHelper = createColumnHelper<Partial<PartnerBrand>>();

    const partner = {
      id: '1',
      name: 'test partner',
      outlets: [{ id: '1' }],
    } as Partial<PartnerBrand>;

    const columns = [
      columnHelper.accessor('name', {
        id: 'name',
        header: 'Partner',
      }),
      columnHelper.accessor('outlets', {
        id: 'outlets',
        header: 'Number of outlets',
        cell: (props) => props.getValue()?.length || 0,
      }),
    ];

    const TableWrapper = () => {
      const table = useReactTable({
        data: [partner],
        columns,
        getCoreRowModel: getCoreRowModel(),
      });

      return (
        <MantineProvider>
          <Table table={table} />
        </MantineProvider>
      );
    };

    render(<TableWrapper />);

    expect(screen.getByText(partner.name!)).toBeInTheDocument();
    expect(screen.getByText(partner.outlets!.length)).toBeInTheDocument();
  });
});
