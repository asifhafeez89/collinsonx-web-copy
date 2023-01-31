import React, { FC, useState } from 'react';
import {
  Burger,
  UnstyledButton,
  Drawer,
  List,
  Box,
  Anchor,
} from '@mantine/core';
import { Logo } from '../../assets/logo/';
import { Search, ChevronRight } from '../../assets/icons/index';
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
          <UnstyledButton>
            <Search color={'#ffffff'} />
          </UnstyledButton>

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
                    color={'#25262b'}
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
            justifyContent: 'space-around',
            borderTop: '1px solid #cccccc',
            padding: 15,
            marginTop: 'auto',
          }}
        >
          {/* <Avatar
            src={null}
            radius="xl"
            alt="no image here"
            color={'#25262b'}
          /> */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flex: 2,
              paddingLeft: 10,
            }}
          >
            <Anchor variant="text" color={'#25262b'} size="sm" href="/">
              Logout
            </Anchor>
            {/* 
            <Anchor size="sm" href="/profile">
              <Text fz="sm" color={'#25262b'}>
                Jayne Bloggs
              </Text>
              <Text fz="sm" color={'#25262b'}>
                j.bloggs@collinson.co.uk
              </Text>
            </Anchor> */}
          </Box>
          <ChevronRight color={'#25262b'} />
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
