import { Text, Stack, Flex, Divider, List } from '@mantine/core';
import colors from '../../colour-constants-partner';
import Rating, { RatingProps } from '../rating/index';
import Badge from '../badge';
import FieldIcon from '../fieldIcon';
import { BadgeProps } from '../badge';
import { ReactNode } from 'react';
import Card from '../card';
import CardList from '../card/cardList';
import CardField from '../card/cardField';
import CardTitle from '../card/cardTitle';

export enum Status {
  'Active' = 'active',
  'Inactive' = 'inactive',
}

export interface WorkflowStage {
  type: BadgeProps['type'];
  label: string;
}

export interface CardOutletProps {
  onClick?: () => void;
  title: string | ReactNode;
  locationName?: string;
  terminal?: string;
  imageUrl?: string;
  legacyCode?: string;
  width?: string;
  status: Status;
  lastEdit?: string;
  rating?: RatingProps;
  imageCount?: number;
  workflowStage?: WorkflowStage;
  productCategories: Array<{
    label: string;
    IconComponent: any;
  }>;
  children?: ReactNode;
  'data-testid'?: string;
  imageAlt?: string;
}

function CardOutlet({
  legacyCode,
  status,
  title,
  children,
  locationName,
  terminal,
  lastEdit,
  rating,
  imageCount,
  imageUrl,
  width,
  workflowStage,
  onClick = () => {},
  productCategories = [],
  'data-testid': dataTestId,
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
    >
      <Stack spacing={24}>
        <Stack spacing={6}>
          <Flex gap={6} align="baseline">
            {typeof title !== 'string' ? title : <CardTitle>{title}</CardTitle>}
            {legacyCode && (
              <Text
                size={16}
                color={colors['partner-text-grey']}
                sx={{ lineHeight: '20.24px' }}
              >
                {legacyCode}
              </Text>
            )}
          </Flex>
          {locationName && (
            <Text weight={400} size={16} color={colors['partner-text-grey']}>
              {locationName}
              {terminal && ', ' + terminal}
            </Text>
          )}
          {rating && <Rating {...rating} />}
        </Stack>

        <Divider color={colors['partner-grey-border']} />

        <Stack spacing={24}>
          <Flex direction="row" gap={45}>
            {workflowStage && (
              <CardField label="Workflow stage">
                <Badge type={workflowStage.type} size="small">
                  {workflowStage.label}
                </Badge>
              </CardField>
            )}
            {status === Status.Inactive && (
              <CardField label="Outlet status">
                <Badge type={status} size="small">
                  {status}
                </Badge>
              </CardField>
            )}
          </Flex>
          <Flex gap={24} wrap="wrap" sx={{ rowGap: 10 }}>
            <CardList listStyleType="none" aria-label="Experiences">
              {productCategories.map(({ label, IconComponent }, index) => (
                <List.Item key={index}>
                  <FieldIcon text={label} textPosition="bottom">
                    {IconComponent}
                  </FieldIcon>
                </List.Item>
              ))}
            </CardList>
            {lastEdit && (
              <CardField label="Last edited">
                <Text color={colors['partner-text-default']} size={14}>
                  {lastEdit}
                </Text>
              </CardField>
            )}
          </Flex>
        </Stack>
        {children && (
          <>
            <Divider color={colors['partner-grey-border']} />
            {children}
          </>
        )}
      </Stack>
    </Card>
  );
}

export default CardOutlet;
