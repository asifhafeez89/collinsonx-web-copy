import { ReactNode } from 'react';
import classes from 'assets/components/descriptionList.module.css';
export interface TermProps {
  children: ReactNode;
  'data-testid'?: string;
}

const Term = ({ children, 'data-testid': dataTestId }: TermProps) => (
  <dt className={classes.label} data-testid={dataTestId}>
    {children}
  </dt>
);

export default Term;
