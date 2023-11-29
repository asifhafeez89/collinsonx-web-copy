import { OutletLoungeIcon } from '@collinsonx/design-system/assets/icons';
import CardOutlet, {
  Status,
} from '@collinsonx/design-system/components/cardOutlet';
import {
  Anchor,
  Button,
  SimpleGrid,
  Stack,
  Title,
} from '@collinsonx/design-system/core';
import Layout from '@components/Layout';
import { Outlet, OutletStatus } from '@collinsonx/utils';
import getOutlets from '@collinsonx/utils/queries/getOutlets';
import { useQuery } from '@collinsonx/utils/apollo';
import Error from '@components/Error';
import Link from 'next/link';
import { useRouter } from 'next/router';
import outletIcons from '../../config/outletIcons';
import CardTitle from '@collinsonx/design-system/components/card/cardTitle';

export default function Outlets() {
  const router = useRouter();
  const {
    loading: loadingOutlets,
    error: errorOutlets,
    data: dataOutlets,
  } = useQuery<{ getOutlets: Outlet[] }>(getOutlets, {
    variables: { limit: 10 },
  });

  return (
    <Stack spacing={32}>
      <Title>Outlets</Title>
      <Error error={errorOutlets} />
      <SimpleGrid
        spacing={24}
        sx={{
          'grid-template-columns': 'repeat(auto-fill, minmax(350px, 1fr))',
        }}
      >
        {!loadingOutlets &&
          dataOutlets &&
          dataOutlets.getOutlets.map(
            ({ name, legacyCode, status, location, tags, content }, index) => (
              <CardOutlet
                dataTestId="outlet-card"
                key={index}
                imageCount={
                  content?.media?.mediaCollection?.items.filter((item) =>
                    item?.contentType?.includes('image/')
                  ).length
                }
                imageUrl={content?.media?.mainImage?.url ?? undefined}
                onClick={() => {
                  router.push('#');
                }}
                title={
                  <Anchor
                    sx={{ textDecoration: 'none' }}
                    underline={false}
                    component={Link}
                    href="#"
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
                  data-testid={`view-details-button-${index}`}
                >
                  View details
                </Button>
              </CardOutlet>
            )
          )}
      </SimpleGrid>
    </Stack>
  );
}

Outlets.getLayout = (page: JSX.Element) => <Layout>{page}</Layout>;
