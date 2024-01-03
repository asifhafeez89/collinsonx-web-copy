import { Stack, Text, SimpleGrid } from '@collinsonx/design-system/core';
import classes from './DetailsSection.module.css';
export interface DetailsSectionProps {
  label: string;
  children: JSX.Element | JSX.Element[];
}
const DetailsSection = ({ label, children }: DetailsSectionProps) => {
  return (
    <Stack gap={16}>
      <Text className={classes.label}>{label}</Text>
      <SimpleGrid cols={3}>{children}</SimpleGrid>
    </Stack>
  );
};

export default DetailsSection;
