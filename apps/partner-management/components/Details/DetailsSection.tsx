import { Flex, Stack, Text } from '@collinsonx/design-system/core';
import { SimpleGrid } from '@mantine/core';
export interface DetailsSectionProps {
  label: string;
  children: JSX.Element | JSX.Element[];
}
const DetailsSection = ({ label, children }: DetailsSectionProps) => {
  return (
    <Stack spacing={16}>
      <Text color="dark.6" weight={600} size={20}>
        {label}
      </Text>
      <SimpleGrid cols={3}>{children}</SimpleGrid>
    </Stack>
  );
};

export default DetailsSection;
