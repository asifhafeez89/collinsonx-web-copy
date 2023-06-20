import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SelectInput from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/SelectInput',
  component: SelectInput,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof SelectInput>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SelectInput> = (args) => (
  <SelectInput {...args} />
);

export const Primary = Template.bind({});
// // More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  label: 'Date',
  placeholder: 'hh:ss',
  data: [
    {
      value: '1ccc3807-a7ed-5a3a-ada8-fd37ac1ab941',
      label: 'Clubrooms Birmingham - Additional Fee Applies',
    },
    {
      value: '460a2db7-286b-594d-8a77-fb3af690cfe6',
      label: 'No1 Lounge Birmingham',
    },
    {
      value: 'e1d306ee-92d2-5168-b61f-c97de201c6b8',
      label: 'No1 Lounge Gatwick',
    },
    {
      value: '29e22c54-6700-50ae-b6bc-96a18bae6d3d',
      label: 'Club Aspire Lounge',
    },
  ],
};
