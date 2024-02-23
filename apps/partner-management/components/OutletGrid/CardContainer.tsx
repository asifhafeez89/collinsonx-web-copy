import colors from '@collinsonx/design-system/colour-constants-partner';
import CardTitle from '@collinsonx/design-system/components/card/cardTitle';
import CardOutlet from '@collinsonx/design-system/components/cardOutlet';
import { Anchor, Button } from '@collinsonx/design-system/core';
import {
  Maybe,
  Outlet,
  PartnerBrand,
  ProductCategory,
  Status,
} from '@collinsonx/utils';
import Link from 'next/link';
import { MouseEventHandler, useState } from 'react';

import classes from './OutletGrid.module.css';
import outletIcons, { ValidProductCategory } from 'config/outletIcons';
import { toTitleCase } from 'utils/textUtils';
import { OutletLoungeIcon } from '@collinsonx/design-system/assets/icons';
import clsx from 'clsx';

export interface CardContainerProps {
  item: Maybe<Outlet>;
  index: number;
  partnerBrand?: PartnerBrand;
  onClick: (id: string) => void;
}
const CardContainer = ({
  item,
  partnerBrand,
  index,
  onClick = (id: string) => {},
}: CardContainerProps) => {
  const [hovered, setHovered] = useState(false);
  const {
    id,
    name,
    legacyCode,
    partnerBrand: outletPartnerBrand,
    status = Status.Active,
    location,
    productCategories,
    content,
  } = item || {};
  const outletUrl = `/outlets/${id}`;

  const partner = partnerBrand || outletPartnerBrand;

  const handleClickLink: MouseEventHandler<HTMLElement> = (e) => {
    e.stopPropagation();
  };
  const handleMouseEnter = () => {
    setHovered(true);
  };
  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <CardOutlet
      data-testid="outlet-card"
      index={index}
      key={index}
      parentSection={
        partner ? (
          <Anchor
            classNames={{
              root: clsx(classes.partnerAnchorRoot, {
                [classes.partnerAnchorUnderline]: hovered,
              }),
            }}
            component={Link}
            href={`/outlets?partner=${partner.id}`}
            onClick={handleClickLink}
            data-testid="outlet-card-partner-name"
          >
            {partner?.name}
          </Anchor>
        ) : undefined
      }
      imageCount={
        content?.media?.mediaCollection?.items.filter((item) =>
          item?.contentType?.includes('image/')
        ).length
      }
      imageUrl={content?.media?.mainImage?.url ?? undefined}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => {
        if (id) {
          onClick(id);
        }
      }}
      title={
        <Anchor
          className={classes.titleAnchor}
          component={Link}
          href={outletUrl}
        >
          <CardTitle data-testid={'outlet-card-title'}>{name}</CardTitle>
        </Anchor>
      }
      legacyCode={legacyCode ?? undefined}
      locationName={location?.name ?? undefined}
      terminal={location?.terminal ?? undefined}
      productCategories={
        productCategories
          ? productCategories
              .filter(
                (
                  productCategory: ValidProductCategory | null
                ): productCategory is ValidProductCategory =>
                  productCategory !== null
              )
              .map((productCategory) => {
                const Icon =
                  outletIcons[productCategory as ProductCategory] ??
                  OutletLoungeIcon;
                return {
                  label: toTitleCase(productCategory as ProductCategory),
                  IconComponent: (
                    <Icon width={24} height={24} aria-hidden={true} />
                  ),
                };
              })
          : []
      }
      status={status}
    >
      <Button
        aria-hidden="true"
        variant="outline"
        tabIndex={-1}
        component={Link}
        href={outletUrl}
        data-testid={'view-details-button'}
      >
        View details
      </Button>
    </CardOutlet>
  );
};

export default CardContainer;
