import { BookingStatus } from '@collinsonx/utils';
import { Text } from '@mantine/core';

type Status = 'PENDING' | 'CONFIRMED' | 'DECLINED';

const { Initialized, Confirmed, CheckedIn, Declined } = BookingStatus;

type StatusProps = {
  status: BookingStatus;
};

export default function Status({ status }: StatusProps) {
  const styles = {
    padding: '8px 16px',
    borderRadius: 8,
    display: 'flex',
    justifyContent: 'center',
    fontSize: 16,
    width: 'fit-content',
  };

  let button: JSX.Element;
  button = (
    <Text
      style={{
        ...styles,
        backgroundColor: '#FAB005',
        color: '#000000',
      }}
    >
      {`Booking pending`}
    </Text>
  );
  if (status === Confirmed || status === CheckedIn) {
    button = (
      <Text
        style={{
          ...styles,
          backgroundColor: '#15AABF',
          color: '#000000',
        }}
      >
        {`Booking confirmed`}
      </Text>
    );
  }
  if (status === Declined) {
    button = (
      <Text
        style={{
          ...styles,
          backgroundColor: '#F03E3E',
          color: '#ffffff',
        }}
      >
        {`Booking declined`}
      </Text>
    );
  }

  return button;
}
