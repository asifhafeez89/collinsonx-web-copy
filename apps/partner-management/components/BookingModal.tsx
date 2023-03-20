import { Close } from '@collinsonx/design-system/assets/icons';
import {
  ActionIcon,
  Box,
  Button,
  Checkbox,
  Modal,
  Title,
  Text,
} from '@collinsonx/design-system/core';
import Details from './Details';

interface BookingModalProps {
  bookingId: string | null;
  onClickClose: () => void;
  checkIn: boolean;
  onChangeCheckIn: (checked: boolean) => void;
  onClickConfirmCheckIn: () => void;
}
function BookingModal({
  bookingId,
  onClickClose,
  checkIn,
  onChangeCheckIn,
  onClickConfirmCheckIn,
}: BookingModalProps) {
  return (
    <Modal
      opened={bookingId !== null}
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
        {bookingId ? (
          <Details bookingId={bookingId}>
            <Box p={32} bg="#FFF3BF" sx={{ borderRadius: 4 }}>
              <Title w={600} size={16}>
                Ask the below before check in
              </Title>
              <Text mt={4}>
                &#x2022; Check customer boarding pass and passport
              </Text>
              <Checkbox
                mt={4}
                py={17}
                checked={checkIn}
                onChange={(e) => onChangeCheckIn(e.target.checked)}
                label="Confirmed I have checked"
                sx={{ label: { paddingLeft: 8 } }}
              />
              <Button
                variant="default"
                disabled={!checkIn}
                onClick={onClickConfirmCheckIn}
              >
                Check in
              </Button>
            </Box>
          </Details>
        ) : null}
      </Box>
    </Modal>
  );
}

export default BookingModal;
