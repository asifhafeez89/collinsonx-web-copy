import { Title, Accordion, Grid, Text } from '@collinsonx/design-system/core';
import { FlightInfo } from '../components/flightInfo/FlightInfo';
import { GetServerSideProps } from 'next';
import { useState } from 'react';
import dayjs from 'dayjs';
import Booking from '@components/Booking';
import Layout from '@components/Layout';

interface MainProps {
  consumerNumber: string | string[];
  tempBearerToken: string | string[];
}

export const getServerSideProps: GetServerSideProps<MainProps> = async ({
  req,
}) => {
  const consumerNumber = req.headers['x-consumernumber'] ?? '';
  const tempBearerToken = req.headers['authorization'] ?? '';
  return {
    props: {
      consumerNumber,
      tempBearerToken,
    },
  };
};

const Main = ({ consumerNumber, tempBearerToken }: MainProps) => {
  return (
    <Layout>
      <Title mb={8} size={32}>
        Welcome to Booking
      </Title>
      <p>Consumer Number: {consumerNumber}</p>
      <p>Temporary Bearer Token: {tempBearerToken}</p>
      <FlightInfo />
    </Layout>
  );
};

export default Main;
