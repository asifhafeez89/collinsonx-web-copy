import React from 'react';
import {TextInputProps, TextInput } from '@mantine/core';

/**
 * Primary UI component for user interaction
 */
export default function InputLabel({ 
     ...props
}:TextInputProps) {
  return (
    <>
       <TextInput  {...props} styles={{label: {color: 'black'}}}/>
    </>
  );
}
