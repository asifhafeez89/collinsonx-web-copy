import React from 'react';
import { TextareaProps, Textarea } from '@collinsonx/utils/core';

/**
 * Primary UI component for user interaction
 */
export default function InputTextArea({ ...props }: TextareaProps) {
  return (
    <>
      <Textarea {...props} styles={{ label: { color: '#000000' } }} />
    </>
  );
}
