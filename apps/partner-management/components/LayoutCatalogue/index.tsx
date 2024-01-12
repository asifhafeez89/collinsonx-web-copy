import colors from '@collinsonx/design-system/colour-constants-partner';
import ContentWrapper from '../ContentWrapper';
import HeaderNav, { HeaderNavProps } from '../HeaderNav';

interface LayoutProps {
  subHeader?: JSX.Element;
  heading?: JSX.Element;
  disableWrapper?: boolean;
  headerNavProps: HeaderNavProps;
  children: JSX.Element;
}

export default function Layout({
  children,
  heading,
  disableWrapper = false,
  headerNavProps,
}: LayoutProps) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <HeaderNav {...headerNavProps} />
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
