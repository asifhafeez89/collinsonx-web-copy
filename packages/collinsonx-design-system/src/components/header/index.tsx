import React, { useState } from 'react';
import {
  Burger,
  Drawer,
  List,
  Box,
  Anchor,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { Search, ChevronRight, Logout } from '../../assets/icons/index';
import { useStyles } from './styles';

export type HeaderItem = {
  label: string;
  link: string;
  icon: React.ReactElement;
};

interface HeaderProps {
  items?: HeaderItem[];
  logo: JSX.Element;
  onClickSignout?: () => void;
}

const Header = ({ items, logo, onClickSignout }: HeaderProps) => {
  const { classes } = useStyles();

  const theme = useMantineTheme();

  const [menuOpened, setMenuOpened] = useState(false);
  const title = menuOpened ? 'Close navigation' : 'Open navigation';

  return (
    <>
      <header className={classes.header}>
        <a href="/" className={classes.logo}>
          {logo}
        </a>
        <nav className={classes.nav}>
          <Anchor variant="text" size="sm" href="/lounge/search">
            <Search />
          </Anchor>
          <Burger
            color={theme.colors.headerNavColor[0]}
            opened={menuOpened}
            onClick={() => setMenuOpened(true)}
            title={title}
          />
        </nav>
      </header>
      <Drawer
        opened={menuOpened}
        position="right"
        onClose={() => setMenuOpened(false)}
        padding="xl"
        size="xl"
        withCloseButton={false}
        classNames={{
          drawer: classes.drawer,
          closeButton: classes.closeButton,
          body: classes.drawerBody,
        }}
      >
        <div className={classes.drawerHeader}>
          {logo}
          <Burger
            color={'#ffffff'}
            opened={menuOpened}
            onClick={() => setMenuOpened(false)}
            title={title}
          />
        </div>

        <div className={classes.drawerList}>
          {(items?.length ?? 0 > 0) && (
            <List
              classNames={{
                itemWrapper: classes.itemWrapper,
                itemIcon: classes.itemIcon,
              }}
              onClick={() => setMenuOpened(false)}
            >
              {items?.map(({ link, label, icon }) => (
                <List.Item key={`headerItem-${link}`} icon={icon}>
                  <Anchor
                    variant="text"
                    color={'#112132'}
                    size="sm"
                    href={link}
                  >
                    {label}
                  </Anchor>
                </List.Item>
              ))}
            </List>
          )}
        </div>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'stretch',
            borderTop: '1px solid #cccccc',
            padding: 15,
            marginTop: 'auto',
          }}
        >
          <Box
            onClick={onClickSignout}
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
          >
            <Logout color={'#112132'} />
            <Text
              sx={{
                color: '#112132',
                marginLeft: '1rem',
                marginRight: '0.5rem',
                flex: '1 1 100%',
              }}
            >
              Signout
            </Text>
            <ChevronRight color={'#112132'} />
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
