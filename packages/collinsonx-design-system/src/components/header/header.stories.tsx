import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Box } from '@mantine/core';

import Header from './index';
import { LogoCergea } from '../../assets/logo';

export default {
  title: 'Components/Header',
  component: Header,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args, context) => {
  console.log('context ', context.globals.theme);

  const componentMap = {
    experienceX: LogoCergea,
  };
  const Component = componentMap[context.globals.theme];

  return (
    <Box>
      <Header logo={<Component />} />
    </Box>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'Header',
};
