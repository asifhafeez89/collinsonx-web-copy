import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Box } from '@mantine/core';
import FieldIcon from './index';

import { OutletLoungeIcon } from '../../assets/icons';

export default {
  title: 'Components/FieldIcon',
  component: FieldIcon,
  argTypes: {
    text: {
      control: {
        type: 'text',
      },
    },
    textPosition: {
      control: {
        type: 'select',
        options: ['bottom', 'right'],
      },
    },
    children: {
      description: 'ReactNode',
      control: false,
    },
  },
} as ComponentMeta<typeof FieldIcon>;

const Template: ComponentStory<typeof FieldIcon> = (args) => (
  <Box sx={{ padding: 10, maxWidth: '375px' }}>
    <FieldIcon {...args} />
  </Box>
);

export const TextRight = Template.bind({});
TextRight.args = {
  text: 'Lounge',
  textPosition: 'right',
  children: <OutletLoungeIcon width={24} height={24} />,
};

export const TextBottom = Template.bind({});
TextBottom.args = {
  text: 'Lounge',
  textPosition: 'bottom',
  children: <OutletLoungeIcon width={24} height={24} />,
};
