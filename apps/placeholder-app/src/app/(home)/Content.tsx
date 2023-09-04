'use client';

import { useState, Dispatch, SetStateAction } from 'react';

import { useForm, joiResolver } from '@mantine/form';
import {
  Select,
  Button,
  Textarea,
  TextInput,
  Switch,
  Grid,
} from '@mantine/core';

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

import urls from './urls';
import { firstNames, lastNames } from './names';

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
  const data = lounges.map((lounge: LoungeSchema, i: number) => {
    const value = lounge.LoungeCode;

    // Requirement: Lounges BHD1 and BIRM are not available in BaaS.
    let label = `${lounge.LoungeCode} - ${lounge.LoungeName} - ${lounge.AirportName}`;
    if (lounge.LoungeCode === 'BHD1' || lounge.LoungeCode === 'BIRM') {
      label = `${label} - Not supported`;
    }

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

interface DebugBoxProps {
  jwt: string;
  object: string;
}

function DebugBox({ jwt, object }: DebugBoxProps) {
  const [jwtPayload, setJWTPayload] = useState('');

  const decodeOnClickHandler = async () => {
    const secretPhase = process.env.NEXT_PUBLIC_JWT_SECRET_KEY || '';
    const response = await decryptJWT(jwt, secretPhase);

    setJWTPayload(JSON.stringify(response.payload));
  };

  return (
    <>
      <p>Secret key: {process.env.NEXT_PUBLIC_JWT_SECRET_KEY || ''}</p>
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
      customFirstName: '',
      customLastName: '',
    },
  });

  const [lounge, setLounge] = useState<string>('');
  const [domain, setDomain] = useState<string | null>('');
  const [debugModeIsActive, setDebugModeIsActive] = useState(false);

  const [firstName, setFirstName] = useState<string | null>('');
  const [lastName, setLastName] = useState<string | null>('');

  const [accountProvider, setAccountProvider] = useState<AccountProvider>(null);
  const [accountProviderAllowNull, setAccountProviderAllowNull] =
    useState<boolean>(false);

  const [client, setClient] = useState<Client>(null);
  const [clientAllowNull, setClientAllowNull] = useState<boolean>(false);

  const [object, setObject] = useState('');
  const [jwt, setJWT] = useState('');

  const createNewJWT = async (values: SchemaType) => {
    let membershipType = client;
    if (clientAllowNull) {
      membershipType = '';
    }

    let accountProviderValue = accountProvider;
    if (accountProviderAllowNull) {
      membershipType = '';
    }

    const firstNameValue = values.customFirstName.length
      ? values.customFirstName
      : firstName;

    const lastNameValue = values.customLastName.length
      ? values.customLastName
      : lastName;

    const response = {
      sourceCode: values.sourceCode,
      membershipNumber: values.membershipNumber,
      email: values.email,
      firstName: firstNameValue,
      lastName: lastNameValue,
      lounge,
      membershipType,
      accountProvider: accountProviderValue,
    };

    setObject(JSON.stringify(response));

    const secretPhase = process.env.NEXT_PUBLIC_JWT_SECRET_KEY || '';
    const jwtToken = await encryptJWT(response, secretPhase);
    setJWT(jwtToken);

    const url = `${domain}?in=${jwtToken}`;

    window.open(url);
  };

  return (
    <>
      <h1>Placeholder App</h1>
      <form onSubmit={form.onSubmit((values) => createNewJWT(values))}>
        <Grid>
          <Grid.Col span={6}>
            <Select
              placeholder="Please select an env"
              data={urls}
              onChange={setDomain}
            />
          </Grid.Col>
        </Grid>

        <Grid>
          <Grid.Col span={6}>
            <TextInput
              {...form.getInputProps('sourceCode')}
              placeholder="Please add source code details"
            />
          </Grid.Col>
        </Grid>

        <Grid>
          <Grid.Col span={6}>
            <TextInput
              {...form.getInputProps('membershipNumber')}
              placeholder="Please add membership number details"
            />
          </Grid.Col>
        </Grid>

        <Grid>
          <Grid.Col span={6}>
            <Select
              placeholder="Please select a valid first name"
              data={firstNames}
              onChange={setFirstName}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              {...form.getInputProps('customFirstName')}
              placeholder="Please add a custom first name"
            />
          </Grid.Col>
        </Grid>

        <Grid>
          <Grid.Col span={6}>
            <Select
              placeholder="Please select a valid last name"
              data={lastNames}
              onChange={setLastName}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              {...form.getInputProps('customLastName')}
              placeholder="Please add a custom last name"
            />
          </Grid.Col>
        </Grid>

        <Grid>
          <Grid.Col span={6}>
            <TextInput
              {...form.getInputProps('email')}
              placeholder="Plase add your email"
            />
          </Grid.Col>
        </Grid>
        <Grid>
          <Grid.Col span={6}>
            <AccountProviderSelectBox setAccountProvider={setAccountProvider} />
          </Grid.Col>
          <Grid.Col span={4}>
            <Switch
              label="Test with empty value"
              checked={accountProviderAllowNull}
              onChange={(event) =>
                setAccountProviderAllowNull(event.currentTarget.checked)
              }
            />
          </Grid.Col>
        </Grid>
        <Grid>
          <Grid.Col span={6}>
            <ClientSelectBox setClient={setClient} />
          </Grid.Col>
          <Grid.Col span={4}>
            <Switch
              label="Test with empty value"
              checked={clientAllowNull}
              onChange={(event) =>
                setClientAllowNull(event.currentTarget.checked)
              }
            />
          </Grid.Col>
        </Grid>
        <Grid>
          <Grid.Col span={6}>
            <LoungeSelectBox setLounge={setLounge} />
          </Grid.Col>
        </Grid>

        <br />
        <Button type="submit">Pre-book</Button>
      </form>
      <br />
      <Switch
        label="Debug mode"
        checked={debugModeIsActive}
        onChange={(event) => setDebugModeIsActive(event.currentTarget.checked)}
      />
      <br />
      {debugModeIsActive && <DebugBox jwt={jwt} object={object} />}
    </>
  );
};

export default Content;
