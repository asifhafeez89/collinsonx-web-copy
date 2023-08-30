'use client';

import type { NextPage } from 'next';

import Layout from '@/components/MainLayout';

const PageContent = () => {
  return 'Baas - Testing App';
};

const Page: NextPage = () => {
  return <Layout PageContent={PageContent} />;
};

export default Page;
