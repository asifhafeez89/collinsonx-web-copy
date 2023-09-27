import { Box, Flex, Text } from '@collinsonx/design-system/core';
import { AlertIcon } from '@collinsonx/design-system/assets/icons';
import { ReactNode } from 'react';

interface NotificationProps {
  children: ReactNode;
}

function Notification({ children }: NotificationProps) {
  return (
    <Box
      p={16}
      style={{
        backgroundColor: 'rgba(212, 42, 84, 0.1)',
        border: '2px solid #D42A54',
        borderRadius: 8,
      }}
    >
      <Flex
        direction="row"
        justify="flex-start"
        gap="4px"
        style={{ height: '100%' }}
      >
        <Box
          sx={{
            '@media (max-width: 768px)': {
              paddingTop: '0.2rem',
            },
          }}
        >
          <AlertIcon style={{ width: 24, height: 24 }} />
        </Box>

        <Text
          size={16}
          align="left"
          fw={400}
          style={{ wordWrap: 'break-word' }}
        >
          {children}
        </Text>
      </Flex>
    </Box>
  );
}

export default Notification;
