/* eslint-disable @next/next/no-sync-scripts */
import { createGetInitialProps } from '@collinsonx/design-system/next';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';

const getInitialProps = createGetInitialProps();

export default class _Document extends Document {
  static getInitialProps = getInitialProps;

  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <Script id="freshChat">
            {`
              window.fcWidgetMessengerConfig = {
              tags: ["private", "partnerportal"],
            }`}
          </Script>
          <script src="//fw-cdn.com/9259437/3396273.js" />
        </body>
      </Html>
    );
  }
}
