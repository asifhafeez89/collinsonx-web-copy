import React, { useRef } from 'react';
import {
  Stack,
  Text,
  Title,
  Anchor,
  NumberInputHandlers,
  Grid,
  Box,
} from '@collinsonx/design-system/core';
import QuantityInput from './QuantityInput';
import colors from 'ui/colour-constants';

import { useForm, UseFormReturnType } from '@mantine/form';
import { Labrada } from 'next/font/google';

import { MAX_GUESTS } from '../constants';

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
        <Title order={3} size={18} pb={20}>
          Who&apos;s coming?
        </Title>
        <p style={{ marginTop: '0px' }}>You can book up to 5 people</p>
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
        <Text size={14}>
          Refer to{' '}
          <Anchor
            color={colors.blue}
            href={referreUrl ? referreUrl : '#'}
            target="_blank"
          >
            lounge conditions
          </Anchor>{' '}
          for age restrictions
        </Text>
      </Box>
    </Stack>
  );
};

export default GuestInfo;
