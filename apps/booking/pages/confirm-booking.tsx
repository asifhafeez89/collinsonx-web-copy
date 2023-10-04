import { useQuery } from '@collinsonx/utils/apollo';
import Layout from '@components/Layout';
import { Box, Flex, Stack } from '@collinsonx/design-system/core';
import { Consumer } from '@collinsonx/utils/generatedTypes/graphql';
import { LoungeInfo } from '@components/LoungeInfo';
import { getConsumer } from '@collinsonx/utils/queries';
import { Details, Button } from '@collinsonx/design-system';
import Link from 'next/link';
import { useMemo, useContext } from 'react';
import BookingFormSkeleton from '@components/BookingFormSkeleton';
import EditableTitle from '@collinsonx/design-system/components/editabletitles/EditableTitle';
import { Availability } from '@collinsonx/utils';
import { validateFlightNumber } from '../utils/flightValidation';
import { FlightDetails } from '@collinsonx/utils';
import getFlightDetails from '@collinsonx/utils/queries/getFlightDetails';
import {
  AIRPORT_CODE_TYPE,
  OAG_API_VERSION,
  DATE_FORMAT,
  TIME_FORMAT,
  DATE_REDABLE_FORMAT,
} from '../config/Constants';
import { formatDate } from '../utils/DateFormatter';
import usePayload from 'hooks/payload';
import { InfoGroup } from '@collinsonx/design-system/components/details';
import { BookingContext } from 'context/bookingContext';
import { getCheckoutSessionUrl } from 'services/payment';
import colors from 'ui/colour-constants';
import BackToLounge from '@components/BackToLounge';
import { useRouter } from 'next/router';

import { InfoPanel } from 'utils/PanelInfo';

interface AvailableSlotsProps {
  availableSlots: Availability;
}

