import { useState, useEffect } from 'react';
import {
  default as SearchInput,
  SearchInputProps,
} from '@collinsonx/design-system/components/searchInput';
import Layout from '@components/Layout';
import EmptyStateResults from '@components/EmptyStateResults';
import Results from '@components/Results';
import { Stack } from '@collinsonx/design-system/core';
import { useLazyQuery } from '@collinsonx/utils/apollo';
import { getLoungesByName } from '@collinsonx/utils/queries';
import { LoungeData } from '@collinsonx/utils/types/lounge';

export default function Search() {
  const [value, setValue] = useState('');

  const [searchLounges, { data, loading, error }] = useLazyQuery(
    getLoungesByName,
    {
      variables: { loungeName: value },
    }
  );

  const [results, setResults] = useState<LoungeData[]>([]);

  useEffect(() => {
    if ((value?.length ?? 0) > 1) {
      searchLounges({
        variables: { loungeName: value },
      });
    } else {
      setResults([]);
    }
  }, [value]);

  useEffect(() => {
    if (data && !loading && !error) {
      setResults(data.getLoungesByName);
    }
  }, [data, loading, error]);

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
      {results.length > 0 ? <Results data={results} /> : <EmptyStateResults />}
    </Stack>
  );
}

Search.getLayout = (page: JSX.Element) => <Layout>{page}</Layout>;
