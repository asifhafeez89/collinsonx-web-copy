import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Lightbox from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Lightbox',
  component: Lightbox,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Lightbox>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Lightbox> = (args) => (
  <Lightbox {...args}>
    <div>
      <h1>Cancel Booking</h1>
      <p>If you cancel you will no longer have this reservation.</p>
    </div>
  </Lightbox>
);

export const Primary = Template.bind({});
// // More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  open: true,
  ctaCancel: 'Go back',
  ctaForward: 'Cancel booking',
  ctaForwardCall: () => {
    console.log('Do it');
  },
};
