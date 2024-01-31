import Layout from '@components/Layout';
import { useContext, useEffect, useState } from 'react';
import { Flex, Stack, Button, Center } from '@collinsonx/design-system/core';
import { useForm } from '@collinsonx/design-system/form';
import { LoungeInfo } from '@components/LoungeInfo';
import { FlightInfo } from '../../components/flightInfo/FlightInfo';
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
import { validateFlightNumber } from '../../utils/flightValidation';
import usePayload from 'hooks/payload';
import router from 'next/router';
import { BookingContext } from 'context/bookingContext';
import { ANALYTICS_TAGS, MAX_GUESTS, BOOKING_MODE } from '../../constants';
import TopBarLinks from '@components/TopBarLinks';
import EditableTitle from '@collinsonx/design-system/components/editabletitles/EditableTitle';
import Price from '@components/Price';
import { formatDate } from 'utils/DateFormatter';
import { FlightContext } from 'context/flightContext';
import Heading from '@collinsonx/design-system/components/heading/Heading';
import useLocale from 'hooks/useLocale';
import { analyticsTag, logAction } from '@lib';

import classes from './CheckAvailability.module.css';

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

type reservationDetails = {
  flightNumber: string;
  departureDate: string;
  infants?: number;
  adults?: number;
  children?: number;
  price: number;
  existing_booking_slot?: string;
  bookingId: string;
  currentPrice: number | undefined;
};

interface CheckAvailabilityProps {
  handleClick: () => void;
  trackingPageName: string;
  pageTitle: string;
  mode: BOOKING_MODE;
  reservationDetails?: reservationDetails;
}

const CheckAvailability = ({
  handleClick,
  trackingPageName = '',
  pageTitle,
  mode,
  reservationDetails,
}: CheckAvailabilityProps) => {
  const [guestError, setGuestError] = useState<boolean>(false);
  const { lounge, referrerUrl } = usePayload();
  const { setBooking } = useContext(BookingContext);
  const { setFlight } = useContext(FlightContext);

  const translations = useLocale();

  useEffect(() => {
    form.setValues({
      flightNumber: reservationDetails?.flightNumber ?? '',
      departureDate: reservationDetails?.departureDate
        ? new Date(String(reservationDetails?.departureDate))
        : null,
      adults: reservationDetails?.adults || 1,
      children: reservationDetails?.children || 0,
      infants: reservationDetails?.infants || 0,
    });
  }, [reservationDetails]);

  const form = useForm({
    initialValues: {
      flightNumber: reservationDetails?.flightNumber ?? '',
      departureDate:
        (reservationDetails?.departureDate &&
          new Date(String(reservationDetails?.departureDate))) ||
        null,
      adults: reservationDetails?.adults || 1,
      children: reservationDetails?.children || 0,
      infants: reservationDetails?.infants || 0,
      existing_booking_slot: reservationDetails?.existing_booking_slot || '',
      bookingId: reservationDetails?.bookingId || '',
      currentPrice: reservationDetails?.price,
    },
    transformValues: (values) => ({
      ...values,
      flightNumber: values.flightNumber.toUpperCase(),
    }),
    validate: {
      departureDate: (value) => {
        logAction(
          trackingPageName,
          analyticsTag(mode, ANALYTICS_TAGS.ON_CHANGE_DATE_ERROR)
        );

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
          logAction(
            trackingPageName,
            analyticsTag(mode, ANALYTICS_TAGS.ON_CHANGE_FLIGHT_NUMBER_ERROR)
          );
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
          translations.booking.flightDetails.errors.invalid_dateflight
        );
        logAction(
          trackingPageName,
          analyticsTag(mode, ANALYTICS_TAGS.ON_CHANGE_FLIGHT_NUMBER_ERROR)
        );
      } else if (form.isValid()) {
        const upperCaseFlight = form.values.flightNumber.toUpperCase();
        form.values.flightNumber = upperCaseFlight;
        if (mode === BOOKING_MODE.EDIT) {
          form.values.bookingId = reservationDetails?.bookingId ?? '';
        }

        const booking = form.values;
        booking.currentPrice = reservationDetails?.price;

        setBooking(booking);
        setFlight(flightInfoData.getFlightDetails[0]);
        const query = router.query;
        router.push({
          pathname: '/check-slots',
          query: {
            ...query,
          },
        });
      }
    },
    onError: (error) => {},
  });

  const handleClickCheckAvailability = async (values: FormValues) => {
    logAction(
      trackingPageName,
      analyticsTag(mode, ANALYTICS_TAGS.ON_CONTINUE_BUTTON_AVI)
    );
    if (values.children + values.adults > MAX_GUESTS) {
      setGuestError(true);
      logAction(
        trackingPageName,
        analyticsTag(mode, ANALYTICS_TAGS.ON_CHANGE_ERROR_ATTENDEES_AVL)
      );
      return false;
    } else {
      setGuestError(false);
    }

    if (form.isValid()) {
      const upperCaseFlight = form.values.flightNumber.toUpperCase();
      const carrieCode = validateFlightNumber(upperCaseFlight)[1];
      const flightNo = validateFlightNumber(upperCaseFlight)[2];

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

      values.flightNumber = upperCaseFlight;
    }

    setBooking(values);
    handleClick();
  };

  return (
    <Layout>
      <form onSubmit={form.onSubmit(handleClickCheckAvailability)}>
        <Stack gap={8}>
          <Stack w="100%">
            <TopBarLinks page={trackingPageName} />
          </Stack>
          <Flex align="center" className={classes.container}>
            <Stack gap={12} className={classes.stack}>
              {' '}
              <Center className={classes.titleWrapper}>
                <Heading as="h3" padding={0} margin={0} lineHeight={1}>
                  {mode === BOOKING_MODE.EDIT
                    ? translations.booking.flightAndGuests.amendTitle
                    : translations.booking.flightAndGuests.title}
                </Heading>
              </Center>
              <LoungeInfo lounge={lounge} loading={!lounge} />
              <FlightInfo
                form={form}
                loading={!lounge}
                tags={[
                  mode === BOOKING_MODE.CREATE
                    ? ANALYTICS_TAGS.ON_CHANGE_DATE
                    : ANALYTICS_TAGS.ON_CHANGE_DATE_EDIT,
                  mode === BOOKING_MODE.CREATE
                    ? ANALYTICS_TAGS.ON_CHANGE_FLIGHT_NUMBER
                    : ANALYTICS_TAGS.ON_CHANGE_FLIGHT_NUMBER_EDIT,
                ]}
                page={trackingPageName}
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
                  currentPrice={reservationDetails?.price}
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

export default CheckAvailability;
