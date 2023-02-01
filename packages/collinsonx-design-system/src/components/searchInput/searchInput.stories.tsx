import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SearchInput from './index';

export default {
  title: 'Components/SearchInput',
  component: SearchInput,
  argTypes: {
    value: { control: { type: 'text' } },
    placeholder: { control: { type: 'text' } },
  },
} as ComponentMeta<typeof SearchInput>;

const Template: ComponentStory<typeof SearchInput> = (args) => (
  <SearchInput {...args} />
);

export const Default = Template.bind({});
Default.args = { value: '', placeholder: 'Search for airport or lounge' };
