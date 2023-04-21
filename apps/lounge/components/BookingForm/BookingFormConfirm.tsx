import { Flex, UnstyledButton } from '@collinsonx/design-system/core';

import { Details, FieldLabel } from '@collinsonx/design-system';
import dayjs from 'dayjs';
import { LOUNGE_HOURS_OFFSET } from '../../config/lounge';
import { getLoungeArrivalTime } from '../../lib/index';

export interface BookingFormConfirmProps {
  date: Date;
  onClickConfim: () => void;
}

export default function BookingFormConfirm({
  date,
  onClickConfim,
}: BookingFormConfirmProps) {
  const handleClickConfim = () => {
    onClickConfim();
  };

  const infos = [
    {
      header: 'Date',
      description: dayjs(date).format('DD/MM/YYYY'),
      icon: null,
    },
    {
      header: 'Your flight time',
      description: dayjs(date).format('HH:mm'),
      icon: null,
    },
    {
      header: 'Lounge arrival time',
      description: getLoungeArrivalTime(date),
      icon: null,
    },
  ];

  return (
    <div
      style={{
        margin: '0 -40px',
        borderBottom: '4px solid #ccc',
        paddingBottom: '20px',
        background: '#fff',
      }}
    >
      <Flex direction="column">
        <Details infos={infos} title="Your details" />
        <UnstyledButton
          type="submit"
          sx={{
            borderRadius: 8,
            background: '#fff',
            color: '#000',
            padding: '12px 24px',
            width: '30%',
            textAlign: 'center',
            fontSize: '18px',
            marginTop: '20px',
            marginLeft: '40px',
            border: '1px solid black',
          }}
        >
          Apply
        </UnstyledButton>
      </Flex>
    </div>
  );
}
