import { Lounge, PageTitle } from '@collinsonx/design-system/index';
import Layout from '../components/Layout';
import {
  UnstyledButton,
  Title,
  Stack,
  Box,
  SimpleGrid,
  List,
  Divider,
} from '@collinsonx/design-system/core';
import { useRouter } from 'next/router';
import { LoungeType } from 'lounges';

const data = {
  image:
    'https://no1lounges.com/content/images/product/airport-lounges/club-aspire/London-Heathrow-Airport-Terminal-5-Club-Aspire-Lounge-05142021_111414.jpg',
  location: 'London',
  airport: 'Heathrow T5',
  openingTimes: '07:00 - 22:00',
  openDays: 'Monday - Sunday',
};

export default function BookLounge() {
  const router = useRouter();
  const lounge = router?.query?.lounge ?? '{}';
  const loungeDetails: LoungeType = JSON.parse(lounge as string);

  const handleBook = () => {
    router.push({
      pathname: '/book',
      query: { lounge: JSON.stringify(loungeDetails) },
    });
  };

  return (
    <Stack align="stretch">
      <PageTitle title={loungeDetails.loungeName} url={'/lounge'} />
      <Lounge
        image={loungeDetails.pictureUrl}
        airport={loungeDetails.airport}
        terminal={loungeDetails.terminal}
      />
      <Divider color={'gray'} />
      <Box>
        <Title size={16} color={'#000000'}>
          Facilities
        </Title>
        <SimpleGrid cols={2}>
          <List sx={{ color: '#000000' }}>
            <List.Item>Air conditioning</List.Item>
            <List.Item>Disabled access</List.Item>
          </List>
          <List sx={{ color: '#000000' }}>
            <List.Item>WiFi</List.Item>
            <List.Item>Television</List.Item>
          </List>
        </SimpleGrid>
      </Box>
      <Box>
        <Title size={16} color={'#000000'}>
          Conditions
        </Title>
        <List sx={{ color: '#000000' }}>
          <List.Item>
            Access is permitted no more than 3 hours prior to scheduled flight.
          </List.Item>
          <List.Item>
            Access may be restricted due to space constraints
          </List.Item>
        </List>
      </Box>
      <Box>
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
          }}
        >
          Book lounge
        </UnstyledButton>
      </Box>
    </Stack>
  );
}

BookLounge.getLayout = (page: JSX.Element) => <Layout>{page}</Layout>;
