import React from 'react';
import { Button, Stack, Box } from '@collinsonx/design-system/core';
import Link from 'next/link';
import { QRCodeSVG } from 'qrcode.react';
import useExperience from 'hooks/experience';
import { LogoCergea } from '@collinsonx/design-system/assets/logo';
import PageTitle from '@components/PageTitle';
import { useMediaQuery } from '@collinsonx/design-system/hooks';

export default function QRCode() {
  const { experience, setExperience } = useExperience();

  const isPrint = useMediaQuery('print');

  const print = () => {
    window.print();
  };

  return experience ? (
    <>
      <PageTitle title="QR code" />
      <Stack p={32} align="center">
        <LogoCergea />
        <h1>Welcome to {experience.loungeName}</h1>
        <h2>For walk-up check-ins please scan the code below</h2>
        <QRCodeSVG
          value={`cergea://BookLounge?loungeId=${experience.id}`}
          size={400}
          data-testid="QRcode"
        />
        <Stack p={0} align="center" mt={32} gap={0}>
          <p style={{ width: '100%' }}>
            Please ensure you scan the code using the Scan QR button{' '}
            <span style={{ fontWeight: 'bold' }}>in the app</span>.
          </p>
        </Stack>
        {!isPrint && (
          <Stack p={0} align="center" mt={64} gap={0}>
            <Button onClick={print} w="50%" data-testid="printQRcode">
              Print
            </Button>
            <p style={{ width: '50%' }}>
              It is recommended that you print in portrait orientation, without
              the headers & footers.
            </p>
            <Link href="/" style={{ textDecoration: 'none', width: '50%' }}>
              <Button variant="default" fullWidth data-testid="backToDashboard">
                Back to dashboard
              </Button>
            </Link>
          </Stack>
        )}
      </Stack>
    </>
  ) : (
    <Box py={40} px={32}>
      Experience could not be found
    </Box>
  );
}
