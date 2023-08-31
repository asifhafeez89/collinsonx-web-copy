'use client';

import { useState, Dispatch, SetStateAction } from 'react';

import { useForm, joiResolver } from '@mantine/form';
import { Select, Button, Textarea, TextInput } from '@mantine/core';

// @ts-ignore
import { Product, Client } from '@collinsonx/constants/dist/enums';

// @ts-ignore
import { getClients, getProducts } from '@collinsonx/constants/dist/enums';

import schema, { SchemaType } from './schema';

import { LoungeSchema, lounges } from '@/data/Lounge';

interface ClientSelectBoxProps {
  setClient: Dispatch<SetStateAction<Client>>;
}

function ClientSelectBox({ setClient }: ClientSelectBoxProps) {
  const data = getClients().map((client: Client) => {
    return {
      value: client.toLowerCase(),
      label: client,
    };
  });

  return (
    <Select
      placeholder="Please select a client"
      data={data}
      onChange={setClient}
    />
  );
}

interface ProductSelectBoxProps {
  setProduct: Dispatch<SetStateAction<Client>>;
}

function ProductSelectBox({ setProduct }: ProductSelectBoxProps) {
  const data = getProducts().map((product: Product) => {
    return {
      value: product.toLowerCase(),
      label: product,
    };
  });

  return (
    <Select
      placeholder="Please select a product"
      data={data}
      onChange={setProduct}
    />
  );
}

interface LoungeSelectBoxProps {
  setLounge: Dispatch<SetStateAction<LoungeSchema>>;
}

function LoungeSelectBox({ setLounge }: LoungeSelectBoxProps) {
  const data = lounges.map((lounge: LoungeSchema) => {
    const value = lounge.LoungeCode;
    const label = `${lounge.LoungeCode} - ${lounge.LoungeName} - ${lounge.AirportName}`;

    return {
      value,
      label,
    };
  });

  return (
    <Select
      placeholder="Please select a lounge"
      data={data}
      // @ts-ignore
      onChange={setLounge}
    />
  );
}

const Content = () => {
  const form = useForm({
    validate: joiResolver(schema),
    initialValues: {
      consumerNumber: '',
      membershipNumber: '',
      email: '',
      firstName: '',
      lastName: '',
    },
  });

  const [product, setProduct] = useState<Product>(null);
  const [client, setClient] = useState<Client>(null);
  const [lounge, setLounge] = useState<LoungeSchema>(lounges[0]);

  const [jwt, setJWT] = useState('');

  const createNewJWT = (values: SchemaType) => {
    const response = {
      ...values,
      lounge,
      product,
      client,
    };

    setJWT(JSON.stringify(response));
  };

  return (
    <>
      <h1>Placeholder App</h1>

      <form onSubmit={form.onSubmit((values) => createNewJWT(values))}>
        <TextInput
          placeholder="Please add your consumer number"
          {...form.getInputProps('consumerNumber')}
        />

        <TextInput
          {...form.getInputProps('membershipNumber')}
          placeholder="Please add your membership number"
        />

        <TextInput
          {...form.getInputProps('firstName')}
          placeholder="Please add your first name"
        />

        <TextInput
          {...form.getInputProps('lastName')}
          placeholder="Please add your last name"
        />

        <TextInput
          {...form.getInputProps('email')}
          placeholder="Plase add your email"
        />

        <ProductSelectBox setProduct={setProduct} />
        <ClientSelectBox setClient={setClient} />
        <LoungeSelectBox setLounge={setLounge} />

        <Button type="submit">Generate a JWT</Button>
      </form>

      {jwt.length > 0 && <Textarea value={jwt} readOnly />}
    </>
  );
};

export default Content;
