import React, { useRef, useCallback } from 'react';
import {
  Stack,
  Text,
  Title,
  Anchor,
  NumberInputHandlers,
  Grid,
  Box,
  Flex,
} from '@collinsonx/design-system/core';

import { sendMobileEvent } from '@lib';

import { Warning } from '@collinsonx/design-system/assets/icons';
import QuantityInput from './QuantityInput';
import colors from 'ui/colour-constants';

import { useForm, UseFormReturnType } from '@mantine/form';
import { Labrada } from 'next/font/google';

import { MAX_GUESTS, MOBILE_ACTION_BACK } from '../constants';

export interface GuestInfoProps {
  form: UseFormReturnType<any, any>;
  loading: boolean;
  referreUrl: string;
}

const GuestInfo = ({ form, loading, referreUrl }: GuestInfoProps) => {
  const handlers = [
    useRef<NumberInputHandlers>(),
    useRef<NumberInputHandlers>(),
    useRef<NumberInputHandlers>(),
    useRef<NumberInputHandlers>(),
  ];

  const handleClick = useCallback(() => {
    if (top) {
      if (referreUrl) {
        top.location.href = referreUrl;
      } else {
        const windowObj: any = window;
        sendMobileEvent(windowObj, MOBILE_ACTION_BACK);
      }
    }
  }, [referreUrl]);

  return (
    <Stack
      sx={{
        borderTop: `1px solid ${colors.borderColor}`,
        paddingTop: '1rem',
        backgroundColor: 'none',

        '@media (max-width: 768px)': {
          borderTop: 'none',
          padding: '0',
        },
      }}
    >
      <Box
        sx={{
          '@media (max-width: 768px)': {
            backgroundColor: colors.white,
            padding: '1.2rem',
          },
        }}
      >
        <Title order={3} size={18} pb={4}>
          Who&apos;s coming?
        </Title>
        <Flex direction="row" align="top" gap={8}>
          <Box pt={2}>
            <Warning style={{ width: 16, height: 16 }} />
          </Box>
          <p style={{ marginTop: '0px' }}>
            Maximum group size is 5, excluding infants. Please check
            availability for lounge-specific restrictions on number of infants.
          </p>
        </Flex>
        <Grid>
          <Grid.Col lg={6}>
            <QuantityInput
              min={1}
              max={MAX_GUESTS}
              label="Adults"
              ageRange="12+"
              disabled={loading}
              handlers={handlers[0]}
              {...form.getInputProps('adults')}
            />
          </Grid.Col>

          <Grid.Col lg={6}>
            <QuantityInput
              min={0}
              max={MAX_GUESTS}
              label="Children"
              ageRange="2-11"
              disabled={loading}
              handlers={handlers[1]}
              {...form.getInputProps('children')}
            />
          </Grid.Col>

          <Grid.Col lg={6}>
            <QuantityInput
              max={MAX_GUESTS}
              label="Infants"
              ageRange="0-2"
              disabled={loading}
              handlers={handlers[2]}
              {...form.getInputProps('infants')}
            />
          </Grid.Col>
        </Grid>
        <Text size={14} pt={16}>
          Refer to{' '}
          <Anchor color={colors.blue} onClick={handleClick}>
            lounge conditions
          </Anchor>{' '}
          for age restrictions
        </Text>
      </Box>
    </Stack>
  );
};

export default GuestInfo;
