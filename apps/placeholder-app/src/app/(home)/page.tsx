'use client';

import type { NextPage } from 'next';

// import Button from '@collinsonx/design-system/components/button';

// @ts-ignore
import { Product, Client } from '@collinsonx/constants/dist/enums';

// @ts-ignore
import { getClients, getProducts } from '@collinsonx/constants/dist/enums';

import { Select } from '@mantine/core';

import Layout from '@/components/MainLayout';

function ClientSelectBox() {
  const data = getClients().map((client: Client) => {
    return {
      value: client.toLowerCase(),
      label: client,
    };
  });

  return <Select placeholder="Please select a client" data={data} />;
}

function ProductSelectBox() {
  const data = getProducts().map((product: Product) => {
    return {
      value: product.toLowerCase(),
      label: product,
    };
  });

  return <Select placeholder="Please select a product" data={data} />;
}

const PageContent = () => {
  return (
    <>
      <h1>Placeholder App</h1>
      <ProductSelectBox />
      <ClientSelectBox />
    </>
  );
};

const Page: NextPage = () => {
  return <Layout PageContent={PageContent} />;
};

export default Page;
