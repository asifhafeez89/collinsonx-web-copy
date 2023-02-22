import { Center, Container, Stack } from '@collinsonx/design-system/core';
import { LogoExperienceX } from '@collinsonx/design-system/assets/logo';
import { Be_Vietnam_Pro } from '@next/font/google';

const beVietnamPro = Be_Vietnam_Pro({
  style: ['normal'],
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

interface LayoutProps {
  children: JSX.Element;
}

export default function LayoutLogin({ children }: LayoutProps) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
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
        <LogoExperienceX />
      </header>
      <main style={{ padding: '2rem', margin: 0 }}>{children}</main>
    </div>
  );
}
