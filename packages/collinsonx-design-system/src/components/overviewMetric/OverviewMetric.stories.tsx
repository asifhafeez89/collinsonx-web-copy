import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import OverviewMetric from './index';

export default {
  title: 'Partner/OverviewMetric',
  component: OverviewMetric,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof OverviewMetric>;

const Template: ComponentStory<typeof OverviewMetric> = (args) => (
  <OverviewMetric {...args}>Example child text </OverviewMetric>
);

export const OverviewMetricExample = Template.bind({});
OverviewMetricExample.args = {
  label: 'Partner count',
  value: 345,
  loading: false,
  datatestid: 'overview-metric',
};
