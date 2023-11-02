import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Rating from './index';

import { Box } from '@mantine/core';

export default {
  title: 'Components/Rating',
  component: Rating,
  argTypes: {
    stars: { control: 'number' },
    ratingCount: { control: 'number' },
  },
} as ComponentMeta<typeof Rating>;

const Template: ComponentStory<typeof Rating> = (args) => (
  <Box sx={{ padding: 10, maxWidth: '375px' }}>
    <Rating {...args} />
  </Box>
);

export const Default = Template.bind({});
Default.args = { stars: 4, ratingCount: 99 };
