import React, { useState } from 'react';
import Link from 'next/link';
import { Burger, Drawer, List, Box, Anchor, Text } from '@mantine/core';
import { Search, ChevronRight, Logout } from '../../assets/icons/index';
import classes from 'assets/components/header.module.css';

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
  const [menuOpened, setMenuOpened] = useState(false);
  const title = menuOpened ? 'Close navigation' : 'Open navigation';

  return (
    <>
      <header className={classes.header}>
        <Link href="/" className={classes.logo}>
          {logo}
        </Link>
        <nav className={classes.nav}>
          <Anchor
            component={Link}
            href="/search"
            variant="text"
            size="sm"
            color="white"
          >
            <Search />
          </Anchor>
          <Burger
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
          root: classes.root,
          close: classes.close,
          body: classes.drawerBody,
          inner: classes.inner,
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
                    component={Link}
                    href={link}
                    variant="text"
                    color={'#112132'}
                    size="sm"
                  >
                    {label}
                  </Anchor>
                </List.Item>
              ))}
            </List>
          )}
        </div>
        <Box
          style={{
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
            className="logout"
            role="button"
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
          >
            <Logout color={'#112132'} />
            <Text
              style={{
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
