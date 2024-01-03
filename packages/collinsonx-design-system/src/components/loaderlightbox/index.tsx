import { Modal, Button, Flex, Box, Loader, Center } from '@mantine/core';
import { ReactNode, useEffect } from 'react';
import LoaderLifestyleX from '../loaderLifestyleX';

interface LightboxProps {
  children: JSX.Element;
  title: String;
  open: boolean;
  ctaAction: String;
  onClose: () => void;
  logAction?: () => void;
}

function LoaderLightbox({
  children,
  title,
  open,
  ctaAction,
  onClose,
  logAction,
}: LightboxProps) {
  useEffect(() => {
    if (logAction) {
      logAction();
    }
  }, []);

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
            style={{
              textAlign: 'center',
              padding: ' 0 2rem',
              lineHeight: '2rem',
            }}
          >
            {children}
          </Box>
          <Center mt={40} mb={40}>
            <LoaderLifestyleX />
          </Center>
          {ctaAction && ctaAction.length > 0 && (
            <Flex
              justify="center"
              style={{ backgroundColor: '#F7F7F7', padding: '20px' }}
            >
              <Button
                color="dark"
                variant="outline"
                pl={40}
                pr={40}
                style={{
                  borderColor: '#000',
                  color: '#000',
                }}
              >
                {ctaAction}
              </Button>
            </Flex>
          )}
        </Box>
      </Modal>
    </>
  );
}

export default LoaderLightbox;
