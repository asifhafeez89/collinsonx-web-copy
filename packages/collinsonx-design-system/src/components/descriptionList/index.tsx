import { ReactNode } from 'react';
import Group from './Group';
import Term from './Term';
import Description from './Description';
import clsx from 'clsx';
import classes from 'assets/components/descriptionList.module.css';

export interface DescriptionListProps {
  children: ReactNode | ReactNode[];
  'data-testid'?: string;
  className?: string;
}
const DescriptionList = ({
  children,
  'data-testid': dataTestId,
  className,
}: DescriptionListProps) => {
  return (
    <dl
      data-testid={dataTestId}
      className={clsx([classes.listContainer, className])}
    >
      {children}
    </dl>
  );
};

DescriptionList.Group = Group;
DescriptionList.Term = Term;
DescriptionList.Description = Description;

export default DescriptionList;
