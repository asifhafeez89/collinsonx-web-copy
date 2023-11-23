import { useCallback } from 'react';
import { Button, ButtonProps } from '@collinsonx/design-system/core';
import { loggerAction, sendMobileEvent } from '@lib';
import usePayload from 'hooks/payload';
import { ANALYTICS_TAGS, MOBILE_ACTION_BACK } from '../constants';

type BackButtonProps = {
  analyticsTag?: string;
};

export default function BackButton({
  ...props
}: ButtonProps & BackButtonProps) {
  const { referrerUrl } = usePayload();
  const handleClick = useCallback(() => {
    loggerAction('backbutton', props.analyticsTag ?? '');
    if (top) {
      if (referrerUrl) {
        top.location.href = referrerUrl;
      } else {
        const windowObj: any = window;
        sendMobileEvent(windowObj, MOBILE_ACTION_BACK);
      }
    }
  }, [referrerUrl]);
  return <Button {...props} onClick={handleClick} />;
}
