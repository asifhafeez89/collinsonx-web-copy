import { MantineProvider } from '@collinsonx/utils/core';
import {
  experienceX,
  dinersClub,
  amexBlack,
  amexPlatinum,
} from '@collinsonx/utils/themes';

import '../style.css';

const themes = {
  experienceX: () => experienceX({ fontFamily: 'Be Vietnam Pro' }),
  dinersClub: () => dinersClub({ fontFamily: 'Gotham' }),
  amexBlack: () => amexBlack({ fontFamily: 'BentonSans Book' }),
  amexPlatinum: () => amexPlatinum({ fontFamily: 'BentonSans Book' }),
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
