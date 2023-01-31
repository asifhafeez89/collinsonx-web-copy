import { Text, Box, SimpleGrid, Image } from '@mantine/core';
import { MapPin, Clock } from '../../assets/icons/index';

interface ILounge {
  image?: string;
  location: string;
  airport: string;
  openingTimes: string;
  openDays: string;
}

export default function Lounge({
  image,
  location,
  airport,
  openingTimes,
  openDays,
}: ILounge) {
  return (
    <>
      {image && <Image src={image} alt={airport} />}
      <SimpleGrid cols={2}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <MapPin />
          <Box sx={{ paddingLeft: '10px' }}>
            <Text>{location}</Text>
            <Text>{airport}</Text>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Clock />
          <Box sx={{ paddingLeft: '10px' }}>
            <Text>{openingTimes}</Text>
            <Text>{openDays}</Text>
          </Box>
        </Box>
      </SimpleGrid>
    </>
  );
}
