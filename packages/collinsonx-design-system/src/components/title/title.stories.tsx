import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Title from './index';

import { Box } from '@mantine/core';

export default {
  title: 'Partner/Title',
  component: Title,
} as ComponentMeta<typeof Title>;

const Template: ComponentStory<typeof Title> = (args) => (
  <Box sx={{ padding: 10, maxWidth: '375px' }}>
    <Title order={1}>Heading 1</Title>
    <Title order={2}>Heading 2</Title>
    <Title order={3}>Heading 3</Title>
    <Title order={4}>Heading 4</Title>
  </Box>
);

export const Default = Template.bind({});
