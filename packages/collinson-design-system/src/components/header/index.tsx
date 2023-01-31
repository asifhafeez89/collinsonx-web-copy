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
import { Logo } from '../../assets/logo/';
import {
  Search,
  Home,
  Lounge,
  Cart,
  Chat,
  ChevronRight,
} from '../../assets/icons/index';
import { useStyles } from './styles';

const Header: FC = () => {
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
          <List
            classNames={{
              itemWrapper: classes.itemWrapper,
              itemIcon: classes.itemIcon,
            }}
            onClick={() => setMenuOpened(false)}
          >
            <List.Item icon={<Home color={'#25262b'} />}>
              <Anchor
                variant="text"
                color={'#25262b'}
                size="sm"
                href="/landing"
              >
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
        </div>
        <div style={{ height: '100%' }} />
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-around',
            borderTop: '1px solid #cccccc',
            padding: 15,
          }}
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
            <Anchor size="sm" href="/profile">
              <Text fz="sm" color={'#25262b'}>
                Jayne Bloggs
              </Text>
              <Text fz="sm" color={'#25262b'}>
                j.bloggs@collinson.co.uk
              </Text>
            </Anchor>
          </Box>
          <ChevronRight color={'#25262b'} />
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
