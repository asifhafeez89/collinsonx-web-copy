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
import { getSearchExperiences } from '@collinsonx/utils/queries';
import { Experience } from '@collinsonx/utils/generatedTypes/graphql';
import { useRouter } from 'next/router';

export default function Search() {
  const router = useRouter();
  const [value, setValue] = useState('');

  const [searchLounges, { data, loading, error }] = useLazyQuery(
    getSearchExperiences,
    {
      variables: { query: value },
    }
  );

  const [results, setResults] = useState<Experience[]>([]);

  useEffect(() => {
    if (value.length > 2) {
      searchLounges({
        variables: { query: value },
      });
    } else {
      setResults([]);
    }
  }, [value, searchLounges]);

  useEffect(() => {
    if (data && !loading && !error) {
      setResults(data.searchExperiences);
    }
  }, [data, loading, error]);

  const handleClickClear = () => {
    setValue('');
  };

  const handleChange: SearchInputProps['onChange'] = (e) => {
    setValue(e.target.value);
  };

  const handleItemClick = (id: string) => {
    router.push({
      pathname: '/lounge/details',
      query: { id },
    });
  };

  return (
    <Stack spacing={16}>
      <SearchInput
        placeholder="Search for airport or lounge"
        value={value}
        onChange={handleChange}
        onClickClear={handleClickClear}
      />
      {results.length > 0 ? (
        <Results data={results} onClick={handleItemClick} />
      ) : (
        <EmptyStateResults />
      )}
    </Stack>
  );
}

Search.getLayout = (page: JSX.Element) => <Layout>{page}</Layout>;
