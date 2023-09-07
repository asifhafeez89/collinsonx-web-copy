import React from 'react';
import {
  ActionIcon,
  Group,
  Text,
  Flex,
  NumberInput,
  Box,
} from '@collinsonx/design-system/core';

interface QuantityInputProps {
  label: string;
  ageRange: string;
  disabled: boolean;
  value: number | '';
  onChange: (val: number | '') => void;
  handlers: React.MutableRefObject<any>;
  max: number;
  min?: number;
}

const QuantityInput: React.FC<QuantityInputProps> = ({
  label,
  ageRange,
  value,
  onChange,
  handlers,
  disabled,
  max,
  min = 0,
}) => {
  return (
    <Flex align="center" direction="row" wrap="wrap">
      <Box w={85}>
        <Text size={18} fw={600}>
          {label}
        </Text>
        <Text size={12}>Ages {ageRange}</Text>
      </Box>
      <Group spacing={0}>
        <ActionIcon
          h={50}
          sx={{
            fontSize: 24,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            borderRight: 0,
            ':disabled': {
              borderColor: '#ced4da',
              backgroundColor: '#FFF',
            },
          }}
          disabled={disabled || Number(value) <= min}
          size={'2.625rem'}
          variant="default"
          onClick={() => handlers.current?.decrement()}
        >
          –
        </ActionIcon>
        <NumberInput
          readOnly
          disabled={disabled}
          hideControls
          value={value}
          onChange={(val) => onChange(val)}
          handlersRef={handlers}
          max={max}
          min={min}
          step={1}
          size="md"
          w={80}
          styles={{
            input: {
              fontSize: 18,
              ':focus': {
                borderColor: '#ced4da',
              },
              textAlign: 'center',
              borderLeft: 'none',
              borderRight: 'none',
            },
          }}
        />
        <ActionIcon
          h={50}
          sx={{
            fontSize: 24,
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            borderLeft: 0,
            ':disabled': {
              borderColor: '#ced4da',
              backgroundColor: '#FFF',
            },
          }}
          disabled={disabled || Number(value) >= max}
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
