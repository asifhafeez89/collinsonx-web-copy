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
        <Head />
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
