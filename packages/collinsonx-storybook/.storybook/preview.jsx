import { MantineProvider } from '@collinsonx/utils/core';
import { themeLight, themeDark } from '@collinsonx/utils/themes';

const withTheme = (StoryFn, context) => {
  const theme = context.parameters.theme || context.globals.theme;
  const storyTheme = theme === 'dark' ? themeDark : themeLight;

  return (
    <MantineProvider
      theme={storyTheme({ fontFamily: 'Be Vietnam Pro' })}
      withGlobalStyles
      withNormalizeCSS
    >
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
        { value: 'light', title: 'Default' },
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
