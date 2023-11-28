import { useRouter } from 'next/router';

import en from '../locales/en';
import es from 'locales/es';
import { LangObj } from 'types/language';

const useLocale = () => {
  const router = useRouter();
  const { locale } = router;
  const t: LangObj = locale === 'en' ? en : es;

  return t;
};

export default useLocale;
