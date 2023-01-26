import LayoutLogin from '@collinson/design-system/layoutLogin/layoutLogin';
import { Stack, Title, Box } from '@mantine/core';
import LoginSuccess from '../assets/login-success.svg';

export default function Success() {
  return (
    <Stack mt={140} spacing={50} align="center" justify="space-between">
      <Title order={1} size={34} align="center">
        You&apos;re in
      </Title>
      <Box
        sx={{
          width: '100%',
          maxWidth: '342px',
          maxHeight: '304px',
        }}
      >
        <LoginSuccess />
      </Box>
    </Stack>
  );
}

Success.getLayout = (page: JSX.Element) => <LayoutLogin>{page}</LayoutLogin>;
