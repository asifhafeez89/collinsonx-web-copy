import {
  Anchor,
  Button,
  CSSVariablesResolver,
  Divider,
  Input,
  InputWrapper,
  MantineThemeOverride,
  Pagination,
  PasswordInput,
  TextInput,
  rem,
} from '@mantine/core';
import colors from '../colour-constants-partner';
import { generateColors } from '@mantine/colors-generator';

import { DatePicker, DatePickerInput } from '@mantine/dates';

import classesDatePickerInput from 'assets/partnerTheme/DatePickerInput.module.css';
import classesDatePicker from 'assets/partnerTheme/DatePicker.module.css';
import classesInputWrapper from 'assets/partnerTheme/InputWrapper.module.css';
import classesInput from 'assets/partnerTheme/Input.module.css';
import classesTextInput from 'assets/partnerTheme/TextInput.module.css';
import classesPasswordInput from 'assets/partnerTheme/PasswordInput.module.css';
import classesButton from 'assets/partnerTheme/Button.module.css';
import classesAnchor from 'assets/partnerTheme/Anchor.module.css';
import classesPagination from 'assets/partnerTheme/Pagination.module.css';
import { prefixCSSVars } from '../lib/index';

type ThemeOptions = {
  fontFamily?: string;
};

const HEADING_LINE_HEIGHT = '1.25';

declare module '@mantine/core' {
  export interface MantineThemeOther {
    headerNavBg: string;
    headerNavColor: string;
    brandColor: string;
    splashColor: string;
  }
}

export const resolver: CSSVariablesResolver = ({
  other: { headerNavBg, headerNavColor, brandColor, splashColor },
}) => ({
  variables: {
    '--header-nav-bg': headerNavBg,
    '--header-nav-color': headerNavColor,
    '--brand-color': brandColor,
    '--splash-color': splashColor,
    ...prefixCSSVars(colors),
  },
  dark: {},
  light: {},
});

const BRAND_COLOR = '#827127';

const theme = (
  { fontFamily }: ThemeOptions = { fontFamily: 'Be Vietnam Pro' }
): MantineThemeOverride => {
  return {
    other: {
      headerNavBg: '#FFF',
      headerNavColor: '#FFF',
      brandColor: BRAND_COLOR,
      splashColor: '#FFF',
    },

    colors: {
      brandColor: generateColors(BRAND_COLOR),
    },

    primaryColor: 'brandColor',
    primaryShade: 9,
    defaultRadius: 4,

    spacing: {
      xs: rem(8),
      sm: rem(16),
      md: rem(24),
      lg: rem(32),
      xl: rem(48),
    },
    fontSizes: {
      xs: rem(12),
      sm: rem(14),
      md: rem(16),
      lg: rem(18),
      xl: rem(20),
      xxl: rem(32),
    },
    fontFamily,
    fontFamilyMonospace: fontFamily,
    headings: {
      fontFamily,
      fontWeight: '600',
      sizes: {
        h1: {
          fontWeight: '300',
          lineHeight: HEADING_LINE_HEIGHT,
        },
        h2: {
          lineHeight: HEADING_LINE_HEIGHT,
        },
        h3: {
          lineHeight: HEADING_LINE_HEIGHT,
        },
      },
    },
    components: {
      Divider: Divider.extend({
        vars: () => ({
          root: {
            '--divider-color': colors['grey-border'],
          },
        }),
      }),
      DatePickerInput: DatePickerInput.extend({
        classNames: classesDatePickerInput,
      }),
      DatePicker: DatePicker.extend({
        classNames: classesDatePicker,
      }),
      InputWrapper: InputWrapper.extend({
        classNames: classesInputWrapper,
      }),
      Input: Input.extend({
        classNames: classesInput,
      }),
      TextInput: TextInput.extend({
        classNames: classesTextInput,
      }),
      PasswordInput: PasswordInput.extend({
        classNames: classesPasswordInput,
      }),
      Anchor: Anchor.extend({
        classNames: classesAnchor,
      }),
      Button: Button.extend({
        styles: (theme, props) => ({
          root: {
            fontSize: rem(theme.fontSizes.md),
            paddingInline: theme.spacing.md,
          },
        }),
        classNames: (theme, props) => {
          if (props.variant === 'outline') {
            return {
              root: classesButton.rootOutline,
            };
          }
          return {};
        },
        vars: (theme, props) => {
          if (props.variant === 'outline') {
            return {
              root: {
                '--button-color': colors['text-default'],
                '--button-bd': `1px solid ${colors['text-default']}`,
              },
            };
          } else if (props.variant === 'transparent') {
            return {
              root: {
                '--button-color': colors['text-default'],
              },
            };
          }
          return { root: {} };
        },
      }),
      Pagination: Pagination.extend({
        classNames: classesPagination,
      }),
    },
  };
};

export default theme;
