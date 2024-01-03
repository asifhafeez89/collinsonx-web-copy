import { Skeleton, Stack, Text } from '@collinsonx/design-system/core';
import classes from './OverviewMetric.module.css';

export interface OverviewMetricProps {
  label: string;
  value: string | number | JSX.Element;
  children?: JSX.Element;
  loading?: boolean;
  datatestid?: string;
}
const OverviewMetric = ({
  label,
  value,
  children,
  loading,
  datatestid,
}: OverviewMetricProps) => {
  return (
    <Skeleton visible={loading}>
      <Stack gap={16}>
        <Text className={classes.label} size="sm">
          {label}
        </Text>
        <Text className={classes.value} size="lg" data-testid={datatestid}>
          {value}
        </Text>
        {children}
      </Stack>
    </Skeleton>
  );
};

export default OverviewMetric;
