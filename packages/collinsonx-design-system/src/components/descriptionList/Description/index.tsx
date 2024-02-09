import { ReactNode } from 'react';
import classes from 'assets/components/descriptionList.module.css';

export interface DescriptionProps {
  children: ReactNode;
  'data-testid'?: string;
}

const Description = ({
  children,
  'data-testid': dataTestId,
}: DescriptionProps) => (
  <dd data-testid={dataTestId} className={classes.description}>
    {children}
  </dd>
);

export default Description;
