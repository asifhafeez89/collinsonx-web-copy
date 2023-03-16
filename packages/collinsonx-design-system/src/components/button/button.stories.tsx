import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Button from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Button',
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => (
  <Button {...args}> Re-enter your address </Button>
);

export const Primary = Template.bind({});
// // More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  label: 'Button',
};

export const TextButton = Template.bind({});
// // More on args: https://storybook.js.org/docs/react/writing-stories/args
TextButton.args = {
  label: 'Button',
  color: 'dark',
  variant: 'subtle',
};

export const RedButton = Template.bind({});
// // More on args: https://storybook.js.org/docs/react/writing-stories/args
RedButton.args = {
  label: 'Button',
  variant: 'outline',
  color: 'red',
};
