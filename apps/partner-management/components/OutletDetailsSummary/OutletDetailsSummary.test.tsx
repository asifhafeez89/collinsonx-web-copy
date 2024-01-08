import { render, screen } from '@collinsonx/design-system/test-utils';
import OutletDetailsSummary from './index';
import { ComponentProps } from 'react';

describe('OutletDetailsSummary', () => {
  const mockData: ComponentProps<typeof OutletDetailsSummary> = {
    locationType: 'Type',
    legacyCode: 'Code',
    code: 'Outlet',
    tags: ['EAT', 'LOUNGE'],
    status: 'ACTIVE',
    primaryProducts: ['Product 1', 'Product 2'],
    disabledAccess: true,
    email: 'test@gmail.com',
    lastEditedDate: '2021-06-29T09:50:00.000Z',
    editor: {
      firstName: 'John',
      lastName: 'Doe',
      organisation: 'Test Org',
    },
  };

  it('renders and displays correct data', () => {
    render(<OutletDetailsSummary {...mockData} />);
    expect(screen.getByText(mockData.locationType)).toBeInTheDocument();
    expect(screen.getByText(mockData.status)).toBeInTheDocument();
  });
});
