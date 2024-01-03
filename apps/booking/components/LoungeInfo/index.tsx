import React, { useMemo } from 'react';
import {
  Title,
  Image,
  Flex,
  Text,
  Skeleton,
} from '@collinsonx/design-system/core';
import { Experience } from '@collinsonx/utils';
import { getCurrencySymbol } from 'utils/currencysymbol';

import classes from './LoungeInfo.module.css';

interface LoungeInfoProps {
  lounge?: Experience;
  loading: boolean;
  hideImage?: boolean;
  hideImageMobile?: boolean;
  width?: string;
}

export const LoungeInfo = ({
  lounge,
  loading,
  hideImage = false,
  hideImageMobile,
  width = '100%',
}: LoungeInfoProps) => {
  const loungeLocation = useMemo(
    () =>
      lounge && lounge.location
        ? lounge.location.airportName
          ? lounge.location.airportName +
            `${lounge.location.terminal ? ', ' + lounge.location.terminal : ''}`
          : ''
        : '-',
    [lounge]
  );

  if (!loading && !lounge) {
    return null;
  }

  return (
    <Flex
      w={width}
      p={24}
      gap={16}
      direction={{ base: 'column', xl: 'row' }}
      bg="#FFF"
      justify={'center'}
      align={'center'}
      className={classes.container}
    >
      <div>
        <Skeleton visible={loading} width="100%">
          {!hideImage && lounge?.images && lounge.images[0] && (
            <Image
              visibleFrom={hideImageMobile ? 'sm' : undefined}
              className={classes.image}
              src={lounge.images[0].url}
              alt="lounge image"
            />
          )}
        </Skeleton>
      </div>
      <Flex
        direction="column"
        w="100%"
        gap={loading ? 16 : undefined}
        className={classes.centerMobile}
      >
        <Skeleton visible={loading}>
          <Title data-testid="loungeName" order={2} fw={600} size={32}>
            {lounge ? lounge.loungeName : '-'}
          </Title>
        </Skeleton>
        <Skeleton visible={loading}>
          <Text size="lg">{loungeLocation}</Text>
        </Skeleton>
        <Skeleton visible={loading}>
          {lounge?.pricing?.reservationOnlyFee && (
            <Flex gap={2} className={classes.containerPrice}>
              <Text fw={700} className={classes.textPrice}>
                {getCurrencySymbol(lounge?.pricing?.currency ?? '')}
                {parseFloat(
                  lounge.pricing.reservationOnlyFee.toString()
                ).toFixed(2)}
              </Text>
              <Text size="xl" style={{ lineHeight: '50px' }}>
                per person
              </Text>
            </Flex>
          )}
        </Skeleton>
      </Flex>
    </Flex>
  );
};
