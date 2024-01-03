import React from 'react';
import {
  ActionIcon,
  Group,
  Text,
  Flex,
  NumberInput,
  Box,
} from '@collinsonx/design-system/core';

import clsx from 'clsx';

import classes from './QuantityInput.module.css';

interface QuantityInputProps {
  label: string;
  ageRange: string;
  disabled: boolean;
  value: number | '';
  onChange: (val: string | number) => void;
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
        <Text size="lg" fw={600}>
          {label}
        </Text>
        <Text size="xs">Ages {ageRange}</Text>
      </Box>
      <Group gap={0}>
        <ActionIcon
          h={50}
          className={clsx([
            classes.icon,
            classes.iconLeft,
            { [classes.iconDisabled]: disabled || Number(value) <= min },
          ])}
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
          classNames={{
            input: classes.numberInput,
            wrapper: classes.numberInputRoot,
          }}
        />
        <ActionIcon
          h={50}
          className={clsx([classes.icon, classes.iconRight])}
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
