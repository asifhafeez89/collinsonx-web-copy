import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import * as jose from 'jose';
import {
  Title,
  Accordion,
  Grid,
  Text,
  Box,
  Stack,
} from '@collinsonx/design-system/core';
import Layout from '@components/Layout';
import { AvailabilitySlot, FlightInfo } from '../components/FlightInfo';
import { hasRequired } from '@lib';

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

/**
 * field types are subject to change - placing string temporarily
 * https://lifestyle-x-wiki.atlassian.net/wiki/spaces/BAAS/pages/97419266/How+will+we+redirect+to+the+Bridge+App#Parameters-to-be-received-when-opening-the-Bridge-App-from-PP%2FLK
 */
interface BridgePayload {
  consumerNumber: string;
  membershipNumber: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  brand_affiliation: string;
  lounge: string;
  client?: string;
  source_code: string;
}

const validatePayload = (payload: BridgePayload) =>
  hasRequired(payload, [
    'consumerNumber',
    'membershipNumber',
    'brand_affiliation',
    'lounge',
    'source_code',
  ]);

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
  const [payload, setPayload] = useState<BridgePayload>();
  const [tokenError, setTokenError] = useState<string>();

  useEffect(() => {
    if (router.isReady) {
      const { token } = router.query;

      try {
        const payload = jose.decodeJwt(token as string) as any;
        if (!validatePayload(payload)) {
          setTokenError('Token is invalid');
        }
        setPayload(payload);
      } catch (e: any) {
        setTokenError(
          e.hasOwnProperty('message') ? (e.message as string) : 'Invalid token'
        );
      }
    }
  }, [router]);

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
      {tokenError && <Text c="red.5">{tokenError}</Text>}
      {payload && !tokenError ? (
        <Stack spacing={2}>
          <Text>Consumer number: {payload.consumerNumber}</Text>
          <Text>Membership number: {payload.membershipNumber}</Text>
          <Text>Email: {payload.email}</Text>
          <Text>First name: {payload.firstName}</Text>
          <Text>Last name: {payload.lastName}</Text>
          <Text>Brand affiliation: {payload.brand_affiliation}</Text>
          <Text>Lounge: {payload.lounge}</Text>
          <Text>Source code: {payload.source_code}</Text>
        </Stack>
      ) : (
        <Stack spacing={2}>
          <Text>Consumer Number (depracated): {consumerNumber}</Text>
          <Text>Temporary Bearer Token (deprecated): {tempBearerToken}</Text>
          <Text>Consumer Number (depracated): {consumerNumber}</Text>
          <Text>Temporary Bearer Token (deprecated): {tempBearerToken}</Text>
        </Stack>
      )}

      <Box mt={20}>
        <FlightInfo
          onSuccess={onFlightInfoSuccess}
          onSetSelectedSlot={onSetSelectedSlot}
        />
      </Box>
      {flightData ? (
        <Grid mt={20}>
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
                slotDateEnd={selectedSlot?.endDate}
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
