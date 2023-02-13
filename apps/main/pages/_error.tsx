import type { NextPage, NextPageContext } from 'next';
import type { ErrorProps } from 'next/error';
import NextErrorComponent from 'next/error';

const CustomErrorComponent: NextPage<ErrorProps> = (props) => {
  return <p> Custom 500 page from pages/_error </p>;
};

async function reportError(contextData: NextPageContext) {
  if (contextData.err) {
    console.log('reporting error to error service:');
    console.log(`  message: ${contextData.err.message}`);
    console.log(`  stack: ${contextData.err.stack}`);
    console.log('done reporting error.');
  } else {
    console.log(
      'An error occurred, but there was no error information in the NextPageContext:'
    );
    console.log(`  path: ${contextData.asPath}`);
    console.log(`  page: ${contextData.pathname}`);
    console.log(`  status: ${contextData.res?.statusCode}`);
  }
}

CustomErrorComponent.getInitialProps = async (contextData) => {
  // In case this is running in a serverless function, await this in order to give
  // time to send the error before the lambda exits
  //
  // Any 404 will be caught by our custom error page
  // at pages/404 so if we're here we know we have an error
  await reportError(contextData);

  // This will contain the status code of the response
  return NextErrorComponent.getInitialProps(contextData);
};

export default CustomErrorComponent;

/*
import { Stack, Container, Text } from '@collinsonx/design-system/core';
import { NextApiResponse } from 'next';

interface GenericErrorProps {
  statusCode: number;
}

export default function GenericError({ statusCode }: GenericErrorProps) {
  return (
    <Container
      p={16}
      sx={{
        maxWidth: '375px',
        height: '100%',
      }}
    >
      <Stack align="stretch" sx={{ position: 'relative' }}>
        <Text>An error has occured</Text>
        <Text>Status code: {statusCode}</Text>
      </Stack>
    </Container>
  );
}

interface InitialProps {
  res: NextApiResponse;
  err: NextApiResponse;
}

GenericError.getInitialProps = async ({ res, err }: InitialProps) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};
*/
