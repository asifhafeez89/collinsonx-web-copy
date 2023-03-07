import Layout from '@components/Layout';
import bookingsMock from '../bookings.json';
import { Title, Text } from '@collinsonx/design-system/core';

import { GetServerSideProps } from 'next';

const { bookings, lounge } = bookingsMock;

interface DetailsProps {
  id: string;
}

export default function Details({ id }: DetailsProps) {
  return (
    <>
      <Title mb={8} size={32}>
        Customer booking details
      </Title>
      <Text mb={33} size={18}>
        {lounge.name}
      </Text>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = ctx.params?.id as string;
  if (!id) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      id,
    },
  };
};

Details.getLayout = (page: JSX.Element) => <Layout>{page}</Layout>;
