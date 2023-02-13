import ErrorPage from '@collinsonx/pages/error';
import Layout from '@components/Layout';

interface GenericErrorProps {
  statusCode: number;
}

export default function GenericError(props: GenericErrorProps) {
  return (
    <Layout>
      <ErrorPage {...props} />
    </Layout>
  );
}

GenericError.getInitialProps = ErrorPage.getInitialProps;
