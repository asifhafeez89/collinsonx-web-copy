import React from 'react';
import { List } from '@mantine/core';
import CardList from '../card/cardList';
import FieldIcon, { FieldIconProps } from '../fieldIcon';

type ProductCategory = {
  label: string;
  IconComponent: React.ReactNode;
};

type ProductCategoriesListProps = {
  productCategories: ProductCategory[];
  listStyleType?: string;
  ariaLabel?: string;
  textPosition?: FieldIconProps['textPosition'];
};

const ProductCategoriesList = ({
  productCategories,
  listStyleType = 'none',
  ariaLabel = 'Experiences',
  textPosition = 'bottom',
}: ProductCategoriesListProps) => {
  return (
    <CardList listStyleType={listStyleType} aria-label={ariaLabel}>
      {productCategories.map(({ label, IconComponent }, index) => (
        <List.Item key={index}>
          <FieldIcon text={label} textPosition={textPosition}>
            {IconComponent}
          </FieldIcon>
        </List.Item>
      ))}
    </CardList>
  );
};

export default ProductCategoriesList;
