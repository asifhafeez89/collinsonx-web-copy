import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Breadcramp from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Breadcramp',
  component: Breadcramp,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    title: 'Back to Gatwick',
    url: 'https://bbc.co.uk',
  },
} as ComponentMeta<typeof Breadcramp>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Breadcramp> = (args) => (
  <Breadcramp {...args}> Re-enter your address </Breadcramp>
);

export const BreadcrampExample = Template.bind({});
// // More on args: https://storybook.js.org/docs/react/writing-stories/args
BreadcrampExample.args = {
  title: 'Back to Gatwick',
  url: 'https://bbc.co.uk',
};
