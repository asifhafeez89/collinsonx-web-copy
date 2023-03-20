import { Box, Skeleton, Stack, Text } from '@collinsonx/design-system/core';

export interface DetailsKeyValueProps {
  label: string | JSX.Element | JSX.Element[];
  children: JSX.Element | string | number;
  loading?: boolean;
}
const DetailsKeyValue = ({
  label,
  children,
  loading,
}: DetailsKeyValueProps) => {
  return (
    <Stack maw={180} spacing={8}>
      <Text color="#9B9CA0" weight={600} size={16}>
        {label}
      </Text>
      <Skeleton visible={loading}>
        <Text color="dark.6" weight={400}>
          {children}
        </Text>
      </Skeleton>
    </Stack>
  );
};
export default DetailsKeyValue;
