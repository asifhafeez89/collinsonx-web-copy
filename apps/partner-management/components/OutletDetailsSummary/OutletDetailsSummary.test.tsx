import { render, screen } from '@collinsonx/design-system/test-utils';
import OutletDetailsSummary from './index';
import { ComponentProps } from 'react';
import { OutletCategory, ProductCategory } from '@collinsonx/utils';
import { toTitleCase } from 'utils/textUtils';

describe('OutletDetailsSummary', () => {
  const mockData: ComponentProps<typeof OutletDetailsSummary> = {
    locationType: OutletCategory.Airport,
    legacyCode: 'LHR10',
    code: '2E3FA1',
    productCategories: [ProductCategory.Eat, ProductCategory.Lounge],
    status: 'ACTIVE',
    primaryProductNames: ['Product 1', 'Product 2'],
    ancillaryProductNames: ['Product 3', 'Product 4'],
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
    expect(
      screen.getByText(toTitleCase(mockData.locationType))
    ).toBeInTheDocument();
    expect(screen.getByText(mockData.status)).toBeInTheDocument();
  });
});
