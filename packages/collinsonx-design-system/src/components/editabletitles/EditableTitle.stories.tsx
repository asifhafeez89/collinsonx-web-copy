import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import EditableTitle from './EditableTitle';
import { Box } from '@mantine/core';

export default {
  title: 'Components/EditableTitle',
  component: EditableTitle,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof EditableTitle>;

const Template: ComponentStory<typeof EditableTitle> = (args) => (
  <Box sx={{ padding: 0 }}>
    <EditableTitle {...args} />
  </Box>
);

export const Primary = Template.bind({});
Primary.args = {
  as: 'h2',
  title: 'Title',
  to: 'https://bbc.co.uk',
};
