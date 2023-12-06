import { Box, Flex, Title } from '../../core';
import styled from '../../styled';
import { ReactNode } from 'react';

export interface OverviewCardProps {
  title: string;
  children?: JSX.Element | string;
  icon?: ReactNode;
  'data-testid'?: string;
}

const Container = styled.div`
  border: 1px solid #d5d5d5;
  border-radius: 4px;
  font-weight: 600;
  font-size: 16px;
  color: #9b9ca0;
  background-color: #ffffff;
`;

type Maybe<T> = T | undefined | null;

export default function OverviewCard({
  title,
  children,
  icon,
  'data-testid': dataTestId,
}: OverviewCardProps) {
  return (
    <Container style={{ minHeight: 267, width: '100%' }}>
      <Box
        sx={{
          padding: '16px 32px',
          backgroundColor: '#6d4bf633',
        }}
      >
        <Flex gap={8} align="center">
          {icon ? (
            <Box w={32} h={32}>
              {icon}
            </Box>
          ) : null}
          <Title order={2} color="#25262B" size={20} data-testid={dataTestId}>
            {title}
          </Title>
        </Flex>
      </Box>
      <Box sx={{ padding: '32px', minHeight: '150px' }}>{children}</Box>
    </Container>
  );
}
