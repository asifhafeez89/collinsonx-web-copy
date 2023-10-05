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
import { getCurrencySymbol } from 'utils/currencysymbol';

interface LoungeInfoProps {
  guests?: {
    adults: number;
    children: number;
    infants: number;
  };
  lounge?: Experience;
  loading: boolean;
}

const getSumToPay = (
  guests: {
    adults: number;
    children: number;
    infants: number;
  },
  reservationOnlyFee: number
) => {
  const sum = reservationOnlyFee * (guests.adults + guests.children);
  return sum.toFixed(2);
};

export const LoungeInfo = ({ guests, lounge, loading }: LoungeInfoProps) => {
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

  const loungePrice = useMemo(() => {
    if (guests) {
      return lounge?.pricing?.currency && lounge.pricing.reservationOnlyFee
        ? getCurrencySymbol(lounge.pricing.currency) +
            ' ' +
            getSumToPay(guests, lounge.pricing.reservationOnlyFee)
        : '';
    }
  }, [lounge, guests]);

  if (!loading && !lounge) {
    return null;
  }

  return (
    <Flex p={24} gap={16} direction={{ base: 'column', xl: 'row' }} bg="#FFF">
      <div>
        <Skeleton
          visible={loading}
          sx={{
            width: '100%',
          }}
        >
          {lounge?.images && lounge.images[0] ? (
            <Image
              sx={() => ({
                width: '176px',
                '@media (max-width: 768px)': {
                  width: '100%',
                  height: '100%',
                },
              })}
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
        sx={{
          '@media (max-width: 768px)': {
            textAlign: 'center',
          },
        }}
      >
        <Skeleton visible={loading}>
          <Title data-testid="loungeName" order={2} size={32}>
            {lounge ? lounge.loungeName : '-'}
          </Title>
        </Skeleton>
        <Skeleton visible={loading}>
          <Text size={18}>{loungeLocation}</Text>
        </Skeleton>
        <Skeleton visible={loading}>
          {lounge?.pricing?.reservationOnlyFee ? (
            <Flex gap={2}>
              <Text fw={700} size={28}>
                {getCurrencySymbol(lounge?.pricing?.currency ?? '')}
                {parseFloat(
                  lounge.pricing.reservationOnlyFee.toString()
                ).toFixed(2)}{' '}
              </Text>{' '}
              <Text size={20} style={{ lineHeight: '50px' }}>
                per guest
              </Text>
            </Flex>
          ) : null}
        </Skeleton>
      </Flex>
    </Flex>
  );
};
