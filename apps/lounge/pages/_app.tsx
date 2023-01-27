import type { AppProps } from 'next/app';
import '@vercel/examples-ui/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    // <Layout
    //   title="Monorepo"
    //   path="solutions/monorepo"
    //   deployButton={{
    //     repositoryUrl:
    //       'https://github.com/vercel/examples/tree/main/solutions/reduce-image-bandwidth-usage',
    //   }}
    // >
    <>
      <Component {...pageProps} />
    </>
    // </Layout>
  );
}
