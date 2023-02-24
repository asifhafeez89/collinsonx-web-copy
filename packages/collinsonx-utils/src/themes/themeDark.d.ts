import { MantineThemeOverride } from '@mantine/core';
type ThemeOptions = {
    fontFamily: string;
};
declare const theme: ({ fontFamily }: ThemeOptions) => MantineThemeOverride;
export default theme;
