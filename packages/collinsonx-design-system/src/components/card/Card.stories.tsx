import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Box, Text } from '@mantine/core';
import Card from './index';
import { Status } from '@collinsonx/utils';

export default {
  title: 'Partner/Card',
  component: Card,
  argTypes: {
    imageCount: {
      control: {
        type: 'number',
      },
    },
    hasImagePadding: {
      control: {
        type: 'boolean',
      },
    },
  },
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => (
  <Box sx={{ padding: 10 }}>
    <Card {...args}>
      <Text>Sample card</Text>
    </Card>
  </Box>
);

const SAMPLE_URL =
  'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80';

const commonArgs = {
  status: Status.Active,
  width: '350px',
  imageUrl: SAMPLE_URL,
  imageCount: 10,
};

export const Default = Template.bind({});
Default.args = {
  ...commonArgs,
  hasImagePadding: false,
};

export const WithImagePadding = Template.bind({});
WithImagePadding.args = {
  ...commonArgs,
  hasImagePadding: true,
  imageUrl: 'https://i.imgur.com/fIQQAr3.png',
};
