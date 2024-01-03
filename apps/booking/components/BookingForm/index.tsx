import { Flex, UnstyledButton } from '@collinsonx/design-system/core';

import { Details, FieldLabel } from '@collinsonx/design-system';
import { LOUNGE_HOURS_OFFSET } from '../../config/lounge';
import { getLoungeArrivalTime } from '../../lib/index';
import dayjsTz from '@collinsonx/utils/lib/dayjsTz';
import classes from './BookingForm.module.css';

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
      description: dayjsTz(date).format('DD/MM/YYYY'),
      icon: null,
    },
    {
      header: 'Your flight time',
      description: dayjsTz(date).format('HH:mm'),
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
        borderBottom: '4px solid #ccc',
        paddingBottom: '20px',
        background: '#fff',
      }}
    >
      <Flex direction="column">
        <Details infos={infos} title="Your details" direction="row" />
        <UnstyledButton type="submit" classNames={classes}>
          Apply
        </UnstyledButton>
      </Flex>
    </div>
  );
}
