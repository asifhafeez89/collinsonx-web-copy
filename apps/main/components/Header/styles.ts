import { createStyles } from '@mantine/core';

export const useStyles = createStyles(() => ({
  header: {
    backgroundColor: '#112132',
    display: 'flex',
    justifyContent: 'space-between',
    padding: 15,
    alignItems: 'center',
    position: 'relative',
    zIndex: 251, // Higher than menu overlay
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
  itemWrapper: {
    width: '100%',
    borderBottom: '1px solid #cccccc',
    padding: '15px 0',
  },
  itemIcon: {
    width: 24,
    height: 24,
  },
  drawer: {
    backgroundColor: '#ffffff',
  },
  closeButton: {
    color: '#25262b',
  },
}));
