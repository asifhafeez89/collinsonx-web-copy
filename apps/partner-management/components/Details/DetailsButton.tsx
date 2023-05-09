import { Button, ButtonProps } from '@collinsonx/design-system/core';

export interface DetailsButtonProps extends Omit<ButtonProps, 'variant'> {
  variant: 'success' | 'danger';
  onClick?: () => void;
}
const DetailsButton = ({ variant, ...props }: DetailsButtonProps) => {
  return (
    <Button
      sx={({ colors }) => {
        const mainColor = variant === 'success' ? colors.green : colors.red;
        return {
          color: colors.dark[6],
          border: `2px solid ${mainColor[7]}`,
          backgroundColor: mainColor[1],
          ':hover': {
            backgroundColor: mainColor[1],
          },
        };
      }}
      variant="default"
      {...props}
    />
  );
};

export default DetailsButton;
