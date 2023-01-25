import { Center, Container, Stack } from '@mantine/core';
// import CLImage from '../climage';

// import Logo from '../assets/logo.svg';

interface LayoutProps {
  children: JSX.Element;
}

export default function LayoutLogin({ children }: LayoutProps) {
  return (
    <Container mt={40} sx={{ maxWidth: '375px' }}>
      <Stack spacing={24}>
        <Center>
          {/* <Logo /> */}
           {/* <CLImage src="../assets/logo.svg" alt="logo" />  */}
        </Center>
        {children}
      </Stack>
    </Container>
  );
};
