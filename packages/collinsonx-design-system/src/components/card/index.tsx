import styled from '@emotion/styled';
import { Box, BoxProps, createPolymorphicComponent } from '@mantine/core';
import colors from '../../colour-constants-partner';
import CardImage from './cardImage';
import { ReactNode } from 'react';

export enum Status {
  'Active' = 'active',
  'Inactive' = 'inactive',
}

export interface CardProps {
  onClick?: () => void;
  imageUrl?: string;
  status: Status;
  width?: string;
  imageCount?: number;
  imageAlt?: string;
  children?: ReactNode;
  hasImagePadding?: boolean;
  'data-testid'?: string;
}

const _StyledCard = styled(Box)`
  position: relative;
  ${({ width }: CardProps) => (width ? 'width: ' + width + ';' : '')}
  min-width: 350px;
  cursor: pointer;
  overflow: hidden;
  border: 1px solid ${colors['grey-border']};
  background-color: #fff;
  border-radius: 8px;
  margin-bottom: auto;
  &:hover {
    box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.25);
    transition: all 0.3s ease-in-out;
    border: 1px solid ${colors['text-grey']};
    & > .card-image {
      background-size: 105%;
    }
  }
`;

const StyledCard = createPolymorphicComponent<'div', BoxProps | CardProps>(
  _StyledCard
);

function Card({
  status = Status.Active,
  children,
  imageCount,
  imageUrl,
  hasImagePadding,
  width,
  imageAlt,
  'data-testid': dataTestId,
  onClick = () => {},
}: CardProps) {
  return (
    <StyledCard p={0} width={width} onClick={onClick} data-testid={dataTestId}>
      <CardImage
        src={imageUrl}
        hasPadding={hasImagePadding}
        status={status}
        imageCount={imageCount}
        alt={imageAlt}
      />
      <Box p={24} sx={{ width: '100%' }}>
        {children}
      </Box>
    </StyledCard>
  );
}

export default Card;
