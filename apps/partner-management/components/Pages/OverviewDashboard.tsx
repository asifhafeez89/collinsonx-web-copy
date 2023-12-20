import { Text, Button, Flex, Box } from '@collinsonx/design-system/core';
import OverviewCard from '@collinsonx/design-system/components/overviewCard';
import OverviewMetric from '@collinsonx/design-system/components/overviewMetric';
import { useQuery } from '@collinsonx/utils/apollo';
import { PartnerBrand } from '@collinsonx/utils';
import getOutletsCount from '@collinsonx/utils/queries/getOutletsCount';
import getPartnerBrandsCount from '@collinsonx/utils/queries/getPartnerBrandsCount';

import Error from '@components/Error';

import { useState } from 'react';
import Link from 'next/link';
import {
  attemptRefreshingSession,
  useSessionContext,
} from 'supertokens-auth-react/recipe/session';
import PageTitle from '@components/PageTitle';
import { CatalogueIcon } from '@collinsonx/design-system/assets/icons';

export default function OverviewDashboard() {
  const session: any = useSessionContext();

  const [lastUpdate, setLastUpdate] = useState<String>();

  const {
    loading: loadingOutlets,
    data: dataOutlets,
    error: errorOutlets,
  } = useQuery<{
    getOutlets: any;
  }>(getOutletsCount, {
    pollInterval: 300000,
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {
      attemptRefreshingSession().then((success: any) => {});
      setLastUpdate(
        new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
      );
    },
  });

  const {
    loading: loadingPartnerBrands,
    data: dataPartnerBrands,
    error: errorPartnerBrands,
  } = useQuery<{
    getPartnerBrands: PartnerBrand[];
  }>(getPartnerBrandsCount, {
    variables: {
      limit: 3000,
    },
    pollInterval: 300000,
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {
      attemptRefreshingSession().then((success: any) => {});
      setLastUpdate(
        new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
      );
    },
  });

  return (
    <>
      <PageTitle title="Partner Portal" />
      <Error error={errorOutlets} />
      <Error error={errorPartnerBrands} />
      <OverviewCard
        title="Catalogue"
        icon={<CatalogueIcon />}
        data-testid="catalogueOverviewCard"
      >
        <>
          <Flex gap="xs" maw="27%">
            <OverviewMetric
              loading={loadingOutlets}
              label="Outlets"
              value={dataOutlets?.getOutlets?.totalItemCount || 0}
              data-testid="outletsRequestsCount"
            >
              <Button
                variant="default"
                sx={{ width: 'fit-content' }}
                component={Link}
                data-testid="viewAllOutlets"
                href="/outlets"
              >
                View all outlets
              </Button>
            </OverviewMetric>
            <OverviewMetric
              loading={loadingPartnerBrands}
              label="Partners"
              value={dataPartnerBrands?.getPartnerBrands?.length || 0}
              data-testid="partnersRequestsCount"
            >
              <Button
                variant="default"
                sx={{ width: 'fit-content' }}
                data-testid="viewAllPartners"
                component={Link}
                href="/partners"
              >
                View all partners
              </Button>
            </OverviewMetric>
          </Flex>
        </>
      </OverviewCard>

      <Text mb={33} mt={33} size={10}>
        {lastUpdate && `Last updated ${lastUpdate}`}
      </Text>
    </>
  );
}
