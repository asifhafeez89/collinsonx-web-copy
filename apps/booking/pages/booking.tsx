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

const Main = () => {
  const router = useRouter();

  const { payload, setPayload } = usePayload();

  const onFlightInfoSuccess = (flightInfo: FlightInfo) => {
    setFlightData(flightInfo);
  };
  const [flightData, setFlightData] = useState<FlightInfo | undefined>();
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
        <Box mt={20}>
          <FlightInfo />
        </Box>
      </Layout>
    )
  );
};

export default Main;
