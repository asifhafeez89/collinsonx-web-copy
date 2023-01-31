import React from 'react';
import {InputProps, TextInput } from '@mantine/core';

/**
 * Primary UI component for user interaction
 */
export default function InputLabel({ 
     ...props
}:InputProps) {
  return (
    <>
       <TextInput  {...props} />
    </>
  );
}
