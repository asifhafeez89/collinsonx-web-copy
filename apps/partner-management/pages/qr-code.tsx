import React from 'react';
import Layout from '@components/Layout';
import { useRouter } from 'next/router';
import { Button, Box, Stack, MediaQuery } from '@collinsonx/design-system/core';
import Link from 'next/link';
import { QRCodeSVG } from 'qrcode.react';

export default function QRCode() {
  const router = useRouter();

  const loungeId = '24773fc9-d4a5-540a-8473-374ead37b0f7';
  const loungeName = 'Lounge Name';

  const print = () => {
    window.print();
  };

  return (
    <Stack p={32} align="center">
      <h1>Welcome to {loungeName}</h1>
      <h2>For walk-up check-ins please scan the code below</h2>
      <QRCodeSVG
        value={`cergea://BookLounge?loungeId=${loungeId}`}
        size={400}
      />
      <Stack p={0} align="center" mt={32} spacing={0}>
        <p style={{ width: '100%' }}>
          Please ensure you scan the code using the Scan QR button{' '}
          <span style={{ fontWeight: 'bold' }}>in the app</span>.
        </p>
      </Stack>
      <MediaQuery
        query="print"
        styles={{
          display: 'none',
        }}
      >
        <Stack p={0} align="center" mt={64} spacing={0}>
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
