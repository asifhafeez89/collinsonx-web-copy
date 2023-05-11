import TableX from '@collinsonx/design-system/components/table';
import Layout from '@components/Layout';

const Overview = () => {
  return (
    <>
      <TableX />
    </>
  );
};

Overview.getLayout = (page: JSX.Element) => <Layout>{page}</Layout>;

export default Overview;
