import { Layout, Lounge, PageTitle } from '@collinson/design-system/index';
import {
  UnstyledButton,
  Title,
  Stack,
  Box,
  SimpleGrid,
  List,
  Divider,
} from '@collinson/design-system/core';

const data = {
  image:
    'https://no1lounges.com/content/images/product/airport-lounges/club-aspire/London-Heathrow-Airport-Terminal-5-Club-Aspire-Lounge-05142021_111414.jpg',
  location: 'London',
  airport: 'Heathrow T5',
  openingTimes: '07:00 - 22:00',
  openDays: 'Monday - Sunday',
};

export default function BookLounge() {
  return (
    <Stack sx={{ padding: '0 15px' }}>
      <PageTitle title={'Club Aspire Lounge'} url={'/explore-lounges'} />
      <Lounge {...data} />
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
