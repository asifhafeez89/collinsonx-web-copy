import { SimpleGrid } from '@collinsonx/design-system/core';
import { Maybe, Outlet, PartnerBrand } from '@collinsonx/utils';
import classes from './OutletGrid.module.css';
import CardContainer from './CardContainer';

export interface OutletGridProps {
  outlets: Maybe<Outlet>[];
  onClickOutlet?: (id: string) => void;
  partnerBrand?: PartnerBrand;
}
const OutletGrid = ({
  outlets = [],
  onClickOutlet = (id: string) => {},
  partnerBrand,
}: OutletGridProps) => {
  return (
    <SimpleGrid spacing={24} className={classes.grid}>
      {outlets.map((item, index) => (
        <CardContainer
          partnerBrand={partnerBrand}
          onClick={onClickOutlet}
          item={item}
          index={index}
        />
      ))}
    </SimpleGrid>
  );
};

export default OutletGrid;
