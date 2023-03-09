import { Flex, UnstyledButton } from '@collinsonx/design-system/core';

import { FieldLabel } from '@collinsonx/design-system';
import dayjs from 'dayjs';

export interface BookingFormConfirmProps {
  date: Date;
  comment: string;
  onClickConfim: () => void;
}

export default function BookingFormConfirm({
  date,
  comment,
  onClickConfim,
}: BookingFormConfirmProps) {
  const handleClickConfim = () => {
    onClickConfim();
  };

  return (
    <Flex direction="column">
      <FieldLabel
        title="Date"
        value={dayjs(date).format('DD/MM/YYYY')}
        handleClick={() => {}}
      />
      <FieldLabel
        title="Time of arrival"
        value={dayjs(date).format('HH:mm')}
        handleClick={() => {}}
      />
      <FieldLabel
        title="Additional requirements"
        value={comment}
        handleClick={() => {}}
      />
      <UnstyledButton
        onClick={handleClickConfim}
        sx={{
          borderRadius: 8,
          background: '#000000',
          color: '#ffffff',
          padding: '12px 24px',
          width: '100%',
          textAlign: 'center',
          fontSize: '18px',
          marginBottom: '1rem',
        }}
      >
        Send booking to lounge
      </UnstyledButton>
    </Flex>
  );
}
