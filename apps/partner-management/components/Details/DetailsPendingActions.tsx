import { Flex } from '@collinsonx/design-system/core';
import BookingButton from './DetailsButton';

export interface DetailsPendingActionsProps {
  onClickDecline: () => void;
  onClickConfirm: () => void;
}
const DetailsPendingActions = ({
  onClickDecline,
  onClickConfirm,
}: DetailsPendingActionsProps) => {
  return (
    <Flex w="100%" justify="flex-end" gap={32}>
      <BookingButton variant="success" onClick={onClickConfirm} datatestid="confirmBooking">
        Confirm
      </BookingButton>

      <BookingButton variant="danger" onClick={onClickDecline} datatestid="declineBooking">
        Decline
      </BookingButton>
    </Flex>
  );
};

export default DetailsPendingActions;
