import React, { useEffect } from 'react';
import CheckAvailability from '@components/CheckAvailability';
import { logAction } from '@lib';
import { ANALYTICS_TAGS, BOOKING_MODE, PAGENAMES } from '../constants';
import useLocale from 'hooks/useLocale';

const CreateBooking = () => {
  const trackingPageName = PAGENAMES.INDEX;
  const translations = useLocale();

  useEffect(() => {
    logAction(trackingPageName, ANALYTICS_TAGS.ON_PAGE_ENTER_CHECKAVAILABILITY);
  }, []);

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
