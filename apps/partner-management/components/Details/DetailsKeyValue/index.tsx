import { Box, Skeleton, Stack, Text } from '@collinsonx/design-system/core';
import classes from './DetailsKeyValue.module.css';

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
    <Stack maw={180} gap={8}>
      <Text className={classes.label}>{label}</Text>
      <Skeleton visible={loading}>
        <Text className={classes.content}>{children}</Text>
      </Skeleton>
    </Stack>
  );
};
export default DetailsKeyValue;
