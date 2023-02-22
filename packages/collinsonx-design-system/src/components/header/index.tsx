import React, { useState } from 'react';
import { Burger, Drawer, List, Box, Anchor } from '@collinsonx/utils/core';
import Signout from '@collinsonx/utils/components/logout';
import { Logo } from '../../assets/logo';
import { Search, ChevronRight, Logout } from '../../assets/icons/index';
import { useStyles } from './styles';

export type HeaderItem = {
  label: string;
  link: string;
  icon: React.ReactElement;
};

interface HeaderProps {
  items?: HeaderItem[];
}

const Header = ({ items }: HeaderProps) => {
  const { classes } = useStyles();

  const [menuOpened, setMenuOpened] = useState(false);
  const title = menuOpened ? 'Close navigation' : 'Open navigation';

  return (
    <>
      <header className={classes.header}>
        <a href="/" className={classes.logo}>
          <Logo />
        </a>

        <nav className={classes.nav}>
          <Anchor variant="text" color={'#112132'} size="sm" href="/search">
            <Search color={'#ffffff'} />
          </Anchor>

          <Burger
            color={'#ffffff'}
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
          <Logo />
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
          <Signout>
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
            >
              <Logout color={'#112132'} />
              <span
                style={{
                  color: '#112132',
                  marginLeft: '1rem',
                  marginRight: '0.5rem',
                  flex: '1 1 100%',
                }}
              >
                Signout
              </span>
              <ChevronRight color={'#112132'} />
            </div>
          </Signout>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
