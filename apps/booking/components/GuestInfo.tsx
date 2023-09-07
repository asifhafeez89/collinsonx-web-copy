import React, { useState, useRef } from 'react';
import {
  Stack,
  Text,
  Title,
  SimpleGrid,
  Anchor,
  NumberInputHandlers,
  Grid,
} from '@collinsonx/design-system/core';
import QuantityInput from './QuantityInput';

import { useForm, UseFormReturnType } from '@mantine/form';
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
    <Stack>
      <Title order={3} size={18}>
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
            min={0}
            max={10}
            label="Infants"
            ageRange="0-2"
            disabled={loading}
            handlers={handlers[2]}
            {...form.getInputProps('infants')}
          />
        </Grid.Col>

        <Grid.Col lg={6}>
          <QuantityInput
            min={0}
            max={10}
            label="Seniors"
            ageRange="65+"
            disabled={loading}
            handlers={handlers[3]}
            {...form.getInputProps('seniors')}
          />
        </Grid.Col>
      </Grid>
      <Text size={14}>
        Refer to{' '}
        <Anchor color="blue" href="https://mantine.dev/" target="_blank">
          lounge conditions
        </Anchor>{' '}
        for age restrictions
      </Text>
    </Stack>
  );
};

export default GuestInfo;
