import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import InfoBox from '.';
import { Box } from '@mantine/core';

export default {
  title: 'Components/InfoBox',
  component: InfoBox,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof InfoBox>;

const Template: ComponentStory<typeof InfoBox> = (args) => (
  <Box sx={{ padding: 0 }}>
    <InfoBox {...args} />
  </Box>
);

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  title: 'Your flight details',
  flight: 'Date',
  date: '12/6/2023',
};
