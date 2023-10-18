import React from 'react';
import styled from '../../styled';

export interface HeadingProps extends React.HTMLAttributes<HTMLElement> {
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'legend';
  children: React.ReactNode;
  subtitle?: String;
  subtitleColor?: string;
  padding: number;
  margin: number;
  lineHeight?: number;
}

const HeadingContainer = styled.div`
  position: relative;
  display: block;
  color: ${(props) => props.color};
`;

const Subtitle = styled.div`
  position: absolute;
  top: 14px;
  font-size: 10px;
  color: ${(props) => props.color};
`;

export const Heading: React.FC<HeadingProps> = ({
  as,
  children,
  subtitle,
  subtitleColor,
  color,
  margin,
  padding,
  lineHeight,
}: HeadingProps) => {
  const HeadingElement = as;
  return (
    <HeadingContainer color={color ?? '#000000'}>
      {subtitle && (
        <Subtitle color={subtitleColor ?? '#000000'}>{subtitle}</Subtitle>
      )}
      <HeadingElement
        style={{
          padding: padding,
          margin: margin,
          lineHeight: lineHeight,
        }}
      >
        {children}
      </HeadingElement>
    </HeadingContainer>
  );
};

export default Heading;
