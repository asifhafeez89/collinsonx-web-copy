import {
  Badge as MBadge,
  BadgeProps as MBadgeProps,
  Box,
  createStyles,
} from '@collinsonx/design-system/core';

export type BookingStatus = 'pending' | 'declined' | 'confirmed';

export interface BadgeProps extends MBadgeProps {
  status: 'pending' | 'confirmed' | 'declined';
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
        [classes.declined]: status === 'declined',
        [classes.pending]: status === 'pending',
        [classes.confirmed]: status === 'confirmed',
      })}
    >
      <Box>{children}</Box>
    </MBadge>
  );
}
