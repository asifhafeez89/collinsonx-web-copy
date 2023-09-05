import { FlightDetails } from '@collinsonx/utils';
import { Accordion, Grid } from '@collinsonx/design-system/core';

export interface DepartureFlightInfo {
  airport: { iata: string };
  dateTime: { local: string; utc: string };
  terminal: string;
}

export interface FlightInfo {
  departure: DepartureFlightInfo;
  arrival: DepartureFlightInfo;
}

interface FlightDataProps {
  flightInfoData: FlightDetails[] | undefined;
}

const FlightData = ({ flightInfoData }: FlightDataProps) => {
  return (
    <>
      {flightInfoData && flightInfoData[0] ? (
        <Grid>
          <Grid.Col sm="auto" md="auto" lg={3}>
            <Accordion variant="separated">
              <Accordion.Item value="customization">
                <Accordion.Control>
                  Departing Flight Information
                </Accordion.Control>
                <Accordion.Panel>
                  <p>
                    Departing Airport: {flightInfoData[0].departure?.airport}
                  </p>
                  <p>
                    Departing Date and Time (local):{' '}
                    {flightInfoData[0].departure?.dateTime?.local}
                  </p>
                  <p>
                    Departing Date and Time (utc):{' '}
                    {flightInfoData[0].departure?.dateTime?.utc}
                  </p>
                </Accordion.Panel>
              </Accordion.Item>
              <Accordion.Item value="flexibility">
                <Accordion.Control>
                  Arrival Flight Information
                </Accordion.Control>
                <Accordion.Panel>
                  <p>Arrival Airport: {flightInfoData[0].arrival?.airport}</p>
                  <p>
                    Arrival Date and Time (local):{' '}
                    {flightInfoData[0].arrival?.dateTime?.local}
                  </p>
                  <p>
                    Arrival Date and Time (utc):{' '}
                    {flightInfoData[0].arrival?.dateTime?.utc}
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
