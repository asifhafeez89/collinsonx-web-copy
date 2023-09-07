import { Anchor, Flex, NavLink } from '@mantine/core';

import { ArrowLeft } from '@collinsonx/design-system/assets/icons';

interface BreadcrampProps {
  lefttitle?: string;
  lefturl?: string;
  righttile?: string;
  righturl?: string;
}

export default function Breadcramp({
  lefttitle,
  lefturl,
  righttile,
  righturl,
}: BreadcrampProps) {
  return (
    <Flex justify="space-between">
      {lefttitle && (
        <Anchor
          href={lefturl}
          target="_blank"
          sx={{ width: 'fit-content', textDecoration: 'none' }}
        >
          <NavLink
            label={lefttitle}
            icon={<ArrowLeft size="1rem" stroke={1.5} />}
            sx={{ color: '#827127' }}
          />
        </Anchor>
      )}
      {righttile && (
        <Anchor
          href={righturl}
          target="_blank"
          sx={{ width: 'fit-content', textDecoration: 'none' }}
        >
          <NavLink label={righttile} />
        </Anchor>
      )}
    </Flex>
  );
}
