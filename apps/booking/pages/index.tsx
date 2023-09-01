import { Title, Text, Stack } from '@collinsonx/design-system/core';
import Layout from '@components/Layout';
import usePayload from 'hooks/payload';
import Link from 'next/link';

const Home = () => {
  const { payload, token, setPayload } = usePayload();

  return (
    payload && (
      <Layout>
        <Title mb={8} size={32}>
          Welcome to Booking
        </Title>
        <Stack spacing={2}>
          <Text>Membership number: {payload.membershipNumber}</Text>
          <Text>Email: {payload.email}</Text>
          <Text>First name: {payload.firstName}</Text>
          <Text>Last name: {payload.lastName}</Text>
          <Text>Account provider: {payload.accountProvider}</Text>
          <Text>Membership type: {payload.membershipType}</Text>
          <Text>Lounge: {payload.lounge.LoungeCode}</Text>
          <Text>Source code: {payload.sourceCode}</Text>
        </Stack>
        <Link href={{ pathname: '/booking', query: { in: token } }}>
          Create booking
        </Link>
      </Layout>
    )
  );
};

export default Home;
