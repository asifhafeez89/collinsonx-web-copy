import { Modal, Button, Group, Flex, Box } from '@mantine/core';
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
        sx={{ width: '590px' }}
      >
        <Box
          sx={{
            textAlign: 'center',
            padding: ' 0 2rem',
            lineHeight: '2rem',
          }}
        >
          {' '}
          {children}
        </Box>

        <Flex
          justify="center"
          sx={{
            backgroundColor: '#F7F7F7',
            padding: '20px',
            borderTop: '1px solid #C8C9CA',
          }}
          gap={10}
          direction={{ base: 'column', lg: 'row' }}
        >
          <Button
            onClick={onClose}
            color="dark"
            variant="outline"
            styles={{
              root: {
                border: 'solid',
                backgroundColor: 'transparent',
                borderColor: '#000',
                fontSize: '16px',
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

          <Button
            onClick={ctaForwardCall}
            variant="filled"
            sx={{ fontSize: '16px' }}
          >
            {ctaForward}
          </Button>
        </Flex>
      </Modal>
    </>
  );
}

export default BookingLightbox;
