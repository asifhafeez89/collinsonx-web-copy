'use client';

import type { NextPage } from 'next';

import Button from '@collinsonx/design-system/components/button';

import Layout from '@/components/MainLayout';

const PageContent = () => {
  return (
    <>
      <span>Hello</span>
      <Button>Setting</Button>
    </>
  );
};

const Page: NextPage = () => {
  return <Layout PageContent={PageContent} />;
};

export default Page;
