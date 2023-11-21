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
    <Stack spacing={32} pb={24}>
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
            ({ name, legacyCode, status, location, tags }, index) => (
              <CardOutlet
                dataTestId={`card-outlet-${index}`}
                key={index}
                title={name}
                onClick={() => {
                  router.push('#');
                }}
                TitleRenderer={({ children }) => (
                  <Anchor
                    sx={{ textDecoration: 'none' }}
                    underline={false}
                    component={Link}
                    href="#"
                  >
                    {children}
                  </Anchor>
                )}
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
                          IconComponent: <Icon width={24} height={24} />,
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
