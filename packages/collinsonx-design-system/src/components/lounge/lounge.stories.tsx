import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Lounge from './index';
import { Box } from '@collinsonx/utils/core';

const data = {
  image:
    'https://no1lounges.com/content/images/product/airport-lounges/club-aspire/London-Heathrow-Airport-Terminal-5-Club-Aspire-Lounge-05142021_111414.jpg',
  location: 'London',
  airport: 'Heathrow T5',
  openingTimes: '07:00 - 22:00',
  openDays: 'Monday - Sunday',
};

export default {
  title: 'Components/Lounge',
  component: Lounge,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Lounge>;

const Template: ComponentStory<typeof Lounge> = (args) => (
  <Box sx={{ padding: 0, maxWidth: '375px' }}>
    <Lounge {...data} />
  </Box>
);

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'Lounge',
};
