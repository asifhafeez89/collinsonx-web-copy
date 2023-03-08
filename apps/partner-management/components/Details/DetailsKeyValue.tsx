import { Box, Stack, Text } from '@collinsonx/design-system/core';

export interface DetailsKeyValueProps {
  label: string | JSX.Element | JSX.Element[];
  children: JSX.Element | string | number;
}
const DetailsKeyValue = ({ label, children }: DetailsKeyValueProps) => {
  return (
    <Stack maw={180} spacing={8}>
      <Text color="#9B9CA0" weight={600} size={16}>
        {label}
      </Text>
      <Text color="dark.6" weight={400}>
        {children}
      </Text>
    </Stack>
  );
};
export default DetailsKeyValue;
