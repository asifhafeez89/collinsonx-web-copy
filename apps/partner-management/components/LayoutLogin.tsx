import { LogoExperienceX } from '@collinsonx/design-system/assets/logo';
import { Flex } from '@collinsonx/design-system/core';
import Link from 'next/link';

interface LayoutLoginProps {
  subHeader?: JSX.Element;
  hasPadding?: boolean;
  children: JSX.Element;
}

export default function LayoutLogin({
  children,
  subHeader,
  hasPadding = true,
}: LayoutLoginProps) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: '#f5f5f5',
      }}
    >
      <header
        style={{
          backgroundColor: '#112132',
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
      {subHeader}
      <main
        style={{
          padding: hasPadding ? '32px 40px' : 'auto',
          margin: 0,
          background: '#f5f5f5',
        }}
      >
        <Flex justify="center">{children}</Flex>
      </main>
    </div>
  );
}
