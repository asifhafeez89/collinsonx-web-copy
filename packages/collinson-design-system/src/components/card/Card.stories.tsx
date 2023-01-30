import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Card from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/Card',
  component: Card,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Card>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Card> = (args) => (
  <Card {...args}> Re-enter your address </Card>
);

export const CardExample = Template.bind({});
// // More on args: https://storybook.js.org/docs/react/writing-stories/args
CardExample.args = {
  label: 'Card',
  title: 'My lounge',
  pictureUrl: 'https://picsum.photos/200/100?grayscale',
  subtitle: 'Athens International Airport'
};
