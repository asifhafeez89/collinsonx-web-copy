import { useQuery } from '@collinsonx/utils/apollo';
import Layout from '@components/Layout';
import { Box, Flex, Stack } from '@collinsonx/design-system/core';
import { Consumer } from '@collinsonx/utils/generatedTypes/graphql';
import { LoungeInfo } from '@components/LoungeInfo';
import { getConsumer } from '@collinsonx/utils/queries';
import { Details, Button } from '@collinsonx/design-system';
import Link from 'next/link';
import { useMemo, useContext, useState } from 'react';
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
import Price from '@components/Price';

import StripeCheckout from '@components/stripe';
        
import { InfoPanel } from 'utils/PanelInfo';

interface AvailableSlotsProps {
  availableSlots: Availability;
}

export default function ConfirmAvailability({
  availableSlots,
}: AvailableSlotsProps) {
  const [clientSecret, setClientSecret] = useState<''>();
  const { lounge } = usePayload();

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

  const handleSubmit = async () => {
    try {
      const paymentinput = {
        bookingID: bookingId ?? '',
        consumerID: consumer?.getConsumer.id ?? '',
        internalProductId: lounge?.id ?? '',
        returnUrl: `${process.env.NEXT_PUBLIC_URL}/confirm-payment`,
        quantity: totalQuantity,
      };

      const getSessionUrl = await getCheckoutSessionUrl(paymentinput);

      // should these be throwing errors?
      if (!getSessionUrl.data) console.log('error getting payment link');
      if (!window) console.log('No window object');

      setClientSecret(getSessionUrl?.data?.clientSecret);
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
              {clientSecret ? (
                <StripeCheckout clientSecret={clientSecret} />
              ) : (
                !loadingConsumer &&
                lounge && (
                  <Box>
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

                      <Flex
                        direction={{ base: 'column', lg: 'row' }}
                        justify={'space-between'}
                        sx={{
                          width: '87%',

                          '@media (max-width: 768px)': {
                            width: '100%',
                          },
                        }}
                      >
                        <EditableTitle title="Who's coming" as="h2">
                          <Flex direction="row" gap={10}>
                            <Flex sx={{ width: '60%' }} gap={10}>
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
                          </Flex>
                        </EditableTitle>
                        <Box
                          sx={{
                            width: 'initial',

                            '@media (max-width: 768px)': {
                              marginTop: '0.5rem',
                            },
                          }}
                        >
                          <EditableTitle title="Total price" as="h2">
                            <Price
                              lounge={lounge}
                              guests={{ adults, infants, children }}
                            ></Price>
                          </EditableTitle>
                        </Box>
                      </Flex>

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
                )
              )}
            </Flex>
          </Stack>
        </Flex>
      </Stack>
    </Layout>
  );
}

ConfirmAvailability.getLayout = (page: JSX.Element) => <>{page}</>;
