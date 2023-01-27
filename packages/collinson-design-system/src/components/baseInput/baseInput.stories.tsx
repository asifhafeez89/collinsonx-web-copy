import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import BaseInput  from './baseInput';
import { Button, Title, Stack, Text, Box, Flex } from '@mantine/core';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/BaseInput',
  component: BaseInput,
  argTypes: {},
} as ComponentMeta<typeof BaseInput>;

const Template: ComponentStory<typeof BaseInput> = (args) =>  {
  return (
    <Stack spacing={50}>
      <Stack spacing={24}>
         <BaseInput {...args} />
      </Stack>
    </Stack>
  )
}

export const BaseInputExample = Template.bind({});
BaseInputExample.args = {
    placeholder:"Your email address",
    label:"Your email address",
    withAsterisk: true
};
