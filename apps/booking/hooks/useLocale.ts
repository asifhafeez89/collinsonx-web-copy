import { useRouter } from 'next/router';

import en from '../locales/en';
import es from 'locales/es';
import { LangObj } from 'types/language';
import { ALLOW_LOCAL, SWITCHES } from '../constants';
import { getItem, setItem } from '@lib';

const useLocale = () => {
  const locale = window ? sessionStorage.PREBOOKING_LANGUAGE : 'en';

  const allowLocale = getItem(ALLOW_LOCAL);
  let t: LangObj = en;

  if (allowLocale === 'OFF') {
    t = en;
  } else {
    t = locale === 'en' ? en : es;
  }

  return t;
};

export default useLocale;
