import { ArrowLeft } from '@collinsonx/design-system/assets/icons';
import { Anchor, Flex, NavLink } from '@collinsonx/design-system/core';
import usePayload from 'hooks/payload';
import { useCallback } from 'react';
import { FAQLink } from 'utils/FAQLinks';
import {
  ANALYTICS_TAGS,
  BOKING_MODE_STATE,
  BOOKING_MODE,
  MOBILE_ACTION_BACK,
} from '../../constants';
import { getItem, logAction, sendMobileEvent } from '@lib';

import useLocale from 'hooks/useLocale';

import classes from './TopBarLinks.module.css';
import clsx from 'clsx';
import { useRouter } from 'next/router';

interface TopBarLinksProps {
  page?: string;
  showBackButton?: boolean;
}

function TopBarLinks({ page, showBackButton }: TopBarLinksProps) {
  const { referrerUrl, payload, lounge } = usePayload();
  const Booking_Mode = getItem(BOKING_MODE_STATE);
  const router = useRouter();

  const handleClickBack = useCallback(() => {
    if (window && !referrerUrl) {
      sendMobileEvent(window, MOBILE_ACTION_BACK);
    }
    logAction(
      'backToLounge',
      `${ANALYTICS_TAGS.ON_HIT_BACK_BUTTON}${page}`,
      null
    );
  }, [referrerUrl]);

  const handleClickAmendBack = () => {
    router.back();
  };

  const translations = useLocale();

  return (
    <Flex justify="space-between">
      {Booking_Mode === BOOKING_MODE.EDIT ? (
        showBackButton ? (
          <NavLink
            target="_top"
            href="#"
            onClick={handleClickAmendBack}
            label={translations.lounge.topBarLinks.back}
            leftSection={<ArrowLeft size="1rem" stroke={1.5} />}
            className={clsx([classes.navLink, classes.anchor])}
          />
        ) : (
          <div></div>
        )
      ) : (
        <NavLink
          target="_top"
          href={referrerUrl ? referrerUrl : '#'}
          onClick={handleClickBack}
          label={
            translations.lounge.topBarLinks.backToLounge +
            ' ' +
            (lounge?.loungeName || '').toUpperCase()
          }
          leftSection={<ArrowLeft size="1rem" stroke={1.5} />}
          className={clsx([classes.navLink, classes.anchor])}
        />
      )}
      <NavLink
        href={FAQLink(
          payload?.accountProvider,
          translations.booking.flightDetails.localeValue
        )}
        label={translations.lounge.topBarLinks.faqs}
        target="_blank"
        className={classes.anchor}
      />
    </Flex>
  );
}

export default TopBarLinks;
