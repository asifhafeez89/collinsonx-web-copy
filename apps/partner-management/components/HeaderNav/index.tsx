import { ReactNode } from 'react';
import { LogoHeaderCollinson } from '@collinsonx/design-system/assets/logo';
import classes from './HeaderNav.module.css';
import {
  Flex,
  Text,
  Anchor,
  Box,
  ActionIcon,
} from '@collinsonx/design-system/core';
import BadgeCollinson from './BadgeCollinson';
import Link from 'next/link';
import { default as sections, Section } from 'config/sections';
import { MenuIcon } from '@collinsonx/design-system/assets/icons';

import AccountSettings from './AccountSettings';
import useExperience from 'hooks/experience';

export interface HeaderNavProps {
  children?: ReactNode;
  section: Section;
  skipLink?: string;
}

const Separator = () => (
  <Text
    data-testid="nav-separator"
    component="span"
    visibleFrom="sm"
    className={classes.separator}
  >
    /
  </Text>
);

function HeaderNav({ children, section, skipLink = '#' }: HeaderNavProps) {
  const { userDetails, client } = useExperience();

  const fullName = userDetails?.fullName ?? undefined;

  const role = client === 'collinson' ? 'Content Team' : 'Partner';

  const handleClickMenu = () => {};
  return (
    <header role="banner" className={classes.root}>
      <Flex align="center" gap={16} className={classes.infoContainer}>
        <Flex align="center" p={10} hiddenFrom="sm">
          <ActionIcon variant="transparent" onClick={handleClickMenu}>
            <MenuIcon />
          </ActionIcon>
        </Flex>
        <Anchor
          href={skipLink}
          component={Link}
          className={classes.logo}
          td="none"
        >
          <LogoHeaderCollinson />
        </Anchor>
        <Flex align="center" gap={8}>
          <Text visibleFrom="sm" component="span" className={classes.section}>
            {sections[section]}
          </Text>
          {client && <Separator />}
          {client === 'collinson' && (
            <Box datatest-id="nav-client" visibleFrom="xs">
              <BadgeCollinson />
            </Box>
          )}
          {client && client !== 'collinson' && (
            <Text
              datatest-id="nav-client"
              component="span"
              visibleFrom="xs"
              className={classes.client}
            >
              {client}
            </Text>
          )}
        </Flex>
      </Flex>

      <nav aria-label="Header" className={classes.nav}>
        {children}
        <AccountSettings fullName={fullName} role={role} />
      </nav>
    </header>
  );
}

export default HeaderNav;
