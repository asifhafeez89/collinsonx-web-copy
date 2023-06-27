import { MantineThemeOverride } from '@collinsonx/design-system/core';
import { Be_Vietnam_Pro } from 'next/font/google';

const beVietnamPro = Be_Vietnam_Pro({
  style: ['normal'],
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

type ThemeOptions = {
  fontFamily?: string;
};

const theme = (
  { fontFamily }: ThemeOptions = { fontFamily: 'Be Vietnam Pro' }
): MantineThemeOverride => ({
  components: {
    DatePickerInput: {
      styles: ({ colors }) => ({
        label: {
          fontSize: '1rem',
          marginTop: '10px',
          marginBottom: '10px',
        },
      }),
    },
    DateTimePicker: {
      styles: ({ colors }) => ({
        label: {
          fontSize: '1rem',
          marginTop: '10px',
          marginBottom: '10px',
        },
      }),
    },
    TextInput: {
      styles: ({ colors }) => ({
        label: {
          fontSize: '1rem',
          marginTop: '10px',
          marginBottom: '10px',
        },
      }),
    },
  }
});

export default theme();
