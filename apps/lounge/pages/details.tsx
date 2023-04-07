import { Lounge, PageTitle } from '@collinsonx/design-system/index';
import { client, useQuery } from '@collinsonx/utils/apollo';
import { getSearchExperiences } from '@collinsonx/utils/queries';
import { Experience } from '@collinsonx/utils/generatedTypes/graphql';
import Layout from '@components/Layout';
import {
  UnstyledButton,
  Title,
  Stack,
  Box,
  List,
  Divider,
  Skeleton,
} from '@collinsonx/design-system/core';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

export default function BookLounge() {
  const router = useRouter();

  const { loading, error, data } = useQuery<{
    searchExperiences: Experience[];
  }>(getSearchExperiences);

  const lounge = useMemo(() => {
    return data?.searchExperiences?.length ? data.searchExperiences[0] : null;
  }, [data]);

  const handleBook = () => {
    router.push({
      pathname: '/book',
      query: { id: lounge?.id },
    });
  };

  return (
    <>
      {loading && <Skeleton visible={loading} h={500} />}
      {!loading && lounge && (
        <Stack align="stretch">
          <PageTitle title={lounge?.name ?? '-'} url={`/`} />
          <Lounge
            image={
              lounge.images && lounge.images.length
                ? lounge.images[0]?.url ||
                  'https://cdn03.collinson.cn/lounge-media/image/BHX6-13756.jpg'
                : 'https://cdn03.collinson.cn/lounge-media/image/BHX6-13756.jpg'
            }
            airport={lounge?.location ?? '-'}
            openingTimes={
              (lounge.openingHours as unknown as string[])
                ?.join(',')
                .substring(0, 20) ?? '-'
            }
          />
          <Divider color={'gray'} />
          <Box>
            <Title size={16} color={'#000000'}>
              Facilities
            </Title>
            <List
              sx={{
                color: '#000000',
                display: 'flex',
                width: '100%',
                flexWrap: 'wrap',
              }}
            >
              {lounge.facilities?.map((item) => (
                <List.Item key={item} sx={{ flex: '1 0 49.33%' }}>
                  {item}
                </List.Item>
              ))}
            </List>
          </Box>
          <Box>
            <Title size={16} color={'#000000'}>
              Conditions
            </Title>
            <List sx={{ color: '#000000' }}>
              {lounge.conditions ??
                ''
                  .split('-')
                  .map((item, index) => (
                    <List.Item key={index}>{item}</List.Item>
                  ))}
            </List>
          </Box>
          <UnstyledButton
            onClick={handleBook}
            sx={{
              borderRadius: 8,
              background: '#000000',
              color: '#ffffff',
              padding: '12px 24px',
              width: '100%',
              textAlign: 'center',
              fontSize: '18px',
              marginBottom: '1rem',
            }}
          >
            Book lounge
          </UnstyledButton>
        </Stack>
      )}
    </>
  );
}

BookLounge.getLayout = (page: JSX.Element) => <Layout>{page}</Layout>;
