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
  Image,
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

interface CardWrapperProps {
  nextVisit: boolean;
}
const CardWrapper = styled.div<CardWrapperProps>`
  display: flex;
  flex-direction: ${(props) => (props.nextVisit ? 'column' : 'row')};
  flex-wrap: nowrap;
  width: 343px;
  transition: 0.3s;
  border-radius: 4px;
  border: ${(props) => (props.nextVisit ? '2px solid #c8c9ca' : '')};
  border-bottom: ${(props) => (props.nextVisit ? '' : '2px solid #c8c9ca')};
  padding: ${(props) => (props.nextVisit ? '1rem' : '1rem 0')};
  margin-bottom: 1rem;
  margin-top: 1.5rem;
  background-color: #fff;
`;

const CardImage = styled.img<CardWrapperProps>`
  width: ${(props) => (props.nextVisit ? '100%' : '107px !important')};
  height: ${(props) => (props.nextVisit ? '100%' : '107px !important')};
  margin-right: ${(props) => (props.nextVisit ? '' : '24px')};
`;

const ContentWrapper = styled.div<CardWrapperProps>`
  border-radius: 5px 5px 0 0;
`;

const ContentStack = styled.div<CardWrapperProps>`
  display: flex;
  flex-direction: column;
  .card-title {
    margin-top: ${(props) => (props.nextVisit ? '8px' : '0')};
    font-size: ${(props) => (props.nextVisit ? '24px' : '16px')};
    line-height: ${(props) => (props.nextVisit ? '1.429em' : '1em')};
  }
`;

export interface BookingCardProps {
  id: string;
  name: string;
  location: string;
  imgUrl: string;
  status: BookingStatus;
  date: string;
  bookedFrom: string;
  nextVisit?: boolean;
  onClick: (bookingId: string) => void;
}

export default function BookingCard({
  id,
  name,
  location,
  imgUrl,
  status,
  date,
  nextVisit = false,
  onClick,
}: BookingCardProps) {
  return (
    <CardWrapper nextVisit={nextVisit}>
      <Box
        sx={{
          borderRadius: 4,
        }}
      >
        <CardImage nextVisit={nextVisit} src={imgUrl} alt={name} />
      </Box>
      <Box>
        <Stack spacing={0}>
          <ContentWrapper nextVisit={nextVisit}>
            <ContentStack nextVisit={nextVisit}>
              <Title className={'card-title'} fw={600}>
                {name}
              </Title>
              <Stack spacing={4}>
                <Text mt={8} size={16}>
                  {location}
                </Text>
                <Text size={16}>{dayjs.utc(date).format('D MMMM YYYY')}</Text>
                <Text size={16}>
                  {dayjs.utc(date).format('HH:mm')} lounge arrival time
                </Text>
                <BookingBadge status={status} mt={12} h={24}>
                  Booking {status.toLowerCase()}
                </BookingBadge>
              </Stack>
            </ContentStack>
          </ContentWrapper>
        </Stack>
      </Box>
    </CardWrapper>
  );
}
