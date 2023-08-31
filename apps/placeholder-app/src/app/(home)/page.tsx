'use client';

import type { NextPage } from 'next';

import Layout from '@/components/MainLayout';

import Content from './Content';

const PageContent = () => {
  return <Content />;
};

const Page: NextPage = () => {
  return <Layout PageContent={PageContent} />;
};

export default Page;
