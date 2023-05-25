import { createGetInitialProps } from '@collinsonx/design-system/next';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';

const getInitialProps = createGetInitialProps();

export default class _Document extends Document {
  static getInitialProps = getInitialProps;

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
          <script src="https://wchat.freshchat.com/js/widget.js"></script>
          <Script strategy="lazyOnload">
            {`
            window.fcWidget.init({
              token: "22d326e8-4ec9-4a59-99e3-53d05a5f5f77",
              host: "https://wchat.freshchat.com",
              externalId: "TestUser",     // user's id unique to your system
              firstName: "Test",              // user's first name
              lastName: "User",                // user's last name
            });`}
          </Script>
        </body>
      </Html>
    );
  }
}
