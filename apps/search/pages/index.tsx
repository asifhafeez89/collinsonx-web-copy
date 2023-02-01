import { useState } from 'react';

import {
  default as SearchInput,
  SearchInputProps,
} from '@collinsonx/design-system/components/searchInput';

import Layout from '@components/Layout';
import EmptyStateResults from '@components/EmptyStateResults';
import Results from '@components/Results';
import resultsMock from '@components/Results/resultsMock';
import { Stack } from '@collinsonx/design-system/core';

export default function Search() {
  const [value, setValue] = useState('');
  const handleClickClear = () => {
    setValue('');
  };
  const handleChange: SearchInputProps['onChange'] = (e) => {
    setValue(e.target.value);
  };

  return (
    <Stack spacing={16}>
      <SearchInput
        placeholder="Search for airport or lounge"
        value={value}
        onChange={handleChange}
        onClickClear={handleClickClear}
      />
      {!value && <EmptyStateResults />}
      {value && <Results data={resultsMock} />}
    </Stack>
  );
}

Search.getLayout = (page: JSX.Element) => <Layout>{page}</Layout>;
