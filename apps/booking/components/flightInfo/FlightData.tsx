import { useState, useEffect } from 'react';
import { useQuery } from '@collinsonx/utils/apollo';
import getFlightDetails from '@collinsonx/utils/queries/getFlightDetails';
import { FlightDetails, Slots } from '@collinsonx/utils';
import { validateFlightNumber } from '../../utils/flightValidation';
import {
  Button,
  Title,
  Accordion,
  Grid,
  Text,
} from '@collinsonx/design-system/core';
import dayjs from 'dayjs';
import {
  AIRPORT_CODE_TYPE,
  OAG_API_VERSION,
  DATE_FORMAT,
} from '../../config/Constants';
import { formatDate } from '../../utils/DateFormatter';

interface FlightInfoProps {
  flightNumber: string;
  departureDate: Date;
  onSuccess: (data: any) => void;
}

export interface DepartureFlightInfo {
  airport: { iata: string };
  dateTime: { local: string; utc: string };
  terminal: string;
}

export interface FlightInfo {
  departure: DepartureFlightInfo;
  arrival: DepartureFlightInfo;
}

const FlightData = ({
  flightNumber,
  departureDate,
  onSuccess,
}: FlightInfoProps) => {
  const flightBreakdown = validateFlightNumber(flightNumber);
  const [flightData, setFlightData] = useState<FlightDetails>();
  const [flightInfoLoading, setFlightInfoLoading] = useState(false);

  const { loading, error, data } = useQuery<{
    getFlightDetails: FlightDetails[];
  }>(getFlightDetails, {
    variables: {
      flightDetails: {
        carrierCode: flightBreakdown[1] ?? '',
        codeType: AIRPORT_CODE_TYPE,
        departureDate: formatDate(departureDate, DATE_FORMAT),
        flightNumber: flightBreakdown[2] ?? '',
        version: OAG_API_VERSION,
      },
    },
    pollInterval: 300000,
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      setFlightData(data?.getFlightDetails[0]);
      onSuccess(data?.getFlightDetails[0]);
    },
  });

  return (
    <>
      {flightData ? (
        <Grid style={{ marginTop: '20px' }}>
          <Grid.Col sm="auto" md="auto" lg={3}>
            <Accordion variant="separated">
              <Accordion.Item value="customization">
                <Accordion.Control>
                  Departing Flight Information
                </Accordion.Control>
                <Accordion.Panel>
                  <p>Departing Airport: {flightData.departure?.airport}</p>
                  <p>
                    Departing Date and Time (local):{' '}
                    {flightData.departure?.dateTime?.local}
                  </p>
                  <p>
                    Departing Date and Time (utc):{' '}
                    {flightData.departure?.dateTime?.utc}
                  </p>
                </Accordion.Panel>
              </Accordion.Item>
              <Accordion.Item value="flexibility">
                <Accordion.Control>
                  Arrival Flight Information
                </Accordion.Control>
                <Accordion.Panel>
                  <p>Arrival Airport: {flightData.arrival?.airport}</p>
                  <p>
                    Arrival Date and Time (local):{' '}
                    {flightData.arrival?.dateTime?.local}
                  </p>
                  <p>
                    Arrival Date and Time (utc):{' '}
                    {flightData.arrival?.dateTime?.utc}
                  </p>
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </Grid.Col>
        </Grid>
      ) : (
        ''
      )}
    </>
  );
};
export default FlightData;
