import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import PageTitle from './index';
import { Box } from '@collinsonx/utils/core';

const data = {
  title: 'Club Aspire Lounge',
  url: '/explore-lounges',
};

export default {
  title: 'Example/PageTitle',
  component: PageTitle,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof PageTitle>;

const Template: ComponentStory<typeof PageTitle> = (args) => (
  <Box sx={{ padding: 0, maxWidth: '375px' }}>
    <PageTitle {...data} />
  </Box>
);

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'PageTitle',
};
