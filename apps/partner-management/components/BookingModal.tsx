import { Close } from '@collinsonx/design-system/assets/icons';
import { ActionIcon, Box, Modal } from '@collinsonx/design-system/core';
import { Booking } from '@collinsonx/utils';
import Details from './Details';

interface BookingModalProps {
  booking: Booking | null;
  onClickClose: () => void;
  children?: JSX.Element;
}
function BookingModal({ booking, onClickClose, children }: BookingModalProps) {
  return (
    <Modal
      opened={booking !== null}
      withCloseButton={false}
      onClose={onClickClose}
      padding={0}
      size={712}
    >
      <ActionIcon
        color="dark.6"
        onClick={onClickClose}
        sx={{
          position: 'absolute',
          top: 40,
          right: 40,
        }}
      >
        <Close w={24} h={24} />
      </ActionIcon>
      <Box p={40} pt={80}>
        {booking ? <Details booking={booking}>{children}</Details> : null}
      </Box>
    </Modal>
  );
}

export default BookingModal;
