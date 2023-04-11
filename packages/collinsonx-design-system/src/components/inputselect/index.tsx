import React from 'react';
import { SelectProps, Select } from '@mantine/core';

export default function SelectInput({ ...props }: SelectProps) {
  return (
    <Select
      {...props}
      sx={{
        paddingTop: '20px',
        marginBottom: '10px',
        color: '#000 !important',
        label: { color: '#000000', fontWeight: 600 },
      }}
    />
  );
}
