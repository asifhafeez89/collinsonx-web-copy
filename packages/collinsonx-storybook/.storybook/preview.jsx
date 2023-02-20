import { MantineProvider } from '@collinsonx/utils/core';
import { experienceX, themeDark } from '@collinsonx/utils/themes';

const themes = {
  experienceX: () => experienceX({ fontFamily: 'Be Vietnam Pro' }),
  dark: () => themeDark({ fontFamily: 'Be Vietnam Pro' }),
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
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      // The icon for the toolbar item
      // icon: 'circlehollow',
      // Array of options
      items: [
        { value: 'experienceX', title: 'Experience X' },
        { value: 'dark', title: 'Dark' },
      ],
      // Property that specifies if the name of the item will be displayed
      showName: true,
    },
  },
};

// export all decorators that should be globally applied in an array
export const decorators = [withTheme];

export const parameters = { layout: 'fullscreen' };
