import { useSessionContext } from 'supertokens-auth-react/recipe/session';
import { Box, Flex, Title } from '@collinsonx/design-system/core';
import { LogoCollinson } from '@collinsonx/design-system/assets/logo';
import LayoutCatalogue from '@components/LayoutCatalogue';
import OverviewDashboard from '@components/Pages/OverviewDashboard';
import OverviewBookings from '@components/Pages/OverviewBookings';

export default function Overview() {
  const session: any = useSessionContext();

  if (session.loading) {
    return null;
  }

  return (
    <>
      {session.accessTokenPayload.userType === 'SUPER_USER' ? (
        <OverviewDashboard />
      ) : (
        <OverviewBookings />
      )}
    </>
  );
}

const OverviewHeading = () => {
  const session: any = useSessionContext();

  return (
    session.accessTokenPayload.userType === 'SUPER_USER' && (
      <Flex justify="space-between" align="center" mt={53} mb={53}>
        <Title mb={8} size={48} data-testid="overviewTitle">
          Partner Portal
        </Title>
        <Box>
          <LogoCollinson />
        </Box>
      </Flex>
    )
  );
};

Overview.getLayout = (page: JSX.Element) => (
  <LayoutCatalogue heading={<OverviewHeading />}>{page}</LayoutCatalogue>
);