export default function ConfirmAvailability({
  availableSlots,
}: AvailableSlotsProps) {
  const router = useRouter();
  const { lounge, platform } = usePayload();

  const { getBooking } = useContext(BookingContext);

  const {
    flightNumber,
    departureDate,
    children,
    bookingId,
    adults,
    arrival,
    infants,
  } = getBooking();

  const totalQuantity: number = Number(adults + children);

  const flightCode = useMemo(
    () =>
      flightNumber ? validateFlightNumber(flightNumber as string) : undefined,

    [flightNumber]
  );

  const { data: consumer, loading: loadingConsumer } = useQuery<{
    getConsumer: Consumer;
  }>(getConsumer, {
    variables: {},
    pollInterval: 300000,
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {},
  });

  const isReferrerDevice: boolean =
    platform === 'android' || platform === 'ios';
  const successUrl = isReferrerDevice ? 'confirm-payment' : 'close-window';

  const handleSubmit = async () => {
    try {
      const paymentinput = {
        bookingID: bookingId ?? '',
        consumerID: consumer?.getConsumer.id ?? '',
        internalProductId: lounge?.id ?? '',
        successUrl: `${process.env.NEXT_PUBLIC_URL}/${successUrl}`,
        cancelUrl: `${process.env.NEXT_PUBLIC_URL}/booking-not-successful`,
        quantity: totalQuantity,
      };

      const getSessionUrl = await getCheckoutSessionUrl(paymentinput);

      // should these be throwing errors?
      if (!getSessionUrl.data) console.log('error getting payment link');
      if (!window) console.log('No window object');

      if (isReferrerDevice) {
        window.location.href = getSessionUrl?.data?.url;
      } else {
        /*
          this block opens the stripe url and upon a successful payment sends an event
          to the stripe successUrl telling it to close itself, bypassing a security
          policy preventing windows being closed by a source which didn't open them
          "Scripts may close only the windows that were opened by them."

          This is because of the iframe.
        */
        let completed: boolean;
        const stripeWindow = window.open();

        if (!stripeWindow) throw new Error('No payment window generated');

        stripeWindow.location.href = getSessionUrl.data.url;

        const closerPoller: NodeJS.Timer = setInterval(() => {
          if (completed) return clearInterval(closerPoller);

          stripeWindow.postMessage('Wakey wakey');
        }, 1000);

        const closeListener: any = window.addEventListener('message', () => {
          completed = true;
          stripeWindow.close();
          window.removeEventListener('message', closeListener);
        });

        router.push({
          pathname: '/confirm-payment',
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { data: flightData } = useQuery<{
    getFlightDetails: FlightDetails[];
  }>(getFlightDetails, {
    variables: {
      flightDetails: {
        carrierCode: flightCode ? flightCode[1] : '',
        codeType: AIRPORT_CODE_TYPE,
        departureDate: formatDate(new Date(String(departureDate)), DATE_FORMAT),
        flightNumber: flightCode ? flightCode[2] : '',
        version: OAG_API_VERSION,
      },
    },
    pollInterval: 300000,
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {},
  });

  return (
    <Layout>
      <Stack spacing={16} sx={{ backgroundColor: colors.background }}>
        <Stack>
          <BackToLounge />
        </Stack>
        <Flex
          justify="center"
          align="center"
          direction="column"
          sx={{
            justifyContent: 'center',
            '@media (max-width: 768px)': {
              width: '100%',
              justifyContent: 'initial',
              backgroundColor: colors.background,
            },
          }}
        >
          <Stack
            spacing={24}
            sx={{
              width: '591px',
              '@media (max-width: 768px)': {
                width: '100%',
                margin: '0',
              },
            }}
          >
            <LoungeInfo
              guests={{ adults, children, infants }}
              lounge={lounge}
              loading={!lounge}
            />
            <Flex
              gap={{ base: 'sm', sm: 'lg' }}
              sx={{
                width: '100%',
                flexDirection: 'row',

                '@media (max-width: 768px)': {
                  flexDirection: 'column',
                },
              }}
            >
              {loadingConsumer && <BookingFormSkeleton />}
              {!loadingConsumer && (
                <Box>
                  {lounge && (
                    <Stack spacing={8}>
                      <EditableTitle title="Flight details" to="/" as="h2">
                        {flightData?.getFlightDetails[0].departure?.dateTime
                          ?.local && (
                          <Details
                            infos={
                              InfoPanel(
                                flightData?.getFlightDetails[0]?.departure
                                  ?.dateTime?.local,
                                flightNumber
                              ) as InfoGroup[]
                            }
                            direction="row"
                          />
                        )}
                      </EditableTitle>
                      <EditableTitle title="Who's coming" to="/" as="h2">
                        <Flex direction="row" gap={10}>
                          <p style={{ padding: '0', margin: '0' }}>
                            {' '}
                            <strong>Adults</strong> {adults}
                          </p>{' '}
                          {Number(children) > 0 ? (
                            <>
                              <p style={{ padding: '0', margin: '0' }}>
                                {' '}
                                <strong>Children</strong> {children}
                              </p>
                            </>
                          ) : null}
                        </Flex>
                      </EditableTitle>
                      <EditableTitle
                        title="Estimated time of arrival"
                        to="/check-availability"
                        as="h2"
                      >
                        <Flex
                          direction={{ base: 'column', sm: 'row' }}
                          gap={10}
                        >
                          <p style={{ padding: '0', margin: '0' }}>
                            {' '}
                            {arrival?.split('-')[0]}
                          </p>{' '}
                        </Flex>
                        <div>
                          This is a rough estimate so that lounge can prepare
                          for your arrival
                        </div>
                      </EditableTitle>
                      <EditableTitle title="Cancelation policy" as="h2">
                        <p style={{ padding: '0', margin: '0' }}>
                          Free cancellation for 24 hours. Cancel before [date of
                          flight] for a partial refund.
                        </p>
                        <Link href="cancelation-policy">Learn more</Link>
                        <div>
                          <p>
                            As your flight is at 7:00am, your maximum stay is 3
                            hours prior.
                          </p>
                        </div>
                      </EditableTitle>
                    </Stack>
                  )}
                  <Button
                    type="submit"
                    data-testid="submit"
                    spacing="20px"
                    align="center"
                    handleClick={handleSubmit}
                  >
                    GO TO PAYMENT
                  </Button>
                </Box>
              )}
            </Flex>
          </Stack>
        </Flex>
      </Stack>
    </Layout>
  );
}

ConfirmAvailability.getLayout = (page: JSX.Element) => <>{page}</>;
