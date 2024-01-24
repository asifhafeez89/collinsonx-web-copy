import { useSessionContext } from 'supertokens-auth-react/recipe/session';
import LayoutCatalogue from '@components/LayoutCatalogue';
import OverviewDashboard from '@components/Pages/OverviewDashboard';
import OverviewBookings from '@components/Pages/OverviewBookings';
import { InvitationUserType } from '@collinsonx/utils/generatedTypes/graphql';
import HeaderHome from '@components/HeaderHome';
import Layout from '@components/Layout';

const { SuperUser } = InvitationUserType;

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
          heading={<HeaderHome />}
        >
          <OverviewDashboard />
        </LayoutCatalogue>
      ) : (
        <Layout headerNavProps={{ section: 'booking' }}>
          <OverviewBookings />
        </Layout>
      )}
    </>
  );
}
