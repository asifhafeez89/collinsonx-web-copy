import React from 'react';
import styled from '@collinsonx/design-system/styled';
import dayjs from 'dayjs';
import {
  Box,
  Stack,
  Title,
  Text,
  Anchor,
} from '@collinsonx/design-system/core';
import BookingBadge from '../BookingBadge';
import NextImage from 'next/image';
import { BookingStatus } from '@collinsonx/utils';
import utc from 'dayjs/plugin/utc';
import {
  Warning as WarningIcon,
  Declined as DeclinedIcon,
} from '@collinsonx/design-system/assets/icons';
dayjs.extend(utc);

// import generated types in the following way:
// import { Booking} from '@collinsonx/utils/generatedTypes/graphql';

interface CardWrapperProps {
  nextVisit: boolean;
  firstArray: boolean;
}

const CardWrapper = styled.div<CardWrapperProps>`
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
  firstArray?: boolean;
  onClick: (bookingId: string) => void;
}

export interface BookingBadgeProps {
  fullBadge?: boolean;
}

export default function BookingCard({
  id,
  name,
  location,
  imgUrl,
  status,
  date,
  nextVisit = false,
  firstArray = false,
  onClick,
}: BookingCardProps) {
  return (
    <>
      <CardWrapper
        nextVisit={nextVisit}
        firstArray={firstArray}
        onClick={() => onClick(id)}
      >
        <Box
          sx={{
            position: 'relative',
          }}
        >
          <CardImage
            nextVisit={nextVisit}
            firstArray={firstArray}
            src={imgUrl}
            alt={name}
          />
          {!nextVisit && (
            <Box
              style={{
                position: 'absolute',
                top: 2,
                right: 24,
                outline: '8px solid #fff',
                borderBottomLeftRadius: 4,
              }}
            >
              <BookingBadge fullBadge={false} status={status}></BookingBadge>
            </Box>
          )}
        </Box>
        <Box>
          <Stack spacing={0}>
            <ContentWrapper nextVisit={nextVisit} firstArray={firstArray}>
              <ContentStack nextVisit={nextVisit} firstArray={firstArray}>
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
                  {nextVisit && (
                    <BookingBadge
                      fullBadge={true}
                      status={status}
                      mt={12}
                      h={24}
                    >
                      {status.toLowerCase()}
                    </BookingBadge>
                  )}
                </Stack>
              </ContentStack>
            </ContentWrapper>
          </Stack>
        </Box>
      </CardWrapper>
      {status === 'DECLINED' && (
        <Stack
          spacing={0}
          style={{
            paddingBottom: '24px',
          }}
        >
          <Box
            style={{
              display: 'flex',
              backgroundColor: '#FCD8D8',
              marginTop: '8px',
              padding: '8px 16px',
              border: '1px solid #F03E3E',
              borderRadius: '4px',
            }}
          >
            <DeclinedIcon
              style={{
                height: '28px',
                width: '28px',
                marginRight: '10px',
                color: '#C92A2A',
              }}
            />
            <Stack spacing={0}>
              <Text style={{ fontSize: '14px' }}>
                Unfortunately the lounge has declined your request.
                <Anchor
                  href="/"
                  target="_blank"
                  style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#C92A2A',
                  }}
                >
                  See your messages
                </Anchor>
              </Text>
            </Stack>
          </Box>
        </Stack>
      )}
      {status === 'CANCELLED' && (
        <Stack
          spacing={0}
          style={{
            paddingBottom: '24px',
          }}
        >
          <Box
            style={{
              display: 'flex',
              backgroundColor: '#FCD8D8',
              marginTop: '8px',
              padding: '8px 16px',
              border: '1px solid #F03E3E',
              borderRadius: '4px',
            }}
          >
            <DeclinedIcon
              style={{
                height: '28px',
                width: '28px',
                marginRight: '10px',
                color: '#C92A2A',
              }}
            />
            <Stack spacing={0}>
              <Text style={{ fontSize: '14px' }}>
                Your cancellation has been confirmed.
                <Anchor
                  href="/"
                  target="_blank"
                  style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#C92A2A',
                  }}
                >
                  See your messages
                </Anchor>
              </Text>
            </Stack>
          </Box>
        </Stack>
      )}
    </>
  );
}
