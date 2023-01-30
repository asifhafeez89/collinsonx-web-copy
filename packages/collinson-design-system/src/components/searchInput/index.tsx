import { ActionIcon, TextInput, TextInputProps } from '@mantine/core';
import { Close } from '../../assets/icons';

import { createStyles } from '@mantine/core';

export interface SearchInputProps extends TextInputProps {
  onClickClear: () => void;
}

const useStyles = createStyles(({ colors }) => ({
  input: {
    borderRadius: '8px',
    height: '42px',
    fontSize: '16px',
    backgroundColor: colors.gray[1],
    borderColor: colors.gray[1],
    '&:focus': {
      height: '50px',
      borderColor: colors.gray[4],
      backgroundColor: '#FFF',
      '&::placeholder': {
        color: 'transparent',
      },
    },
  },
}));

export default function SearchInput({
  onClickClear,
  value,
  ...props
}: SearchInputProps) {
  const { classes } = useStyles();

  return (
    <TextInput
      {...props}
      autoFocus
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
