import React, { ReactNode } from 'react';
import styled from '@emotion/styled';

interface ResultsContainerProps {
  children: ReactNode;
}

const ResultsContainerDiv = styled.div`
  background: #f5f5f5;
  padding: 20px;
  width: 100%;
  z-index: 1000;
`;

export default function ResultsContainer({ children }: ResultsContainerProps) {
  return <ResultsContainerDiv>{children}</ResultsContainerDiv>;
}
