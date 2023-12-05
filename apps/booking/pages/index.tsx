import Layout from '@components/Layout';
import { useContext, useEffect, useState } from 'react';
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
import {
  ANALYTICS_TAGS,
  MAX_GUESTS,
  ValidationErrorResponses,
} from '../constants';
import TopBarLinks from '@components/TopBarLinks';
import EditableTitle from '@collinsonx/design-system/components/editabletitles/EditableTitle';
import Price from '@components/Price';
import { formatDate } from 'utils/DateFormatter';
import { FlightContext } from 'context/flightContext';
import Heading from '@collinsonx/design-system/components/heading/Heading';
import useLocale from 'hooks/useLocale';
import { logAction } from '@lib';

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

  const pageName = 'Chk_Avl';

  const { getBooking, setBooking } = useContext(BookingContext);
  const { setFlight } = useContext(FlightContext);
  const { flightNumber, departureDate, adults, children, infants } =
    getBooking();
  const translations = useLocale();

  useEffect(() => {
    logAction(pageName, ANALYTICS_TAGS.ON_PAGE_ENTER_CHECKAVAILABILITY);
  }, []);

  const form = useForm({
    initialValues: {
      flightNumber: flightNumber || '',
      departureDate: (departureDate && new Date(String(departureDate))) || null,
      adults: adults || 1,
      children: children || 0,
      infants: infants || 0,
    },
    transformValues: (values) => ({
      ...values,
      flightNumber: values.flightNumber.toUpperCase(),
    }),
    validate: {
      departureDate: (value) => {
        logAction(pageName, ANALYTICS_TAGS.ON_CHANGE_DATE_ERROR);
        return value !== null
          ? null
          : translations.booking.flightDetails.errors.invalid_date;
      },
      flightNumber: (value: string) => {
        let error = null;

        const validFlight =
          /^([a-zA-Z]{2,3}|([0-9]{1}[a-zA-Z]{1})|([a-zA-Z]{1}[0-9]{1}))([0-9]{1,4})$/.test(
            value.toUpperCase()
          );

        if (!validFlight) {
          error = translations.booking.flightDetails.errors.invalid_flight;
          logAction(pageName, ANALYTICS_TAGS.ON_CHANGE_FLIGHT_NUMBER_ERROR);
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
    onCompleted: async (flightInfoData) => {
      if (flightInfoData.getFlightDetails.length === 0) {
        form.setFieldError(
          'flightNumber',
          translations.booking.flightDetails.errors.invalid_dateflight
        );
        logAction(pageName, ANALYTICS_TAGS.ON_CHANGE_FLIGHT_NUMBER_ERROR);
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
    logAction(pageName, ANALYTICS_TAGS.ON_CONTINUE_BUTTON_AVI);
    if (values.children + values.adults > MAX_GUESTS) {
      setGuestError(true);
      logAction(pageName, ANALYTICS_TAGS.ON_CHANGE_ERROR_ATTENDEES_AVL);
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
            <TopBarLinks page={pageName} />
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
                  {translations.booking.flightAndGuests.title}
                </Heading>
              </Center>
              <LoungeInfo lounge={lounge} loading={!lounge} />
              <FlightInfo
                form={form}
                loading={!lounge}
                tags={[
                  ANALYTICS_TAGS.ON_CHANGE_DATE,
                  ANALYTICS_TAGS.ON_CHANGE_FLIGHT_NUMBER,
                ]}
                page={pageName}
              />
              <GuestInfo
                form={form}
                loading={!lounge}
                referreUrl={referrerUrl ?? '#'}
                guestError={guestError}
              />
              <EditableTitle
                title={translations.booking.availableSlots.totalPrice.title}
                as="h3"
                showBorder={false}
              >
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
                  {translations.booking.checkAvailability.btn}
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
