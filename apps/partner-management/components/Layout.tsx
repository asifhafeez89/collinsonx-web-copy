import { LogoCergea } from '@collinsonx/design-system/assets/logo';
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
            backgroundColor: '#E6E6E8',
            borderBottom: '1px solid #A8A8AA',
            width: '100%',
            padding: '1rem',
            textAlign: 'center',
            position: 'relative',
            margin: 0,
          }}
        >
          <Flex justify="center" align="center">
            <Box w="100%">
              <Link href="/">
                <LogoCergea />
              </Link>
            </Box>
            <Flex justify="end">
              <Box>
                <Link href="/auth/signout">Logout</Link>
              </Box>
            </Flex>
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
      <main style={{ padding: hasPadding ? '32px 40px' : 'auto', margin: 0 }}>
        {children}
      </main>
    </div>
  );
}
