import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import OverviewCard from './index';

export default {
  title: 'Partner/OverviewCard',
  component: OverviewCard,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof OverviewCard>;

const Template: ComponentStory<typeof OverviewCard> = (args) => (
  <OverviewCard {...args}> Example child text </OverviewCard>
);

export const OverviewCardExample = Template.bind({});
// // More on args: https://storybook.js.org/docs/react/writing-stories/args
OverviewCardExample.args = {
  label: 'OverviewCard',
  title: 'My lounge',
  datatestid: 'overview-card',
};
