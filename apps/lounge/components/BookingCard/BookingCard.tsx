import React from 'react';
import styled from '@collinsonx/design-system/styled';
import dayjs from 'dayjs';
import {
  Box,
  Stack,
  Title,
  Text,
  Button,
} from '@collinsonx/design-system/core';
import { BookingStatus } from '@collinsonx/utils';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

// import generated types in the following way:
// import { Booking} from '@collinsonx/utils/generatedTypes/graphql';

interface CardWrapperProps {
  nextVisit: boolean;
  firstArray: boolean;
}

const CardWrapper = styled.div<CardWrapperProps>`
  display: flex;
  flex-direction: column;
  padding-bottom: ${(props) => (props.nextVisit ? '8px' : '16px')};
`;

const ContentWrapper = styled.div<CardWrapperProps>`
  display: flex;
  flex-direction: ${(props) => (props.nextVisit ? 'column' : 'row')};
  flex-wrap: nowrap;
  width: 343px;
  transition: 0.3s;
  margin: 0;
  background-color: #fff;
  border-top: ${(props) =>
    props.firstArray && !props.nextVisit ? undefined : '2px solid #c8c9ca'};
  border-radius: ${(props) => (props.nextVisit ? '4px' : '0')};
  border: ${(props) => (props.nextVisit ? '2px solid #c8c9ca' : undefined)};
  padding: ${(props) => (props.nextVisit ? '1rem' : '1rem 0')};
`;

const CardImage = styled.img<CardWrapperProps>`
  width: ${(props) => (props.nextVisit ? '100%' : '107px !important')};
  height: ${(props) => (props.nextVisit ? '100%' : '107px !important')};
  margin-right: ${(props) => (props.nextVisit ? undefined : '24px')};
  float: left;
`;

const InfoWrapper = styled.div<CardWrapperProps>`
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
  firstArray?: boolean;
  onClick: (bookingId: string) => void;
}

export default function BookingCard({
  id,
  name,
  location,
  imgUrl,
  date,
  nextVisit = false,
  firstArray = false,
  onClick,
}: BookingCardProps) {
  return (
    <CardWrapper nextVisit={nextVisit} firstArray={firstArray}>
      <ContentWrapper
        nextVisit={nextVisit}
        firstArray={firstArray}
        data-testid="booking-card-wrapper"
      >
        <Box
          style={{
            position: 'relative',
          }}
        >
          <CardImage
            nextVisit={nextVisit}
            firstArray={firstArray}
            src={imgUrl}
            alt={name}
          />
        </Box>
        <Box>
          <Stack spacing={0}>
            <InfoWrapper nextVisit={nextVisit} firstArray={firstArray}>
              <ContentStack nextVisit={nextVisit} firstArray={firstArray}>
                <Title className={'card-title'} fw={600}>
                  {name}
                </Title>
                <Stack spacing={4}>
                  <Text mt={8} size={16}>
                    {location}
                  </Text>
                  <Text size={16}>{dayjs.tz(date).format('D MMMM YYYY')}</Text>
                  <Text size={16}>
                    {dayjs.tz(date).format('HH:mm')} lounge arrival time
                  </Text>
                  {nextVisit && (
                    <Button mt={12} onClick={() => onClick(id)}>
                      View booking
                    </Button>
                  )}
                </Stack>
              </ContentStack>
            </InfoWrapper>
          </Stack>
        </Box>
      </ContentWrapper>
      {!nextVisit && <Button onClick={() => onClick(id)}>View booking</Button>}
    </CardWrapper>
  );
}
