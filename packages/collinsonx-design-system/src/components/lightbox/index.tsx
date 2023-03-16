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
}

function Lightbox({
  children,
  title,
  open,
  ctaCancel,
  ctaForward,
  ctaForwardCall,
}: LightboxProps) {
  const [opened, { close }] = useDisclosure(open);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={title}
        withCloseButton={false}
      >
        <div>
          {children}
          <Grid justify="flex-end">
            <Grid.Col span={3}>
              <Button onClick={close} color="dark" variant="subtle">
                {ctaCancel}
              </Button>
            </Grid.Col>
            <Grid.Col span={5}>
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
