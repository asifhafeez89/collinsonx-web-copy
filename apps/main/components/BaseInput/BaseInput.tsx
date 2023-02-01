import { ComponentPropsWithoutRef } from 'react';
import { Input } from '@collinsonx/design-system/core';

type BaseInputProps = ComponentPropsWithoutRef<typeof Input>;
export default function BaseInput(props: BaseInputProps) {
  return (
    <Input
      sx={{ width: '50px', height: '40px' }}
      styles={(theme) => ({
        input: {
          fontSize: '35px',
        },
      })}
      placeholder="-"
      {...props}
    />
  );
}
