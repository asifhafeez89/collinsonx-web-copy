import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import BookingLightbox from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  component: BookingLightbox,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof BookingLightbox>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof BookingLightbox> = (args) => (
  <BookingLightbox {...args}>
    <div>
      <h1>Airport Mismatch</h1>
      <div>
        <p>
          Please note, that the lounge you are booking is not in the airport
          your flight is scheduled.{' '}
        </p>

        <p>
          {' '}
          Lounge airport is <strong>Gatwick</strong>.{' '}
        </p>

        <p>
          {' '}
          Flight departure airport is Heathrow. Do you still want to book this
          lounge even it is not in the airport of departure?
        </p>
      </div>
    </div>
  </BookingLightbox>
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
