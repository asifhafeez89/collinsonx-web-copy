import { useCallback } from 'react';
import { Button, ButtonProps } from '@collinsonx/design-system/core';
import { sendMobileEvent } from '@lib';
import usePayload from 'hooks/payload';
import { MOBILE_ACTION_BACK } from '../constants';

export default function BackButton({ ...props }: ButtonProps) {
  const { referrerUrl } = usePayload();
  const handleClick = useCallback(() => {
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
