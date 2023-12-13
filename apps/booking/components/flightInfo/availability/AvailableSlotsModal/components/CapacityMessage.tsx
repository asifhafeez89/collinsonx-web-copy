import { FC } from 'react';

import { Box } from '@collinsonx/design-system/core';

import { setAdultsPrefix, setChildPrefix, setInfantPrefix } from 'utils/guests';
import type { CapacityProps } from '../props';
import RetryOptions from './RetryOptions';

import messages from '../messages';
import useLocale from 'hooks/useLocale';

const CapacityMessage: FC<CapacityProps> = ({
  adults = 1,
  child = 0,
  infants = 0,
}) => {
  const translations = useLocale();
  if (adults === 0) {
    const message = translations.lounge.errors.capacity.description.known;

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
        {translations.lounge.errors.capacity.description.notKnown}{' '}
        {setAdultsPrefix(adults)}
        {setChildPrefix(child, adults)}
        {setInfantPrefix(infants, adults, child)}
      </Box>
      <RetryOptions />
    </>
  );
};

export default CapacityMessage;
