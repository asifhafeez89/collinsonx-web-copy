import colors from '@collinsonx/design-system/colour-constants-partner';
import { Box, Flex } from '@collinsonx/design-system/core';
import { useMediaQuery } from '@collinsonx/design-system/hooks';
import Link from 'next/link';

import classes from './Layout.module.css';

interface LayoutProps {
  subHeader?: JSX.Element;
  hasPadding?: boolean;
  children: JSX.Element;
}

export default function Layout({
  children,
  subHeader,
  hasPadding = true,
}: LayoutProps) {
  const print = useMediaQuery('print');
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      {print && (
        <>
          <header
            style={{
              backgroundColor: colors['bg-surface-dark'],
              borderBottom: `1px solid ${colors['grey-border']}`,
              width: '100%',
              padding: '2rem',
              textAlign: 'center',
              position: 'relative',
              margin: 0,
            }}
          >
            <Flex justify="center" align="center">
              <Box className={classes.headerInner}>
                <Link href="/auth/signout">Logout</Link>
              </Box>
            </Flex>
          </header>
          {subHeader}
        </>
      )}
      <main
        style={{
          padding: hasPadding ? '24px 64px' : 'auto',
          margin: 0,
          height: 'auto',
          minHeight: 'calc(100% - 65px)',
          width: '100%',
          backgroundColor: colors['bg-surface'],
        }}
      >
        {children}
      </main>
    </div>
  );
}
