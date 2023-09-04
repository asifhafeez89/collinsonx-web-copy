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
import { BookingGuests, ViewStep } from 'types/booking';

export interface GuestInfoProps {
  step: ViewStep;
  guests: BookingGuests;
  loading: boolean;
  onChangeGuests: (type: keyof BookingGuests, value: number) => void;
}

const GuestInfo = ({
  step,
  guests,
  onChangeGuests,
  loading,
}: GuestInfoProps) => {
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
            disabled={loading}
            label="Adults"
            ageRange="12+"
            value={guests.adults}
            onChange={(val) => onChangeGuests('adults', Number(val))}
            handlers={handlers[0]}
          />
        </Grid.Col>

        <Grid.Col lg={6}>
          <QuantityInput
            disabled={loading}
            label="Children"
            ageRange="Ages 2-11"
            value={guests.children}
            onChange={(val) => onChangeGuests('children', Number(val))}
            handlers={handlers[1]}
          />
        </Grid.Col>

        <Grid.Col lg={6}>
          <QuantityInput
            disabled={loading}
            label="Infants"
            ageRange="Ages 0-2"
            value={guests.infants}
            onChange={(val) => onChangeGuests('infants', Number(val))}
            handlers={handlers[2]}
          />
        </Grid.Col>

        <Grid.Col lg={6}>
          <QuantityInput
            disabled={loading}
            label="Seniors"
            ageRange="Ages 65+"
            value={guests.seniors}
            onChange={(val) => onChangeGuests('seniors', Number(val))}
            handlers={handlers[3]}
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
