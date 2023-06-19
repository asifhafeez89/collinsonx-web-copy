import { LogoExperienceX } from '@collinsonx/design-system/assets/logo';
import { MediaQuery } from '@collinsonx/design-system/core';
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
            margin: 0,
          }}
        >
          <Link href="/">
            <LogoExperienceX />
          </Link>
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
