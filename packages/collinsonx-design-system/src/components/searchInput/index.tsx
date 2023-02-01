import { ActionIcon, TextInput, TextInputProps } from '@mantine/core';
import { Close } from '../../assets/icons';

import { createStyles } from '@mantine/core';

export interface SearchInputProps extends TextInputProps {
  onClickClear: () => void;
}

const useStyles = createStyles(
  ({ colors }, { value }: { value: TextInputProps['value'] }) => ({
    input: {
      borderRadius: '8px',
      height: value ? '50px' : '42px',
      fontSize: '16px',
      backgroundColor: value ? '#FFF' : colors.gray[1],
      borderColor: value ? colors.gray[4] : colors.gray[1],
      '&:focus': {
        height: '50px',
        borderColor: colors.gray[4],
        backgroundColor: '#FFF',
        '&::placeholder': {
          color: 'transparent',
        },
      },
    },
  })
);

export default function SearchInput({
  onClickClear,
  value,
  ...props
}: SearchInputProps) {
  const { classes } = useStyles({ value });

  return (
    <TextInput
      {...props}
      value={value}
      classNames={{ input: classes.input }}
      rightSection={
        value && (
          <ActionIcon
            aria-label="Clear"
            onClick={onClickClear}
            sx={{ color: '#000' }}
          >
            <Close />
          </ActionIcon>
        )
      }
    />
  );
}
