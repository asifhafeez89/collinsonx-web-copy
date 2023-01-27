import React, { FC, useState } from 'react';
import { Burger, UnstyledButton, Drawer, List } from '@mantine/core';
import Link from 'next/link';
// import logo from '@collinson/design-system/assets/icons.png';
// import Image from 'next/image';
// import { IconBell, IconSearch } from '@tabler/icons';
import { useStyles } from './styles';

export const Header: FC = () => {
  const { classes } = useStyles();

  const [menuOpened, setMenuOpened] = useState(false);
  const title = menuOpened ? 'Close navigation' : 'Open navigation';

  return (
    <>
      <header className={classes.header}>
        <a href="/" className={classes.logo}>
          {/* <Image src={logo} alt="Collinson ExperienceX" /> */}
        </a>

        <nav className={classes.nav}>
          <UnstyledButton>
            {/* <IconBell color={'#ffffff'} /> */}
          </UnstyledButton>

          <UnstyledButton>
            {/* <IconSearch color={'#ffffff'} /> */}
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
      >
        <List onClick={() => setMenuOpened(false)}>
          <List.Item>
            <Link href="/landing">Home</Link>
          </List.Item>
          <List.Item>
            <Link href="/explore-lounges">Explore lounges</Link>
          </List.Item>
          <List.Item>
            <Link href="/booking-management">Booking management</Link>
          </List.Item>
          <List.Item>
            <Link href="/travel-companion">AI Travel companion</Link>
          </List.Item>
        </List>
        <div>
          <h3>Jayne Bloggs</h3>
          <p>j.bloggs@collinson.co.uk</p>
        </div>
      </Drawer>
    </>
  );
};
