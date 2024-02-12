import { Box, Flex } from '../../core';
import Title from '../title';
import styled from '../../styled';
import { ReactNode } from 'react';
import colors from '../../colour-constants-partner';

export interface OverviewCardProps {
  title: string;
  children?: JSX.Element | string;
  icon?: ReactNode;
  'data-testid'?: string;
}

const Container = styled.div`
  border: 1px solid ${colors['grey-border']};
  border-radius: 4px;
  font-weight: 600;
  font-size: 16px;
  color: ${colors['text-grey']};
  background-color: ${colors.white};
`;

type Maybe<T> = T | undefined | null;

export default function OverviewCard({
  title,
  children,
  icon,
  'data-testid': dataTestId,
}: OverviewCardProps) {
  return (
    <Container style={{ minHeight: 267, width: '100%', overflow: 'hidden' }}>
      <Box
        style={{
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
          <Title
            order={2}
            style={{ color: '#25262B' }}
            size={20}
            data-testid={dataTestId}
          >
            {title}
          </Title>
        </Flex>
      </Box>
      <Box style={{ padding: '24px', minHeight: '150px' }}>{children}</Box>
    </Container>
  );
}
