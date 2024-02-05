import { PropsWithChildren, useState } from 'react';
import { Box, Text, Button, Flex } from '@collinsonx/design-system/core';

import classes from './EditableArea.module.css';
import Title from '@collinsonx/design-system/components/title/index';

export interface EditableAreaProps extends PropsWithChildren {
  title: string;
  subtitle?: string;
  dataTestId?: string;
}

export type Mode = 'view' | 'edit';

const EditableArea = ({
  title,
  subtitle,
  dataTestId,
  children,
}: EditableAreaProps) => {
  const [mode, setMode] = useState<Mode>('view');
  return (
    <Flex
      data-testid={dataTestId}
      direction="column"
      className={classes.container}
    >
      <Box className={classes.header}>
        <Title order={2}>{title}</Title>
        {mode === 'view' && <Button variant="outline">Edit</Button>}
      </Box>
      {subtitle && <Text className={classes.subtitle}>{subtitle}</Text>}
      <Box pt={24}>{children}</Box>
    </Flex>
  );
};

export default EditableArea;
