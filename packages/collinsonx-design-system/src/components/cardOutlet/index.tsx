import { Text, Stack, Flex, Divider } from '@mantine/core';
import { Status } from '@collinsonx/utils';
import colors from '../../colour-constants-partner';
import Rating, { RatingProps } from '../rating/index';
import Badge from '../badge';
import { BadgeProps } from '../badge';
import { ReactNode } from 'react';
import Card from '../card';
import CardField from '../card/cardField';
import CardTitle from '../card/cardTitle';
import ProductCategoriesList from '../outletTypes';

export interface WorkflowStage {
  type: BadgeProps['type'];
  label: string;
}

export interface CardOutletProps {
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  title: string | ReactNode;
  parentSection?: string | ReactNode;
  locationName?: string;
  terminal?: string;
  imageUrl?: string;
  legacyCode?: string;
  width?: string;
  status: Status;
  lastEdit?: string;
  rating?: RatingProps;
  imageCount?: number;
  productCategories: Array<{
    label: string;
    IconComponent: any;
  }>;
  children?: ReactNode;
  'data-testid'?: string;
  index?: number;
  imageAlt?: string;
}

function CardOutlet({
  legacyCode,
  status,
  parentSection,
  title,
  children,
  locationName,
  terminal,
  lastEdit,
  rating,
  imageCount,
  imageUrl,
  width,
  onClick = () => {},
  onMouseEnter = () => {},
  onMouseLeave = () => {},
  productCategories = [],
  'data-testid': dataTestId,
  index,
  imageAlt,
}: CardOutletProps) {
  return (
    <Card
      data-testid={dataTestId}
      imageUrl={imageUrl}
      imageCount={imageCount}
      status={status}
      width={width}
      imageAlt={imageAlt}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Stack gap={24}>
        <Stack gap={6}>
          <Flex gap={6} direction="column">
            {parentSection}
            <Flex w="100%" align="baseline" gap={6}>
              {typeof title !== 'string' ? (
                title
              ) : (
                <CardTitle>{title}</CardTitle>
              )}
              {legacyCode && (
                <Text
                  size="md"
                  color={colors['text-grey']}
                  style={{ lineHeight: '20.24px' }}
                >
                  {legacyCode}
                </Text>
              )}
            </Flex>
          </Flex>
          {locationName && (
            <Text
              data-testid={'outlet-card-subtitle'}
              size="md"
              style={{ color: colors['text-grey'], fontWeight: 600 }}
            >
              {locationName}
              {terminal && ', ' + terminal}
            </Text>
          )}
          {rating && <Rating {...rating} />}
        </Stack>

        <Divider color={colors['grey-border']} />

        <Stack gap={24}>
          <Flex direction="row" gap={45}>
            <CardField label="Status">
              <Badge type={status} size="small">
                {status}
              </Badge>
            </CardField>
          </Flex>
          <Flex gap={24} wrap="wrap" style={{ rowGap: 10 }}>
            <ProductCategoriesList productCategories={productCategories} />
            {lastEdit && (
              <CardField label="Last edited">
                <Text c={colors['text-default']} size="sm">
                  {lastEdit}
                </Text>
              </CardField>
            )}
          </Flex>
        </Stack>
        {children && (
          <>
            <Divider color={colors['grey-border']} />
            {children}
          </>
        )}
      </Stack>
    </Card>
  );
}

export default CardOutlet;
