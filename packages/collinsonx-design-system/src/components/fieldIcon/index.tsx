import {
  Box,
  BoxProps,
  Text,
  TextProps,
  createPolymorphicComponent,
} from '@mantine/core';
import styled from '@emotion/styled';

import { ReactNode } from 'react';
import colors from '../../colour-constants-partner';

export interface FieldIconProps {
  children: ReactNode;
  text: string;
  textPosition: 'bottom' | 'right';
}

const shouldForwardProp = (prop: string) => prop !== 'textPosition';
const _StyledBox = styled(Box, {
  shouldForwardProp,
})`
  display: flex;
  align-items: center;
  width: fit-content;
  ${({ textPosition }: FieldIconProps) => `
    ${
      textPosition === 'right'
        ? ` 
       flex-direction: row;
       font-size: 14px;
       gap: 8px;
      `
        : `
       flex-direction: column;
       font-size: 12px;
       gap: 4px;
      `
    }
  `}
`;

// context https://v5.mantine.dev/styles/styled/#polymorphic-components
const StyledBox = createPolymorphicComponent<'div', BoxProps | FieldIconProps>(
  _StyledBox
);

const _StyledText = styled(Text, { shouldForwardProp })`
  color: ${colors['partner-text-default']};
  ${({ textPosition }: FieldIconProps) => `
    text-transform: ${textPosition === 'right' ? 'uppercase' : 'capitalize'}
  `}
`;

const StyledText = createPolymorphicComponent<
  'span',
  TextProps | FieldIconProps
>(_StyledText);

function FieldIcon({ children, text, textPosition }: FieldIconProps) {
  return (
    <StyledBox textPosition={textPosition}>
      {children}
      <StyledText textPosition={textPosition}>{text}</StyledText>
    </StyledBox>
  );
}

export default FieldIcon;
