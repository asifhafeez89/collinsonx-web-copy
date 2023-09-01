import React from 'react';
import { ActionIcon, Group, Text, Flex, Stack, NumberInput } from '@collinsonx/design-system/core';

interface QuantityInputProps {
  label: string;
  ageRange: string;
  value: number | '';
  onChange: (val: number | '') => void;
  handlers: React.MutableRefObject<any>;
}

const QuantityInput: React.FC<QuantityInputProps> = ({
  label,
  ageRange,
  value,
  onChange,
  handlers,
}) => {
  return (
    <Flex justify="center" align="center" direction="row" wrap="wrap">
      <Stack>
        <Text size={18}>{label}</Text>
        <Text size={12}>Ages {ageRange}</Text>
      </Stack>
      <Group>
        <ActionIcon
          size={'2.625rem'}
          variant="default"
          onClick={() => handlers.current?.decrement()}
        >
          –
        </ActionIcon>
        <NumberInput
          hideControls
          value={value}
          onChange={(val) => onChange(val)}
          handlersRef={handlers}
          max={10}
          min={1}
          step={1}
          size="md"
          w={80}
          styles={{ input: { textAlign: 'center' } }}
        />
        <ActionIcon
          size={'2.625rem'}
          variant="default"
          onClick={() => handlers.current?.increment()}
        >
          +
        </ActionIcon>
      </Group>
    </Flex>
  );
};

export default QuantityInput;
