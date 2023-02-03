import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Status from './index';
import { Box } from '@mantine/core';

export default {
  title: 'Example/Status',
  component: Status,
} as ComponentMeta<typeof Status>;

const Template: ComponentStory<typeof Status> = (args) => (
  <Box
    sx={{
      padding: 25,
    }}
  >
    <Status {...args} />
  </Box>
);

export const Pending = Template.bind({});
Pending.args = {};

export const Confirmed = Template.bind({});
Confirmed.args = {
  confirmed: true,
};

export const Declined = Template.bind({});
Declined.args = {
  declined: true,
};
