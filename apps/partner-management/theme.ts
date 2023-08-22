import { experienceX } from '@collinsonx/design-system/themes';

const theme = experienceX({ fontFamily: 'Be Vietnam Pro' });

theme.components = {
  ...theme.components,
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
