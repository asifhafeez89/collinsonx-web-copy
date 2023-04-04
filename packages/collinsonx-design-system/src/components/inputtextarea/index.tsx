import React from 'react';
import { TextareaProps, Textarea } from '@mantine/core';

/**
 * Primary UI component for user interaction
 */
export default function InputTextArea({ ...props }: TextareaProps) {
  return (
    <>
      <Textarea
        {...props}
        styles={{
          root: {
            display: 'flex',
            flexDirection: 'column',
          },
          description: {
            order: 1,
            marginTop: '4px',
            marginBottom: '0',
          },
          label: {
            order: -2,
            color: '#000000',
          },
          input: {
            order: -1,
          },
          error: {
            order: 2,
          },
        }}
      />
    </>
  );
}
