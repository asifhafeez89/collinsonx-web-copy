import React from 'react';
import styled from '../../styled';

export interface HeadingProps extends React.HTMLAttributes<HTMLElement> {
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'legend';
  children: React.ReactNode;
  subtitle?: String;
  subtitleColor?: string;
}

const HeadingContainer = styled.div`
  position: relative;
  display: block;
`;

const Subtitle = styled.div`
  position: absolute;
  top: 10px;
  color: ${(props) => props.color};
`;

export const Heading: React.FC<HeadingProps> = ({
  as,
  children,
  subtitle,
  subtitleColor,
}: HeadingProps) => {
  const HeadingElement = as;
  return (
    <HeadingContainer>
      {subtitle && (
        <Subtitle color={subtitleColor ?? '#000000'}>{subtitle}</Subtitle>
      )}
      <HeadingElement>{children}</HeadingElement>
    </HeadingContainer>
  );
};

export default Heading;
