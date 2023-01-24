import InputValidation from '@components/InputValidation';
import {
  Button,
  Title,
  Stack,
  TextInput,
  Text,
  Box,
  Flex,
} from '@mantine/core';
import LoginCode from '../assets/login-code.svg';

export default function CheckEmail() {
  return (
    <Stack align="center">
      <Stack spacing={24} align="center">
        <Title order={1} size={20}>
          Check your email
        </Title>
        <Text align="center">
          We have sent a confirmation code to john@doe.com.
        </Text>
        <Text size={14}>
          Wrong email?{' '}
          <Button variant="subtle" sx={{ fontSize: '14px' }} compact>
            Re-enter your address
          </Button>
        </Text>
      </Stack>
      <InputValidation />
      <Button fullWidth>Confirm</Button>
      <Flex mt={58} align="center" direction="column">
        <Box
          sx={{
            width: '100%',
            maxWidth: '342px',
            maxHeight: '304px',
          }}
        >
          <LoginCode />
        </Box>
      </Flex>
    </Stack>
  );
}
