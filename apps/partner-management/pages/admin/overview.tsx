import TableX from '@collinsonx/design-system/components/table';
import { Flex, Stack, Title } from '@collinsonx/design-system/core';
import Layout from '@components/Layout';
import StatsTile from '@components/StatsTile';

const Overview = () => {
  return (
    <Stack gap={24}>
      <Title size={28}>Global Partnership view</Title>
      <Flex gap={24}>
        <StatsTile label="Invites sent" value={96} />
        <StatsTile label="Signed up" value={45} />
        <StatsTile label="Yet to sign up" value={51} />
      </Flex>
      <TableX />
    </Stack>
  );
};

Overview.getLayout = (page: JSX.Element) => (
  <Layout headerNavProps={{ section: 'booking' }}>{page}</Layout>
);

export default Overview;
