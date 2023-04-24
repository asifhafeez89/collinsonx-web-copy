import { Lounge, PageTitle } from '@collinsonx/design-system/index';
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
  UnstyledButton,
  Button,
} from '@collinsonx/design-system/core';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import FormWrapper from '@collinsonx/design-system/components/formWrapper/formWrapper';
import Heading from '@collinsonx/design-system/components/heading/Heading';
import { MapPin } from '@collinsonx/design-system/assets/icons';

export default function BookLounge() {
  const router = useRouter();

  const { loading, data } = useQuery<{
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
        <div style={{ background: '#f5f5f5', height: '100vh' }}>
          <Container
            p={0}
            sx={{
              '@media (min-width: 351px) and (max-width: 767px)': {
                width: '100%',
                height: '1066px',
              },
              '@media (max-width: 350px) and (min-width: 250px)': {
                width: '100%',
                height: '1200px',
              },
              height: '1000px',
              width: '450px',
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
                '@media (min-width: 768px)': {
                  height: '105vh',
                },
              }}
            >
              <Stack
                sx={{
                  position: 'absolute',
                  top: '40px',
                  left: '10px',
                  zIndex: 10000,
                }}
              >
                <PageTitle title="" url={`/`} fullwhite={true} />
              </Stack>

              <Stack
                sx={{
                  position: 'absolute',
                  backgroundColor: '#25262B',
                  backgroundImage: 'url(/lounge/loungeimage.png)',
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  zIndex: 100,
                  top: '0px',
                  height: '100vh',
                  width: '100%',
                }}
              ></Stack>
              <div
                style={{
                  opacity: '0.5',
                  zIndex: 400,
                  height: '27vh',
                  width: '100%',
                  background: '#25262B',
                  position: 'absolute',
                  top: '0px',
                }}
              ></div>
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
                <Heading as="h1" color="#000" subtitleColor="#20C997">
                  {lounge?.name ?? '-'}
                </Heading>

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
                      <List.Item py={8} key={item} sx={{ flex: '1 0 49.33%' }}>
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
                      <List.Item py={8} key={index}>
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
                  py={8}
                  h={76}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    position: 'fixed',
                    left: 0,
                    width: '100%',
                    bottom: '40px',
                    backgroundColor: '#FFF',
                  }}
                >
                  <Button
                    onClick={handleBook}
                    maw={410}
                    sx={{
                      height: 45,
                      padding: '12px 24px',
                      margin: '5px',
                      width: '100%',
                      textAlign: 'center',
                      fontSize: '18px',
                      marginBottom: '1rem',

                      '@media (min-width: 768px)': {
                        width: '90%',
                        textAlign: 'center',
                      },
                    }}
                  >
                    Request lounge booking
                  </Button>
                </Box>
              </Box>
            </Stack>
          </Container>
        </div>
      )}
    </>
  );
}

BookLounge.getLayout = (page: JSX.Element) => <>{page}</>;
