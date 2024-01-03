import { Box, Flex, Title } from '@collinsonx/design-system/core';
import styled from '@collinsonx/design-system/styled';
import { bookingPageConfig, PageType } from 'config/booking';
import { ReactNode } from 'react';
import classes from './OverviewCard.module.css';

export interface OverviewCardProps {
  title: string;
  variant: PageType | 'qrcodewalkup';
  children?: JSX.Element | string;
  icon?: ReactNode;
  datatestid?: string;
}

const Container = styled.div`
  border: 1px solid #e9e9e9;
  border-radius: 4px;
  font-weight: 600;
  font-size: 16px;
  color: #9b9ca0;
`;

const OverviewCard = ({
  title,
  variant,
  children,
  icon,
  datatestid,
}: OverviewCardProps) => {
  return (
    <Container style={{ minHeight: 267 }}>
      <Box
        className={classes.container}
        style={{
          backgroundColor: bookingPageConfig[variant].color,
        }}
      >
        <Flex gap={8} align="center">
          {icon ? (
            <Box w={24} h={24}>
              {icon}
            </Box>
          ) : null}
          <Title className={classes.title} data-testid={datatestid}>
            {title}
          </Title>
        </Flex>
      </Box>
      <Box className={classes.childrenContainer}>{children}</Box>
    </Container>
  );
};

export default OverviewCard;
