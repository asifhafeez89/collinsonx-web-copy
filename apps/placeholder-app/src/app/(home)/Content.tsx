'use client';

import { useState, Dispatch, SetStateAction } from 'react';

import { useInputState } from '@mantine/hooks';

import { Select, Button, Textarea, TextInput, em } from '@mantine/core';

// @ts-ignore
import { Product, Client } from '@collinsonx/constants/dist/enums';

// @ts-ignore
import { getClients, getProducts } from '@collinsonx/constants/dist/enums';

enum Lounge {
  'Swissport_Lounges_1' = 'Swissport Lounges 1',
  'Swissport_Lounges_2' = 'Swissport Lounges 2',
  'Swissport_Lounges_3' = 'Swissport Lounges 3',
}

function getLounges(): Array<Lounge> {
  return [
    Lounge.Swissport_Lounges_1,
    Lounge.Swissport_Lounges_2,
    Lounge.Swissport_Lounges_3,
  ];
}

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
  setLounge: Dispatch<SetStateAction<Lounge>>;
}

function LoungeSelectBox({ setLounge }: LoungeSelectBoxProps) {
  const data = getLounges().map((lounge: Lounge) => {
    return {
      value: lounge.toLowerCase(),
      label: lounge,
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
  const [product, setProduct] = useState<Product>(null);
  const [client, setClient] = useState<Client>(null);
  const [lounge, setLounge] = useState<Lounge>(Lounge.Swissport_Lounges_1);

  const [firstName, setFirstName] = useInputState<string>('');
  const [lastName, setLastName] = useInputState<string>('');
  const [email, setEmail] = useInputState<string>('');

  const [jwt, setJWT] = useState('');

  const createNewJWT = () => {
    const response = {
      consumerNumber: '',
      membershipNumber: '',
      email: email,
      firstName: firstName,
      lastName: lastName,
      brand_affiliation: '',
      lounge: lounge,
      client: client,
      product: product,
    };

    setJWT(JSON.stringify(response));
    console.log('submited');
  };

  return (
    <>
      <h1>Placeholder App</h1>

      <TextInput
        value={firstName}
        onChange={setFirstName}
        placeholder="Please add your first name"
      />
      <TextInput
        value={lastName}
        onChange={setLastName}
        placeholder="Plase add your last name"
      />

      <TextInput
        value={email}
        onChange={setEmail}
        placeholder="Plase add your email"
      />

      <ProductSelectBox setProduct={setProduct} />
      <ClientSelectBox setClient={setClient} />
      <LoungeSelectBox setLounge={setLounge} />

      <Button onClick={createNewJWT}>Generate a JWT</Button>
      {jwt.length > 0 && <Textarea value={jwt} />}
    </>
  );
};

export default Content;
