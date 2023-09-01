import React, { useState, useRef } from 'react';
import {
  Stack,
  Text,
  Title,
  SimpleGrid,
  Anchor,
  NumberInputHandlers,
} from '@collinsonx/design-system/core';
import QuantityInput from './QuantityInput';

const GuestInfo = () => {
  const [numberOfAdults, setNumberOfAdults] = useState<number | ''>(1);
  const [numberOfChildren, setNumberOfChildren] = useState<number | ''>(0);
  const [numberOfInfants, setNumberOfInfants] = useState<number | ''>(0);
  const [numberOfSeniors, setNumberOfSeniors] = useState<number | ''>(0);
  const handlers = [
    useRef<NumberInputHandlers>(),
    useRef<NumberInputHandlers>(),
    useRef<NumberInputHandlers>(),
    useRef<NumberInputHandlers>(),
  ];

  return (
    <Stack>
      <Title order={3} size={18}>
        Who's coming?
      </Title>
      <SimpleGrid cols={2}>
        <QuantityInput
          label="Adults"
          ageRange="12+"
          value={numberOfAdults}
          onChange={(val) => setNumberOfAdults(val)}
          handlers={handlers[0]}
        />
        <QuantityInput
          label="Children"
          ageRange="Ages 2-11"
          value={numberOfChildren}
          onChange={(val) => setNumberOfChildren(val)}
          handlers={handlers[1]}
        />
        <QuantityInput
          label="Infants"
          ageRange="Ages 0-2"
          value={numberOfInfants}
          onChange={(val) => setNumberOfInfants(val)}
          handlers={handlers[2]}
        />
        <QuantityInput
          label="Seniors"
          ageRange="Ages 65+"
          value={numberOfSeniors}
          onChange={(val) => setNumberOfSeniors(val)}
          handlers={handlers[3]}
        />
      </SimpleGrid>
      <Text size={14}>
        Refer to <Anchor color="blue">lounge conditions</Anchor> for age
        restrictions
      </Text>
    </Stack>
  );
};

export default GuestInfo;
