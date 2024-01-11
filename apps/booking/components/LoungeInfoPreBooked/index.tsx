import React, { useMemo } from 'react';
import {
  Title,
  Image,
  Flex,
  Text,
  Stack,
  Skeleton,
  Center,
} from '@collinsonx/design-system/core';
import { Experience } from '@collinsonx/utils';

import classes from './LoungeInfoPreBooked.module.css';
import useLocale from 'hooks/useLocale';

interface LoungeInfoProps {
  lounge: Experience;
  loading: boolean;
  width?: string;
  hideImageMobile?: boolean;
}

const currencyMap: Record<string, string> = {
  GBP: String.fromCharCode(163),
};

const getCurrencySymbol = (currency: string) =>
  currencyMap[currency] || currency;

export const LoungeInfoPreBooked = ({
  lounge,
  loading,
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

  const translation = useLocale();

  if (!loading && !lounge) {
    return null;
  }
  const price = lounge.pricing?.reservationOnlyFee?.toFixed(2);
  const currencySymbol = getCurrencySymbol(lounge?.pricing?.currency || 'GBP');
  return (
    <Flex
      p={24}
      gap={16}
      w={width}
      direction={{ base: 'column', xl: 'row' }}
      bg="#FFF"
      justify={'center'}
      align={'center'}
      className={classes.container}
    >
      <div>
        <Skeleton visible={loading} width="100%">
          {lounge?.images && lounge.images[0] ? (
            <Image
              visibleFrom={hideImageMobile ? 'sm' : undefined}
              className={classes.image}
              src={lounge?.images[0].url}
              alt="lounge image"
            />
          ) : undefined}
        </Skeleton>
      </div>
      <Flex
        direction="column"
        w="100%"
        gap={loading ? 16 : undefined}
        className={classes.centerMobile}
      >
        <Skeleton visible={loading}>
          <Title data-testid="loungeName" order={2} size={32}>
            {lounge ? lounge.loungeName : '-'}
          </Title>
        </Skeleton>
        <Skeleton visible={loading}>
          <Text size="lg">{loungeLocation}</Text>
        </Skeleton>
        <Skeleton visible={loading}>
          {price ? (
            <Text className={classes.textPrice} fw={700}>
              {currencySymbol}
              {price}{' '}
              <span style={{ fontSize: '1.25rem', fontWeight: 400 }}>
                {translation.lounge.perPerson}
              </span>
            </Text>
          ) : null}
        </Skeleton>
      </Flex>
    </Flex>
  );
};
