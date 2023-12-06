import { useRouter } from 'next/router';

import en from '../locales/en';
import es from 'locales/es';
import { LangObj } from 'types/language';

const useLocale = () => {
  const locale = window ? sessionStorage.PREBOOKING_LANGUAGE : 'en';

  const t: LangObj = locale === 'en' ? en : es;

  return t;
};

export default useLocale;
