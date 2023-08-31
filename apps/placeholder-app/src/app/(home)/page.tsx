'use client';

import type { NextPage } from 'next';

// import Button from '@collinsonx/design-system/components/button';

import { Product } from '@collinsonx/constants/dist/enums';

import Layout from '@/components/MainLayout';

const PageContent = () => {
  return (
    <>
      <span>Hello</span>
      <div>
        Product: {Product.Cergea}, {Product.LK}
      </div>
    </>
  );
};

const Page: NextPage = () => {
  return <Layout PageContent={PageContent} />;
};

export default Page;
