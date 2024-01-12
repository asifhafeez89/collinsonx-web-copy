import colors from '@collinsonx/design-system/colour-constants-partner';
import HeaderNav, { HeaderNavProps } from '@components/HeaderNav';

interface LayoutProps {
  subHeader?: JSX.Element;
  hasPadding?: boolean;
  children: JSX.Element;
  headerNavProps: HeaderNavProps;
}

export default function Layout({
  children,
  headerNavProps,
  hasPadding = true,
}: LayoutProps) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <HeaderNav {...headerNavProps} />
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
