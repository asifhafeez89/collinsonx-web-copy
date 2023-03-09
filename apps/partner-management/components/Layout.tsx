import { LogoExperienceX } from '@collinsonx/design-system/assets/logo';
import Link from 'next/link';

interface LayoutProps {
  subHeader?: JSX.Element;
  children: JSX.Element;
}

export default function LayoutLogin({ children, subHeader }: LayoutProps) {
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
        <Link href="/">
          <LogoExperienceX />
        </Link>
      </header>
      {subHeader}
      <main style={{ padding: '32px 40px', margin: 0 }}>{children}</main>
    </div>
  );
}
