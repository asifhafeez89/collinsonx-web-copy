import {
  rem,
  Anchor,
  Button,
  CSSVariablesResolver,
  Checkbox,
  Input,
  InputWrapper,
  MantineThemeOverride,
  NavLink,
  Select,
  TextInput,
  Modal,
} from '@mantine/core';

import classesAnchor from 'assets/baseTheme/Anchor.module.css';
import classesSelect from 'assets/baseTheme/Select.module.css';
import classesInput from 'assets/baseTheme/Input.module.css';

import classesButton from 'assets/baseTheme/Button.module.css';
import classesTextInput from 'assets/baseTheme/TextInput.module.css';
import classesCheckbox from 'assets/baseTheme/Checkbox.module.css';
import classesDatePickerInput from 'assets/baseTheme/DatePickerInput.module.css';

import { generateColors } from '@mantine/colors-generator';
import { prefixCSSVars } from '../lib';
import colors from '../colour-constants-baas';

declare module '@mantine/core' {
  export interface MantineThemeOther {
    headerNavBg: string;
    headerNavColor: string;
    mainColor: string;
    brandColor: string;
    splashColor: string;
    brandCollinsons: string;
  }
}

type ThemeOptions = {
  fontFamily?: string;
  themeOverrides?: Record<string, string | undefined>;
};

export const resolver: CSSVariablesResolver = ({
  other: { headerNavBg, headerNavColor, mainColor, brandColor, splashColor },
}) => ({
  variables: {
    '--header-nav-bg': headerNavBg,
    '--header-nav-color': headerNavColor,
    '--main-color': mainColor,
    '--brand-color': brandColor,
    '--splash-color': splashColor,
    ...prefixCSSVars(colors),
  },
  dark: {},
  light: {},
});

const BRAND_COLOR = '#827127';

const baseTheme = ({
  fontFamily,
  themeOverrides,
}: ThemeOptions): MantineThemeOverride => {
  const brandPrimaryColor = themeOverrides?.brandColor || BRAND_COLOR;
  return {
    other: {
      headerNavBg: themeOverrides?.headerNavBg || '#D3DAE1',
      headerNavColor: themeOverrides?.headerNavColor || '#000',
      mainColor: themeOverrides?.mainColor || '#FFF',
      brandColor: themeOverrides?.brandColor || '#D3DAE1',
      splashColor: themeOverrides?.splashColor || '#858B91',

      brandCollinsons: brandPrimaryColor,
    },

    colors: {
      brandCollinsons: generateColors(
        themeOverrides?.brandColor || BRAND_COLOR
      ),
    },

    primaryColor: 'brandCollinsons',

    primaryShade: 9,
    defaultRadius: 4,
    fontFamily,
    fontFamilyMonospace: fontFamily,
    headings: {
      fontFamily,
    },

    lineHeights: {
      xs: '1.4',
      sm: '1.45',
      md: '1.55',
      lg: '1.6',
      xl: '1.65',
    },

    fontSizes: {
      xs: rem(12),
      sm: rem(14),
      md: rem(16),
      lg: rem(18),
      xl: rem(20),
      xxl: rem(32),
    },

    components: {
      InputWrapper: InputWrapper.extend({
        styles: ({ colors }) => ({
          label: {
            fontSize: '18px',
            color: colors.dark[6],
          },
          required: {
            color: colors.red[6],
          },
          error: {
            color: colors.red[6],
          },
        }),
      }),
      Anchor: Anchor.extend({
        classNames: () => ({
          root: classesAnchor.root,
        }),
      }),
      Modal: Modal.extend({
        styles: ({ colors }) => ({
          close: {
            color: colors.dark[6],
          },
          header: {
            minHeight: 'auto',
          },
          content: {
            minHeight: 'auto',
          },
        }),
      }),
      Select: Select.extend({
        classNames: () => ({
          input: classesSelect.input,
        }),
      }),
      Input: Input.extend({
        classNames: () => ({
          input: classesInput.input,
          label: classesInput.label,
          invalid: classesInput.invalid,
        }),
        vars: () => ({
          wrapper: {
            '--input-height': rem(50),
            '--input-fz': '1.2rem',
          },
        }),
      }),
      Button: Button.extend({
        classNames: classesButton,
        vars: () => ({
          root: {
            '--button-height': rem(44),
          },
        }),
      }),
      TextInput: TextInput.extend({
        classNames: () => ({
          input: classesTextInput.input,
          label: classesTextInput.label,
        }),
      }),
      NavLink: NavLink.extend({
        styles: () => ({
          label: {
            color: brandPrimaryColor,
          },
        }),
      }),
      Checkbox: Checkbox.extend({
        classNames: () => ({
          input: classesCheckbox.input,
        }),
      }),
      DatePickerInput: {
        classNames: () => ({
          label: classesDatePickerInput.label,
          input: classesDatePickerInput.input,
        }),
      },
    },
  };
};

export default baseTheme;
