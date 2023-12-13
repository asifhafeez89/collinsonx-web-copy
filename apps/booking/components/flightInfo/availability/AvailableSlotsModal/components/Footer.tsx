import { FC } from 'react';

import { useRouter } from 'next/router';

import { Button } from '@collinsonx/design-system/core';

import { FooterStyle } from '../enums';

import BackButton from '@components/BackButton';

import colors from 'ui/colour-constants';
import useLocale from 'hooks/useLocale';

const backButtonStyle = {
  root: {
    border: 'solid',
    backgroundColor: colors.white,
    borderColor: colors.black,
    borderWidth: 2,
    color: colors.white,
  },
  label: {
    color: colors.black,
  },
};

function InternalServerErrorFooter() {
  const router = useRouter();
  const buttonHandler = () => {
    router.back();
  };

  return (
    <>
      <Button onClick={buttonHandler}>{'Edit Booking'.toUpperCase()}</Button>
      <BackButton styles={backButtonStyle}>
        {'Return to lounges'.toUpperCase()}
      </BackButton>
    </>
  );
}

function CapacityFooter() {
  const router = useRouter();
  const handleChangeGuestsOnClickHandler = () => {
    router.back();
  };
  const translations = useLocale();

  return (
    <>
      <Button onClick={handleChangeGuestsOnClickHandler}>
        {translations.lounge.errors.capacity.btn.change}
      </Button>
      <BackButton styles={backButtonStyle}>
        {translations.lounge.errors.capacity.btn.return}
      </BackButton>
    </>
  );
}

interface Props {
  footerStyle: FooterStyle;
}

const Footer: FC<Props> = ({ footerStyle = FooterStyle.CAPACITY }) => {
  switch (footerStyle) {
    case FooterStyle.CAPACITY:
      return <CapacityFooter />;
    case FooterStyle.INTERNAL_SERVER_ERROR:
      return <InternalServerErrorFooter />;
  }
};

export default Footer;
