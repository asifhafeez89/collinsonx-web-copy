import { Flex, Skeleton, Text } from '@mantine/core';
import classes from 'assets/components/overviewMetric.module.css';

export interface OverviewMetricProps {
  label: string;
  value: string | number | JSX.Element;
  children?: JSX.Element;
  loading?: boolean;
  'data-testid'?: string;
}

export default function OverviewMetric({
  label,
  value,
  children,
  loading,
  'data-testid': dataTestId,
}: OverviewMetricProps) {
  return (
    <Skeleton visible={loading} w="fit-content">
      <Flex direction="column" gap={24}>
        <Flex direction="column" p={8}>
          <Text className={classes.value} size="xxl" data-testid={dataTestId}>
            {value}
          </Text>
          <Text className={classes.label} size="md">
            {label}
          </Text>
        </Flex>
        {children}
      </Flex>
    </Skeleton>
  );
}
