import { Modal, Button, Group, Grid } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ReactNode } from 'react';

interface LightboxProps {
  children: JSX.Element;
  title: String;
  open: boolean;
  ctaCancel: String;
  ctaForward: String;
  ctaForwardCall: () => void;
  onClose: () => void;
}

function Lightbox({
  children,
  title,
  open,
  ctaCancel,
  ctaForward,
  ctaForwardCall,
  onClose,
}: LightboxProps) {
  return (
    <>
      <Modal
        opened={open}
        onClose={onClose}
        title={title}
        withCloseButton={false}
      >
        <div>
          {children}
          <Grid justify="flex-end">
            <Grid.Col span={3}>
              <Button onClick={onClose} color="dark" variant="subtle">
                {ctaCancel}
              </Button>
            </Grid.Col>
            <Grid.Col span={6}>
              <Button onClick={ctaForwardCall} variant="white">
                {ctaForward}
              </Button>
            </Grid.Col>
          </Grid>
        </div>
      </Modal>
    </>
  );
}

export default Lightbox;
