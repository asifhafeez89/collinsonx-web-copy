import { SelectProps, Select } from '@mantine/core';
import { ArrowDown } from '../../assets/icons';

const InputSelect = ({ ...props }: SelectProps) => {
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
      role="dialog"
      rightSection={<ArrowDown />}
      styles={(theme) => ({
        item: {
          // applies styles to selected item
          '&[data-selected]': {
            '&, &:hover': {
              backgroundColor: '#e2ccff',
              color: '#000000',
            },
          },

          // applies styles to hovered item (with mouse or keyboard)
          '&[data-hovered]': {
            '&, &:hover': {
              backgroundColor: '#e2ccff',
              color: '#000000',
            },
          },
        },
        ...(props.styles ? props.styles : {}),
      })}
    />
  );
};

export default InputSelect;
