import Table from './Table';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import {
  Table as ReactTable,
  RowModel,
  useReactTable,
} from '@tanstack/react-table';

jest.mock('@collinsonx/design-system/components/table/index', () => {
  return {
    __esModule: true,
    TriangleDown: () => [],
    TriangleUp: () => [],
  };
});
jest.mock('@tanstack/react-table', () => {
  return {
    __esModule: true,
    useReactTable: () => ({
      getHeaderGroups: () => {
        return [];
      },
      getRowModel: () => {
        return {
          rows: [
            {
              id: '123',
              getVisibleCells: () => {
                return [
                  {
                    id: '23',
                    column: {
                      columnDef: {
                        cell: 2,
                      },
                    },
                    getContext: () => [],
                  },
                ];
              },
            },
          ],
        };
      },
    }),
    flexRender: () => [],
  };
});
describe('<type />', () => {
  it('should render', () => {
    const table = useReactTable({
      data: [
        {
          __typename: 'Booking',
          bookedFrom: '2023-08-23 10:44:24.431',
          bookedTo: '2023-08-23 12:44:24.431',
          createdAt: '2023-08-21T09:44:24.624Z',
          type: 'RESERVATION',
          metadata: {},
          id: '64e331f825b764f3c583d509',
          reference: 'K3N6H6',
          guestAdultCount: 1,
          guestChildrenCount: 1,
          guestInfantCount: 1,
          status: 'DECLINED',
          updatedAt: '2023-09-05T13:24:22.772Z',
          consumer: {
            __typename: 'Consumer',
            emailAddress:
              'automationconsumertest@collinsonxteam.testinator.com',
            firstName: 'Automation',
            fullName: 'Automation Consumer',
            id: 'd1a9234f-3210-4673-8d15-0d2f360b639e',
          },
          experience: {
            __typename: 'Experience',
            id: '1ccc3807-a7ed-5a3a-ada8-fd37ac1ab941',
            loungeName: 'Clubrooms Birmingham',
          },
          _id: 'K3N6H6',
          arrivalDate: '2023-08-23',
          arrivalTime: '10:44',
        },
      ],
      getCoreRowModel: function (table: ReactTable<any>): () => RowModel<any> {
        throw new Error('Function not implemented.');
      },
      columns: [
        {
          id: 'fullName',
          header: 'Customer name',
          accessorKey: 'consumer.fullName',
        },
        {
          id: '_id',
          header: 'Booking reference',
          accessorKey: '_id',
        },
        {
          header: 'Type',
          id: 'type',
          accessorKey: 'type',
        },
        {
          header: 'Arrival date',
          id: 'arrivalDate',
          accessorKey: 'arrivalDate',
        },
        {
          header: 'Arrival time',
          id: 'arrivalTime',
          accessorKey: 'arrivalTime',
        },
        {
          header: 'Guests',
          id: 'guestCount',
          accessorKey: 'guestCount',
        },
      ],
    });
    const component = render(<Table table={table} type={'pending'} />);

    expect(component).toMatchSnapshot();
  });
});
