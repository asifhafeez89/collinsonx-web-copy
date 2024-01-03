import { Flex, Stack, Text } from '@collinsonx/design-system/core';
import { log } from '@lib';

type NextPageContext = any;

async function reportError(contextData: NextPageContext) {
  if (contextData.err) {
    log('reporting error to error service:');
    log(`  message: ${contextData.err.message}`);
    log(`  stack: ${contextData.err.stack}`);
    log('done reporting error.');
  } else {
    /*
    log(
      'An error occurred, but there was no error information in the NextPageContext:'
    );
    log(`  path: ${contextData.asPath}`);
    log(`  page: ${contextData.pathname}`);
    log(`  status: ${contextData.res?.statusCode}`);
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
    <Flex justify="center" align="center" h="100%">
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
