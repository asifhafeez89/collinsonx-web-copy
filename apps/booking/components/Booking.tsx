import { useMutation, useQuery } from '@collinsonx/utils/apollo';
import { createBooking } from '@collinsonx/utils/mutations';
import dayjs from 'dayjs';
import {
  TextInput,
  Button,
  Group,
  Box,
  NumberInput,
  ActionIcon,
  NumberInputHandlers,
  Text,
  Grid,
  Modal,
  LoadingOverlay,
} from '@collinsonx/design-system/core';
import { BookingType } from '../types/booking';
import { ChangeEvent, useState } from 'react';
import { constants } from 'constants';

interface BookingProps {
  slotDateFrom: string;
  slotDateEnd: string;
  guests: number;
  flightNumber: String;
  flightDate: Date;
}

export default function Booking({
  slotDateFrom,
  slotDateEnd,
  guests,
  flightNumber,
  flightDate,
}: BookingProps) {
  const [price, setPrice] = useState<string>();

  const [mutate, { loading: cbLoading, error: cbError }] =
    useMutation(createBooking);

  const handleClickCreateBooking = () => {
    const bookingInput = {
      experience: { id: 'e1d306ee-92d2-5168-b61f-c97de201c6b8' },
      bookedFrom: dayjs(slotDateFrom),
      bookedTo: dayjs(slotDateEnd),
      type: BookingType.Reservation,
      guestCount: guests + 1,
      metadata: {
        flightNumber,
        flightTime: dayjs(flightDate).format(constants.TIMEFORMAT),
      },
    };

    mutate({
      variables: { bookingInput },
      onCompleted(data) {
        if (data?.createBooking) {
          console.log(data?.createBooking);
        }
      },
    });
  };

  const onCreateBooking = () => {
    handleClickCreateBooking();
  };

  return (
    <div>
      <p>GBP</p>
      <TextInput
        label="price"
        placeholder="Price"
        value={price}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setPrice(event.target.value)
        }
        error={''}
        required={true}
        withAsterisk
        type="text"
      />
      /Places
      {guests}
      {price ? `Total ${guests * Number.parseInt(price?.toString())}` : 0}
      <Button variant="outline" onClick={onCreateBooking}>
        Make booking
      </Button>
    </div>
  );
}
