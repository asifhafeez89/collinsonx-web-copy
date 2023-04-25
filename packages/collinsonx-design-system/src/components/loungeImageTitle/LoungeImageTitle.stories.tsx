import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import LoungeImageTitle from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/LoungeImageTitle',
  component: LoungeImageTitle,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof LoungeImageTitle>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof LoungeImageTitle> = (args) => (
  <LoungeImageTitle {...args} />
);

export const Primary = Template.bind({});
// // More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  title: 'Lounge X',
  image:
    'https://images.unsplash.com/photo-1511216335778-7cb8f49fa7a3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80',
};
