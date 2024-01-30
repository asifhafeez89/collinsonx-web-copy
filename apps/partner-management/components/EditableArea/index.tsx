import { PropsWithChildren, useState } from 'react';
import {
  Box,
  Text,
  Button,
  Stack,
  Flex,
  Center,
} from '@collinsonx/design-system/core';

import classes from './EditableArea.module.css';
import Title from '@collinsonx/design-system/components/title';

export interface EditableAreaProps extends PropsWithChildren {
  title: string;
  subtitle?: string;
}

export type Mode = 'view' | 'edit';

const EditableArea = ({ title, subtitle, children }: EditableAreaProps) => {
  const [mode, setMode] = useState<Mode>('view');
  return (
    <Flex direction="column" className={classes.container}>
      <Box className={classes.header}>
        <Title order={2}>{title}</Title>
        {mode === 'view' && <Button variant="outline">Edit</Button>}
      </Box>
      <Stack gap={24}>
        {subtitle && <Text className={classes.subtitle}>{subtitle}</Text>}
        {children}
      </Stack>
    </Flex>
  );
};

export default EditableArea;
