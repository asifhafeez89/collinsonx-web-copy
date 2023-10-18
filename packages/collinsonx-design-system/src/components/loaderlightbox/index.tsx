import { Modal, Button, Flex, Box, Loader, Center } from '@mantine/core';
import { ReactNode } from 'react';
import LoaderLifestyleX from '../loaderLifestyleX';

interface LightboxProps {
  children: JSX.Element;
  title: String;
  open: boolean;
  ctaAction: String;
  onHandleClick: () => void;
  onClose: () => void;
}

function LoaderLightbox({
  children,
  title,
  open,
  onHandleClick,
  ctaAction,
  onClose,
}: LightboxProps) {
  return (
    <>
      <Modal
        opened={open}
        title={title}
        withCloseButton={false}
        padding={0}
        onClose={onClose}
      >
        <Box>
          <Box
            sx={{ textAlign: 'center', padding: ' 0 2rem', lineHeight: '2rem' }}
          >
            {children}
          </Box>
          <Center mt={40} mb={40}>
            <LoaderLifestyleX />
          </Center>
          <Flex
            justify="center"
            sx={{ backgroundColor: '#F7F7F7', padding: '20px' }}
          >
            <Button
              onClick={onHandleClick}
              color="dark"
              variant="outline"
              pl={40}
              pr={40}
              sx={{
                borderColor: '#000',
                color: '#000',
              }}
            >
              {ctaAction}
            </Button>
          </Flex>
        </Box>
      </Modal>
    </>
  );
}

export default LoaderLightbox;
