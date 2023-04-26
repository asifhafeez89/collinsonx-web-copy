import { SelectProps, Select } from '@mantine/core';

export default function SelectInput({ ...props }: SelectProps) {
  return (
    <Select
      {...props}
      sx={{
        color: '#000 !important',
        label: { color: '#000000', fontWeight: 400, marginBottom: 8 },
        input: {
          '&[data-invalid]': {
            borderColor: 'red',
          },
        },
      }}
    />
  );
}
