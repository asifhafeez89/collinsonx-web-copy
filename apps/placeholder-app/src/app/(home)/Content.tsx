'use client';

import { useState, useEffect, Dispatch, SetStateAction } from 'react';

import { useForm, joiResolver } from '@mantine/form';
import {
  Select,
  Button,
  Textarea,
  TextInput,
  Switch,
  Grid,
  Notification,
  Text,
} from '@mantine/core';

import {
  AccountProvider,
  BookingQueryParams,
  Client,
} from '@collinsonx/constants/enums';

import { getClients } from '@collinsonx/constants/enums';

import { getAccountProviders } from '@collinsonx/constants/enums';

import { signJWT, decodeJWT } from '@collinsonx/jwt';

import { LoungeSchema, lounges, loungesProd } from '@/data/Lounge';

import schema, { SchemaType } from './schema';

import urls, { isProdUrl } from './urls';
import secrets from './secrets';
import { firstNames, lastNames } from './names';

const {
  loungeCode: lcParam,
  jwt: jwtParam,
  referrer: referrerParam,
} = BookingQueryParams;

interface ClientSelectBoxProps {
  setClient: Dispatch<SetStateAction<string | null>>;
  domain: string | null;
}

function ClientSelectBox({ setClient, domain }: ClientSelectBoxProps) {
  const isProdValue = function (value: string) {
    return value.toUpperCase() === Client.None;
  };

  const data = getClients()
    .filter((client: Client) => {
      if (!domain) {
        return true;
      }

      if (isProdUrl(domain)) {
        return isProdValue(client);
      }

      return true;
    })
    .map((client: Client) => {
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
  setAccountProvider: Dispatch<SetStateAction<string | null>>;
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
  setFlightDetails: (flightarray: string[]) => void;
  setAirportName: (airportName: string) => void;
  displayedLounges: Array<LoungeSchema>;
}

function LoungeSelectBox({
  setLounge,
  setFlightDetails,
  setAirportName,
  displayedLounges,
}: LoungeSelectBoxProps) {
  const selectChange = (LoungeCode: string) => {
    setLounge(LoungeCode);
    displayedLounges.map((lounge: LoungeSchema, i: number) => {
      if (lounge.LoungeCode === LoungeCode) {
        setFlightDetails(lounge.FlightNumbers);
        setAirportName(lounge.AirportName);
      }
    });
  };

  const data = displayedLounges.map((lounge: LoungeSchema, i: number) => {
    const value = lounge.LoungeCode;

    let label = `${lounge.LoungeCode} - ${lounge.LoungeName} - ${lounge.AirportName}`;

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
      onChange={selectChange}
    />
  );
}

interface DebugBoxProps {
  domain: string | null;
  loungeCode: string;
  jwt: string;
  object: string;
}

function DebugBox({ domain, loungeCode, jwt, object }: DebugBoxProps) {
  const [jwtPayload, setJWTPayload] = useState('');

  const decodeOnClickHandler = async () => {
    const secret = secrets[domain as keyof typeof secrets];
    if (secret) {
      const response = decodeJWT(jwt);
      setJWTPayload(JSON.stringify(response.payload));
    }
  };

  return (
    <>
      {loungeCode.length > 0 && <p>Lounge code: {loungeCode}</p>}
      {object.length > 0 && (
        <>
          <div>Object:</div>
          <Textarea value={object} readOnly />
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
    </>
  );
}

const Content = () => {
  const [lounge, setLounge] = useState<string>('');
  const [displayedLounges, setDisplayedLounges] =
    useState<Array<LoungeSchema>>(lounges);

  const [referrer, setReferrer] = useState<string>('');

  const [domain, setDomain] = useState<string | null>('');
  const [debugModeIsActive, setDebugModeIsActive] = useState(false);

  const [firstName, setFirstName] = useState<string | null>('');
  const [lastName, setLastName] = useState<string | null>('');

  const [accountProvider, setAccountProvider] = useState<string | null>(null);
  const [accountProviderAllowNull, setAccountProviderAllowNull] =
    useState<boolean>(false);

  const [client, setClient] = useState<string | null>(null);
  const [clientAllowNull, setClientAllowNull] = useState<boolean>(false);

  const [object, setObject] = useState('');
  const [jwt, setJWT] = useState('');
  const [flight, setFlight] = useState<string[]>([]);
  const [airportName, setAirportName] = useState<string>('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (domain !== 'https://booking.cergea.com') {
      setDisplayedLounges(lounges);
    } else {
      setDisplayedLounges(loungesProd);
    }
  }, [domain]);

  const createNewJWT = async (values: SchemaType) => {
    setError('');
    let membershipType: string | null = client;

    if (clientAllowNull) {
      membershipType = '';
    }

    let accountProviderValue = accountProvider;
    if (accountProviderAllowNull) {
      accountProviderValue = '';
    }

    const firstNameValue = values.customFirstName.length
      ? values.customFirstName
      : firstName;

    const lastNameValue = values.customLastName.length
      ? values.customLastName
      : lastName;

    const response = {
      externalId: values.externalId,
      membershipNumber: values.membershipNumber,
      email: values.email,
      firstName: firstNameValue,
      lastName: lastNameValue,
      membershipType,
      accountProvider: accountProviderValue,
    };

    setObject(JSON.stringify(response));

    const secret = secrets[domain as keyof typeof secrets];
    if (!secret) {
      setError('Could not retrieve secret for selected domain');
      return;
    }

    const jwtToken = await signJWT(response, secret);
    setJWT(jwtToken);

    const url = `${domain}?${lcParam}=${lounge}&${jwtParam}=${jwtToken}&${referrerParam}=${referrer}`;

    window.open(url);
  };

  const form = useForm({
    validate: joiResolver(schema),
    initialValues: {
      externalId: `baasTest${Math.floor(Math.random() * 10000).toString()}`,
      membershipNumber: `baasTest${Math.floor(
        Math.random() * 10000
      ).toString()}`,
      email: '',
      customFirstName: '',
      customLastName: '',
    },
  });

  const setFlightArray = (flightArray: string[]) => {
    setFlight(flightArray);
  };

  const setAirport = (airportName: string) => {
    setAirportName(airportName);
  };

  return (
    <>
      <h1>BaaS Testing App</h1>
      {error && (
        <Notification my={8} color="red" title="Error">
          {error}
        </Notification>
      )}
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
              {...form.getInputProps('externalId')}
              placeholder="Please add legacy external ID details"
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
            <TextInput
              {...form.getInputProps('email')}
              placeholder="Please add your email"
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
            <ClientSelectBox setClient={setClient} domain={domain} />
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
            <LoungeSelectBox
              setLounge={setLounge}
              setFlightDetails={setFlightArray}
              setAirportName={setAirport}
              displayedLounges={displayedLounges}
            />
          </Grid.Col>
        </Grid>

        <Grid>
          <Grid.Col span={6}>
            <TextInput
              value={referrer}
              onChange={(event) => setReferrer(event.currentTarget.value)}
              placeholder="Please add your referrer URL"
            />
          </Grid.Col>
        </Grid>

        <Grid>
          <Grid.Col span={6}>
            {flight.length > 0 ? (
              <Text>
                {' '}
                {lounge} ({airportName}): {flight.join(',')}
              </Text>
            ) : null}
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
      {debugModeIsActive && (
        <DebugBox
          domain={domain}
          loungeCode={lounge}
          jwt={jwt}
          object={object}
        />
      )}
    </>
  );
};

export default Content;
