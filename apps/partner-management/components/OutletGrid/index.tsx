import { OutletLoungeIcon } from '@collinsonx/design-system/assets/icons';
import { Status } from '@collinsonx/design-system/components/card';
import CardTitle from '@collinsonx/design-system/components/card/cardTitle';
import CardOutlet from '@collinsonx/design-system/components/cardOutlet';
import { Anchor, Button, SimpleGrid } from '@collinsonx/design-system/core';
import { Outlet, OutletStatus } from '@collinsonx/utils';
import outletIcons from 'config/outletIcons';
import Link from 'next/link';

export interface OutletGridProps {
  outlets: Outlet[];
  onClickOutlet?: (id: string) => void;
}
const OutletGrid = ({
  outlets = [],
  onClickOutlet = (id: string) => {},
}: OutletGridProps) => {
  return (
    <SimpleGrid
      spacing={24}
      sx={{
        'grid-template-columns': 'repeat(auto-fill, minmax(350px, 1fr))',
      }}
    >
      {outlets.map(
        ({ id, name, legacyCode, status, location, tags, content }, index) => {
          const outletUrl = `/outlets/${id}`;

          return (
            <CardOutlet
              data-testid="outlet-card"
              key={index}
              imageCount={
                content?.media?.mediaCollection?.items.filter((item) =>
                  item?.contentType?.includes('image/')
                ).length
              }
              imageUrl={content?.media?.mainImage?.url ?? undefined}
              onClick={() => {
                onClickOutlet(id);
              }}
              title={
                <Anchor
                  sx={{ textDecoration: 'none' }}
                  underline={false}
                  component={Link}
                  href={outletUrl}
                >
                  <CardTitle>{name}</CardTitle>
                </Anchor>
              }
              workflowStage={{ type: 'draft', label: 'Draft' }}
              legacyCode={legacyCode ?? undefined}
              locationName={location.name ?? undefined}
              terminal={location.terminal ?? undefined}
              productCategories={
                tags
                  ? tags.map((tag) => {
                      const Icon = outletIcons[tag!] ?? OutletLoungeIcon;
                      return {
                        label: tag!,
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
        }
      )}
    </SimpleGrid>
  );
};

export default OutletGrid;
