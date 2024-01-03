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
        <Box style={{ display: 'flex', alignItems: 'center' }}>
          <MapPin width={24} color={'#000000'} />
          <Box style={{ paddingLeft: '5px' }}>
            <Text
              color={'#000000'}
              style={{
                width: '130px',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
              }}
            >
              {airport}
            </Text>
          </Box>
        </Box>
        <Box style={{ display: 'flex', alignItems: 'center' }}>
          <Clock color={'#000000'} width={24} />
          <Box
            style={{
              paddingLeft: '5px',
            }}
          >
            <Text
              color={'#000000'}
              style={{
                width: '130px',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
              }}
            >
              {openingTimes}
            </Text>
          </Box>
        </Box>
      </SimpleGrid>
    </>
  );
}
