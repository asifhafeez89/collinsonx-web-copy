import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import PageTitle from './index';
import { Box } from '@mantine/core';

const data = {
  title: 'Club Aspire Lounge',
  onClickBack: () => {},
};

export default {
  title: 'Components/PageTitle',
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
