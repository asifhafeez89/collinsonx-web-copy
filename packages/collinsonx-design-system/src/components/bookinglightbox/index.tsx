import { Modal, Button, Group, Grid, Box } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ReactNode } from 'react';

interface BookingLightboxProps {
  children: JSX.Element;
  open: boolean;
  ctaCancel: String;
  ctaForward: String;
  ctaForwardCall: () => void;
  onClose: () => void;
}

function BookingLightbox({
  children,
  open,
  ctaCancel,
  ctaForward,
  ctaForwardCall,
  onClose,
}: BookingLightboxProps) {
  return (
    <>
      <Modal
        opened={open}
        onClose={onClose}
        withCloseButton={false}
        padding={0}
      >
        <Box
          sx={{ textAlign: 'center', padding: ' 0 2rem', lineHeight: '2rem' }}
        >
          {' '}
          {children}
        </Box>

        <Grid
          justify="flex-end"
          sx={{ backgroundColor: '#C8C9CA', padding: '20px' }}
        >
          <Grid.Col span={5}>
            <Button
              onClick={onClose}
              color="dark"
              variant="outline"
              styles={{
                root: {
                  border: 'solid',
                  backgroundColor: 'transparent',
                  borderColor: '#000',
                  borderWidth: 2,
                  color: '#fff',
                },
                label: {
                  color: '#000',
                },
              }}
            >
              {ctaCancel}
            </Button>
          </Grid.Col>
          <Grid.Col span={6}>
            <Button onClick={ctaForwardCall}>{ctaForward}</Button>
          </Grid.Col>
        </Grid>
      </Modal>
    </>
  );
}

export default BookingLightbox;
