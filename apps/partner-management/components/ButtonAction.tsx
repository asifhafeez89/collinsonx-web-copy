import { Button } from '@collinsonx/design-system/core';

interface ButtonActionProps {
  children: JSX.Element | string;
  onClick: () => void;
}

const ButtonAction = ({ children, onClick }: ButtonActionProps) => {
  return (
    <Button
      onClick={onClick}
      sx={{
        fontWeight: 400,
        height: '30px',
        fontSize: '13px',
        borderRadius: '100px',
        backgroundColor: '#000',
        color: '#FFF',
      }}
    >
      {children}
    </Button>
  );
};

export default ButtonAction;
