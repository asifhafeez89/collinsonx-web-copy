import LayoutHome from '@components/LayoutHome';
import { Title, Text, Button, Flex, Box } from '@collinsonx/design-system/core';
import OverviewCard from '@collinsonx/design-system/components/overviewCard';
import OverviewMetric from '@collinsonx/design-system/components/overviewMetric';
import { LogoCollinson } from '@collinsonx/design-system/assets/logo';
import Link from 'next/link';
import { useQuery } from '@collinsonx/utils/apollo';
import { PartnerBrand, Outlet } from '@collinsonx/utils';
import getPartnerBrands from '@collinsonx/utils/queries/getPartnerBrands';
import getOutlets from '@collinsonx/utils/queries/getOutlets';

import { useEffect, useState } from 'react';
import {
  attemptRefreshingSession,
  useSessionContext,
} from 'supertokens-auth-react/recipe/session';
import PageTitle from '@components/PageTitle';
import { CatalogueIcon } from '@collinsonx/design-system/assets/icons';

export default function Overview() {
  const session: any = useSessionContext();

  const [lastUpdate, setLastUpdate] = useState<String>();

  const { loading: loadingOutlets, data: dataOutlets } = useQuery<{
    getOutlets: Outlet[];
  }>(getOutlets, {
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

  const { loading: loadingPartnerBrands, data: dataPartnerBrands } = useQuery<{
    getPartnerBrands: PartnerBrand[];
  }>(getPartnerBrands, {
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

  useEffect(() => {
    if (window && session.accessTokenPayload.userType !== 'SUPER_USER') {
      window.location.href = '/booking';
    }
  }, [session]);

  return (
    <>
      <PageTitle title="Partner Portal" />

      <OverviewCard
        title="Catalogue"
        icon={<CatalogueIcon />}
        datatestid="catalogueOverviewCard"
      >
        <>
          <Flex gap="xs" maw="27%">
            <OverviewMetric
              loading={loadingOutlets}
              label="Outlets"
              value={dataOutlets?.getOutlets?.length || 0}
              datatestid="outletsRequestsCount"
            >
              <Link href="/outlets" passHref>
                <Button
                  variant="default"
                  sx={{ width: 'fit-content' }}
                  data-testid="viewAllOutlets"
                >
                  View all outlets
                </Button>
              </Link>
            </OverviewMetric>
            <OverviewMetric
              loading={loadingPartnerBrands}
              label="Partners"
              value={dataPartnerBrands?.getPartnerBrands?.length || 0}
              datatestid="partnersRequestsCount"
            >
              <Link href="/partners" passHref>
                <Button
                  variant="default"
                  sx={{ width: 'fit-content' }}
                  data-testid="viewAllPartners"
                >
                  View all partners
                </Button>
              </Link>
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

const OverviewHeading = () => (
  <Flex justify="space-between" align="center" mt={53} mb={53}>
    <Title mb={8} size={48} data-testid="bookingOverviewTitle">
      Partner Portal
    </Title>
    <Box>
      <Link href="/" aria-label="Overview">
        <LogoCollinson />
      </Link>
    </Box>
  </Flex>
);

Overview.getLayout = (page: JSX.Element) => (
  <LayoutHome heading={<OverviewHeading />}>{page}</LayoutHome>
);
