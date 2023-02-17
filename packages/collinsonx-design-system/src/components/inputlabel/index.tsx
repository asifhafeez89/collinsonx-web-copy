import React from 'react';
import { TextInputProps, TextInput } from '@collinsonx/utils/core';

/**
 * Primary UI component for user interaction
 */
export default function InputLabel({ ...props }: TextInputProps) {
  return (
    <>
      <TextInput {...props} styles={{ label: { color: '#000000' } }} />
    </>
  );
}
