import { render, screen } from '@collinsonx/design-system/test-utils';
import OutletProducts from './index';
import {
  PrimaryProductAccessType,
  ProductCategory,
  ProductCostType,
  ProductStage,
  ProductStatus,
  Programme,
  Tier,
} from '@collinsonx/utils';

describe('OutletProducts', () => {
  const mockData = {
    ancillaryProducts: [
      {
        id: '123',
        name: 'ancillary-product-name',
        category: ProductCategory.Eat,
        tier: Tier.Gold,
        salesforceID: '3323',
        status: ProductStatus.Active,
        salePrices: [
          {
            programme: Programme.Pp,
            salePrice: 24,
            salePriceCurrency: 'GBP',
            stripePriceID: null,
          },
        ],
        costs: [
          {
            cost: 21.5,
            costCurrency: 'USD',
            programme: Programme.Pp,
            defaultTaxPercentage: 10,
            projectedCost: 0,
            reservationCost: 7,
            type: ProductCostType.Flat,
          },
        ],
      },
    ],
    products: [
      {
        id: '123',
        accessType: PrimaryProductAccessType.Reservation,
        salesforceID: '123',
        stage: ProductStage.Live,
        name: 'product-name',
        category: ProductCategory.Eat,
        tier: Tier.Gold,
        status: ProductStatus.Active,
        salePrices: [
          {
            programme: Programme.Pp,
            salePrice: 24,
            salePriceCurrency: 'GBP',
            stripePriceID: null,
          },
        ],
        costs: [
          {
            cost: 21.5,
            costCurrency: 'USD',
            programme: Programme.Pp,
            defaultTaxPercentage: 10,
            projectedCost: 0,
            reservationCost: 7,
            type: ProductCostType.Flat,
          },
        ],
      },
    ],
  };

  it('renders and displays Outlet Products table with 1 Primary Product and 1 Ancillary Product', () => {
    render(<OutletProducts {...mockData} />);
    expect(screen.getByText(mockData.products[0]?.name)).toBeInTheDocument();
    expect(
      screen.getByText(mockData.ancillaryProducts[0]?.name)
    ).toBeInTheDocument();
  });
});
