import React from 'react';
import { TextInputProps, TextInput } from '@mantine/core';

interface InputLabelProps extends TextInputProps {
  isWhite?: boolean;
  isCapitalLetters?: boolean;
}
/**
 * Primary UI component for user interaction
 */
export default function InputLabel({
  isWhite = false,
  isCapitalLetters,
  ...props
}: InputLabelProps) {
  const inputColor = isWhite ? '#FFFFFF' : '#25262B';

  return (
    <>
      <TextInput
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
            padding: '0 0 0.5rem 0',
            order: -2,
            color: inputColor,
          },
          input: {
            order: -1,
            textTransform: isCapitalLetters ? 'uppercase' : 'none',
          },
        }}
      />
    </>
  );
}
