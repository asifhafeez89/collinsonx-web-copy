import { GetServerSideProps } from 'next';
import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Title,
  Accordion,
  Grid,
  Text,
  Box,
  Stack,
} from '@collinsonx/design-system/core';
import Layout from '@components/Layout';
import {
  AvailabilitySlot,
  FlightInfo,
} from '../components/flightInfo/FlightInfo';
import usePayload from 'hooks/payload';

interface MainProps {
  consumerNumber: string | string[];
  tempBearerToken: string | string[];
}

export const getServerSideProps: GetServerSideProps<MainProps> = async ({
  req,
}) => {
  const consumerNumber = req.headers['x-consumernumber'] ?? '';
  const tempBearerToken = req.headers['authorization'] ?? '';
  return {
    props: {
      consumerNumber,
      tempBearerToken,
    },
  };
};

const Main = ({ consumerNumber, tempBearerToken }: MainProps) => {
  const router = useRouter();

  const { payload, setPayload } = usePayload();

  const [availabilitySlots, selectedSlots] = useState<
    AvailabilitySlot | undefined
  >();
  const onSetSelectedSlot = (selectedSlot: AvailabilitySlot) => {
    //setSelectedSlot(selectedSlot);
  };

  return (
    payload && (
      <Layout>
        <Title mb={8} size={32}>
          Welcome to Booking
        </Title>
        {consumerNumber && tempBearerToken ? (
          <Stack spacing={2} mt={20}>
            <Text>Consumer Number (depracated): {consumerNumber}</Text>
            <Text>Temporary Bearer Token (deprecated): {tempBearerToken}</Text>
            <Text>Consumer Number (depracated): {consumerNumber}</Text>
            <Text>Temporary Bearer Token (deprecated): {tempBearerToken}</Text>
          </Stack>
        ) : undefined}
        <Box mt={20}>
          <FlightInfo />
        </Box>
      </Layout>
    )
  );
};

export default Main;
