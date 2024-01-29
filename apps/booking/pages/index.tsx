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

const CreateBooking = () => {
  const trackingPageName = PAGENAMES.INDEX;
  const translations = useLocale();

  useEffect(() => {
    logAction(trackingPageName, ANALYTICS_TAGS.ON_PAGE_ENTER_CHECKAVAILABILITY);
  }, []);

  setItem(BOKING_MODE_STATE, BOOKING_MODE.CREATE);

  return (
    <>
      <CheckAvailability
        trackingPageName={trackingPageName}
        pageTitle={translations.booking.flightAndGuests.title}
        mode={BOOKING_MODE.CREATE}
        handleClick={() => {}}
      />
    </>
  );
};

export default CreateBooking;
