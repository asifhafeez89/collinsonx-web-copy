import React from 'react';
import Layout from '@components/Layout';
import { Button, Stack, MediaQuery, Box } from '@collinsonx/design-system/core';
import Link from 'next/link';
import { QRCodeSVG } from 'qrcode.react';
import getSelectedLounge from 'lib/getSelectedLounge';

export default function QRCode() {
  const loungeData = getSelectedLounge();

  const print = () => {
    window.print();
  };

  return loungeData ? (
    <Stack p={32} align="center">
      <h1>Welcome to {loungeData.loungeName}</h1>
      <h2>For walk-up check-ins please scan the code below</h2>
      <QRCodeSVG
        value={`cergea://BookLounge?loungeId=${loungeData.id}`}
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
  ) : (
    <Box py={40} px={32}>
      Experience could not be found
    </Box>
  );
}

QRCode.getLayout = (page: JSX.Element) => {
  return <Layout hasPadding={false}>{page}</Layout>;
};
