import { createStyles } from '@mantine/core';

export const useStyles = createStyles(() => ({
  drawerHeader: {
    backgroundColor: '#25262b',
    padding: 15,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#25262b',
    display: 'flex',
    justifyContent: 'space-between',
    padding: 15,
    alignItems: 'center',
    position: 'relative',
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
    padding: '0 !important',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
  },
  drawerList: {
    padding: '0 15px 0 15px !important',
  },
  closeButton: {
    color: '#25262b',
  },
}));
