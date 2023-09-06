import { Anchor, NavLink } from '@mantine/core';

import { ArrowLeft } from '../../assets/icons';

interface BreadcrampProps {
  title: string;
  url: string;
}

export default function Breadcramp({ title, url }: BreadcrampProps) {
  return (
    <Anchor
      href={url}
      target="_blank"
      sx={{ width: 'fit-content', textDecoration: 'none' }}
    >
      <NavLink label={title} icon={<ArrowLeft size="1rem" stroke={1.5} />} />
    </Anchor>
  );
}
