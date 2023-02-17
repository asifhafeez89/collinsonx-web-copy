import { createStyles } from '@collinsonx/utils/core';

export const useStyles = createStyles(() => ({
  drawerHeader: {
    backgroundColor: '#112132',
    padding: 15,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#112132',
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
    justifyContent: 'flex-start',
  },
  drawerList: {
    padding: '0 15px 0 15px !important',
  },
  closeButton: {
    color: '#112132',
  },
  drawerBody: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
}));
