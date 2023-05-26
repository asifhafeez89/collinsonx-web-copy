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
          <Script strategy="beforeInteractive">
            {`
            function initFreshChat() {
              window.fcWidget.init({
                token: "22d326e8-4ec9-4a59-99e3-53d05a5f5f77",
                host: "https://wchat.eu.freshchat.com",
                tags: ["tepartman"],
                faqTags : {
                    tags : ['tepartman'],
                    filterType:'article'
                },
              });
            }
            function initialize(i,t){var e;i.getElementById(t)?initFreshChat():((e=i.createElement("script")).id=t,e.async=!0,e.src="https://wchat.eu.freshchat.com/js/widget.js",e.onload=initFreshChat,i.head.appendChild(e))}function initiateCall(){initialize(document,"freshchat-js-sdk")}window.addEventListener?window.addEventListener("load",initiateCall,!1):window.attachEvent("load",initiateCall,!1);
            `}
          </Script>
        </body>
      </Html>
    );
  }
}
