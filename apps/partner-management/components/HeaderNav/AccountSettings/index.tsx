import { Anchor, Button, Popover, Text } from '@collinsonx/design-system/core';
import {
  AccountCircleIcon,
  KeyboardArrowDownIcon,
  Logout,
} from '@collinsonx/design-system/assets/icons';
import { useState } from 'react';
import Link from 'next/link';

import classes from './AccountSettings.module.css';

export interface AccountSettingsProps {
  fullName?: string;
  role?: string;
}
const AccountSettings = ({ fullName, role }: AccountSettingsProps) => {
  const [opened, setOpened] = useState(false);
  const handleClick = () => setOpened((o) => !o);

  return (
    <Popover
      opened={opened}
      onChange={setOpened}
      position="bottom"
      offset={-2}
      withArrow
    >
      <Popover.Target>
        <Button
          variant="transparent"
          onClick={handleClick}
          classNames={{
            root: classes.buttonRoot,
            label: classes.buttonLabel,
            section: classes.buttonSection,
          }}
          leftSection={<AccountCircleIcon className={classes.iconLarge} />}
          rightSection={<KeyboardArrowDownIcon className={classes.iconSmall} />}
        >
          {fullName && role && (
            <>
              <Text component="span" fw={600} size="sm">
                {fullName}
              </Text>
              <Text component="span" className={classes.role}>
                {role}
              </Text>
            </>
          )}
        </Button>
      </Popover.Target>
      <Popover.Dropdown className={classes.dropdown}>
        <Anchor
          variant="transparent"
          td="none"
          className={classes.logout}
          component={Link}
          onClick={handleClick}
          href="/auth/signout"
        >
          <Logout />
          Log out
        </Anchor>
      </Popover.Dropdown>
    </Popover>
  );
};

export default AccountSettings;
