import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Status } from '@collinsonx/utils';
import { Box, Button, Text } from '@mantine/core';
import CardOutlet from './index';
import { OutletLoungeIcon } from '../../assets/icons';
import colors from '../../colour-constants-partner';

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
        options: Object.values(Status),
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
  <Box p={10}>
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
  partnerName: 'Airport Dimensions',
  legacyCode: 'LHR31',
  status: Status.Active,
  width: '350px',
  title: 'Club Aspire Lounge',
  locationName: 'London Heathrow',
  parentSection: (
    <Text data-testid="outlet-card-partner-name" c={colors['text-grey']}>
      Airport dimensions
    </Text>
  ),
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
};

export const Draft = Template.bind({});
Draft.args = {
  ...commonArgs,
};

export const AwaitingApproval = Template.bind({});
AwaitingApproval.args = {
  ...commonArgs,
  status: Status.Inactive,
};

export const Incomplete = Template.bind({});
Incomplete.args = {
  ...commonArgs,
  status: Status.Inactive,
};
