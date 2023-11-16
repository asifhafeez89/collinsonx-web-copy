import { Box } from '@collinsonx/design-system/core';
import RetryOptions from './RetryOptions';

import messages from '../messages';

function UnknownMessage() {
  const message = messages.unknown;
  return (
    <>
      <Box>{message}</Box>
      <RetryOptions />
      <Box mb={1}>Or try again later</Box>
    </>
  );
}

export default UnknownMessage;
