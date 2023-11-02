import { Box, BoxProps, createPolymorphicComponent } from '@mantine/core';
import { ReactNode } from 'react';
import colors from '../../colour-constants-partner';
import styled from '@emotion/styled';

export interface BadgeProps {
  type: 'active' | 'draft' | 'review' | 'denied' | 'inactive';
  size: 'large' | 'small';
  children?: ReactNode;
}

const badgesColors = {
  active: { bg: colors['bg-green'], text: colors['green'] },
  draft: { bg: colors['bg-orange'], text: colors['orange'] },
  review: { bg: colors['bg-blue'], text: colors['blue'] },
  denied: { bg: colors['bg-red'], text: colors['red'] },
  inactive: {
    bg: colors['partner-bg-surface-dark'],
    text: colors['partner-text-grey'],
  },
};

const sizeCss = {
  large: `
    font-size: 14px;
    padding: 4px 10px 4px 10px;
  `,
  small: `
    font-size: 12px;
    padding: 2px 10px 2px 10px;
  `,
};

const _StyledBox = styled(Box)`
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

function Badge(props: BadgeProps) {
  const { type, children } = props;
  return (
    <StyledBox aria-label={`badge-${type}`} {...props}>
      {children ? children : type}
    </StyledBox>
  );
}

export default Badge;
