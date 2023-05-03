import React from 'react';
import styled from '@collinsonx/design-system/styled';
import dayjs from 'dayjs';
import {
  Box,
  Button,
  Stack,
  Title,
  Text,
  Group,
} from '@collinsonx/design-system/core';
import BookingBadge from './BookingBadge';
import {
  MapPin,
  Calendar,
  Clock,
} from '@collinsonx/design-system/assets/icons';
import NextImage from 'next/image';
import { BookingStatus } from '@collinsonx/utils';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

// import generated types in the following way:
// import { Booking} from '@collinsonx/utils/generatedTypes/graphql';

const CardWrapper = styled.div`
  width: 343px;
  transition: 0.3s;
  border-radius: 5px;
  border: 1px solid #e9ecef;
  padding: 1rem;
  margin-bottom: 1rem;
  margin-top: 1.5rem;
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.15), 0px 1px 3px rgba(0, 0, 0, 0.05);
  background-color: #fff;
`;

const ContentWrapper = styled.div`
  border-radius: 5px 5px 0 0;
`;

export interface BookingCardProps {
  id: string;
  name: string;
  location: string;
  imgUrl: string;
  status: BookingStatus;
  date: string;
  bookedFrom: string;
  onClick: (bookingId: string) => void;
}

export default function BookingCard({
  id,
  name,
  location,
  imgUrl,
  status,
  date,
  onClick,
}: BookingCardProps) {
  return (
    <CardWrapper>
      <Stack spacing={0} mt={8}>
        <Box
          w={309}
          h={189}
          sx={{
            position: 'relative',
            borderRadius: 4,
          }}
        >
          <NextImage fill src={imgUrl} alt={name} />
          <Box sx={{ position: 'absolute', left: 8, top: 8 }}>
            <BookingBadge status={status}>
              Booking {status.toLowerCase()}
            </BookingBadge>
          </Box>
        </Box>

        <ContentWrapper>
          <Stack spacing={0}>
            <Title
              fw={600}
              pb={16}
              mt={16}
              size={24}
              sx={{ borderBottom: '1px solid #C8C9CA' }}
            >
              {name}
            </Title>
            <Stack spacing={0}>
              <Group mt={16}>
                <MapPin width={16} height={'auto'} color="#0C8599" />
                <Text size={16} fw={600}>
                  {location}
                </Text>
              </Group>

              <Group mt={8}>
                <Calendar width={16} height={'auto'} color="#0C8599" />
                <Title fw={600} size={16}>
                  Date
                </Title>
              </Group>

              <Text size={16} ml={32}>
                {dayjs.utc(date).format('D MMMM YYYY')}
              </Text>

              <Group mt={8}>
                <Clock width={16} color="#0C8599" />
                <Title fw={600} size={16}>
                  Lounge arrival time
                </Title>
              </Group>

              <Text ml={32} size={16}>
                {dayjs.utc(date).format('HH:mm')}
              </Text>
            </Stack>
          </Stack>
        </ContentWrapper>

        <Button
          fullWidth={true}
          onClick={() => onClick(id)}
          mt={16}
          sx={{ fontSize: '18px', height: '44px' }}
        >
          View booking
        </Button>
      </Stack>
    </CardWrapper>
  );
}
