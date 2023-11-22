import { ArrowLeft } from '@collinsonx/design-system/assets/icons';
import { Anchor, Flex, NavLink } from '@collinsonx/design-system/core';
import usePayload from 'hooks/payload';
import { useCallback } from 'react';
import { FAQLink } from 'utils/FAQLinks';
import { MOBILE_ACTION_BACK } from '../constants';
import { sendMobileEvent } from '@lib';

function TopBarLinks() {
  const { referrerUrl, payload, lounge } = usePayload();
  const handleClickBack = useCallback(() => {
    if (window && !referrerUrl) {
      sendMobileEvent(window, MOBILE_ACTION_BACK);
    }
  }, [referrerUrl]);
  return (
    <Flex justify="space-between">
      <Anchor
        target="_top"
        href={referrerUrl ? referrerUrl : '#'}
        onClick={handleClickBack}
        sx={{
          width: 'fit-content',
          textDecoration: 'none',
          background: 'transparent',
          ':hover': {
            backgroundColor: 'transparent !important',
            textDecoration: 'none',
          },

          button: {
            backgroundColor: 'transparent !important',
          },
        }}
      >
        <NavLink
          label={`BACK TO ${(lounge?.loungeName || '').toUpperCase()}`}
          icon={<ArrowLeft size="1rem" stroke={1.5} />}
          sx={{ color: '#827127' }}
        />
      </Anchor>
      <Anchor
        href={FAQLink(payload?.accountProvider)}
        target="_blank"
        sx={{
          width: 'fit-content',
          textDecoration: 'none',
          background: 'transparent',
          ':hover': {
            backgroundColor: 'transparent !important',
            textDecoration: 'none',
          },
          button: {
            backgroundColor: 'transparent !important',
          },
        }}
      >
        <NavLink label="FAQs" />
      </Anchor>
    </Flex>
  );
}

export default TopBarLinks;
