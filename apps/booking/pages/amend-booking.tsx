import React, { useEffect } from 'react';
import CheckAvailability from '@components/CheckAvailability';
import { logAction, setItem } from '@lib';
import {
  ANALYTICS_TAGS,
  BOKING_MODE_STATE,
  BOOKING_MODE,
  PAGENAMES,
} from '../constants';
import useLocale from 'hooks/useLocale';
import { BookingQueryParams } from '@collinsonx/constants/enums';
import { useRouter } from 'next/router';
import { useQuery } from '@collinsonx/utils/apollo';
import { Booking } from '@collinsonx/utils';
import { getBookingByID } from '@collinsonx/utils/queries';

const AmendBooking = () => {
  const trackingPageName = PAGENAMES.BOOKING_AMEND;
  const translations = useLocale();
  const router = useRouter();
  const { bookingId } = BookingQueryParams;
  const { [bookingId]: emailBookingId } = router.query;

  const { data: bookingDetails } = useQuery<{
    getBookingByID: Booking;
  }>(getBookingByID, {
    variables: { getBookingById: emailBookingId },
    pollInterval: 300000,
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {},
  });

  useEffect(() => {
    logAction(
      trackingPageName,
      ANALYTICS_TAGS.ON_PAGE_ENTER_CHECKAVAILABILITY_EDIT
    );
  }, []);

  setItem(BOKING_MODE_STATE, BOOKING_MODE.EDIT);

  const reservationDetails = {
    flightNumber: bookingDetails?.getBookingByID?.metadata?.flightNumber ?? '',
    departureDate: bookingDetails?.getBookingByID.bookedFrom ?? '',
    infants: bookingDetails?.getBookingByID?.guestInfantCount ?? 0,
    adults: bookingDetails?.getBookingByID.guestAdultCount ?? 1,
    children: bookingDetails?.getBookingByID.guestChildrenCount ?? 0,
    price: bookingDetails?.getBookingByID.price ?? 0,
  };

  return (
    <>
      {bookingDetails && (
        <CheckAvailability
          trackingPageName={trackingPageName}
          pageTitle={translations.booking.flightAndGuests.title}
          mode={BOOKING_MODE.EDIT}
          handleClick={() => {}}
          reservationDetails={reservationDetails}
        />
      )}
    </>
  );
};

export default AmendBooking;