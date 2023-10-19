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

interface LoungeInfoProps {
  lounge: Experience;
  loading: boolean;
  width?: string;
}

const currencyMap: Record<string, string> = {
  GBP: String.fromCharCode(163),
};

const getCurrencySymbol = (currency: string) =>
  currencyMap[currency] || currency;

export const LoungeInfoPreBooked = ({
  lounge,
  loading,
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
  const price = lounge.pricing?.reservationOnlyFee?.toFixed(2);
  const currencySymbol = getCurrencySymbol(lounge?.pricing?.currency || 'GBP');
  return (
    <Flex
      p={24}
      gap={16}
      direction={{ base: 'column', xl: 'row' }}
      bg="#FFF"
      justify={'center'}
      align={'center'}
      sx={{
        width: width,
        margin: '0 auto',
        borderRadius: '0.4rem',

        '@media (max-width: 768px)': {
          width: '100%',
        },
      }}
    >
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
          {price ? (
            <Text size={28} fw={700}>
              {currencySymbol}
              {price}{' '}
              <span style={{ fontSize: '1.25rem', fontWeight: 400 }}>
                per person
              </span>
            </Text>
          ) : null}
        </Skeleton>
      </Flex>
    </Flex>
  );
};
