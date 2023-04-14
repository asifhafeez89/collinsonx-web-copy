import React, { ReactNode } from 'react';
import styled from '@emotion/styled';

interface FormWrapperProps {
  children: ReactNode;
}

const FormWrapperDiv = styled.div`
  background: #f5f5f5;
  border-radius: 24px 24px 0px 0px;
  padding: 20px;
  margin-top: 70px;
  position: absolute;
  width: 100%;
  bottom: 0px;
  z-index: 1000;
`;

export default function FormWrapper({ children }: FormWrapperProps) {
  return <FormWrapperDiv>{children}</FormWrapperDiv>;
}
