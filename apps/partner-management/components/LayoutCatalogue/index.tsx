import { Box } from '@collinsonx/design-system/core';
import HeaderNav, { HeaderNavProps } from '../HeaderNav';

import classes from './LayoutCatalogue.module.css';
import { SECTION_ID } from 'config';

interface LayoutProps {
  subHeader?: JSX.Element;
  heading?: JSX.Element;
  headerNavProps: HeaderNavProps;
  children: JSX.Element;
}

export default function Layout({
  children,
  heading,
  headerNavProps,
}: LayoutProps) {
  return (
    <Box className={classes.container}>
      <HeaderNav {...headerNavProps} />
      {heading}
      <main id={SECTION_ID}>{children}</main>
    </Box>
  );
}
