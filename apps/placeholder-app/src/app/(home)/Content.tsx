'use client';

import { useState, Dispatch, SetStateAction } from 'react';

import { useForm, joiResolver } from '@mantine/form';
import { Select, Button, Textarea, TextInput } from '@mantine/core';

// @ts-ignore
import { Product, Client } from '@collinsonx/constants/dist/enums';

// @ts-ignore
import { getClients, getProducts } from '@collinsonx/constants/dist/enums';

import { LoungeSchema, lounges } from '@/data/Lounge';

import schema, { SchemaType } from './schema';
import { encryptJWT } from './jwt';

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

  const [object, setObject] = useState('');
  const [jwt, setJWT] = useState('');

  const createNewJWT = async (values: SchemaType) => {
    const response = {
      ...values,
      lounge,
      product,
      client,
    };

    setObject(JSON.stringify(response));

    const jwtToken = await encryptJWT(response);
    setJWT(jwtToken);
  };

  return (
    <>
      <h1>Placeholder App</h1>

      <form onSubmit={form.onSubmit((values) => createNewJWT(values))}>
        <p>Consumer number</p>
        <TextInput
          placeholder="Please add your consumer number"
          {...form.getInputProps('consumerNumber')}
        />

        <p>Membership number</p>
        <TextInput
          {...form.getInputProps('membershipNumber')}
          placeholder="Please add your membership number"
        />

        <p>First name</p>
        <TextInput
          {...form.getInputProps('firstName')}
          placeholder="Please add your first name"
        />

        <p>Last name</p>
        <TextInput
          {...form.getInputProps('lastName')}
          placeholder="Please add your last name"
        />

        <p>Email</p>
        <TextInput
          {...form.getInputProps('email')}
          placeholder="Plase add your email"
        />

        <p>Product</p>
        <ProductSelectBox setProduct={setProduct} />

        <p>Client</p>
        <ClientSelectBox setClient={setClient} />

        <p>Lounge</p>
        <LoungeSelectBox setLounge={setLounge} />

        <br />
        <Button type="submit">Generate a JWT</Button>
      </form>

      {object.length > 0 && (
        <>
          <p>Object:</p>
          <Textarea value={object} readOnly />
        </>
      )}
      {jwt.length > 0 && (
        <>
          <p>
            JWT:
            <Textarea value={jwt} readOnly />
          </p>
        </>
      )}
    </>
  );
};

export default Content;
