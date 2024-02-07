import { Box, BoxProps, createPolymorphicComponent } from '@mantine/core';
import { ReactNode } from 'react';
import colors from '../../colour-constants-partner';
import styled from '@emotion/styled';
import { Status } from '@collinsonx/utils';

export interface BadgeProps {
  type: Status;
  size: 'large' | 'small';
  children?: ReactNode;
}

const badgesColors = {
  [Status.Active]: {
    bg: colors['bg-green'],
    text: colors['accent-green'],
  },
  [Status.Inactive]: {
    bg: colors['bg-surface-dark'],
    text: colors['text-grey'],
  },
  [Status.StopSale]: {
    bg: colors['white'],
    text: colors['text-grey'],
  },
};

const sizeCss = {
  large: `
    font-size: 14px;
    padding: 4px 10px 4px 10px;
  `,
  small: `
    font-size: 12px;
    height: 19px;
    padding: 2px 10px 2px 10px;
  `,
};

const _StyledBox = styled(Box)`
  display: flex;
  align-items: center;
  border-radius: 8px;
  text-transform: uppercase;
  font-weight: 600;
  width: fit-content;
  ${({ type, size }: BadgeProps) => `
    ${sizeCss[size]}
    background-color: ${badgesColors[type].bg};
    color: ${badgesColors[type].text};
  `}
`;

// context https://v5.mantine.dev/styles/styled/#polymorphic-components
const StyledBox = createPolymorphicComponent<'div', BoxProps | BadgeProps>(
  _StyledBox
);

const Badge = (props: BadgeProps) => {
  const { type, children } = props;
  return <StyledBox {...props}>{children ? children : type}</StyledBox>;
};

export default Badge;
