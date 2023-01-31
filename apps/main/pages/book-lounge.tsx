import { Layout, Lounge, PageTitle } from '@collinson/design-system/index';
import { Button, Title, Stack, Box, SimpleGrid, List } from '@mantine/core';

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
      <Box>
        <Title size={16}>Facilities</Title>
        <SimpleGrid cols={2}>
          <List>
            <List.Item>Air conditioning</List.Item>
            <List.Item>Disabled access</List.Item>
          </List>
          <List>
            <List.Item>WiFi</List.Item>
            <List.Item>Television</List.Item>
          </List>
        </SimpleGrid>
      </Box>
      <Box>
        <Title size={16}>Conditions</Title>
        <List>
          <List.Item>
            Access is permitted no more than 3 hours prior to scheduled flight.
          </List.Item>
          <List.Item>
            Access may be restricted due to space constraints
          </List.Item>
        </List>
      </Box>
      <Box>
        <Button color="dark" size="md" fullWidth>
          Book lounge
        </Button>
      </Box>
    </Stack>
  );
}

BookLounge.getLayout = (page: JSX.Element) => <Layout>{page}</Layout>;
