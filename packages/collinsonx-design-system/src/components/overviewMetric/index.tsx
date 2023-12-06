import { Skeleton, Stack, Text } from '../../core';

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
      <Stack spacing="0">
        <Text color="dark.6" size={32} weight={600} data-testid={dataTestId}>
          {value}
        </Text>
        <Text mb="lg" color="#9b9ca0" size={16} weight={400}>
          {label}
        </Text>
        {children}
      </Stack>
    </Skeleton>
  );
}
