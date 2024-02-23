import {
  Text,
  Flex,
  Box,
  VisuallyHidden,
  Title,
} from '@collinsonx/design-system/core';
import { HelpOutlineIcon } from '@collinsonx/design-system/assets/icons';

import { toTitleCase } from 'utils/textUtils';
import Badge from '@collinsonx/design-system/components/badge/index';
import SummaryItem from './SummaryItem';
import TooltipIcon from '../../components/TooltipIcon';
import { formatDateString } from 'utils/dateUtils';
import outletIcons from 'config/outletIcons';
import ProductCategoriesList from '@collinsonx/design-system/components/outletTypes/index';
import classes from './OutletDetailsSummary.module.css';
import {
  OutletCategory,
  Editor,
  ProductCategory,
  Maybe,
  Status,
  PartnerBrand,
} from '@collinsonx/utils';
import Link from 'next/link';

export interface OutletDetailsSummaryProps {
  locationType: OutletCategory;
  legacyCode?: string;
  code?: string;
  productCategories: Maybe<ProductCategory>[];
  status: Status;
  primaryProductNames: string[];
  ancillaryProductNames: string[];
  disabledAccess: boolean;
  email?: string;
  partnerBrand?: PartnerBrand;
  lastEditedDate?: string;
  editor?: Editor;
}

const OutletDetailsSummary = ({
  locationType,
  legacyCode,
  code: outletCode,
  partnerBrand,
  productCategories: categories,
  status,
  primaryProductNames,
  ancillaryProductNames,
  disabledAccess,
  email,
  lastEditedDate,
  editor,
}: OutletDetailsSummaryProps) => {
  const renderProducts = (products: string[]) => {
    return products?.length > 0 ? (
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

  const productCategories = categories
    .filter((category): category is ProductCategory => category !== null)
    .map((category) => {
      const Icon = outletIcons[category];
      return {
        label: category,
        IconComponent: <Icon width={24} height={24} aria-hidden={true} />,
      };
    });

  return (
    <Box data-testid="outlet-summary-section">
      <VisuallyHidden>
        <Title order={2}>Summary</Title>
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
                  tooltipText="This is a short unique code for referencing this outlet."
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
          label="Categories"
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
              <Badge type={status} size="large">
                {status}
              </Badge>
            </Flex>
          }
        />
        <SummaryItem
          label="Primary products"
          value={renderProducts(primaryProductNames)}
        />

        <SummaryItem
          label="Ancillary products"
          value={renderProducts(ancillaryProductNames)}
        />

        <SummaryItem
          label="Disabled access"
          value={disabledAccess ? 'Yes' : 'No'}
        />

        <SummaryItem
          label="Partner"
          value={
            partnerBrand?.name ? (
              <Link
                className={classes.partnerName}
                href={`/outlets?partner=${partnerBrand.id}`}
              >
                {partnerBrand.name}
              </Link>
            ) : (
              'N/A'
            )
          }
        />

        <SummaryItem label="Email" value={email ?? 'N/A'} />
        <SummaryItem label="Last edited" value={renderLastEdited()} />
      </Box>
    </Box>
  );
};

export default OutletDetailsSummary;
