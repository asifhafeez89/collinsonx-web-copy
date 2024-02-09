import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Box } from '@mantine/core';
import DescriptionList from './index';
import Group from './Group';
import Term from './Term';
import Description from './Description';

export default {
  title: 'Partner/DescriptionList',
  component: DescriptionList,
  argTypes: {
    children: {
      description: 'ReactNode',
      control: {
        type: 'text',
      },
    },
  },
} as ComponentMeta<typeof DescriptionList>;

const DAYS = [
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
  'SUNDAY',
];

const Template: ComponentStory<typeof DescriptionList> = (args) => (
  <Box p={10}>
    <DescriptionList {...args} />
  </Box>
);

export const Default = Template.bind({});
Default.args = {
  children: (
    <Box maw={375}>
      <Group fw>
        <Term>Conditions description</Term>
        <Description>Lorem ipsum dolor</Description>
      </Group>
    </Box>
  ),
};

export const OpeningTimes = Template.bind({});
OpeningTimes.args = {
  children: (
    <DescriptionList>
      {DAYS.map((day) => (
        <Group>
          <Term>{day}</Term>
          <Description>04:00-23:55</Description>
        </Group>
      ))}
    </DescriptionList>
  ),
};
