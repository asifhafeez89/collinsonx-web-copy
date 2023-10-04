import { Flex, Stack, Text } from '@collinsonx/design-system/core';

type NextPageContext = any;

async function reportError(contextData: NextPageContext) {
  if (contextData.err) {
    console.log('reporting error to error service:');
    console.log(`  message: ${contextData.err.message}`);
    console.log(`  stack: ${contextData.err.stack}`);
    console.log('done reporting error.');
  } else {
    /*
    console.log(
      'An error occurred, but there was no error information in the NextPageContext:'
    );
    console.log(`  path: ${contextData.asPath}`);
    console.log(`  page: ${contextData.pathname}`);
    console.log(`  status: ${contextData.res?.statusCode}`);
    */
  }
}

interface GenericErrorProps {
  statusCode: number;
}

const errorMap = {
  404: 'Page not found',
  default: 'An unexpected error has occurred',
};

export default function GenericError({ statusCode }: GenericErrorProps) {
  return (
    <Flex justify="center" align="center" sx={{ height: '100%' }}>
      <Text>
        {statusCode
          ? `${statusCode} | ${
              errorMap[statusCode as keyof typeof errorMap] || errorMap.default
            }`
          : errorMap.default}
      </Text>
    </Flex>
  );
}

GenericError.getInitialProps = async (props: NextPageContext) => {
  const { res, err } = props;
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  reportError(props);
  return { statusCode };
};
