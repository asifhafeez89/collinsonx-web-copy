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
import { MapPin } from '@collinsonx/design-system/assets/icons';
import NextImage from 'next/image';
import { BookingStatus } from '@collinsonx/utils';

// import generated types in the following way:
// import { Booking} from '@collinsonx/utils/generatedTypes/graphql';

const CardWrapper = styled.div`
  width: 343px;
  transition: 0.3s;
  border-radius: 5px;
  border: 1px solid #e9ecef;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1), 0px 1px 3px rgba(0, 0, 0, 0.05);
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
      <Stack spacing={16}>
        <Box
          w={309}
          h={189}
          sx={{
            position: 'relative',
            borderRadius: 4,
          }}
        >
          <NextImage fill src={imgUrl} alt={name} />
          <Box sx={{ position: 'absolute', right: 8, top: 8 }}>
            <BookingBadge status={status}>
              Booking {status.toLowerCase()}
            </BookingBadge>
          </Box>
        </Box>

        <ContentWrapper>
          <Stack spacing={8}>
            <Title fw={600} size={18}>
              {name}
            </Title>

            <Group spacing={8}>
              <MapPin />
              <Text>{location}</Text>
            </Group>

            <Title fw={600} size={18}>
              Date
            </Title>

            <Text>{dayjs(date).format('DD/MM/YYYY')}</Text>
          </Stack>
        </ContentWrapper>

        <Button variant="outline" fullWidth={true} onClick={() => onClick(id)}>
          View details
        </Button>
      </Stack>
    </CardWrapper>
  );
}
