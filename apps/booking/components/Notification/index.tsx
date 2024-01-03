import { Box, Flex, Text } from '@collinsonx/design-system/core';
import { AlertIcon } from '@collinsonx/design-system/assets/icons';
import { ReactNode } from 'react';

import classes from './Notification.module.css';

interface NotificationProps {
  children: ReactNode;
}

function Notification({ children }: NotificationProps) {
  return (
    <Box p={16} className={classes.container}>
      <Flex direction="row" justify="flex-start" gap="4px">
        <Box className={classes.iconContainer}>
          <AlertIcon style={{ width: 24, height: 24 }} />
        </Box>

        <Text fw={400} className={classes.text}>
          {children}
        </Text>
      </Flex>
    </Box>
  );
}

export default Notification;
