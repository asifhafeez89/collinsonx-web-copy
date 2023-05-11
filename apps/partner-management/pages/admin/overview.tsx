import TableX from '@collinsonx/design-system/components/table';
import { Title } from '@collinsonx/design-system/core';
import Layout from '@components/Layout';

const Overview = () => {
  return (
    <>
      <Title align="center" mb={40} mt={16} size={32}>
        Overview of all our partners
      </Title>
      <TableX />
    </>
  );
};

Overview.getLayout = (page: JSX.Element) => <Layout>{page}</Layout>;

export default Overview;
