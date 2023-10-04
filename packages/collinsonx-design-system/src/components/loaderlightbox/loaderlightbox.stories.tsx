import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import LoaderLightbox from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/LoaderLightbox',
  component: LoaderLightbox,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof LoaderLightbox>;

const Template: ComponentStory<typeof LoaderLightbox> = (args) => (
  <LoaderLightbox {...args}>
    <div>
      <h2>Payment is being processed</h2>
      <p>
        Your payment for the Lounge One London Gatwick is being processed. This
        might take a few minutes/seconds to complete.
        <br />
        <br />
        Please do not elave the screen rather close your browser until the
        action finishes.
      </p>
    </div>
  </LoaderLightbox>
);

export const Primary = Template.bind({});
// // More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  open: true,
  ctaAction: 'TRY AGAIN',
  onHandleClick: () => {
    console.log('Do it');
  },
};
