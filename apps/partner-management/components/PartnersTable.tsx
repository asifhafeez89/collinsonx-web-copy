import { PartnerBrand } from '@collinsonx/utils';
import { Table as MantineTable } from '@collinsonx/design-system/core';
import { Table as ReactTable, flexRender } from '@tanstack/react-table';
import colors from '@collinsonx/design-system/colour-constants-partner';
import classes from './PartnersTable.module.css';

interface PartnersTableProps {
  table: ReactTable<Partial<PartnerBrand>>;
  columnsAlignment?: Record<
    string,
    'center' | 'left' | 'right' | 'justify' | 'char'
  >;
}

function Table({
  table,
  columnsAlignment: alignColumns = {},
}: PartnersTableProps) {
  return (
    <MantineTable.ScrollContainer minWidth={767}>
      <MantineTable data-testid="partners-table">
        <table className={classes.table}>
          <thead className={classes.thead}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    align={alignColumns[header.column.id]}
                    className={classes.th}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, index) => (
              <tr key={row.id} data-testid="partner-row" className={classes.tr}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    align={alignColumns[cell.column.id]}
                    data-testid={`partner-row-${cell.column.id}-${index}`}
                    className={classes.td}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </MantineTable>
    </MantineTable.ScrollContainer>
  );
}

export default Table;
