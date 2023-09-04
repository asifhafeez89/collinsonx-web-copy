import React, { useMemo } from 'react';
import {
  Title,
  Image,
  Flex,
  Text,
  Stack,
  Skeleton,
} from '@collinsonx/design-system/core';
import { Experience } from '@collinsonx/utils';

interface LoungeInfoProps {
  lounge?: Experience;
  loading: boolean;
}

const currencyMap: Record<string, string> = {
  GBP: String.fromCharCode(163),
};

const getCurrencySymbol = (currency: string) =>
  currencyMap[currency] || currency;

export const LoungeInfo = ({ lounge, loading }: LoungeInfoProps) => {
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

  const loungePrice = useMemo(
    () =>
      lounge?.pricing?.currency
        ? getCurrencySymbol(lounge.pricing.currency) +
          ' ' +
          lounge.pricing.reservationCost
        : '',
    [lounge]
  );

  if (!loading && !lounge) {
    return null;
  }

  return (
    <Flex p={24} gap={16} direction="row" bg="#FFF">
      <Image
        width={176}
        height={128}
        src="https://cdn03.collinson.cn/lounge-media/image/BHX6-13756.jpg"
        alt="lounge image"
      />
      <Flex direction="column">
        <Skeleton visible={loading}>
          <Title order={2} size={32} w="100%">
            {lounge ? lounge.loungeName : '-'}
          </Title>
        </Skeleton>
        <Skeleton visible={loading}>
          <Text size={18} w="100%">
            {loungeLocation}
          </Text>
        </Skeleton>
        <Skeleton visible={loading}>
          <Text size={28} w="100%">
            {loungePrice}
          </Text>
        </Skeleton>
      </Flex>
    </Flex>
  );
};
