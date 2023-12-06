import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Box } from '@mantine/core';
import Badge from './index';

export default {
  title: 'Partner/Badge',
  component: Badge,
  argTypes: {
    size: { control: { type: 'select', options: ['small', 'large'] } },
    type: {
      control: {
        type: 'select',
        options: ['active', 'draft', 'review', 'denied', 'inactive'],
      },
    },
    children: {
      description: 'ReactNode',
      control: {
        type: 'text',
      },
    },
  },
} as ComponentMeta<typeof Badge>;

const Template: ComponentStory<typeof Badge> = (args) => (
  <Box sx={{ padding: 10, maxWidth: '375px' }}>
    <Badge {...args} />
  </Box>
);

export const Active = Template.bind({});
Active.args = { size: 'small', type: 'active', children: '' };

export const Draft = Template.bind({});
Draft.args = { size: 'small', type: 'draft', children: '' };

export const Review = Template.bind({});
Review.args = { size: 'small', type: 'review', children: '' };

export const Denied = Template.bind({});
Denied.args = { size: 'small', type: 'denied', children: '' };

export const Inactive = Template.bind({});
Inactive.args = { size: 'small', type: 'inactive', children: '' };
