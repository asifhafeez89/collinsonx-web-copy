import { Flex, UnstyledButton } from '@collinsonx/design-system/core';

import { FieldLabel } from '@collinsonx/design-system';

export interface BookingFormConfirmProps {
  date: string;
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
  const [valueDate, valueTime] = date.split(':');
  return (
    <Flex direction="column">
      <FieldLabel title="Date" value={valueDate} handleClick={() => {}} />
      <FieldLabel
        title="Time of arrival"
        value={valueTime}
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
