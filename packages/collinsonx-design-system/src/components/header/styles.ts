import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
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
    backgroundColor: theme.colors?.headerNavBg[0],
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
    color: theme.colors.headerNavColor[0],

    button: {
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
  root: {
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
  close: {
    color: '#112132',
  },
  drawerBody: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: 0,
  },
}));
