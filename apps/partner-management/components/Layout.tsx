import colors from '@collinsonx/design-system/colour-constants-partner';
import { Box, Flex, MediaQuery } from '@collinsonx/design-system/core';
import Link from 'next/link';

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
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <MediaQuery
        query="print"
        styles={{
          display: 'none',
        }}
      >
        <header
          style={{
            backgroundColor: '#EFEFF1',
            borderBottom: '1px solid #D5D5D5',
            width: '100%',
            padding: '2rem',
            textAlign: 'center',
            position: 'relative',
            margin: 0,
          }}
        >
          <Flex justify="center" align="center">
            <Box
              sx={{
                position: 'absolute',
                right: '60px',
              }}
            >
              <Link href="/auth/signout">Logout</Link>
            </Box>
          </Flex>
        </header>
      </MediaQuery>
      {subHeader && (
        <MediaQuery
          query="print"
          styles={{
            display: 'none',
          }}
        >
          {subHeader}
        </MediaQuery>
      )}
      <main
        style={{
          padding: hasPadding ? '0 64px' : 'auto',
          margin: 0,
          height: '100%',
          width: '100%',
          backgroundColor: colors['partner-bg-surface'],
        }}
      >
        {children}
      </main>
    </div>
  );
}
