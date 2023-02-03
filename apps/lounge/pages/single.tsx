import Layout from '../components/Layout';
import { PageTitle, Status } from '@collinsonx/design-system/index';
import { MapPin } from '@collinsonx/design-system/assets/icons';
import { Title, Stack, Box, Image, Text } from '@collinsonx/design-system/core';

const data = {
  lounge: 'Club Aspire Lounge',
  imageUrl:
    'https://no1lounges.com/content/images/product/airport-lounges/club-aspire/London-Heathrow-Airport-Terminal-5-Club-Aspire-Lounge-05142021_111414.jpg',
  qrCode: '',
  airport: 'London Heathrow T5',
  status: 'pending',
  date: '12/06/2023',
  arrivalTime: '08:30',
  requirements: 'None',
};

// https://www.investopedia.com/thmb/LCLGYbEdJwzFQbTsFSDiM-hx42U=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/qr-code-bc94057f452f4806af70fd34540f72ad.png

export default function SingleBooking() {
  let image;
  if (data.imageUrl) {
    image = <Image src={data.imageUrl} alt={data.lounge} />;
  }
  if (data.qrCode) {
    image = (
      <Image src={data.qrCode} alt={data.lounge} width={225} height={225} />
    );
  }

  return (
    <Stack>
      <PageTitle title={`Book ${data.lounge}`} url={'/lounge'} />
      <Stack sx={{ border: '1px solid #E9ECEF', padding: 17 }}>
        <Box
          sx={{
            borderRadius: 4,
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {image}
        </Box>
        <Title size={18} color={'#000000'}>
          {data.lounge}
        </Title>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <MapPin color={'#000000'} />
          <Text color={'#000000'} sx={{ marginLeft: '10px' }}>
            {data.airport}
          </Text>
        </Box>
        <Status status={data.status} />
        <Stack spacing={17} sx={{ border: '1px solid #E9ECEF', padding: 17 }}>
          <Box>
            <Title size={18}>Date</Title>
            <Text>{data.date}</Text>
          </Box>

          <Box>
            <Title size={18}>Time of arrival</Title>
            <Text>{data.date}</Text>
          </Box>

          <Box>
            <Title size={18}>Additional requirements</Title>
            <Text>{data.requirements}</Text>
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
}

SingleBooking.getLayout = (page: JSX.Element) => <Layout>{page}</Layout>;
