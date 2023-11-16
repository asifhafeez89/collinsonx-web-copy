import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Box, Button } from '@mantine/core';
import CardOutlet, { Status } from './index';
import { OutletLoungeIcon } from '../../assets/icons';

export default {
  title: 'Partner/CardOutlet',
  component: CardOutlet,
  argTypes: {
    legacyCode: {
      control: {
        type: 'text',
      },
    },
    status: {
      control: {
        type: 'radio',
        options: ['active', 'inactive'],
      },
    },
    imageCount: {
      control: {
        type: 'number',
      },
    },
  },
} as ComponentMeta<typeof CardOutlet>;

const PRODUCT_CATEGORIES = [
  {
    label: 'Lounge',
    IconComponent: <OutletLoungeIcon width={24} height={24} />,
  },
  {
    label: 'Lounge',
    IconComponent: <OutletLoungeIcon width={24} height={24} />,
  },
  {
    label: 'Lounge',
    IconComponent: <OutletLoungeIcon width={24} height={24} />,
  },
];

const Template: ComponentStory<typeof CardOutlet> = (args) => (
  <Box sx={{ padding: 10 }}>
    <CardOutlet {...args}>
      <Button aria-hidden={true} variant="outline" fullWidth radius="md">
        View details
      </Button>
    </CardOutlet>
  </Box>
);

const SAMPLE_URL =
  'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80';

const commonArgs = {
  legacyCode: 'LHR31',
  status: Status.Active,
  title: 'Club Aspire Lounge',
  locationName: 'London Heathrow',
  terminal: 'Terminal 5',
  lastEdit: '5 days ago',
  imageCount: 13,
  productCategories: PRODUCT_CATEGORIES,
  rating: {
    stars: 5,
    ratingCount: 99,
  },
  imageUrl: SAMPLE_URL,
};

export const PartnerAttention = Template.bind({});
PartnerAttention.args = {
  ...commonArgs,
  workflowStage: {
    type: 'denied',
    label: 'Partner attention',
  },
};

export const Draft = Template.bind({});
Draft.args = {
  ...commonArgs,
  workflowStage: {
    type: 'draft',
    label: 'Draft',
  },
};

export const AwaitingApproval = Template.bind({});
AwaitingApproval.args = {
  ...commonArgs,
  status: Status.Inactive,
  workflowStage: {
    type: 'review',
    label: 'Awaiting Approval',
  },
};

export const Incomplete = Template.bind({});
Incomplete.args = {
  ...commonArgs,
  status: Status.Inactive,
  workflowStage: {
    type: 'draft',
    label: 'Incomplete',
  },
};
