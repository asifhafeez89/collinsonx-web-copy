import { AncillaryProduct, Maybe, Product } from '@collinsonx/utils';
import { GroupedProducts } from 'types/GroupedProducts';
import formatCurrency from '@automattic/format-currency';

const notNull = (
  value: Maybe<Product> | Maybe<AncillaryProduct>
): value is Product | AncillaryProduct => !!value;

const isProduct = (value: Product | AncillaryProduct): value is Product =>
  value.hasOwnProperty('category');

export const getProductsTableByProgramme = (
  products: Array<Maybe<Product> | Maybe<AncillaryProduct>>
): GroupedProducts => {
  return products
    .filter(notNull)
    .flatMap((product) =>
      product.costs.map((cost) => ({
        ...product,
        cost,
        category: isProduct(product) ? product.category : 'Ancillary Product',
      }))
    )
    .reduce((groupedProducts: GroupedProducts, product) => {
      const { name, cost, salePrices, status, tier } = product;
      const programme = cost?.programme;

      if (!programme) {
        return groupedProducts;
      }

      groupedProducts[programme] = groupedProducts[programme] || [];
      groupedProducts[programme].push({
        category: product.category,
        name,
        tier: tier || 'N/A',
        status,
        salePrice: formatCurrency(
          salePrices[0]?.salePrice || 0,
          salePrices[0]?.salePriceCurrency || ''
        ),
        cost: formatCurrency(cost.cost || 0, cost.costCurrency || ''),
        tax: `${cost.defaultTaxPercentage}%`,
        costType: cost.type,
      });

      return groupedProducts;
    }, {});
};
