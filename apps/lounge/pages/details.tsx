import { PageTitle } from '@collinsonx/design-system/index';
import { useQuery } from '@collinsonx/utils/apollo';
import { getSearchExperiences } from '@collinsonx/utils/queries';
import { Experience } from '@collinsonx/utils/generatedTypes/graphql';
import {
  Title,
  Stack,
  Box,
  List,
  Skeleton,
  Container,
  Flex,
  Text,
  Button,
} from '@collinsonx/design-system/core';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import Heading from '@collinsonx/design-system/components/heading/Heading';
import { MapPin } from '@collinsonx/design-system/assets/icons';
import LoungeImage from '@components/LoungeImage';
import Layout from '@components/Layout';
import LoungeError from '@components/LoungeError';
import styled from '@emotion/styled';

export default function BookLounge() {
  const router = useRouter();

  const { loading, data, error } = useQuery<{
    searchExperiences: Experience[];
  }>(getSearchExperiences);

  const lounge = useMemo(() => {
    const { id } = router.query;
    return data?.searchExperiences?.length
      ? data.searchExperiences.find((item) => item.id === id)!
      : null;
  }, [data, router]);

  const handleBook = () => {
    router.push({
      pathname: '/book',
      query: { id: lounge?.id },
    });
  };

  const Pricing = styled(Text)`
    padding-right: 24px;
    :before {
      content: '£';
      font-size: 14px;
      vertical-align: 10px;
      position: 'relative';
    }
  `;

  return (
    <Box maw={375} m="auto">
      {loading && (
        <>
          <Skeleton h={215} w={375} />
          <Box px={20}>
            <Skeleton h={32} radius="md" w="80%" mt={24} />

            <Skeleton h={24} w="40%" radius="md" mt={24} />
          </Box>
        </>
      )}
      {!loading && (
        <Box style={{ background: '#f5f5f5', height: '100vh' }}>
          <Container
            p={0}
            sx={{
              position: 'relative',
              display: 'block',
              overflow: 'scrollY',
            }}
          >
            <Stack
              sx={{
                height: '1050px',
                top: '0px',
                backgroundPositionY: 'center',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: '40px',
                  left: '10px',
                  zIndex: 10000,
                }}
              >
                <PageTitle
                  title=""
                  onClickBack={() => {
                    if (router.query.search) {
                      router.push('/search');
                    } else {
                      router.push('/');
                    }
                  }}
                  fullwhite={true}
                />
              </Box>

              <Box
                sx={{
                  position: 'absolute',
                  zIndex: 100,
                  top: '0px',
                  height: 375,
                  width: '100%',
                }}
              >
                {lounge && (
                  <LoungeImage
                    images={lounge.images}
                    width={375}
                    height={250}
                    indicatorBottom={64}
                    withIndicators
                    overlay
                  />
                )}
              </Box>

              <Box
                sx={{
                  background: '#f5f5f5',
                  borderRadius: '24px 24px 0px 0px',
                  marginTop: '70px',
                  padding: '20px',
                  paddingBottom: '130px',
                  position: 'absolute',
                  width: '100%',
                  top: '133px',
                  zIndex: 1000,
                }}
              >
                <Heading
                  as="h1"
                  color="#000"
                  subtitleColor="#20C997"
                  style={{ fontSize: '26px' }}
                >
                  {lounge?.name ?? '-'}
                </Heading>

                <Box my={24}>
                  <LoungeError error={error} />
                </Box>

                {lounge && (
                  <>
                    <Box>
                      <Stack spacing={8}>
                        <Flex align="center" gap={10}>
                          <MapPin width={16} color="#0C8599" />
                          <Text fw={600}>{lounge?.location ?? '-'}</Text>
                        </Flex>
                      </Stack>
                    </Box>

                    <Box
                      w="100%"
                      my={24}
                      sx={{ borderBottom: '1px solid  #C8C9CA' }}
                    />

                    <Box>
                      <Title size={16} color={'#000000'} pt={8}>
                        Facilities
                      </Title>
                      <List
                        py={8}
                        sx={{
                          color: '#000000',
                          display: 'flex',
                          width: '100%',
                          flexWrap: 'wrap',
                        }}
                      >
                        {lounge.facilities?.map((item) => (
                          <List.Item
                            py={8}
                            key={item}
                            sx={{ flex: '1 0 49.33%' }}
                          >
                            {item}
                          </List.Item>
                        ))}
                      </List>
                    </Box>

                    <Box>
                      <Title size={16} color={'#000000'} pt={8}>
                        Conditions
                      </Title>
                      <List size="sm" sx={{ color: '#000000' }} pt={8}>
                        {lounge.conditions?.split('-').map((item, index) => (
                          <List.Item py={8} pr={16} key={index}>
                            {item}
                          </List.Item>
                        ))}
                      </List>
                    </Box>
                    <Text fw={600}>
                      The lounge will receive your request and send confirmation
                      once they have reviewed availability.
                    </Text>

                    <Box
                      px={24}
                      py={16}
                      h={76}
                      maw={375}
                      m="auto"
                      sx={{
                        display: 'flex',
                        justifyItems: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'fixed',
                        left: 0,
                        right: 0,
                        width: '100%',
                        bottom: '40px',
                        backgroundColor: '#FFF',
                      }}
                    >
                      <Box>
                        <Text
                          style={{
                            fontSize: '12px',
                            margin: '0',
                            padding: '0',
                          }}
                        >
                          From
                        </Text>
                        <Pricing
                          className="currency"
                          style={{
                            fontSize: '28px',
                            fontWeight: '700',
                            height: '28px',
                            marginTop: '-10px',
                            marginBottom: '4px',
                            color: '#0C8599',
                          }}
                        >
                          17.50
                        </Pricing>
                      </Box>
                      <Button
                        onClick={handleBook}
                        maw={375}
                        sx={{
                          height: 45,
                          width: '100%',
                          textAlign: 'center',
                          fontSize: '18px',
                        }}
                      >
                        Request booking
                      </Button>
                    </Box>
                  </>
                )}
              </Box>
            </Stack>
          </Container>
        </Box>
      )}
      {!loading && data && !error && !lounge ? (
        <Layout>
          <Container>
            <Text>Lounge could not be found</Text>
          </Container>
        </Layout>
      ) : null}
    </Box>
  );
}

BookLounge.getLayout = (page: JSX.Element) => <>{page}</>;
