import { useSessionContext } from 'supertokens-auth-react/recipe/session';
import { Box, Flex } from '@collinsonx/design-system/core';
import Title from '@collinsonx/design-system/components/title';
import { LogoCollinson } from '@collinsonx/design-system/assets/logo';
import LayoutCatalogue from '@components/LayoutCatalogue';
import OverviewDashboard from '@components/Pages/OverviewDashboard';
import OverviewBookings from '@components/Pages/OverviewBookings';
import Layout from '@components/Layout';
import { InvitationUserType } from '@collinsonx/utils/generatedTypes/graphql';

const { SuperUser, Partner } = InvitationUserType;

export default function Overview() {
  const session: any = useSessionContext();

  if (session.loading) {
    return null;
  }

  return (
    <>
      {session.accessTokenPayload.userType === SuperUser ? (
        <LayoutCatalogue
          headerNavProps={{ section: 'partner' }}
          heading={<OverviewHeading />}
        >
          <OverviewDashboard />
        </LayoutCatalogue>
      ) : (
        <LayoutCatalogue headerNavProps={{ section: 'booking' }}>
          <OverviewBookings />
        </LayoutCatalogue>
      )}
    </>
  );
}

const OverviewHeading = () => {
  const session: any = useSessionContext();

  return (
    session.accessTokenPayload.userType === SuperUser && (
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
