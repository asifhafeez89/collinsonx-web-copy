import Layout from '@components/Layout';
import { Box, Center, Flex, Stack } from '@collinsonx/design-system/core';
import { LoungeInfo } from '@components/LoungeInfo';
import { Details, Button } from '@collinsonx/design-system';
import { useContext, useRef, useState, useEffect } from 'react';
import EditableTitle from '@collinsonx/design-system/components/editabletitles/EditableTitle';
import { ANALYTICS_TAGS, constants } from '../constants';
import usePayload from 'hooks/payload';
import { InfoGroup } from '@collinsonx/design-system/components/details';
import { BookingContext } from 'context/bookingContext';
import { getCheckoutSessionUrl } from 'services/payment';
import colors from 'ui/colour-constants';
import TopBarLinks from '@components/TopBarLinks';
import dayjs from 'dayjs';
import StripeCheckout from '@components/stripe';
import { FlightContext } from 'context/flightContext';
import { log, logAction } from '@lib';
import Heading from '@collinsonx/design-system/components/heading/Heading';
import EstimatedTimeArrival from '@components/EstimatedTimeArrival';
import { FlightDetailsAndGuests } from '@components/FlightDetailsAndGuests';

export default function ConfirmBooking() {
  const [clientSecret, setClientSecret] = useState('');
  const { lounge, consumerData } = usePayload();

  const { getBooking } = useContext(BookingContext);
  const { getFlight } = useContext(FlightContext);

  useEffect(() => {
    logAction(pageName, ANALYTICS_TAGS.ON_PAYMENT_ENTER);
  }, []);

  const { flightNumber, children, bookingId, adults, infants, arrival } =
    getBooking();

  const layoutRef = useRef<HTMLDivElement>(null);

  const flightData = getFlight();

  const pageName = 'G_T_Pmt';

  const totalQuantity: number = Number(adults + children);

  const handleSubmit = async () => {
    logAction(pageName, ANALYTICS_TAGS.ON_PAYMENT_CONTINUE);
    try {
      const paymentinput = {
        bookingID: bookingId ?? '',
        consumerID: consumerData?.getConsumerByID.id ?? '',
        internalProductId: lounge?.id ?? '',
        returnUrl: `${process.env.NEXT_PUBLIC_URL}/confirm-payment`,
        quantity: totalQuantity,
      };

      const getSessionUrl = await getCheckoutSessionUrl(paymentinput);

      // should these be throwing errors?
      if (!getSessionUrl.data) log('error getting payment link');
      if (!window) log('No window object');

      setClientSecret(getSessionUrl?.data?.clientSecret);
    } catch (error) {
      log(error);
    }
    if (window) {
      layoutRef.current?.scrollTo(0, 0);
    }
  };

  const departureTime = flightData?.departure?.dateTime?.local;

  const dayjsDepartureTime = dayjs(departureTime, {
    format: 'YYYY-MM-DD HH:mm',
  });

  const flightTimeToDisplay = dayjsDepartureTime.format(
    constants.TIME_FORMAT_DISPLAY
  );

  return (
    <Layout ref={layoutRef}>
      <Stack spacing={16} sx={{ backgroundColor: colors.background }}>
        <Stack>
          <TopBarLinks page={pageName} />
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
            spacing={8}
            sx={{
              width: '591px',
              '@media (max-width: 768px)': {
                width: '100%',
                margin: '0',
              },
            }}
          >
            <Center
              sx={{
                padding: '10px',
                margin: '0',

                '@media (min-width: 768px)': {
                  display: 'none',
                },
              }}
            >
              {!clientSecret && (
                <Heading as="h1" padding={0} margin={0} lineHeight={1}>
                  Booking summary
                </Heading>
              )}
            </Center>

            <LoungeInfo
              lounge={lounge}
              loading={!lounge}
              hideImage={clientSecret ? true : false}
              hideImageMobile
              width={clientSecret ? '400px' : '100%'}
            />
            <Flex
              gap={{ base: 'sm', sm: 'lg' }}
              sx={{
                flexDirection: 'row',
                '@media (max-width: 768px)': {
                  flexDirection: 'column',
                },
                width: '100%',
                margin: clientSecret ? '0 auto' : 'initial',
                height: '1000px',
              }}
            >
              {clientSecret ? (
                <StripeCheckout clientSecret={clientSecret} />
              ) : (
                lounge && (
                  <Box>
                    <Stack spacing={8}>
                      <FlightDetailsAndGuests
                        departureTime={departureTime ? departureTime : ''}
                        flightNumber={flightNumber}
                        guestList={{ adults, infants, children }}
                        lounge={lounge}
                      />
                      <EditableTitle
                        title="Estimated time of arrival"
                        as="h2"
                        showBorder={true}
                      >
                        {arrival && <EstimatedTimeArrival arrival={arrival} />}
                      </EditableTitle>
                      <EditableTitle title="Cancellation policy" as="h2">
                        <p style={{ padding: '0', margin: '0' }}>
                          Cancel up to 48 hours before your booking to receive a
                          full refund. Bookings cannot be cancelled within 48
                          hours of booking arrival time, including new bookings
                          made within that time range.
                        </p>
                        <div>
                          <p>
                            Please confirm details are correct before making
                            payment.
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
