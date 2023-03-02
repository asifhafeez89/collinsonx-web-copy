import React from 'react';
import styled from '@emotion/styled';

interface FieldLabelProps {
  handleClick: () => void;
  title: string;
  value: string;
}

/**
 * Primary UI component for user interaction
 */
export default function FieldLabel({
  title,
  value,
  handleClick,
}: FieldLabelProps) {
  const Wrapper = styled.div`
    border-radius: 10px;
    border: 1px solid #e9ecef;
    padding: 20px;
    margin-bottom: 10px;
  `;

  return (
    <Wrapper onClick={handleClick}>
      <h3>{title}</h3>
      <p>{value}</p>
    </Wrapper>
  );
}
