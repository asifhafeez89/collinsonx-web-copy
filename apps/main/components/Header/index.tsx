import React, { FC, useState } from 'react';
import {
  Burger,
  UnstyledButton,
  Drawer,
  List,
  Box,
  Anchor,
  Avatar,
  Text,
} from '@mantine/core';
import { useRouter } from 'next/router';
import { Logo } from '@collinson/design-system/assets/logo';
import {
  Search,
  Home,
  Lounge,
  Cart,
  Chat,
  ChevronRight,
} from '@collinson/design-system/assets/icons/index';
import { useStyles } from './styles';

export const Header: FC = () => {
  const { classes } = useStyles();
  const router = useRouter();

  const [menuOpened, setMenuOpened] = useState(false);
  const title = menuOpened ? 'Close navigation' : 'Open navigation';

  const handleGoToProfile = () => {
    router.push('/profile');
    setMenuOpened(false);
  };

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
            onClick={() => setMenuOpened((o) => !o)}
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
        classNames={{
          drawer: classes.drawer,
          closeButton: classes.closeButton,
        }}
      >
        <List
          classNames={{
            itemWrapper: classes.itemWrapper,
            itemIcon: classes.itemIcon,
          }}
          onClick={() => setMenuOpened(false)}
        >
          <List.Item icon={<Home color={'#25262b'} />}>
            <Anchor variant="text" color={'#25262b'} size="sm" href="/landing">
              Home
            </Anchor>
          </List.Item>
          <List.Item icon={<Lounge color={'#25262b'} />}>
            <Anchor
              variant="text"
              color={'#25262b'}
              size="sm"
              href="/explore-lounges"
            >
              Explore lounges
            </Anchor>
          </List.Item>
          <List.Item icon={<Cart color={'#25262b'} />}>
            <Anchor
              variant="text"
              color={'#25262b'}
              size="sm"
              href="/booking-management"
            >
              Booking management
            </Anchor>
          </List.Item>
          <List.Item icon={<Chat color={'#25262b'} />}>
            <Anchor
              variant="text"
              color={'#25262b'}
              size="sm"
              href="/travel-companion"
            >
              AI Travel companion
            </Anchor>
          </List.Item>
        </List>
        <Box
          sx={{
            width: 'calc(100% - 48px)',
            position: 'fixed',
            bottom: 24,
            display: 'flex',
            justifyContent: 'space-around',
            borderTop: '1px solid #cccccc',
            paddingTop: 15,
          }}
          onClick={handleGoToProfile}
        >
          <Avatar
            src={null}
            radius="xl"
            alt="no image here"
            color={'#25262b'}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flex: 2,
              paddingLeft: 10,
            }}
          >
            <Text fz="sm" color={'#25262b'}>
              Jayne Bloggs
            </Text>
            <Text fz="sm" color={'#25262b'}>
              j.bloggs@collinson.co.uk
            </Text>
          </Box>
          <ChevronRight color={'#25262b'} />
        </Box>
      </Drawer>
    </>
  );
};
