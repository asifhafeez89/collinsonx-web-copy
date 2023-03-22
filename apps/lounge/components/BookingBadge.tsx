import {
  Badge as MBadge,
  BadgeProps as MBadgeProps,
  Box,
  createStyles,
} from '@collinsonx/design-system/core';

import { BookingStatus } from '@collinsonx/utils';

const { Initialized, Confirmed, CheckedIn, Declined, Booked, Errored } =
  BookingStatus;

export interface BadgeProps extends MBadgeProps {
  status: BookingStatus;
}

const useStyles = createStyles(({ colors }) => {
  return {
    root: {
      borderRadius: 8,
      textTransform: 'none',
      fontSize: 16,
      height: 'auto',
      fontWeight: 600,
    },
    inner: {
      padding: '8px 16px',
    },
    declined: {
      backgroundColor: colors.red[7],
      color: '#FFF',
    },
    pending: {
      backgroundColor: colors.yellow[6],
      color: '#000',
    },
    confirmed: {
      backgroundColor: colors.cyan[6],
      color: '#000',
    },
  };
});

const bookingMap: Record<BookingStatus, string> = {
  [Initialized]: 'Booking pending',
  [Confirmed]: 'Booking confirmed',
  [Declined]: 'Booking declined',
  [CheckedIn]: 'Booking confirmed',
  [Booked]: 'Booking',
  [Errored]: 'Booking errored',
};

export default function BookingBadge({
  children,
  status,
  ...props
}: BadgeProps) {
  const { classes, cx } = useStyles();

  return (
    <MBadge
      {...props}
      className={cx(classes.root, classes.inner, {
        [classes.declined]: status === Declined,
        [classes.pending]: status === Initialized,
        [classes.confirmed]: status === Confirmed || status === CheckedIn,
      })}
    >
      <Box>{bookingMap[status]}</Box>
    </MBadge>
  );
}
