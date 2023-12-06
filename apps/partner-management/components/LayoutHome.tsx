import { Box, Flex, MediaQuery } from '@collinsonx/design-system/core';
import Link from 'next/link';

interface LayoutProps {
  subHeader?: JSX.Element;
  heading: JSX.Element;
  children: JSX.Element;
}

export default function Layout({ children, heading, subHeader }: LayoutProps) {
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

      <div
        style={{
          padding: '0 64px',
          margin: 0,
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #D5D5D5',
        }}
      >
        {heading}
      </div>
      <main
        style={{
          padding: '64px',
          margin: 0,
          backgroundColor: '#F8F9FA',
          height: '100%',
        }}
      >
        {children}
      </main>
    </div>
  );
}
