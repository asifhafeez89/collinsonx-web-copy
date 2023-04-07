import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import LoaderLifestyleX from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/LoaderLifestyleX',
  component: LoaderLifestyleX,
} as ComponentMeta<typeof LoaderLifestyleX>;

const Template: ComponentStory<typeof LoaderLifestyleX> = (args) => (
  <LoaderLifestyleX />
);

export const Primary = Template.bind({});
