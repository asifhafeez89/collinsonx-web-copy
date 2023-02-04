import { Text, Box, SimpleGrid, Image } from '@mantine/core';
import { MapPin, Clock } from '../../assets/icons/index';

interface ILounge {
  image?: string;
  airport: string;
  loungeName?: string;
  openingTimes?: string;
  openDays?: string;
}

export default function Lounge({
  image,
  airport,
  loungeName,
  openingTimes,
  openDays,
}: ILounge) {
  return (
    <>
      {image && <Image src={image} alt={airport} />}
      {loungeName && <Text color={'#000000'}>{loungeName}</Text>}
      <SimpleGrid cols={2}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <MapPin color={'#000000'} />
          <Box sx={{ paddingLeft: '5px' }}>
            <Text color={'#000000'}>{airport}</Text>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Clock color={'#000000'} />
          <Box sx={{ paddingLeft: '5px' }}>
            <Text color={'#000000'}>{openingTimes}</Text>
          </Box>
        </Box>
      </SimpleGrid>
    </>
  );
}
