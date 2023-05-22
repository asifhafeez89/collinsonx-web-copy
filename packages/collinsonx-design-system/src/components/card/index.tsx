import styled from '@emotion/styled';
import Button from '../button';
import { Flex, Stack, Text, Box, Grid } from '@mantine/core';
import { Clock, MapPin } from '../../assets/icons';

const CardWrapper = styled.div`
  width: 100%;
  transition: 0.3s;
  border-radius: 5px; /* 5px rounded corners */
  background-color: #fff;
  padding: 1rem;
  margin-bottom: 1rem;

  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.15);

  h3 {
    padding-bottom: 0px;
    margin-bottom: 0px;
  }

  p {
    margin-top: 0px;
  }

  &:hover {
    box-shadow: 10 8px 16px 10 rgba(0, 0, 0, 0.2);
  }

  .currency:not(:empty):before {
    content: '£';
    font-size: 14px;
    vertical-align: 10px;
  }
`;

const ContentWrapper = styled.div`
  padding-bottom: 8px;
  & h3 {
    margin-top: 8px;
  }
`;

type Maybe<T> = T | undefined | null;

export interface CardProps {
  title: string;
  subtitle: string;
  ImageComponent?: JSX.Element;
  openingHours?: string;
  //price is mocked based on the format supplied by Ion
  price: {
    currency: string;
    reservationCost: number;
    lifestyleXReservationCharge: number;
  };
  handleClick: () => void;
}

/**
 * Primary UI component for user interaction
 */
export default function Card({
  title,
  subtitle,
  handleClick,
  ImageComponent,
  openingHours,
  price,
}: CardProps) {
  return (
    <CardWrapper>
      {ImageComponent}
      <ContentWrapper>
        <h3>{title}</h3>
      </ContentWrapper>
      <Stack spacing={8} pb={16}>
        <Flex align="center" gap={10}>
          <MapPin width={16} color="#0C8599" />
          <Text fw={600}>{subtitle}</Text>
        </Flex>
        <Flex align="center" gap={10}>
          <Clock width={16} color="#0C8599" />

          <Text fw={600}>{openingHours && openingHours.split('Note')[0]}</Text>
        </Flex>
      </Stack>
      <Stack
        style={{
          borderRadius: '5px 5px 0 0',
          borderTop: '1px solid #c8c9ca',
        }}
      >
        <Box>
          {price.reservationCost !== undefined && (
            <p
              className="currency"
              style={{
                fontSize: '28px',
                fontWeight: '700',
                margin: '0',
                marginBottom: '4px',
                color: '#0C8599',
              }}
            >
              {price.reservationCost.toFixed(2)}
            </p>
          )}
        </Box>
        <Flex justify={'center'} gap={8}>
          <Button
            fullWidth={true}
            icon={null}
            variant="outline"
            style={{ color: 'black', border: '2px solid black' }}
          >
            Scan QR
          </Button>
          <Button fullWidth={true} handleClick={handleClick} icon={null}>
            View Lounge
          </Button>
        </Flex>
      </Stack>
    </CardWrapper>
  );
}
