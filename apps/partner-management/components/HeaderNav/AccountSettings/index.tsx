import { Button, Menu, Text } from '@collinsonx/design-system/core';
import {
  AccountCircleIcon,
  KeyboardArrowDownIcon,
  Logout,
} from '@collinsonx/design-system/assets/icons';
import { forwardRef } from 'react';
import Link from 'next/link';

import classes from './AccountSettings.module.css';

export interface AccountSettingsProps {
  fullName?: string;
  accountRole?: string;
}

const Target = forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<'button'> & AccountSettingsProps
>(({ fullName, accountRole, ...props }, ref) => {
  return (
    <Button
      ref={ref}
      variant="transparent"
      aria-label="Account menu"
      classNames={{
        root: classes.buttonRoot,
        label: classes.buttonLabel,
        section: classes.buttonSection,
      }}
      leftSection={
        <AccountCircleIcon aria-hidden="true" className={classes.iconLarge} />
      }
      rightSection={
        <KeyboardArrowDownIcon
          aria-hidden="true"
          className={classes.iconSmall}
        />
      }
      {...props}
    >
      {!!fullName && !!accountRole && (
        <>
          <Text component="span" fw={600} size="sm">
            {fullName}
          </Text>
          <Text component="span" className={classes.role}>
            {accountRole}
          </Text>
        </>
      )}
    </Button>
  );
});

const AccountSettings = (props: AccountSettingsProps) => {
  return (
    <Menu withinPortal={false}>
      <Menu.Target>
        <Target {...props} />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          component={Link}
          href="/auth/signout"
          className={classes.logout}
          td="none"
          variant="transparent"
          leftSection={<Logout aria-hidden="true" />}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default AccountSettings;
