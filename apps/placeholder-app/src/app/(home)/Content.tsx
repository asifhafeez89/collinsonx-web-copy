'use client';

import { useState, Dispatch, SetStateAction } from 'react';

import { useForm, joiResolver } from '@mantine/form';
import { Select, Button, Textarea, TextInput } from '@mantine/core';

// @ts-ignore
import { AccountProvider, Client } from '@collinsonx/constants/dist/enums';

// @ts-ignore
import { getClients } from '@collinsonx/constants/dist/enums';

// @ts-ignore
import { getAccountProviders } from '@collinsonx/constants/dist/enums';

// @ts-ignore
import { encryptJWT, decryptJWT } from '@collinsonx/jwt/dist';

import { LoungeSchema, lounges } from '@/data/Lounge';

import schema, { SchemaType } from './schema';
// import { encryptJWT, decryptJWT } from './jwt';
import urls from './urls';
import { firstNames, lastNames } from './names';

const secretPhase = 'zH4NRP1HMALxxCFnRZABFA7GOJtzU_gIj02alfL1lvI';

interface ClientSelectBoxProps {
  setClient: Dispatch<SetStateAction<Client>>;
}

function ClientSelectBox({ setClient }: ClientSelectBoxProps) {
  const data = getClients().map((client: Client) => {
    return {
      value: client,
      label: client,
    };
  });

  return (
    <Select
      placeholder="Please select a membership type"
      data={data}
      onChange={setClient}
    />
  );
}

interface AccountProviderSelectBoxProps {
  setAccountProvider: Dispatch<SetStateAction<AccountProvider>>;
}

function AccountProviderSelectBox({
  setAccountProvider,
}: AccountProviderSelectBoxProps) {
  const data = getAccountProviders().map((accountProvider: AccountProvider) => {
    return {
      value: accountProvider,
      label: accountProvider,
    };
  });

  return (
    <Select
      placeholder="Please select an account provider"
      data={data}
      onChange={setAccountProvider}
    />
  );
}

interface LoungeSelectBoxProps {
  setLounge: Dispatch<SetStateAction<string>>;
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
    const response = await decryptJWT(jwt, secretPhase);

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
      sourceCode: '',
      membershipNumber: '',
      email: '',
    },
  });

  const [accountProvider, setAccountProvider] = useState<AccountProvider>(null);
  const [client, setClient] = useState<Client>(null);
  const [lounge, setLounge] = useState<string>('');
  const [firstName, setFirstName] = useState<string | null>('');
  const [lastName, setLastName] = useState<string | null>('');
  const [domain, setDomain] = useState<string | null>('');
  // const [debugModeIsActive, setDebugModeIsActive] = useState(true);

  const [object, setObject] = useState('');
  const [jwt, setJWT] = useState('');

  const createNewJWT = async (values: SchemaType) => {
    const response = {
      ...values,
      firstName,
      lastName,
      lounge,
      membershipType: client,
      accountProvider,
    };

    setObject(JSON.stringify(response));

    const jwtToken = await encryptJWT(response, secretPhase);
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
          {...form.getInputProps('sourceCode')}
          placeholder="Please add source code details"
        />

        <TextInput
          {...form.getInputProps('membershipNumber')}
          placeholder="Please add membership number details"
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

        <AccountProviderSelectBox setAccountProvider={setAccountProvider} />
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
