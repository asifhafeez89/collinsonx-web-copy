import { createStyles } from '@mantine/core';

export const useStyles = createStyles(() => ({
  header: {
    backgroundColor: '#112132',
    display: 'flex',
    justifyContent: 'space-between',
    padding: 15,
    alignItems: 'center',
  },
  logo: {
    display: 'inline-block',
    color: '#ffffff',
    textDecoration: 'none',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',

    ['button']: {
      marginLeft: 15,
    },
  },
}));
