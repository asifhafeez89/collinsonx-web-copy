import colors from '@collinsonx/design-system/colour-constants-partner';
import { Text, SimpleGrid } from '@collinsonx/design-system/core';
import { ReactNode } from 'react';
import classes from './SummaryItem.module.css';

const SummaryItem: React.FC<{ label: string; value: ReactNode | string }> = ({
  label,
  value,
}) => {
  return (
    <SimpleGrid verticalSpacing={16} cols={{ xs: 1, sm: 2 }}>
      <dt className={classes.label}>
        <Text c={colors['text-grey']}>{label}</Text>
      </dt>

      <dd className={classes.value}>
        {typeof value === 'string' ? <Text size="lg">{value}</Text> : value}
      </dd>
    </SimpleGrid>
  );
};

export default SummaryItem;
