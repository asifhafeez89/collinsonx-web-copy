import { Text, Button, Flex } from '@collinsonx/design-system/core';
import OverviewCard from '@collinsonx/design-system/components/overviewCard';
import OverviewMetric from '@collinsonx/design-system/components/overviewMetric';
import { useQuery } from '@collinsonx/utils/apollo';
import { PartnerBrands, PaginatedOutlets } from '@collinsonx/utils';
import getOutletsCount from '@collinsonx/utils/queries/getOutletsCount';
import getPartnerBrandsCount from '@collinsonx/utils/queries/getPartnerBrandsCount';

import Error from '@components/Error';

import { useState } from 'react';
import Link from 'next/link';
import { attemptRefreshingSession } from 'supertokens-auth-react/recipe/session';
import PageTitle from '@components/PageTitle';
import { CatalogueIcon } from '@collinsonx/design-system/assets/icons';
import classes from './OverviewDashboard.module.css';
import Section from '@components/Section';

export default function OverviewDashboard() {
  const [lastUpdate, setLastUpdate] = useState<String>();

  const {
    loading: loadingOutlets,
    data: dataOutlets,
    error: errorOutlets,
  } = useQuery<{
    getOutlets: PaginatedOutlets;
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
    getPartnerBrands: PartnerBrands;
  }>(getPartnerBrandsCount, {
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
    <Section>
      <PageTitle title="Partner Portal" />
      <Error error={errorOutlets} />
      <Error error={errorPartnerBrands} />
      <OverviewCard
        title="Catalogue"
        icon={<CatalogueIcon />}
        data-testid="catalogueOverviewCard"
      >
        <Flex direction="row" gap={24} rowGap={24} wrap="wrap">
          <OverviewMetric
            loading={loadingOutlets}
            label="Outlets"
            value={dataOutlets?.getOutlets?.totalItemCount || 0}
            data-testid="outletsRequestsCount"
          >
            <Button
              variant="outline"
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
            value={dataPartnerBrands?.getPartnerBrands?.totalItemCount || 0}
            data-testid="partnersRequestsCount"
          >
            <Button
              variant="outline"
              data-testid="viewAllPartners"
              component={Link}
              href="/partners"
            >
              View all partners
            </Button>
          </OverviewMetric>
        </Flex>
      </OverviewCard>

      <Text mb={33} mt={33} className={classes.lastUpdated}>
        {lastUpdate && `Last updated ${lastUpdate}`}
      </Text>
    </Section>
  );
}
