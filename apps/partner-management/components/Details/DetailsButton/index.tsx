import cx from 'clsx';
import { Button, ButtonProps } from '@collinsonx/design-system/core';

export interface DetailsButtonProps extends Omit<ButtonProps, 'variant'> {
  variant: 'success' | 'danger';
  onClick?: () => void;
  datatestid?: string;
}
const DetailsButton = ({
  variant,
  datatestid,
  ...props
}: DetailsButtonProps) => {
  return (
    <Button
      style={({ colors }) => {
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
      data-testid={datatestid}
    />
  );
};

export default DetailsButton;
