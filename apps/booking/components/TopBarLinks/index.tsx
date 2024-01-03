import { ArrowLeft } from '@collinsonx/design-system/assets/icons';
import { Anchor, Flex, NavLink } from '@collinsonx/design-system/core';
import usePayload from 'hooks/payload';
import { useCallback } from 'react';
import { FAQLink } from 'utils/FAQLinks';
import { ANALYTICS_TAGS, MOBILE_ACTION_BACK } from '../../constants';
import { logAction, sendMobileEvent } from '@lib';

import useLocale from 'hooks/useLocale';

import classes from './TopBarLinks.module.css';
import clsx from 'clsx';

interface TopBarLinksProps {
  page?: string;
}

function TopBarLinks({ page }: TopBarLinksProps) {
  const { referrerUrl, payload, lounge } = usePayload();
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

  const translations = useLocale();

  return (
    <Flex justify="space-between">
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
      <NavLink
        href={FAQLink(payload?.accountProvider)}
        label={translations.lounge.topBarLinks.faqs}
        target="_blank"
        className={classes.anchor}
      />
    </Flex>
  );
}

export default TopBarLinks;
