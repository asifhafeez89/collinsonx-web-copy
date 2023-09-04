import React from 'react';
import {
  ActionIcon,
  Group,
  Text,
  Flex,
  Stack,
  NumberInput,
} from '@collinsonx/design-system/core';

interface QuantityInputProps {
  label: string;
  ageRange: string;
  disabled: boolean;
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
  disabled,
}) => {
  return (
    <Flex align="center" direction="row" wrap="wrap">
      <Stack>
        <Text size={18}>{label}</Text>
        <Text size={12}>Ages {ageRange}</Text>
      </Stack>
      <Group>
        <ActionIcon
          disabled={disabled}
          size={'2.625rem'}
          variant="default"
          onClick={() => handlers.current?.decrement()}
        >
          –
        </ActionIcon>
        <NumberInput
          disabled={disabled}
          hideControls
          value={value}
          onChange={(val) => onChange(val)}
          handlersRef={handlers}
          max={10}
          min={0}
          step={1}
          size="md"
          w={80}
          styles={{ input: { textAlign: 'center' } }}
        />
        <ActionIcon
          disabled={disabled}
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
