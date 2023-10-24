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
          {!hideImage && lounge?.images && lounge.images[0] && (
            <Image
              sx={() => ({
                width: '176px',
                '@media (max-width: 768px)': {
                  width: '100%',
                  height: '100%',
                  display: hideImageMobile ? 'none' : 'auto',
                },
              })}
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
          {lounge?.pricing?.reservationOnlyFee && (
            <Flex
              gap={2}
              sx={{
                justifyContent: 'initial',
                '@media (max-width: 768px)': {
                  margin: '0 auto',
                  width: '90%',
                  textAlign: 'center',
                  justifyContent: 'center',
                },
              }}
            >
              <Text fw={700} size={28}>
                {getCurrencySymbol(lounge?.pricing?.currency ?? '')}
                {parseFloat(
                  lounge.pricing.reservationOnlyFee.toString()
                ).toFixed(2)}
              </Text>
              <Text size={20} style={{ lineHeight: '50px' }}>
                per person
              </Text>
            </Flex>
          )}
        </Skeleton>
      </Flex>
    </Flex>
  );
};
