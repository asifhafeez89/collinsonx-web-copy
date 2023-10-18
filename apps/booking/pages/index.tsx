import Layout from '@components/Layout';
import { useContext, useState } from 'react';
import {
  Flex,
  Stack,
  Box,
  Button,
  Center,
} from '@collinsonx/design-system/core';
import { useForm } from '@mantine/form';
import { LoungeInfo } from '@components/LoungeInfo';
import { FlightInfo } from '../components/flightInfo/FlightInfo';
import GuestInfo from '@components/GuestInfo';
import { FlightDetails } from '@collinsonx/utils';
import { getFlightDetails } from '@collinsonx/utils/queries';
import {
  CODE_IATA,
  CODE_ICAO,
  DATE_FORMAT,
  OAG_API_VERSION,
} from 'config/Constants';
import { useLazyQuery } from '@collinsonx/utils/apollo';
import { validateFlightNumber } from '../utils/flightValidation';
import usePayload from 'hooks/payload';
import router from 'next/router';
import { BookingContext } from 'context/bookingContext';
import colors from 'ui/colour-constants';
import Notification from '@components/Notification';
import { MAX_GUESTS, ValidationErrorResponses } from '../constants';
import BackToLounge from '@components/BackToLounge';
import EditableTitle from '@collinsonx/design-system/components/editabletitles/EditableTitle';
import Price from '@components/Price';
import { formatDate } from 'utils/DateFormatter';
import { FlightContext } from 'context/flightContext';
import Heading from '@collinsonx/design-system/components/heading/Heading';
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

const Lounge = () => {
  const [guestError, setGuestError] = useState<Boolean>(false);
  const { lounge, referrerUrl } = usePayload();

  const { setBooking } = useContext(BookingContext);
  const { setFlight } = useContext(FlightContext);

  const form = useForm({
    initialValues: {
      flightNumber: '',
      departureDate: null,
      adults: 1,
      children: 0,
      infants: 0,
    },
    transformValues: (values) => ({
      ...values,
      flightNumber: values.flightNumber.toUpperCase(),
    }),
    validate: {
      departureDate: (value) =>
        value !== null ? null : ValidationErrorResponses.INVALID_DATE.message,
      flightNumber: (value: string) => {
        let error = null;

        const validFlight =
          /^([a-zA-Z]{2,3}|([0-9]{1}[a-zA-Z]{1})|([a-zA-Z]{1}[0-9]{1}))([0-9]{1,4})$/.test(
            value.toUpperCase()
          );

        if (!validFlight) {
          error = ValidationErrorResponses.INVALID_FLIGHT.message;
        }

        return error;
      },
    },
  });

  type FormValues = typeof form.values;

  const [fetchFlightInfo] = useLazyQuery<{
    getFlightDetails: FlightDetails[];
  }>(getFlightDetails, {
    pollInterval: 300000,
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onCompleted: (flightInfoData) => {
      if (flightInfoData.getFlightDetails.length === 0) {
        form.setFieldError(
          'flightNumber',
          ValidationErrorResponses.INVALID_DATEFlIGHT.message
        );
      } else {
        if (form.isValid()) {
          const upperCaseFlight = form.values.flightNumber.toUpperCase();
          form.values.flightNumber = upperCaseFlight;
          setBooking(form.values);
          setFlight(flightInfoData.getFlightDetails[0]);
          const query = router.query;
          router.push({
            pathname: '/check-availability',
            query: {
              ...query,
            },
          });
        }
      }
    },
    onError: (error) => {},
  });

  const handleClickCheckAvailability = async (values: FormValues) => {
    if (values.children + values.adults > MAX_GUESTS) {
      setGuestError(true);
      return false;
    } else {
      setGuestError(false);
    }
    const upperCaseFlight = form.values.flightNumber.toUpperCase();
    const carrieCode = validateFlightNumber(upperCaseFlight)[1];
    const flightNo = validateFlightNumber(upperCaseFlight)[2];

    if (form.isValid()) {
      fetchFlightInfo({
        variables: {
          flightDetails: {
            carrierCode: carrieCode,
            codeType: `${CODE_IATA}, ${CODE_ICAO}`,
            departureDate: formatDate(
              new Date(String(form.values.departureDate)),
              DATE_FORMAT
            ),
            flightNumber: flightNo,
            version: OAG_API_VERSION,
          },
        },
      });
    }

    values.flightNumber = upperCaseFlight;

    setBooking(values);
  };

  return (
    <Layout>
      <form onSubmit={form.onSubmit(handleClickCheckAvailability)}>
        <Stack spacing={16}>
          <Stack sx={{ width: '100%' }}>
            <BackToLounge />
          </Stack>
          <Flex
            align="center"
            sx={{
              justifyContent: 'center',

              '@media (max-width: 768px)': {
                backgroundColor: colors.background,
                width: '100%',
                margin: '0',
                padding: '0',
                justifyContent: 'initial',
              },
            }}
          >
            <Stack
              spacing={12}
              sx={{
                maxWidth: '591px',

                '@media (max-width: 768px)': {
                  maxWidth: '100%',
                },
              }}
            >
              {' '}
              <Center
                sx={{
                  padding: '0px',
                  margin: '0',

                  '@media (min-width: 768px)': {
                    display: 'none',
                  },
                }}
              >
                <Heading as="h1" padding={0} margin={0} lineHeight={1}>
                  Flight and guests entry
                </Heading>
              </Center>
              <LoungeInfo
                guests={{
                  adults: form.getInputProps('adults').value,
                  children: form.getInputProps('children').value,
                  infants: form.getInputProps('infants').value,
                }}
                lounge={lounge}
                loading={!lounge}
              />
              <FlightInfo form={form} loading={!lounge} />
              {guestError ? (
                <Box
                  sx={{
                    '@media (max-width: 768px)': {
                      backgroundColor: colors.white,
                      padding: '1.2rem 0',
                    },
                  }}
                >
                  <Notification>
                    You can book for a maximum of {MAX_GUESTS} guests. Please
                    try again.
                  </Notification>
                </Box>
              ) : (
                ''
              )}
              <GuestInfo
                form={form}
                loading={!lounge}
                referreUrl={referrerUrl ?? '#'}
              />
              <EditableTitle title="Total price" as="h3" showBorder={false}>
                <Price
                  lounge={lounge}
                  guests={{
                    adults: form.getInputProps('adults').value,
                    children: form.getInputProps('children').value,
                    infants: form.getInputProps('infants').value,
                  }}
                ></Price>
              </EditableTitle>
              <Center w="100%">
                <Button disabled={!lounge} type="submit">
                  CHECK AVAILABILITY
                </Button>
              </Center>
            </Stack>
          </Flex>
        </Stack>
      </form>
    </Layout>
  );
};

export default Lounge;
