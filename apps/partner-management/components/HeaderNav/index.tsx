import { MouseEventHandler, ReactNode, forwardRef } from 'react';
import { LogoHeaderCollinson } from '@collinsonx/design-system/assets/logo';
import classes from './HeaderNav.module.css';
import {
  Flex,
  Text,
  Anchor,
  Box,
  ActionIcon,
  Button,
  ButtonProps,
  createPolymorphicComponent,
} from '@collinsonx/design-system/core';
import BadgeCollinson from './BadgeCollinson';
import Link from 'next/link';
import { default as sections, Section } from 'config/sections';
import { MenuIcon } from '@collinsonx/design-system/assets/icons';

import AccountSettings from './AccountSettings';
import useExperience from 'hooks/experience';
import { SECTION_ID } from 'config';

export interface HeaderNavProps {
  children?: ReactNode;
  section: Section;
  titleID?: string;
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

const LinkButton = createPolymorphicComponent<'a', ButtonProps>(
  forwardRef<HTMLAnchorElement, ButtonProps>(({ children, ...others }, ref) => (
    <Button component="a" {...others} ref={ref}>
      {children}
    </Button>
  ))
);

function HeaderNav({
  children,
  section,
  titleID = SECTION_ID,
}: HeaderNavProps) {
  const { userDetails, client } = useExperience();

  const fullName = userDetails?.fullName ?? undefined;

  const role = client === 'collinson' ? 'Content Team' : 'Partner';
  const handleClickSkipLink: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.currentTarget.blur();
  };
  const handleClickMenu = () => {};
  return (
    <header role="banner" className={classes.root}>
      <LinkButton
        variant="outline"
        href={`#${titleID}`}
        onClick={handleClickSkipLink}
        className={classes.skipLinkButton}
      >
        Skip to main content
      </LinkButton>
      <Flex justify="space-between" align="center">
        <Anchor td="none" component={Link} href="/">
          <Flex align="center" gap={16} className={classes.infoContainer}>
            <Flex align="center" p={10} hiddenFrom="sm" display="none">
              <ActionIcon variant="transparent" onClick={handleClickMenu}>
                <MenuIcon />
              </ActionIcon>
            </Flex>
            <LogoHeaderCollinson aria-hidden="true" className={classes.logo} />
            <Flex align="center" gap={8}>
              <Text
                visibleFrom="sm"
                component="span"
                className={classes.section}
              >
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
        </Anchor>

        <nav aria-label="Header" className={classes.nav}>
          {children}
          <AccountSettings fullName={fullName} role={role} />
        </nav>
      </Flex>
    </header>
  );
}

export default HeaderNav;
