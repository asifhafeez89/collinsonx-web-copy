import styled from '@emotion/styled';
import {
  Text,
  Box,
  Stack,
  BoxProps,
  createPolymorphicComponent,
  Flex,
  Divider,
  List,
} from '@mantine/core';
import colors from '../../colour-constants-partner';
import Rating, { RatingProps } from '../rating/index';
import Badge from '../badge';
import FieldIcon from '../fieldIcon';
import CardImage from './cardImage';
import CardField from './cardField';
import { BadgeProps } from '../badge';
import { ReactNode } from 'react';

export enum Status {
  'Active' = 'active',
  'Inactive' = 'inactive',
}

export interface WorkflowStage {
  type: BadgeProps['type'];
  label: string;
}

export interface TitleRendererProps {
  children: ReactNode;
}

export type TitleRenderer = (props: TitleRendererProps) => JSX.Element;

export interface CardOutletProps {
  onClick?: () => void;
  title: string;
  TitleRenderer?: TitleRenderer;
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
}

const StyledList = styled(List)`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const _StyledCard = styled(Box)`
  position: relative;
  ${({ width }: CardOutletProps) => (width ? 'width: ' + width + ';' : '')}
  min-width: 350px;
  cursor: pointer;
  overflow: hidden;
  border: 1px solid ${colors['partner-grey-border']};
  background-color: #fff;
  border-radius: 8px;
  margin-bottom: auto;
  &:hover {
    box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.25);
    transition: all 0.3s ease-in-out;
    border: 1px solid ${colors['partner-text-grey']};
    & > .outlet-image {
      background-size: 105%;
    }
  }
`;

const StyledCard = createPolymorphicComponent<
  'div',
  BoxProps | CardOutletProps
>(_StyledCard);

function OutletCardTitle({ children }: { children: ReactNode }) {
  return (
    <Text
      component="h2"
      my={0}
      weight={600}
      size={20}
      color={colors['partner-text-default']}
      sx={{ lineHeight: '25.3px' }}
    >
      {children}
    </Text>
  );
}

function CardOutlet({
  legacyCode,
  status,
  title,
  TitleRenderer,
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
}: CardOutletProps) {
  return (
    <StyledCard p={0} width={width} onClick={onClick}>
      <CardImage src={imageUrl} status={status} imageCount={imageCount} />
      <Box p={24} sx={{ width: '100%' }}>
        <Stack spacing={24}>
          <Stack spacing={6}>
            <Flex gap={6} align="baseline">
              {TitleRenderer !== undefined ? (
                <TitleRenderer>
                  <OutletCardTitle>{title}</OutletCardTitle>
                </TitleRenderer>
              ) : (
                <OutletCardTitle>{title}</OutletCardTitle>
              )}
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
              <StyledList listStyleType="none">
                {productCategories.map(({ label, IconComponent }, index) => (
                  <List.Item key={index}>
                    <FieldIcon text={label} textPosition="bottom">
                      {IconComponent}
                    </FieldIcon>
                  </List.Item>
                ))}
              </StyledList>
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
      </Box>
    </StyledCard>
  );
}

export default CardOutlet;
