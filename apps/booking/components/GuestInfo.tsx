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
import { MAX_GUESTS } from 'constants';

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
            min={0}
            max={10}
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
            min={0}
            max={10}
            disabled={loading}
            label="Children"
            ageRange="2-11"
            value={guests.children}
            onChange={(val) => onChangeGuests('children', Number(val))}
            handlers={handlers[1]}
          />
        </Grid.Col>

        <Grid.Col lg={6}>
          <QuantityInput
            max={10}
            disabled={loading}
            label="Infants"
            ageRange="0-2"
            value={guests.infants}
            onChange={(val) => onChangeGuests('infants', Number(val))}
            handlers={handlers[2]}
          />
        </Grid.Col>

        <Grid.Col lg={6}>
          <QuantityInput
            max={MAX_GUESTS}
            disabled={loading}
            label="Seniors"
            ageRange="65+"
            value={guests.seniors}
            onChange={(val) => onChangeGuests('seniors', Number(val))}
            handlers={handlers[3]}
          />
        </Grid.Col>
      </Grid>
      <Text size={14}>
        Refer to{' '}
        <Anchor color="blue" href="#" target="_blank">
          lounge conditions
        </Anchor>{' '}
        for age restrictions
      </Text>
    </Stack>
  );
};

export default GuestInfo;
