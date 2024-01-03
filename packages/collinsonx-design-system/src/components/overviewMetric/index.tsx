import { Flex, Skeleton, Stack, Text } from '../../core';

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
    <Skeleton visible={loading}>
      <Flex direction="column">
        <Text
          color="dark.6"
          size="xxl"
          style={{ fontWeight: 600 }}
          data-testid={dataTestId}
        >
          {value}
        </Text>
        <Text mb="lg" color="#9b9ca0" size="md">
          {label}
        </Text>
        {children}
      </Flex>
    </Skeleton>
  );
}
