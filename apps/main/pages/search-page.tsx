import { useState } from 'react';
import { Container, Text, Box } from '@mantine/core';

import {
  default as SearchInput,
  SearchInputProps,
} from '@collinson/design-system/components/searchInput';

import { EmptyStateSearch } from '@collinson/design-system/assets/graphics';

export default function Search() {
  const [value, setValue] = useState('');
  const handleClickClear = () => {
    setValue('');
  };
  const handleChange: SearchInputProps['onChange'] = (e) => {
    setValue(e.target.value);
  };

  return (
    <Container p={16} sx={{ maxWidth: '375px', height: '100%' }}>
      <SearchInput
        placeholder="Search for airport or lounge"
        value={value}
        onChange={handleChange}
        onClickClear={handleClickClear}
      />
      {!value && (
        <>
          <Text mt={38} px={54} align="center" color="#000">
            Search by airport, city or lounge to find the perfect experience for
            your trip
          </Text>
          <Box m="38px" w={263} h={282}>
            <EmptyStateSearch />
          </Box>
        </>
      )}
    </Container>
  );
}
