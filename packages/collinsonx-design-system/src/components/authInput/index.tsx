import React, { useState } from 'react';
import AuthCode from 'react-auth-code-input';
import styled from '@collinsonx/utils/styled';

const CodeWrapper = styled.div`
  input {
    width: 45px;
    height: 45px;
    padding: 0;
    font-size: 1rem;
    text-align: center;
    margin-right: 10px;
    text-transform: uppercase;
    color: #494949;
    border: 1px solid #d6d6d6;
    background: #fff;
    background-clip: padding-box;
  }

  input:last-child {
    margin-right: 0px;
  }
`;

interface AuthInputProps {
  handleCodeChange: (code: string) => void;
}

export default function AuthInput({ handleCodeChange }: AuthInputProps) {
  const handleOnChange = (res: string) => {
    handleCodeChange(res);
  };

  return (
    <>
      <CodeWrapper>
        <AuthCode onChange={handleOnChange} />
      </CodeWrapper>
    </>
  );
}
