import Head from 'next/head';
import { SITE_NAME } from 'config';

export interface PageTitleProps {
  title: string;
}
const PageTitle = ({ title }: PageTitleProps) => {
  return (
    <Head>
      <title>{title ? title + ' - ' + SITE_NAME : SITE_NAME}</title>
    </Head>
  );
};

export default PageTitle;
