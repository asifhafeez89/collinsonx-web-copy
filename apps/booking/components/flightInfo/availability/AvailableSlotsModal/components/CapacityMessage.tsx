import { FC } from 'react';

import { Box } from '@collinsonx/design-system/core';

import { setAdultsPrefix, setChildPrefix, setInfantPrefix } from 'utils/guests';
import type { CapacityProps } from '../props';
import RetryOptions from './RetryOptions';

import messages from '../messages';

const CapacityMessage: FC<CapacityProps> = ({
  adults = 0,
  child = 0,
  infants = 0,
}) => {
  if (adults === 0) {
    const message = messages.capacity;

    return (
      <>
        <Box>{message}</Box>
        <RetryOptions />
      </>
    );
  }

  return (
    <>
      <Box>
        Our apologies, but capacity of the lounge for the time slot you selected
        is {setAdultsPrefix(adults)}
        {setChildPrefix(child, adults)}
        {setInfantPrefix(infants, adults, child)}
      </Box>
      <RetryOptions />
    </>
  );
};

export default CapacityMessage;
