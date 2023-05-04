import { experienceX } from '@collinsonx/design-system/themes';
import { Be_Vietnam_Pro } from 'next/font/google';

const beVietnamPro = Be_Vietnam_Pro({
  style: ['normal'],
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

const theme = experienceX({ fontFamily: beVietnamPro.style.fontFamily });

theme.components = {
  ...theme.components,
  Text: {
    styles: {
      root: {
        fontSize: 18,
      },
    },
  },
  Anchor: {
    styles: ({ colors }) => ({
      root: {
        color: colors.brandColor[0],
        textDecoration: 'underline',
        fontWeight: 600,
        fontSize: 18,
      },
    }),
  },
};

export default theme;
