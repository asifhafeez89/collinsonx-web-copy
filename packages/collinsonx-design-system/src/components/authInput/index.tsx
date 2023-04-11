import AuthCode from 'react-auth-code-input';
import styled from '@emotion/styled';

const CodeWrapper = styled.div`
  input {
    font-weight: 600;
    font-size: 18px;
    width: 48px;
    height: 48px;
    padding: 0;
    font-size: 1rem;
    text-align: center;
    margin-right: 8px;
    text-transform: uppercase;
    border-radius: 8px;
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
        <AuthCode onChange={handleOnChange} placeholder="-" />
      </CodeWrapper>
    </>
  );
}
