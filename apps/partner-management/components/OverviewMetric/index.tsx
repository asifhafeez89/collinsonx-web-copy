import { Skeleton, Stack, Text } from '@collinsonx/design-system/core';

export interface OverviewMetricProps {
  label: string;
  value: string | number | JSX.Element;
  children?: JSX.Element;
  loading?: boolean;
  showMetric?: boolean;
}
const OverviewMetric = ({
  label,
  value,
  children,
  loading,
  showMetric = false,
}: OverviewMetricProps) => {
  return (
    <Skeleton visible={loading}>
      <Stack spacing={16}>
        <Text color="#9b9ca0" size={16} weight={600}>
          {label}
        </Text>
        {showMetric && (
          <Text color="dark.6" size={32} weight={400}>
            {value}
          </Text>
        )}
        {children}
      </Stack>
    </Skeleton>
  );
};

export default OverviewMetric;
