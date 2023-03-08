import { Stack, Text } from '@collinsonx/design-system/core';

export interface OverviewMetricProps {
  label: string;
  value: string | number | JSX.Element;
  children?: JSX.Element;
}
const OverviewMetric = ({ label, value, children }: OverviewMetricProps) => {
  return (
    <Stack spacing={16}>
      <Text color="#9b9ca0" size={16} weight={600}>
        {label}
      </Text>
      <Text color="dark.6" size={32} weight={400}>
        {value}
      </Text>
      {children}
    </Stack>
  );
};

export default OverviewMetric;
