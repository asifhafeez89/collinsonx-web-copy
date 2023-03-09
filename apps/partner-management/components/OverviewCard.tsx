import { Box, Title } from '@collinsonx/design-system/core';
import styled from '@collinsonx/design-system/styled';

type Variant = 'warning' | 'success' | 'danger';

export interface OverviewCardProps {
  title: string;
  variant: Variant;
  children?: JSX.Element | string;
}

const Container = styled.div`
  border: 1px solid #e9e9e9;
  border-radius: 4px;
  font-weight: 600;
  font-size: 16px;
  color: #9b9ca0;
`;

const colorMap: Record<Variant, string> = {
  warning: '#FFF3BF',
  success: '#E9FAC8',
  danger: '#FFE3E3',
};

const OverviewCard = ({ title, variant, children }: OverviewCardProps) => {
  return (
    <Container>
      <Box
        sx={{
          padding: '16px 40px',
          backgroundColor: colorMap[variant],
        }}
      >
        <Title color="#25262B" size={20} w={600}>
          {title}
        </Title>
      </Box>
      <Box sx={{ padding: '32px 40px' }}>{children}</Box>
    </Container>
  );
};

export default OverviewCard;
