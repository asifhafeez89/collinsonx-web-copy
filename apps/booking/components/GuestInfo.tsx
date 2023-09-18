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
export interface GuestInfoProps {
  form: UseFormReturnType<any, any>;
  loading: boolean;
}

const GuestInfo = ({ form, loading }: GuestInfoProps) => {
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
        <Grid>
          <Grid.Col lg={6}>
            <QuantityInput
              min={0}
              max={10}
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
              max={10}
              label="Children"
              ageRange="2-11"
              disabled={loading}
              handlers={handlers[1]}
              {...form.getInputProps('children')}
            />
          </Grid.Col>

          <Grid.Col lg={6}>
            <QuantityInput
              max={10}
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
          <Anchor color={colors.blue} href="#" target="_blank">
            lounge conditions
          </Anchor>{' '}
          for age restrictions
        </Text>
      </Box>
    </Stack>
  );
};

export default GuestInfo;
