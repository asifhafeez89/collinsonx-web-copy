import { Title, Accordion, Grid, Text } from '@collinsonx/design-system/core';
import {
  AvailabilitySlot,
  FlightInfo,
} from '../components/flightInfo/FlightInfo';

import { GetServerSideProps } from 'next';
import { useState } from 'react';
import dayjs from 'dayjs';
import Booking from '@components/Booking';
import Layout from '@components/Layout';

interface MainProps {
  consumerNumber: string | string[];
  tempBearerToken: string | string[];
}
interface DepartureFlightInfo {
  airport: { iata: string };
  date: { local: string; utc: string };
  terminal: string;
  time: { local: string; utc: string };
}

interface FlightInfo {
  departure: DepartureFlightInfo;
  arrival: DepartureFlightInfo;
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
    <Layout>
      <Title mb={8} size={32}>
        Welcome to Booking
      </Title>
      <p>Consumer Number: {consumerNumber}</p>
      <p>Temporary Bearer Token: {tempBearerToken}</p>

      <FlightInfo onSuccess={onFlightInfoSuccess} />

      {flightData ? (
        <Grid style={{ marginTop: '20px' }}>
          <Grid.Col sm="auto" md="auto" lg={3}>
            <Accordion variant="separated">
              <Accordion.Item value="customization">
                <Accordion.Control>
                  Departing Flight Information
                </Accordion.Control>
                <Accordion.Panel>
                  <p>Departing Airport: {flightData.departure.airport.iata}</p>
                  <p>
                    Departing Date (local): {flightData.departure.date.local}
                  </p>
                  <p>Departing Date (utc): {flightData.departure.date.utc}</p>
                  <p>
                    Departing Time (local): {flightData.departure.time.local}
                  </p>
                  <p>Departing Time (utc): {flightData.departure.time.utc}</p>
                </Accordion.Panel>
              </Accordion.Item>
              <Accordion.Item value="flexibility">
                <Accordion.Control>
                  Arrival Flight Information
                </Accordion.Control>
                <Accordion.Panel>
                  <p>Arrival Airport: {flightData.arrival.airport.iata}</p>
                  <p>Arrival Date (local): {flightData.arrival.date.local}</p>
                  <p>Arrival Date (utc): {flightData.arrival.date.utc}</p>
                  <p>Arrival Time (local): {flightData.arrival.time.local}</p>
                  <p>Arrival Time (utc): {flightData.arrival.time.utc}</p>
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </Grid.Col>
          {/* {selectedSlot ? (
            <Grid.Col sm="auto" md="auto" lg={3}>
              <Text>
                Selected Slot:{' '}
                {`${dayjs(selectedSlot?.startDate).format('hh:mm')} - ${dayjs(
                  selectedSlot?.endDate
                ).format('hh:mm')}`}
              </Text>

              <Booking
                slotDateFrom={selectedSlot?.startDate}
                slodDateEnd={selectedSlot?.endDate}
                guests={3}
                flightNumber={'ba7'}
                flightDate={new Date(flightData.departure.date.utc)}
              />
            </Grid.Col>
          ) : (
            <></>
          )} */}
        </Grid>
      ) : (
        ''
      )}
    </Layout>
  );
};

export default Main;
