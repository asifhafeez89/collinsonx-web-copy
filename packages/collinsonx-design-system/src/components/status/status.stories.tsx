import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Status from './index';
import { Box } from '@collinsonx/utils/core';

export default {
  title: 'Components/Status',
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
Pending.args = {
  status: 'pending',
};

export const Confirmed = Template.bind({});
Confirmed.args = {
  status: 'confirmed',
};

export const Declined = Template.bind({});
Declined.args = {
  status: 'declined',
};
