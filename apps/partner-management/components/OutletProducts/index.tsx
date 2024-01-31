import { Table, Tabs, Stack } from '@collinsonx/design-system/core';

import classes from './OutletProducts.module.css';
import { getProgrammeDisplayName } from 'utils/getProgrammeDisplayName';
import { getProductsTableByProgramme } from 'utils/getProductsTableByProgramme';
import { AncillaryProduct, Maybe, Product } from '@collinsonx/utils';
import Badge from '@collinsonx/design-system/components/badge';
import CollinsonViewOnlyNotice from '@collinsonx/design-system/components/collinsonViewOnlyNotice';
import { toTitleCase } from 'utils/textUtils';
import colors from '@collinsonx/design-system/colour-constants-partner';
import EditableArea from '@components/EditableArea';

export interface OutletsProductsProps {
  ancillaryProducts: Maybe<AncillaryProduct>[];
  products: Maybe<Product>[];
}

const OutletsProducts = ({
  ancillaryProducts,
  products,
}: OutletsProductsProps) => {
  const productsTableByProgramme = getProductsTableByProgramme([
    ...(products || []),
    ...(ancillaryProducts || []),
  ]);
  const programmes = Object.keys(productsTableByProgramme);
  const tableHeaders = [
    'Product type',
    'Product',
    'Tier',
    'Status',
    'Sale price*',
    'Cost*',
    'Tax*',
    'Type*',
  ];

  const renderTableRows = (programme: string) => {
    const tableData = productsTableByProgramme[programme];

    return tableData.map(
      (
        { category, name, tier, status, salePrice, cost, tax, costType },
        index
      ) => (
        <Table.Tr key={index}>
          <Table.Td>{toTitleCase(category)}</Table.Td>
          <Table.Td>{name}</Table.Td>
          <Table.Td>{toTitleCase(tier)}</Table.Td>
          <Table.Td>
            <Badge
              type={`${status === 'ACTIVE' ? 'active' : 'inactive'}`}
              size="large"
            >
              {status}
            </Badge>
          </Table.Td>
          <Table.Td>{salePrice}</Table.Td>
          <Table.Td>{cost}</Table.Td>
          <Table.Td>{tax}</Table.Td>
          <Table.Td>{toTitleCase(costType)}</Table.Td>
        </Table.Tr>
      )
    );
  };

  return (
    <EditableArea title="Products">
      <Stack>
        <Tabs
          color={colors['brand-collinson']}
          classNames={{ tab: classes.productTabs }}
          defaultValue={programmes[0]}
        >
          <Tabs.List>
            {programmes.map((programme) => (
              <Tabs.Tab value={programme} key={programme}>
                {getProgrammeDisplayName(programme)}
              </Tabs.Tab>
            ))}
          </Tabs.List>
          {programmes.map((programme) => (
            <Tabs.Panel value={programme} key={programme}>
              <Table.ScrollContainer minWidth={1140}>
                <Table className={classes.productTable}>
                  <Table.Thead>
                    <Table.Tr>
                      {tableHeaders.map((header) => (
                        <Table.Th key={header}>{header}</Table.Th>
                      ))}
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>{renderTableRows(programme)}</Table.Tbody>
                </Table>
              </Table.ScrollContainer>
            </Tabs.Panel>
          ))}
        </Tabs>
        <CollinsonViewOnlyNotice />
      </Stack>
    </EditableArea>
  );
};

export default OutletsProducts;
