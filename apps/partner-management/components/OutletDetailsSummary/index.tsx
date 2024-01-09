import {
  Text,
  Flex,
  Box,
  VisuallyHidden,
} from '@collinsonx/design-system/core';
import {
  HelpOutlineIcon,
  OutletLoungeIcon,
} from '@collinsonx/design-system/assets/icons';

import { toTitleCase } from 'utils/textUtils';
import Badge from '@collinsonx/design-system/components/badge/index';
import SummaryItem from './SummaryItem';
import TooltipIcon from '../../components/TooltipIcon';
import { formatDateString } from 'utils/dateUtils';
import outletIcons, { ValidTag } from 'config/outletIcons';
import ProductCategoriesList from '@collinsonx/design-system/components/outletTypes/index';
import classes from './OutletDetailsSummary.module.css';

interface Editor {
  firstName?: string | null;
  lastName?: string | null;
  organisation?: string | null;
}

export interface OutletDetailsSummaryProps {
  locationType: string;
  legacyCode?: string | null;
  code?: string | null;
  tags: Array<ValidTag | null>;
  status: 'ACTIVE' | 'INACTIVE';
  primaryProducts: string[];
  disabledAccess: boolean;
  email?: string | null;
  lastEditedDate?: string;
  editor?: Editor | null;
}

const OutletDetailsSummary = ({
  locationType,
  legacyCode,
  code: outletCode,
  tags,
  status,
  primaryProducts,
  disabledAccess,
  email,
  lastEditedDate,
  editor,
}: OutletDetailsSummaryProps) => {
  const renderProducts = (products: string[]) => {
    return products.length > 0 ? (
      <Flex direction="column" gap={4}>
        {products.map((product) => (
          <Text key={product} size="lg" style={{ whiteSpace: 'nowrap' }}>
            {product}
          </Text>
        ))}
      </Flex>
    ) : (
      <Text c="gray">N/A</Text>
    );
  };

  const renderLastEdited = (): JSX.Element => {
    const dateFormatted = lastEditedDate
      ? formatDateString(lastEditedDate)
      : 'N/A';
    const editorInfo =
      editor?.firstName || editor?.lastName
        ? `by ${editor.firstName} ${editor.lastName} ${
            editor.organisation ? `(${editor.organisation})` : ''
          }`
        : '';

    return (
      <Flex direction="column" gap={4}>
        {dateFormatted !== 'N/A' && <Text size="lg">{dateFormatted}</Text>}
        {editorInfo && <Text>{editorInfo}</Text>}
      </Flex>
    );
  };

  const productCategories = tags
    .filter((tag): tag is ValidTag => tag !== null)
    .map((tag) => {
      const Icon = outletIcons[tag];
      return {
        label: tag,
        IconComponent: <Icon width={24} height={24} aria-hidden={true} />,
      };
    });

  return (
    <Box p="md">
      <VisuallyHidden>
        <Text fw={500} size="lg">
          Summary
        </Text>
      </VisuallyHidden>
      <Box component="dl" className={classes.boxContainer}>
        <SummaryItem label="Location type" value={toTitleCase(locationType)} />
        <SummaryItem
          label="Legacy code"
          value={
            legacyCode ? (
              <Flex>
                <Text size="lg">{legacyCode}</Text>
                <TooltipIcon
                  icon={<HelpOutlineIcon aria-label="Help" />}
                  tooltipText="This is your login username for Point of Sale devices and Lounge Gateway"
                  size="md"
                  tooltipProps={{ multiline: true, w: 260 }}
                  iconProps={{ style: { marginLeft: 8 } }}
                />
              </Flex>
            ) : (
              'N/A'
            )
          }
        />
        <SummaryItem
          label="Outlet code"
          value={
            outletCode ? (
              <Flex>
                <Text size="lg">{outletCode}</Text>
                <TooltipIcon
                  icon={<HelpOutlineIcon aria-label="Help" />}
                  tooltipText="This is the outlet code for the outlet"
                  size="md"
                  tooltipProps={{ multiline: true, w: 260 }}
                  iconProps={{ style: { marginLeft: 8 } }}
                />
              </Flex>
            ) : (
              'N/A'
            )
          }
        />

        <SummaryItem
          label="Outlet type"
          value={
            productCategories.length > 0 ? (
              <ProductCategoriesList
                productCategories={productCategories}
                textPosition="right"
              />
            ) : (
              'N/A'
            )
          }
        />

        <SummaryItem
          label="Status"
          value={
            <Flex align="center">
              <Badge
                type={`${status === 'ACTIVE' ? 'active' : 'inactive'}`}
                size="small"
              >
                {status}
              </Badge>
            </Flex>
          }
        />
        <SummaryItem
          label="Primary products"
          value={renderProducts(primaryProducts)}
        />

        <SummaryItem
          label="Disabled access"
          value={disabledAccess ? 'Yes' : 'No'}
        />

        <SummaryItem label="Email" value={email ?? 'N/A'} />
        <SummaryItem label="Last edited" value={renderLastEdited()} />
      </Box>
    </Box>
  );
};

export default OutletDetailsSummary;