import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import FieldLabel from './index';
import { Box } from '@mantine/core';

export default {
  title: 'Example/FieldLabel',
  component: FieldLabel,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof FieldLabel>;

const Template: ComponentStory<typeof FieldLabel> = (args) => (
  <Box sx={{ padding: 0 }}>
    <FieldLabel {...args} />
  </Box>
);

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  title: 'Date',
  value: '12/6/2023'
};
