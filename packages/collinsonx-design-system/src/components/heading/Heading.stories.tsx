/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { Story, Meta } from '@storybook/react';

import { Heading, HeadingProps } from './Heading';

export default {
  title: 'Components/Heading',
  component: Heading,
} as Meta;

const Template: Story<HeadingProps> = (args) => <Heading {...args} />;

export const Heading1 = Template.bind({});
Heading1.args = {
  as: 'h1',
  subtitle: 'test',
  children: 'Heading 1',
};

export const Heading2 = Template.bind({});
Heading2.args = {
  as: 'h2',
  children: 'Heading 2',
};

export const Heading3 = Template.bind({});
Heading3.args = {
  as: 'h3',
  children: 'Heading 3',
};

export const Heading4 = Template.bind({});
Heading4.args = {
  as: 'h4',
  children: 'Heading 4',
};

export const Heading5 = Template.bind({});
Heading5.args = {
  as: 'h5',
  children: 'Heading 5',
};

export const Heading6 = Template.bind({});
Heading6.args = {
  as: 'h6',
  children: 'Heading 6',
};

export const Legend = Template.bind({});
Legend.args = {
  as: 'legend',
  children: 'Legend',
};
