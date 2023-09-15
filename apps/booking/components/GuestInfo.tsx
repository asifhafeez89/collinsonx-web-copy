import React, { useRef } from 'react';
import {
  Stack,
  Text,
  Title,
  Anchor,
  NumberInputHandlers,
  Grid,
} from '@collinsonx/design-system/core';
import QuantityInput from './QuantityInput';
import colors from 'ui/colour-constants';

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
    <Stack
      sx={{
        '@media (max-width: 40em)': {
          backgroundColor: colors.white,
          padding: '1.2rem',
        },
      }}
    >
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
            disabled={loading}
            label="Seniors"
            ageRange="65+"
            handlers={handlers[3]}
            {...form.getInputProps('seniors')}
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
    </Stack>
  );
};

export default GuestInfo;
