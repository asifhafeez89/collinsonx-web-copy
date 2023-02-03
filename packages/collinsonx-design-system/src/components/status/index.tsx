import { Text } from '@mantine/core';

interface IStatus {
  confirmed?: boolean;
  declined?: boolean;
}

export default function Status({ confirmed, declined }: IStatus) {
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
      sx={{
        ...styles,
        backgroundColor: '#FAB005',
        color: '#000000',
      }}
    >
      {`Booking pending`}
    </Text>
  );
  if (confirmed) {
    button = (
      <Text
        sx={{
          ...styles,
          backgroundColor: '#15AABF',
          color: '#000000',
        }}
      >
        {`Booking confirmed`}
      </Text>
    );
  }
  if (declined) {
    button = (
      <Text
        sx={{
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
