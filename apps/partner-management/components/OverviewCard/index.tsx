import { Box, Title } from '@collinsonx/design-system/core';
import styled from '@collinsonx/design-system/styled';
import { bookingPageConfig, PageType } from 'config/booking';
import { ReactNode } from 'react';

export interface OverviewCardProps {
  title: string;
  variant: PageType;
  children?: JSX.Element | string;
  icon?: ReactNode;
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
}: OverviewCardProps) => {
  return (
    <Container>
      <Box
        sx={{
          padding: '16px 40px',
          backgroundColor: bookingPageConfig[variant].color,
        }}
      >
        <Title color="#25262B" size={20} w={600}>
          <span style={{ fontSize: '11px', marginRight: '10px' }}>{icon}</span>
          {title}
        </Title>
      </Box>
      <Box sx={{ padding: '32px 40px', minHeight: '150px' }}>{children}</Box>
    </Container>
  );
};

export default OverviewCard;
