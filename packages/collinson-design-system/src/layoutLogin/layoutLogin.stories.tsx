import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import LayoutLogin  from './layoutLogin';
import { Button, Title, Stack, Text, Box, Flex } from '@mantine/core';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/LayoutLogin',
  component: LayoutLogin,
  argTypes: {},
} as ComponentMeta<typeof LayoutLogin>;

const Template: ComponentStory<typeof LayoutLogin> = (args) =>  {
  return (
    <LayoutLogin>
        <div>Test</div>  
    </LayoutLogin>
  )
}

export const LayoutLoginExample = Template.bind({});
LayoutLoginExample.args = {};
