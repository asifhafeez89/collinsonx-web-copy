import React from 'react';
import Layout from '@components/Layout';
import { useRouter } from 'next/router';
import { Button, Box, Stack, MediaQuery } from '@collinsonx/design-system/core';
import Link from 'next/link';
import { QRCodeSVG } from 'qrcode.react';

export default function QRCode() {
  const router = useRouter();

  const loungeId = '1234567890';
  const loungeName = 'Lounge Name';

  const print = () => {
    window.print();
  };

  return (
    <Stack p={32} align="center">
      <h1>Welcome to {loungeName}</h1>
      <h2>For walk-up check-ins please scan the code below</h2>
      <QRCodeSVG
        value={`https://collinsonx-web-main-alpha.vercel.app//${loungeId}`}
        size={400}
      />
      <MediaQuery
        query="print"
        styles={{
          display: 'none',
        }}
      >
        <Stack p={0} align="center" mt={32} spacing={0}>
          <Button onClick={print} w="50%">
            Print
          </Button>
          <p style={{ width: '50%' }}>
            It is recommended that you print in portrait orientation, without
            the headers & footers.
          </p>
          <Link href="/" style={{ textDecoration: 'none', width: '50%' }}>
            <Button variant="default" fullWidth>
              Back to dashboard
            </Button>
          </Link>
        </Stack>
      </MediaQuery>
    </Stack>
  );
}

QRCode.getLayout = (page: JSX.Element) => {
  return <Layout hasPadding={false}>{page}</Layout>;
};
