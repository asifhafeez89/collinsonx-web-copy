import dayjs from 'dayjs';

const cancellationDateValidation = (date: Date) => {
  return {
    isValid:
      dayjs(date).isAfter(new Date()) &&
      dayjs(date).diff(new Date()) > 172800000,
    error: errorType(date),
  };
};

const errorType = (date: Date) => {
  if (dayjs(date).isBefore(new Date())) {
    return 'This booking has already taken place, please contact our team';
  } else if (dayjs(date).diff(new Date()) < 172800000) {
    return 'We are sorry, this booking cannot be cancelled within 48 hours of booking arrival time.';
  }
};

export default cancellationDateValidation;
