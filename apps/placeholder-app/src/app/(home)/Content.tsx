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
import { encryptJWT, decryptJWT } from './jwt';
import urls from './urls';
import { firstNames, lastNames } from './names';

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
      placeholder="Please select an account provider"
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

    // Requirement: Lounges BHD1 and BIRM are not available in BaaS.
    const disabled =
      lounge.LoungeCode === 'BHD1' || lounge.LoungeCode === 'BIRM';

    return {
      value,
      label,
      disabled,
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

interface DebugBoxProps {
  jwt: string;
  object: string;
}

function DebugBox({ jwt, object }: DebugBoxProps) {
  const [jwtPayload, setJWTPayload] = useState('');

  const decodeOnClickHandler = async () => {
    const response = await decryptJWT(jwt);

    setJWTPayload(JSON.stringify(response.payload));
  };

  return (
    <>
      {object.length > 0 && (
        <>
          <div>Object:</div>
          <Textarea value={object} readOnly />
        </>
      )}
      {jwt.length > 0 && (
        <>
          <div>
            JWT:
            <Textarea value={jwt} readOnly />
          </div>

          <br />
          <div>
            <Button onClick={decodeOnClickHandler}>Decode JWT</Button>
          </div>
        </>
      )}
      {jwtPayload.length > 0 && (
        <>
          <div>
            Payload:
            <Textarea value={jwtPayload} readOnly />
          </div>
        </>
      )}
    </>
  );
}

const Content = () => {
  const form = useForm({
    validate: joiResolver(schema),
    initialValues: {
      membershipNumber: '',
      email: '',
    },
  });

  // TODO: refactoring
  const [product, setProduct] = useState<Product>(null);
  const [client, setClient] = useState<Client>(null);
  const [lounge, setLounge] = useState<LoungeSchema>(lounges[0]);
  const [firstName, setFirstName] = useState<string | null>('');
  const [lastName, setLastName] = useState<string | null>('');
  const [domain, setDomain] = useState<string | null>('');
  // const [debugModeIsActive, setDebugModeIsActive] = useState(true);

  const [object, setObject] = useState('');
  const [jwt, setJWT] = useState('');

  const createNewJWT = async (values: SchemaType) => {
    if (product === null) {
      alert('The account provider is required!');
      return;
    }

    const response = {
      ...values,
      firstName,
      lastName,
      lounge,
      client,
      // TODO: refactoring
      accountProvider: product,
    };

    setObject(JSON.stringify(response));

    const jwtToken = await encryptJWT(response);
    setJWT(jwtToken);

    const url = `${domain}?in=${jwtToken}`;

    window.open(url);
  };

  return (
    <>
      <h1>Placeholder App</h1>

      <form onSubmit={form.onSubmit((values) => createNewJWT(values))}>
        <Select
          placeholder="Please select an env"
          data={urls}
          onChange={setDomain}
        />

        <TextInput
          {...form.getInputProps('membershipNumber')}
          placeholder="Please add your membership number"
        />

        <Select
          placeholder="Please select a valid first name"
          data={firstNames}
          onChange={setFirstName}
        />

        <Select
          placeholder="Please select a valid last name"
          data={lastNames}
          onChange={setLastName}
        />

        <TextInput
          {...form.getInputProps('email')}
          placeholder="Plase add your email"
        />

        <ProductSelectBox setProduct={setProduct} />
        <ClientSelectBox setClient={setClient} />
        <LoungeSelectBox setLounge={setLounge} />

        <br />
        <Button type="submit">Pre-book</Button>
      </form>
      <DebugBox jwt={jwt} object={object} />
    </>
  );
};

export default Content;
