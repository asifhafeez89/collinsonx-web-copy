import React, { ReactNode } from 'react';
import styled from '@emotion/styled';

interface FormWrapperProps {
  children: ReactNode;
}

const FormWrapperDiv = styled.div`
  background: #f5f5f5;
  border-radius: 24px 24px 0px 0px;
  padding: 20px;
  margin-top: 50px;
  border: 1px solid black;
  height: 100%;
`;

export default function FormWrapper({ children }: FormWrapperProps) {
  return <FormWrapperDiv>{children}</FormWrapperDiv>;
}
