import colors from '@collinsonx/design-system/colour-constants-partner';
import classes from './LayoutCatalogue.module.css';
import { Box, Flex } from '@collinsonx/design-system/core';
import { useMediaQuery } from '@collinsonx/design-system/hooks';
import Link from 'next/link';
import ContentWrapper from '../ContentWrapper';

interface LayoutProps {
  subHeader?: JSX.Element;
  heading?: JSX.Element;
  disableWrapper?: boolean;
  children: JSX.Element;
}

export default function Layout({
  children,
  heading,
  disableWrapper = false,
  subHeader,
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

      {heading && (
        <div
          style={{
            padding: '0 64px',
            margin: 0,
            backgroundColor: colors.white,
            borderBottom: `1px solid ${colors['grey-border']}`,
          }}
        >
          {heading}
        </div>
      )}
      <main style={{ height: '100%' }}>
        {!disableWrapper ? (
          <ContentWrapper>{children}</ContentWrapper>
        ) : (
          children
        )}
      </main>
    </div>
  );
}
