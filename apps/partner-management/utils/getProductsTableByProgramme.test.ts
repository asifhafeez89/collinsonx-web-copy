import { getProductsTableByProgramme } from './getProductsTableByProgramme';
import {
  PrimaryProductAccessType,
  Product,
  ProductCategory,
  ProductCostType,
  ProductStage,
  ProductStatus,
  Programme,
} from '@collinsonx/utils';

describe('getProductsTableByProgramme', () => {
  it('should return an empty object for an empty products array', () => {
    const input: Product[] = [];
    const expected = {};
    expect(getProductsTableByProgramme(input)).toEqual(expected);
  });

  it('should group a single product by programme and format currency correctly', () => {
    const input: Product[] = [
      {
        id: '123',
        accessType: PrimaryProductAccessType.Reservation,
        costs: [
          {
            programme: Programme.Lk,
            costCurrency: 'USD',
            cost: 100,
            defaultTaxPercentage: 10,
            reservationCost: 0,
            type: ProductCostType.Flat,
          },
        ],
        category: ProductCategory.Eat,
        name: 'ProductA',
        stage: ProductStage.Live,
        salesforceID: '2134',
        salePrices: [
          { salePriceCurrency: 'USD', salePrice: 90, programme: Programme.Lk },
        ],
        status: ProductStatus.Active,
      },
    ];

    const expected = {
      [Programme.Lk]: [
        {
          category: 'EAT',
          cost: '$100.00',
          costType: 'FLAT',
          name: 'ProductA',
          salePrice: '$90.00',
          status: 'ACTIVE',
          tax: '10%',
          tier: 'N/A',
        },
      ],
    };

    expect(getProductsTableByProgramme(input)).toEqual(expected);
  });

  it('should group multiple products by programme when they have same programme', () => {
    const input: Product[] = [
      {
        id: '123',
        accessType: PrimaryProductAccessType.Reservation,
        costs: [
          {
            programme: Programme.Lk,
            costCurrency: 'USD',
            cost: 100,
            defaultTaxPercentage: 10,
            reservationCost: 0,
            type: ProductCostType.Flat,
          },
        ],
        category: ProductCategory.Eat,
        name: 'ProductA',
        stage: ProductStage.Live,
        salesforceID: '2134',
        salePrices: [
          { salePriceCurrency: 'USD', salePrice: 90, programme: Programme.Lk },
        ],
        status: ProductStatus.Active,
      },
      {
        id: '2345',
        accessType: PrimaryProductAccessType.WalkUp,
        costs: [
          {
            programme: Programme.Lk,
            costCurrency: 'USD',
            cost: 100,
            defaultTaxPercentage: 10,
            reservationCost: 0,
            type: ProductCostType.Flat,
          },
        ],
        category: ProductCategory.Eat,
        name: 'ProductB',
        stage: ProductStage.Live,
        salesforceID: '2134',
        salePrices: [
          { salePriceCurrency: 'USD', salePrice: 90, programme: Programme.Lk },
        ],
        status: ProductStatus.Active,
      },
    ];

    const expected = {
      [Programme.Lk]: [
        {
          category: 'EAT',
          cost: '$100.00',
          costType: 'FLAT',
          name: 'ProductA',
          salePrice: '$90.00',
          status: 'ACTIVE',
          tax: '10%',
          tier: 'N/A',
        },
        {
          category: 'EAT',
          cost: '$100.00',
          costType: 'FLAT',
          name: 'ProductB',
          salePrice: '$90.00',
          status: 'ACTIVE',
          tax: '10%',
          tier: 'N/A',
        },
      ],
    };

    expect(getProductsTableByProgramme(input)).toEqual(expected);
  });

  it('should group multiple products by programme when they have different programmes', () => {
    const input: Product[] = [
      {
        id: '123',
        accessType: PrimaryProductAccessType.Reservation,
        costs: [
          {
            programme: Programme.Lk,
            costCurrency: 'USD',
            cost: 100,
            defaultTaxPercentage: 10,
            reservationCost: 0,
            type: ProductCostType.Flat,
          },
        ],
        category: ProductCategory.Eat,
        name: 'ProductA',
        stage: ProductStage.Live,
        salesforceID: '2134',
        salePrices: [
          { salePriceCurrency: 'USD', salePrice: 90, programme: Programme.Lk },
        ],
        status: ProductStatus.Active,
      },
      {
        id: '2345',
        accessType: PrimaryProductAccessType.WalkUp,
        costs: [
          {
            programme: Programme.Lk,
            costCurrency: 'USD',
            cost: 100,
            defaultTaxPercentage: 10,
            reservationCost: 0,
            type: ProductCostType.Flat,
          },
        ],
        category: ProductCategory.Eat,
        name: 'ProductB',
        stage: ProductStage.Live,
        salesforceID: '2134',
        salePrices: [
          { salePriceCurrency: 'USD', salePrice: 90, programme: Programme.Lk },
        ],
        status: ProductStatus.Active,
      },
      {
        id: '2344',
        accessType: PrimaryProductAccessType.WalkUp,
        costs: [
          {
            programme: Programme.Pp,
            costCurrency: 'USD',
            cost: 100,
            defaultTaxPercentage: 10,
            reservationCost: 0,
            type: ProductCostType.Flat,
          },
        ],
        category: ProductCategory.Eat,
        name: 'ProductC',
        stage: ProductStage.Live,
        salesforceID: '2134',
        salePrices: [
          { salePriceCurrency: 'USD', salePrice: 90, programme: Programme.Pp },
        ],
        status: ProductStatus.Active,
      },
    ];

    const expected = {
      [Programme.Lk]: [
        {
          category: 'EAT',
          cost: '$100.00',
          costType: 'FLAT',
          name: 'ProductA',
          salePrice: '$90.00',
          status: 'ACTIVE',
          tax: '10%',
          tier: 'N/A',
        },
        {
          category: 'EAT',
          cost: '$100.00',
          costType: 'FLAT',
          name: 'ProductB',
          salePrice: '$90.00',
          status: 'ACTIVE',
          tax: '10%',
          tier: 'N/A',
        },
      ],
      [Programme.Pp]: [
        {
          category: 'EAT',
          cost: '$100.00',
          costType: 'FLAT',
          name: 'ProductC',
          salePrice: '$90.00',
          status: 'ACTIVE',
          tax: '10%',
          tier: 'N/A',
        },
      ],
    };

    expect(getProductsTableByProgramme(input)).toEqual(expected);
  });
});
