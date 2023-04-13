import React from 'react';
import styled from '@collinsonx/design-system/styled';
import {
  Box,
  Stack,
  Title,
  Text,
  Group,
  Flex,
} from '@collinsonx/design-system/core';
import { ChevronRight, MapPin } from '@collinsonx/design-system/assets/icons';
import dayjs from 'dayjs';

const CardWrapper = styled.div`
  width: 343px;
  transition: 0.3s;
  border-radius: 5px;
  border: 1px solid #e9ecef;
  margin-bottom: 1rem;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1), 0px 1px 3px rgba(0, 0, 0, 0.05);
`;

const ContentWrapper = styled.div`
  border-radius: 5px 5px 0 0;
`;

export interface BookingCardConfirmedProps {
  name: string;
  location: string;
  date: string;
  status: string;
}

export default function BookingCardConfirmed({
  name,
  location,
  date,
  status,
}: BookingCardConfirmedProps) {
  return (
    <CardWrapper>
      <ContentWrapper>
        <Box
          py={8}
          pl={16}
          pr={8}
          sx={({ colors }) => ({ backgroundColor: colors.cyan[6] })}
        >
          <Flex color="#000" direction="row" justify="space-between">
            <Text fw={600}>Booking {status.toLowerCase()}</Text>
            <ChevronRight />
          </Flex>
        </Box>
        <Flex p={16} direction="row" justify="space-between">
          <Stack spacing={8}>
            <Title fw={600} size={18}>
              {name}
            </Title>
            <Group spacing={8}>
              <MapPin width={16} />
              <Text>{location}</Text>
            </Group>
          </Stack>

          <Stack spacing={8}>
            <Title fw={600} size={18}>
              Date
            </Title>
            <Text>{dayjs(date).format('DD/MM/YYYY')}</Text>
          </Stack>
        </Flex>
      </ContentWrapper>
    </CardWrapper>
  );
}
