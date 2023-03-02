import { MantineProvider } from '@mantine/core';
import {
  experienceX,
  dinersClub,
  amexBlack,
  amexPlatinum,
} from '../../collinsonx-design-system/src/themes';

import '../style.css';

const themes = {
  experienceX,
  dinersClub,
  amexBlack,
  amexPlatinum,
};

const withTheme = (StoryFn, context) => {
  const themeName = context.parameters.theme || context.globals.theme;
  const storyTheme = themes[themeName] ?? experienceX;

  return (
    <MantineProvider theme={storyTheme()} withGlobalStyles withNormalizeCSS>
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
        { title: 'Diners Club', value: 'dinersClub' },
        { title: 'AMEX Black', value: 'amexBlack' },
        { title: 'AMEX Platinum', value: 'amexPlatinum' },
      ],
      dynamicTitle: true,
    },
  },
};

// export all decorators that should be globally applied in an array
export const decorators = [withTheme];

export const parameters = { layout: 'fullscreen' };
