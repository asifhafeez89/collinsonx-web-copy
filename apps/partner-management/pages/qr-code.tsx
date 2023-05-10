import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import Layout from '@components/Layout';
import { useRouter } from 'next/router';
import { Button, Box, Stack } from '@collinsonx/design-system/core';
import Link from 'next/link';
import { QRCodeSVG } from 'qrcode.react';

export default function QRCode() {
  const router = useRouter();

  const loungeId = '1234567890';
  const loungeName = 'Lounge Name';

  const print = () => {
    console.log('print');
  };

  useEffect(() => {
    ReactDOM.render(
      <QRCodeSVG value="https://reactjs.org/" imageSettings={} />,
      document.getElementById('qr-code-node')
    );
  }, []);

  return (
    <Stack p={32} align="center">
      <h1>Welcome to {loungeName}</h1>
      <h2>For walk-up check-ins please scan the code below</h2>
      <Box id="qr-code-node" p={32} w={'100%'} sx={{ textAlign: 'center' }} />
      <Button variant="default" onClick={print}>
        Print
      </Button>
      <Link href="/" style={{ textDecoration: 'none' }}>
        <Button variant="default" my={16}>
          Back to dashboard
        </Button>
      </Link>
    </Stack>
  );
}

QRCode.getLayout = (page: JSX.Element) => {
  return <Layout hasPadding={false}>{page}</Layout>;
};
