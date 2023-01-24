import { useState } from 'react';
import { Group } from '@mantine/core';
import BaseInput from './BaseInput';
export default function InputValidation() {
  const [code, setCode] = useState([]);
  return (
    <Group spacing={8}>
      <BaseInput />
      <BaseInput />
      <BaseInput />
      <BaseInput />
      <BaseInput />
      <BaseInput />
    </Group>
  );
}
