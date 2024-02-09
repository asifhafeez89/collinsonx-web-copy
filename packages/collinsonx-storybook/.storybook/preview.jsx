import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

import {
  MantineProvider,
  createTheme,
} from '../../collinsonx-design-system/src/core';

import { resolver } from '../../collinsonx-design-system/src/themes/baseTheme';

import {
  experienceX,
  dinersClub,
  amexBlack,
  amexPlatinum,
  partnerTheme,
  partnerThemeResolver,
} from '../../collinsonx-design-system/src/themes';

import '../style.css';

const themes = {
  experienceX,
  partnerTheme,
};

const withTheme = (StoryFn, context) => {
  const themeName = context.parameters.theme || context.globals.theme;
  const storyTheme = createTheme(themes[themeName]() ?? experienceX());
  const resolver =
    themeName === 'partnerTheme' ? partnerThemeResolver : undefined;

  return (
    <MantineProvider theme={storyTheme} cssVariablesResolver={resolver}>
      <StoryFn />
    </MantineProvider>
  );
};

export const globalTypes = {
  theme: {
    title: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'experienceX',
    toolbar: {
      // The icon for the toolbar item
      //icon: 'circlehollow',
      title: 'Theme',
      // Array of options
      items: [
        { title: 'Experience X', value: 'experienceX' },
        { title: 'Partner', value: 'partnerTheme' },
      ],
      dynamicTitle: true,
    },
  },
};

// export all decorators that should be globally applied in an array
export const decorators = [withTheme];

export const parameters = { layout: 'fullscreen' };
