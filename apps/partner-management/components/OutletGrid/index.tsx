import Link from 'next/link';
import { OutletLoungeIcon } from '@collinsonx/design-system/assets/icons';
import { Status } from '@collinsonx/design-system/components/card';
import CardTitle from '@collinsonx/design-system/components/card/cardTitle';
import CardOutlet from '@collinsonx/design-system/components/cardOutlet';
import { Anchor, Button, SimpleGrid } from '@collinsonx/design-system/core';
import { Maybe, Outlet, OutletStatus } from '@collinsonx/utils';
import outletIcons, { ValidTag } from 'config/outletIcons';
import { toTitleCase } from 'utils/textUtils';

import classes from './OutletGrid.module.css';

export interface OutletGridProps {
  outlets: Maybe<Outlet>[];
  onClickOutlet?: (id: string) => void;
}
const OutletGrid = ({
  outlets = [],
  onClickOutlet = (id: string) => {},
}: OutletGridProps) => {
  return (
    <SimpleGrid spacing={24} className={classes.grid}>
      {outlets.map((item, index) => {
        const { id, name, legacyCode, status, location, tags, content } =
          item || {};
        const outletUrl = `/outlets/${id}`;

        return (
          <CardOutlet
            data-testid="outlet-card"
            index={index}
            key={index}
            imageCount={
              content?.media?.mediaCollection?.items.filter((item) =>
                item?.contentType?.includes('image/')
              ).length
            }
            imageUrl={content?.media?.mainImage?.url ?? undefined}
            onClick={() => {
              if (id) {
                onClickOutlet(id);
              }
            }}
            title={
              <Anchor
                className={classes.titleAnchor}
                component={Link}
                href={outletUrl}
              >
                <CardTitle data-testid={`outlet-card-title-${index}`}>
                  {name}
                </CardTitle>
              </Anchor>
            }
            workflowStage={{ type: 'draft', label: 'Draft' }}
            legacyCode={legacyCode ?? undefined}
            locationName={location?.name ?? undefined}
            terminal={location?.terminal ?? undefined}
            productCategories={
              tags
                ? tags
                    .filter((tag): tag is ValidTag => tag !== null)
                    .map((tag) => {
                      const Icon = outletIcons[tag] ?? OutletLoungeIcon;
                      return {
                        label: toTitleCase(tag),
                        IconComponent: (
                          <Icon width={24} height={24} aria-hidden={true} />
                        ),
                      };
                    })
                : []
            }
            status={
              status === OutletStatus.Live ? Status.Active : Status.Inactive
            }
          >
            <Button
              aria-hidden="true"
              variant="outline"
              tabIndex={-1}
              component={Link}
              href={outletUrl}
              data-testid={`view-details-button-${index}`}
            >
              View details
            </Button>
          </CardOutlet>
        );
      })}
    </SimpleGrid>
  );
};

export default OutletGrid;
