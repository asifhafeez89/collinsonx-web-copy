import { useState, useEffect } from 'react';
import {
  default as SearchInput,
  SearchInputProps,
} from '@collinsonx/design-system/components/searchInput';
import Layout from '@components/Layout';
import EmptyStateResults from '@components/EmptyStateResults';
import Results from '@components/Results';
import resultsMock from '@components/Results/resultsMock';
import { Stack } from '@collinsonx/design-system/core';
import { useLazyQuery } from '@collinsonx/utils/apollo';
import { getLoungesByName } from '@collinsonx/utils/queries';

export default function Search() {
  const [value, setValue] = useState('');

  const [searchLounges, { data }] = useLazyQuery(getLoungesByName, {
    variables: { loungeName: value },
  });

  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!value) return;
    // function for executing query doesn't return a promise
    searchLounges();
    if (data) {
      setResults(data.lounges);
    }
  }, [value, data, searchLounges]);

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
