import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Details from './index';
import { MapPin, Clock } from '../../assets/icons';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Details',
  component: Details,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Details>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Details> = (args) => (
  <Details {...args} />
);

const infos = [
  {
    header: 'Heathrow',
    description: 'Terminal 5',
    icon: <MapPin width={16} color="#0C8599" />,
  },
  {
    header: 'Mon - Sun | 05:00 - 22:00',
    description: 'Walk-in available',
    icon: <Clock width={16} color="#0C8599" />,
  },
];

export const Primary = Template.bind({});
// // More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  infos: infos,
};
