import { Stack, Title, Box } from '@mantine/core';
import { LoginSuccess } from '@collinson/design-system/assets/graphics';
import LayoutLogin from '../components/LayoutLogin';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Success() {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push('/lounge');
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            backgroundColor: '#47D4B1',
            width: '120vw',
            height: '120vw',
            position: 'absolute',
            top: 'calc(50% - 60vw)',
            left: '-10vw',
            zIndex: -1,
            borderRadius: '50%',
          }}
        />
      </div>
      <Stack spacing={32} align="center" justify="space-between">
        <Title
          order={1}
          size={34}
          align="center"
          color="#000"
          sx={{ fontWeight: 700, marginTop: '66px' }}
        >
          You&apos;re in
        </Title>
        <Title
          order={2}
          align="center"
          color="#000"
          sx={{ fontWeight: 700, width: '209px' }}
        >
          Let&apos;s find your next experience
        </Title>
        <Box
          sx={{
            zIndex: 1,
            position: 'absolute',
            bottom: '16px',
            height: '289px',
            width: '375px',
          }}
        >
          <LoginSuccess />
        </Box>
      </Stack>
    </>
  );
}

Success.getLayout = (page: JSX.Element) => <LayoutLogin>{page}</LayoutLogin>;
