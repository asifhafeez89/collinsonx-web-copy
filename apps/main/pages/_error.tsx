import ErrorPage from '@collinsonx/pages/error';
import LayoutLogin from '@components/LayoutLogin';

interface GenericErrorProps {
  statusCode: number;
}

export default function GenericError(props: GenericErrorProps) {
  return (
    <LayoutLogin>
      <ErrorPage {...props} />
    </LayoutLogin>
  );
}

GenericError.getInitialProps = ErrorPage.getInitialProps;
