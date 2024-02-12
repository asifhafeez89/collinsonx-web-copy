import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Box } from '@mantine/core';

import ErrorNotification from './index';

export default {
  title: 'Components/errorNotification',
  component: ErrorNotification,
} as ComponentMeta<typeof ErrorNotification>;

const Template: ComponentStory<typeof ErrorNotification> = (args) => (
  <Box>
    <ErrorNotification {...args} />
  </Box>
);

export const Notification = Template.bind({});
Notification.args = {
  content:
    "We're sorry, this booking cannot be amended within 48 hours of booking arrival time.",
};
