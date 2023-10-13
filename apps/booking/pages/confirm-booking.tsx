import Layout from '@components/Layout';
import { Box, Flex, Stack } from '@collinsonx/design-system/core';
import { LoungeInfo } from '@components/LoungeInfo';
import { Details, Button } from '@collinsonx/design-system';
import { useContext, useState } from 'react';
import EditableTitle from '@collinsonx/design-system/components/editabletitles/EditableTitle';
import { constants } from '../constants';
import usePayload from 'hooks/payload';
import { InfoGroup } from '@collinsonx/design-system/components/details';
import { BookingContext } from 'context/bookingContext';
import { getCheckoutSessionUrl } from 'services/payment';
import colors from 'ui/colour-constants';
import BackToLounge from '@components/BackToLounge';
import Price from '@components/Price';
import dayjs from 'dayjs';
import StripeCheckout from '@components/stripe';
import { InfoPanel } from 'utils/PanelInfo';
import { GuestCount } from '@components/guests/GuestCount';
import { FlightContext } from 'context/flightContext';
import { log } from '@lib';

export default function ConfirmBooking() {
  const [clientSecret, setClientSecret] = useState('');
  const { lounge, consumerData } = usePayload();

  const { getBooking } = useContext(BookingContext);
  const { getFlight } = useContext(FlightContext);

  const { flightNumber, children, bookingId, adults, infants, arrival } =
    getBooking();

  const flightData = getFlight();

  const totalQuantity: number = Number(adults + children);

  const handleSubmit = async () => {
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
  };

  const departureTime = flightData?.departure?.dateTime?.local;

  const dayjsDepartureTime = dayjs(departureTime, {
    format: 'YYYY-MM-DD HH:mm',
  });

  const flightTimeToDisplay = dayjsDepartureTime.format(
    constants.TIME_FORMAT_DISPLAY
  );

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
            spacing={8}
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
              hideImage={clientSecret ? true : false}
              width={clientSecret ? '400px' : '100%'}
            />
            <Flex
              gap={{ base: 'sm', sm: 'lg' }}
              sx={{
                flexDirection: 'row',
                '@media (max-width: 768px)': {
                  flexDirection: 'column',
                },
                width: clientSecret ? '400px' : '100%',
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
                      <EditableTitle title="Flight details" to="/" as="h2">
                        {departureTime && (
                          <Details
                            infos={
                              InfoPanel(
                                departureTime,
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
                          width: '100%',
                          borderBottom: `1px solid ${colors.borderSection}`,

                          '@media (max-width: 768px)': {
                            width: '100%',
                          },
                        }}
                      >
                        <EditableTitle
                          title="Who's coming?"
                          as="h2"
                          showBorder={false}
                        >
                          <GuestCount
                            adults={adults}
                            children={children}
                            infants={infants}
                          />
                        </EditableTitle>
                        <Box
                          sx={{
                            width: 'initial',

                            '@media (max-width: 768px)': {
                              marginTop: '0.5rem',
                            },
                          }}
                        >
                          <EditableTitle
                            title="Total price"
                            as="h2"
                            showBorder={false}
                          >
                            <Price
                              lounge={lounge}
                              guests={{ adults, infants, children }}
                            ></Price>
                          </EditableTitle>
                        </Box>
                      </Flex>
                      <EditableTitle
                        title="Time of visit (local)"
                        as="h2"
                        showBorder={true}
                      >
                        <Flex direction="row" gap={5}>
                          <p style={{ padding: '0', margin: '0' }}>
                            {' '}
                            {arrival}
                          </p>{' '}
                        </Flex>
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
                            As your flight is at {flightTimeToDisplay}, your
                            maximum stay is 3 hours prior.
                          </p>
                        </div>
                        <div>
                          <p>
                            Please confirm details are correct before making
                            payment.
                          </p>
                        </div>
                      </EditableTitle>

                      <EditableTitle
                        title="Important Notes"
                        as="h3"
                        showBorder={false}
                      >
                        <ul style={{ paddingLeft: '1em' }}>
                          <li>
                            {' '}
                            Please remember to bring your booking reference
                            number, boarding pass and photo ID along with your
                            Priority Pass membership card for check in at the
                            lounge.{' '}
                          </li>
                          <li>
                            Cancellation must be made at least 48 hours in
                            advance of your visit date & time to receive a
                            refund. No refund will be issued after this time.
                          </li>
                        </ul>
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

ConfirmBooking.getLayout = (page: JSX.Element) => <>{page}</>;
