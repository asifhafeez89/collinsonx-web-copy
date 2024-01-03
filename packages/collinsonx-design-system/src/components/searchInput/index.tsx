import { ActionIcon, TextInput, TextInputProps } from '@mantine/core';
import { Close } from '../../assets/icons';

import styles from './searchInput.module.css';

export interface SearchInputProps extends TextInputProps {
  onClickClear: () => void;
}

export default function SearchInput({
  onClickClear,
  value,
  ...props
}: SearchInputProps) {
  return (
    <TextInput
      {...props}
      value={value}
      classNames={styles}
      styles={({ colors }) => ({
        input: {
          backgroundcolor: value ? '#fff' : colors.gray[1],
          bordercolor: value ? colors.gray[4] : '#9d9d9f',
          height: value ? '50px' : '42px',
        },
      })}
      rightSection={
        value && (
          <ActionIcon
            aria-label="Clear"
            onClick={onClickClear}
            style={{ color: '#000' }}
          >
            <Close />
          </ActionIcon>
        )
      }
    />
  );
}
