import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Box } from '@mantine/core';
import Badge from './index';
import { Status } from '@collinsonx/utils';

export default {
  title: 'Partner/Badge',
  component: Badge,
  argTypes: {
    size: { control: { type: 'select', options: ['small', 'large'] } },
    type: {
      control: {
        type: 'select',
        options: [Status.Active, Status.Inactive, Status.StopSale],
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
Active.args = { size: 'small', type: Status.Active, children: '' };

export const Inactive = Template.bind({});
Inactive.args = { size: 'small', type: Status.Inactive, children: '' };

export const StopSale = Template.bind({});
StopSale.args = { size: 'small', type: Status.StopSale, children: '' };
