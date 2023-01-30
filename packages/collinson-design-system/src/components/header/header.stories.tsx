import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Header from './index';
import { Box } from '@mantine/core';

export default {
  title: 'Example/Header',
  component: Header,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => (
  <Box sx={{ padding: 0 }}>
    <Header />
  </Box>
);

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'Header',
};
