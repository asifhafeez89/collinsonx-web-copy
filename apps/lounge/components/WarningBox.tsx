import { Warning } from '@collinsonx/design-system/assets/icons';
import { Box, Flex, Text } from '@collinsonx/design-system/core';

export interface WarningBoxProps {
  children: JSX.Element | string;
}

const WarningBox = ({ children }: WarningBoxProps) => {
  return (
    <Flex
      pl={40}
      pr={8}
      py={8}
      justify="center"
      w="100%"
      sx={{
        position: 'relative',
        backgroundColor: 'rgba(250, 176, 5, 0.2)',
        border: '1px solid #966A03',
        borderRadius: 4,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          left: 10,
          top: 8,
          width: '17px',
          height: '16px',
        }}
      >
        <Warning sx={{ width: 17, height: 16 }} />
      </Box>
      <Text size={14} color="#101010">
        {children}
      </Text>
    </Flex>
  );
};

export default WarningBox;
